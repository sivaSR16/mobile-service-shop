import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getWhatsappLink, siteConfig } from "../config/site";
import EnquiryForm from "./EnquiryForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Contact
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Book your repair today
          </p>
          <p className="mt-4 text-ink-600">
            Fill out the form and our team will reach out shortly, or contact
            us directly.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-2xl border border-ink-100 bg-white/80 p-6 shadow-sm sm:p-8">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <ContactCard icon={Phone} label="Call Us" value={siteConfig.phone} href={`tel:${siteConfig.phone}`} />
            <ContactCard icon={Mail} label="Email Us" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <ContactCard icon={MapPin} label="Visit Us" value={siteConfig.address} />
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us instantly"
              href={getWhatsappLink("Hi, I'd like to ask about a phone repair.")}
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white/80 p-5 shadow-sm transition hover:border-brand-200">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-medium text-ink-500">{label}</p>
        <p className="font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {content}
    </a>
  );
}
