import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does a typical repair take?",
    answer:
      "Most common repairs, like screen or battery replacement, are completed the same day. We'll give you a time estimate after diagnosis.",
  },
  {
    question: "Do you offer a warranty on repairs?",
    answer:
      "Repairs are backed by our service guarantee. Ask our team for the specific terms for your repair.",
  },
  {
    question: "Which phone brands do you support?",
    answer:
      "We service all major brands including Apple, Samsung, OnePlus, Xiaomi, Redmi, Vivo, Oppo, Realme and Motorola.",
  },
  {
    question: "How do I get a repair estimate?",
    answer:
      "Use the chat widget or the contact form below with your device details, and our team will get back to you with an estimate.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">FAQ</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Frequently asked questions
          </p>
        </div>

        <div className="mt-10 divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium text-ink-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-sm text-ink-600">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
