import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Tami Jones",
    text: "A good honest mechanic. Another mechanic was gonna charge $169 to look at it and take 2 to 4 hours before they would see my car. U Pay Less Auto Repair saw it immediately and fixed it in 2 minutes. He didn't even charge me!",
    link: "https://share.google/rLOcV4ycCp8WGLIjN",
  },
  {
    name: "Peanuts Mom",
    text: "Robert is amazing. I brought my Prius to have the 12 volt battery replaced. Autozone sold me the wrong battery and Robert got me the right one on a Saturday and had it repaired in an hour. I love Robert. He is an awesome mechanic and the sweetest man I have ever met. Thank you Robert!",
    link: "https://share.google/Lvx908H6yOfFiXQcy",
  },
  {
    name: "Avtar Bhogal",
    text: "This is an excellent place. I work right next door. Whenever we have automotive needs, he takes care of us and his prices are reasonable. Thank you.",
    link: "https://share.google/7WWYEe19uDaMjq9ih",
  },
  {
    name: "Erick Cruz",
    text: "Robert is awesome, super kind, always ready to help at great prices!",
    link: "https://share.google/5msBJfFA61PUkNzkh",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-brand-gray py-20 md:py-28 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-base font-body uppercase tracking-widest text-brand-blue">
            REAL REVIEWS
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brand-text mt-3">
            Hear From Our Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-brand-card border border-gray-200 p-6 rounded-xl"
            >
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-brand-blue text-brand-blue"
                  />
                ))}
              </div>
              <p className="text-brand-text text-base leading-relaxed mt-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-6">
                <p className="text-brand-text font-semibold text-sm font-body">
                  {t.name}
                </p>
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted text-xs hover:text-brand-blue transition-colors font-body"
                >
                  View on Google
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
