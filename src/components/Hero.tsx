import { Phone, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-8 pt-[130px] pb-[30px]"
    >
      {/* TODO: Replace with background image. Use next/image with fill, objectFit="cover", and a dark overlay div (bg-black/60) on top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0b1f44_40%,_#1a3a6e_100%)]" />
      {/* bg-[radial-gradient(ellipse_at_center,_#1a3a6e_0%,_#0b1f44_70%)] */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-2xl uppercase tracking-[0.2em] text-brand-orange font-body mb-4 font-bold">
          TRUSTED <span className="underline">AUTO REPAIR</span> IN SIMI VALLEY
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-light leading-tight">
          Honest Repairs.
          <br />
          Fair Prices.
        </h1>
        <p className="text-lg md:text-2xl font-body font-normal text-brand-light max-w-2xl mx-auto mt-6">
          Brakes, Oil Changes, Tune-Ups, Diagnostics<br></br> Happily Serving
          Simi Valley for over 15 years.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="#contact"
            className="bg-brand-blue text-white font-semibold px-8 py-4 rounded-xl hover:bg-brand-blue-hover transition-colors text-base font-body focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-dark"
          >
            Book an Appointment
          </a>
          <a
            href="tel:8053002996"
            className="flex items-center justify-center gap-2 border border-brand-light/30 text-brand-light font-semibold px-8 py-4 rounded-xl hover:border-brand-orange hover:text-brand-orange transition-colors text-base font-body focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-dark"
          >
            <Phone className="w-5 h-5" />
            Call (805) 300-2996
          </a>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-light/40 animate-bounce focus:outline-none"
        aria-label="Scroll to services"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
