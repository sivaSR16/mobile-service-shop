import { MessageCircle, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { getWhatsappLink, siteConfig } from "../config/site";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink-900">
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-ink-900 to-ink-900"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300 ring-1 ring-inset ring-brand-500/30">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Trusted local repair service
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-lg text-ink-300">
            Professional smartphone repair, genuine-quality parts and trusted
            service — get your phone back to perfect condition, fast.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-600"
            >
              <Wrench className="h-5 w-5" aria-hidden="true" />
              Book a Repair
            </a>
            <a
              href={getWhatsappLink("Hi, I'd like to ask about a phone repair.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-base font-semibold text-white ring-1 ring-inset ring-white/20 transition hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-500/20 to-brand-500/5 ring-1 ring-inset ring-white/10 sm:h-96 sm:w-96">
          <div className="absolute inset-6 rounded-2xl border border-white/10 bg-ink-800/60" />
          <Smartphone
            className="relative h-28 w-28 text-brand-400 sm:h-36 sm:w-36"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
