import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-().+]{7,20}$/;

async function sendBrevoEmail(payload: object): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo email error ${res.status}: ${body}`);
  }
}

// SMS disabled — re-enable once Twilio number is verified/replaced
// async function sendTwilioSms({ to, body }: { to: string; body: string }): Promise<void> {
//   const sid = process.env.TWILIO_ACCOUNT_SID!;
//   const token = process.env.TWILIO_AUTH_TOKEN!;
//   const from = process.env.TWILIO_PHONE_NUMBER!;
//   const res = await fetch(
//     `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
//       },
//       body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
//     }
//   );
//   if (!res.ok) {
//     const err = await res.text();
//     throw new Error(`Twilio SMS error ${res.status}: ${err}`);
//   }
// }

export async function POST(request: NextRequest) {
  if (!process.env.BREVO_API_KEY || !process.env.CONTACT_EMAIL_TO) {
    return Response.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: {
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
    message?: string;
    website?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name)
    return Response.json({ error: "Name is required." }, { status: 400 });
  if (!phone || !PHONE_RE.test(phone))
    return Response.json(
      { error: "A valid phone number is required." },
      { status: 400 },
    );
  if (!email || !EMAIL_RE.test(email))
    return Response.json(
      { error: "A valid email address is required." },
      { status: 400 },
    );

  const fromEmail = "robert@upaylessauto.com";
  const fromName = "UPayLess Auto Repair";
  const svc = service || "General Inquiry";

  const notifyTo = [
    { email: process.env.CONTACT_EMAIL_TO },
    ...(process.env.ADMIN_EMAIL ? [{ email: process.env.ADMIN_EMAIL }] : []),
  ];

  const results = await Promise.allSettled([
    // Notification email to shop + admin
    sendBrevoEmail({
      sender: { name: fromName, email: fromEmail },
      to: notifyTo,
      replyTo: { email, name },
      subject: `New Contact: ${svc} from ${name}`,
      htmlContent: `
        <h2>New contact form submission</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Phone</strong></td><td><a href="tel:${phone.replace(/\D/g, "")}">${phone}</a></td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          ${service ? `<tr><td><strong>Service</strong></td><td>${service}</td></tr>` : ""}
          ${message ? `<tr><td><strong>Message</strong></td><td>${message}</td></tr>` : ""}
        </table>
      `,
    }),
    // Confirmation email to customer
    sendBrevoEmail({
      sender: { name: fromName, email: fromEmail },
      to: [{ email, name }],
      subject: "We received your message — UPayLess Auto Repair",
      htmlContent: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! Robert will get back to you shortly.</p>
        <p>In the meantime, you can reach us directly at <a href="tel:8053002996">(805) 300-2996</a>.</p>
        <p>— UPayLess Auto Repair</p>
      `,
    }),
    // SMS sends commented out — re-enable after getting a local 10-digit Twilio number
    // sendTwilioSms({ to: process.env.YOUR_PHONE_NUMBER!, body: `UPayLessAuto: New ${svc} request from ${name}. Call: ${phone}` }),
    // sendTwilioSms({ to: process.env.YOUR_PHONE_NUMBER!, body: `UPayLessAuto: Hi ${name}, thanks for contacting us! For same-day service call (805) 300-2996. Mon-Sat 8AM-5PM.` }),
  ]);

  results.forEach((result, i) => {
    const label = i === 0 ? "email-notification" : "email-confirmation";
    if (result.status === "rejected") {
      console.error(
        `${label} failed:`,
        (result as PromiseRejectedResult).reason,
      );
    }
  });

  if (results[0].status === "rejected") {
    return Response.json(
      { error: "Failed to send message. Please call us at (805) 300-2996." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
