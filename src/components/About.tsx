import Image from "next/image";
import upayless2 from "../../public/UPayLessAuto5.webp";

export default function About() {
  return (
    <section id="about" className="bg-brand-dark py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column — image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl bg-brand-gray flex items-center justify-center overflow-hidden">
              <Image
                src={upayless2}
                alt="UPayLess Auto Repair shop"
                fill
                className="object-cover rounded-2xl"
              />
              {/* <img
                src="https://placehold.co/600x400"
                alt="UPayLess Auto Repair shop"
                className="object-cover rounded-2xl w-full h-full"
              /> */}
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-orange/10 rounded-2xl -z-10" />
          </div>

          {/* Right column — content */}
          <div>
            <p className="text-base font-body uppercase tracking-widest text-brand-orange">
              WHO WE ARE
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-brand-light mt-3">
              Car Repairs Can Be Stressful. They Don&apos;t Have to Be
              Expensive.
            </h2>
            <p className="text-base font-body text-brand-light/80 leading-relaxed mt-6">
              That&apos;s why Robert has dedicated the last 15+ years to
              providing Simi Valley with honest, transparent, and affordable
              auto care.
            </p>
            <p className="text-base font-body text-brand-light/80 leading-relaxed mt-4">
              Whether it&apos;s a simple oil change or a complex engine repair,
              you&apos;ll get a clear explanation of what needs to be done and
              what it&apos;ll cost before any work starts.
            </p>

            <div className="flex gap-8 mt-8">
              <div>
                <p className="text-3xl font-heading font-bold text-brand-orange">
                  15+
                </p>
                <p className="text-sm font-body text-brand-light/60">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-brand-orange">
                  4.8★
                </p>
                <p className="text-sm font-body text-brand-light/60">
                  Google Rating
                </p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-brand-orange">
                  1000+
                </p>
                <p className="text-sm font-body text-brand-light/60">
                  Cars Serviced
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
