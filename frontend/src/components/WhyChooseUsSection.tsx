import { Award, Clock, Headset, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Experienced Technicians",
    description: "Skilled technicians trained to diagnose and fix issues correctly the first time.",
  },
  {
    icon: Sparkles,
    title: "Quality Parts",
    description: "We use quality-checked replacement parts for a reliable, lasting repair.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "Clear, upfront estimates before we begin — no hidden charges.",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description: "Most common repairs are completed the same day.",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "Friendly support to answer your questions before, during and after your repair.",
  },
  {
    icon: ShieldCheck,
    title: "Service Guarantee",
    description: "Repairs are backed by our service guarantee. Ask us for details.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Repairs you can trust
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-2xl border border-ink-100 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm text-ink-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
