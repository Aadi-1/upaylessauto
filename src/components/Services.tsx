"use client";

import {
  Disc3,
  Droplets,
  Gauge,
  Cog,
  Wrench,
  CircleHelp,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const services: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  contactValue?: string;
}> = [
  {
    icon: Disc3,
    title: "Brakes",
    description:
      "Keep your vehicle safe with expert brake inspections, pad replacements, rotor resurfacing, and complete brake system repairs.",
  },
  {
    icon: Droplets,
    title: "Oil Changes",
    description:
      "Keep your engine running smoothly with quick, affordable oil changes using the right oil grade matched to your vehicle's make and model.",
  },
  {
    icon: Gauge,
    title: "Suspension",
    description:
      "Restore your ride quality with professional suspension repairs, including shocks, struts, and steering components.",
  },
  {
    icon: Cog,
    title: "Timing Belt",
    description:
      "Protect your engine from costly damage with timely timing belt inspections and replacements.",
    contactValue: "Timing Belt Replacement",
  },
  {
    icon: Wrench,
    title: "Tune-Ups",
    description:
      "Get the most out of your vehicle's performance and fuel efficiency with comprehensive tune-ups, including spark plugs, filters, and full system diagnostics.",
  },
  {
    icon: CircleHelp,
    title: "Not Sure What's Wrong?",
    description:
      "No idea what the issue is? Bring it in and we'll run a full diagnostic to pinpoint the problem and get you back on the road.",
    contactValue: "Diagnostics",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-brand-white py-20 md:py-28 px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-base font-body uppercase tracking-widest text-brand-blue">
            WHAT WE DO
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brand-text mt-3">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const contactValue = service.contactValue ?? service.title;
            return (
              <button
                key={service.title}
                type="button"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("upayless:select-service", { detail: contactValue })
                  );
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left bg-brand-card border border-gray-100 shadow-sm p-6 rounded-xl hover:border-brand-blue/30 hover:shadow-md hover:bg-blue-50/20 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <Icon className="text-brand-blue w-10 h-10 mb-4" />
                <h3 className="text-2xl font-heading font-semibold text-brand-text mb-2">
                  {service.title}
                </h3>
                <p className="text-base font-body text-brand-muted leading-relaxed">
                  {service.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-blue hover:underline font-body text-base focus:outline-none focus:ring-2 focus:ring-brand-blue rounded"
          >
            Have a question? Get in touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
