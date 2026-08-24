import { siteConfig } from "../config/site";

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            About {siteConfig.shopName}
          </p>
          <p className="mt-5 text-ink-600">
            {siteConfig.shopName} is a local mobile phone repair and service
            centre focused on fast, honest, and reliable repairs. This
            content is a placeholder — the shop's story, team details, and
            history will be added here once supplied.
          </p>
          <p className="mt-4 text-ink-600">
            Our goal is simple: diagnose the problem clearly, quote fair
            pricing upfront, and get your device back to you working like new.
          </p>
        </div>
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-100 to-ink-100" />
      </div>
    </section>
  );
}
