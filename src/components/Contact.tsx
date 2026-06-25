"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Clock, CheckCircle } from "lucide-react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  website: string;
};

const serviceOptions = [
  "Brakes",
  "Oil Changes",
  "Suspension",
  "Timing Belt Replacement",
  "Tune-Ups",
  "Diagnostics",
  "Other",
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "",
  });
  useEffect(() => {
    const handler = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (serviceOptions.includes(service)) {
        setFormData((prev) => ({ ...prev, service }));
      }
    };
    window.addEventListener("upayless:select-service", handler);
    return () => window.removeEventListener("upayless:select-service", handler);
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    try {
      setError(null);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Submission failed");
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us at (805) 300-2996."
      );
    }
  };

  const inputClass =
    "w-full bg-brand-white border border-gray-200 rounded-lg px-4 py-3 text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-white transition-colors font-body text-sm";

  return (
    <section
      id="contact"
      className="bg-brand-white py-20 md:py-28 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-base font-body uppercase tracking-widest text-brand-blue">
            GET IN TOUCH
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brand-text mt-3">
            Ready to Get Your Car Fixed?
          </h2>
          <p className="text-base font-body text-brand-muted leading-relaxed max-w-2xl mx-auto mt-4">
            Got a car issue or just need routine maintenance? Robert is ready to
            get you back on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Contact form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <CheckCircle className="w-16 h-16 text-brand-blue" />
                <h3 className="text-xl font-heading font-semibold text-brand-text">
                  Message Sent!
                </h3>
                <p className="text-brand-muted font-body">
                  Thank you! Robert will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  className="absolute opacity-0 h-0 w-0 pointer-events-none"
                  value={formData.website}
                  onChange={handleChange}
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="name" className="block text-sm font-body text-brand-text mb-1.5">
                    Name <span className="text-brand-blue" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-body text-brand-text mb-1.5">
                    Phone <span className="text-brand-blue" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-body text-brand-text mb-1.5">
                    Email <span className="text-brand-blue" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-body text-brand-text mb-1.5">
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select a Service
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-body text-brand-text mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about the issue..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-body" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-orange text-white font-semibold py-4 rounded-xl hover:bg-brand-orange-hover transition-colors text-base mt-2 font-body disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-brand-white flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right — Info + Map */}
          <div>
            <div className="flex flex-col gap-4 mb-8">
              <a
                href="https://www.google.com/maps/place/900+W+Los+Angeles+Ave,+Simi+Valley,+CA+93065"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gray rounded-xl p-5 flex items-start gap-4 border border-gray-200 hover:border-brand-blue/30 transition-colors"
              >
                <MapPin className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                <p className="text-sm font-body text-brand-text">
                  900 W Los Angeles Ave #1795, Simi Valley, CA 93065
                </p>
              </a>

              <a
                href="tel:8053002996"
                className="bg-brand-gray rounded-xl p-5 flex items-start gap-4 border border-gray-200 hover:border-brand-blue/30 transition-colors"
              >
                <Phone className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                <p className="text-sm font-body text-brand-text">(805) 300-2996</p>
              </a>

              <div className="bg-brand-gray rounded-xl p-5 flex items-start gap-4 border border-gray-200">
                <Clock className="w-5 h-5 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-body text-brand-text">
                    Mon - Sat, 8 AM - 5 PM
                  </p>
                  <p className="text-xs font-body text-brand-muted">
                    Closed Sundays
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3294.654!2d-118.8237629!3d34.2867973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82e7904e9caa7%3A0xb767b6a2cbf7820d!2s900%20W%20Los%20Angeles%20Ave%2C%20Simi%20Valley%2C%20CA%2093065!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UPayLess Auto Repair location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
