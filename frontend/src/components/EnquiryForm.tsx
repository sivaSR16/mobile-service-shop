import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitEnquiry } from "../services/enquiries";
import { isValidEmail, isValidPhone } from "../utils/validation";
import { getWhatsappLink } from "../config/site";
import type { EnquiryPayload, PreferredContactMethod } from "../types";

const initialForm: EnquiryPayload = {
  customer_name: "",
  phone: "",
  email: "",
  brand: "",
  model: "",
  service_type: "",
  problem_description: "",
  preferred_contact_method: "PHONE" as PreferredContactMethod,
};

type FormErrors = Partial<Record<keyof EnquiryPayload, string>>;

export default function EnquiryForm() {
  const [form, setForm] = useState<EnquiryPayload>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<EnquiryPayload | null>(null);

  function update<K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.customer_name.trim()) next.customer_name = "Name is required.";
    if (!isValidPhone(form.phone)) next.phone = "Enter a valid phone number.";
    if (!isValidEmail(form.email)) next.email = "Enter a valid email address.";
    if (!form.problem_description.trim())
      next.problem_description = "Please describe the issue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitEnquiry(form);
      setLastSubmitted(form);
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setApiError("Couldn't submit your enquiry. Please try again, or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600" aria-hidden="true" />
        <p className="font-semibold text-green-800">
          Thanks! Your enquiry has been submitted.
        </p>
        <p className="text-sm text-green-700">
          Our team will contact you shortly.
        </p>
        {lastSubmitted && (
          <a
            href={getWhatsappLink(
              `Hi, I just submitted a repair enquiry.\nName: ${lastSubmitted.customer_name}\nPhone: ${lastSubmitted.phone}\nBrand/Model: ${lastSubmitted.brand} ${lastSubmitted.model}\nIssue: ${lastSubmitted.problem_description}`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-sm font-medium text-brand-600 underline"
          >
            Notify us on WhatsApp for faster response
          </a>
        )}
        <button
          type="button"
          className="mt-2 text-sm font-medium text-brand-600 underline"
          onClick={() => setSubmitted(false)}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="customer_name" error={errors.customer_name}>
          <input
            id="customer_name"
            type="text"
            value={form.customer_name}
            onChange={(e) => update("customer_name", e.target.value)}
            className={inputClass(!!errors.customer_name)}
            autoComplete="name"
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            autoComplete="tel"
          />
        </Field>

        <Field label="Email (optional)" htmlFor="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            autoComplete="email"
          />
        </Field>

        <Field label="Preferred Contact" htmlFor="preferred_contact_method">
          <select
            id="preferred_contact_method"
            value={form.preferred_contact_method}
            onChange={(e) =>
              update("preferred_contact_method", e.target.value as PreferredContactMethod)
            }
            className={inputClass(false)}
          >
            <option value="PHONE">Phone Call</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="EMAIL">Email</option>
          </select>
        </Field>

        <Field label="Brand" htmlFor="brand">
          <input
            id="brand"
            type="text"
            placeholder="e.g. Samsung"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Model" htmlFor="model">
          <input
            id="model"
            type="text"
            placeholder="e.g. Galaxy S23"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label="Service Type" htmlFor="service_type">
        <input
          id="service_type"
          type="text"
          placeholder="e.g. Screen Replacement"
          value={form.service_type}
          onChange={(e) => update("service_type", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <Field
        label="Describe the Problem"
        htmlFor="problem_description"
        error={errors.problem_description}
      >
        <textarea
          id="problem_description"
          rows={4}
          value={form.problem_description}
          onChange={(e) => update("problem_description", e.target.value)}
          className={inputClass(!!errors.problem_description)}
        />
      </Field>

      {apiError && (
        <p role="alert" className="text-sm text-red-600">
          {apiError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Submitting..." : "Submit Repair Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-800">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "block w-full rounded-lg border px-3.5 py-2.5 text-ink-900 shadow-sm outline-none transition",
    "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30",
    hasError ? "border-red-400" : "border-ink-200",
  ].join(" ");
}
