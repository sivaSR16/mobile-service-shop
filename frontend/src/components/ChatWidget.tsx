import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { getWhatsappLink, siteConfig } from "../config/site";
import { submitEnquiry } from "../services/enquiries";
import { isValidPhone } from "../utils/validation";

type Step =
  | "menu"
  | "repair_name"
  | "repair_phone"
  | "repair_brand"
  | "repair_model"
  | "repair_problem"
  | "repair_review"
  | "submitting"
  | "success"
  | "info";

interface Message {
  from: "bot" | "user";
  text: string;
}

const menuOptions = [
  "Repair my phone",
  "Get repair estimate",
  "Ask about a service",
  "Shop location",
  "Contact us",
];

const infoResponses: Record<string, string> = {
  "Get repair estimate":
    "For an accurate estimate we'll need a few details about your device — let's start a repair enquiry so our team can quote you.",
  "Ask about a service":
    `We handle screen replacement, battery replacement, charging port repair, speaker/mic repair, software issues, water damage and camera repair. Check the Services section above for details, or ask us directly on WhatsApp.`,
  "Shop location": `${siteConfig.address}. Hours: ${siteConfig.hours}.`,
  "Contact us": `Call us at ${siteConfig.phone}, email ${siteConfig.email}, or message us on WhatsApp.`,
};

const emptyDetails = {
  customer_name: "",
  phone: "",
  brand: "",
  model: "",
  problem_description: "",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("menu");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: `Hi 👋 Welcome to our mobile service centre. How can we help you?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [details, setDetails] = useState(emptyDetails);
  const [inputError, setInputError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  function pushBot(text: string) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }
  function pushUser(text: string) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  function handleMenuChoice(choice: string) {
    pushUser(choice);
    if (choice === "Repair my phone" || choice === "Get repair estimate") {
      if (choice === "Get repair estimate") pushBot(infoResponses[choice]);
      pushBot("Great! Let's get some details. What's your name?");
      setStep("repair_name");
      return;
    }
    pushBot(infoResponses[choice] ?? "Let us know how we can help.");
    setStep("info");
  }

  function submitTextStep(nextStep: Step, key: keyof typeof emptyDetails, botPrompt: string) {
    const value = input.trim();
    if (!value) {
      setInputError("This field can't be empty.");
      return;
    }
    if (key === "phone" && !isValidPhone(value)) {
      setInputError("Enter a valid phone number.");
      return;
    }
    setInputError(null);
    pushUser(value);
    setDetails((prev) => ({ ...prev, [key]: value }));
    setInput("");
    pushBot(botPrompt);
    setStep(nextStep);
  }

  async function handleSubmitEnquiry() {
    setStep("submitting");
    setApiError(null);
    try {
      await submitEnquiry({
        customer_name: details.customer_name,
        phone: details.phone,
        email: "",
        brand: details.brand,
        model: details.model,
        service_type: "",
        problem_description: details.problem_description,
        preferred_contact_method: "PHONE",
      });
      pushBot("Thanks! Your enquiry has been submitted. Our team will contact you shortly.");
      setStep("success");
    } catch {
      setApiError("Couldn't submit your enquiry right now. Please try WhatsApp instead.");
      setStep("repair_review");
    }
  }

  function handleTextSubmit(event: FormEvent) {
    event.preventDefault();
    if (step === "repair_name") submitTextStep("repair_phone", "customer_name", "What's your phone number?");
    else if (step === "repair_phone") submitTextStep("repair_brand", "phone", "Which phone brand is it?");
    else if (step === "repair_brand") submitTextStep("repair_model", "brand", "What's the model?");
    else if (step === "repair_model") submitTextStep("repair_problem", "model", "Briefly describe the problem.");
    else if (step === "repair_problem") {
      const value = input.trim();
      if (!value) {
        setInputError("This field can't be empty.");
        return;
      }
      setInputError(null);
      pushUser(value);
      setDetails((prev) => ({ ...prev, problem_description: value }));
      setInput("");
      pushBot("Here's a summary of your enquiry — tap Submit to send it to our team.");
      setStep("repair_review");
    }
  }

  function resetChat() {
    setStep("menu");
    setDetails(emptyDetails);
    setInput("");
    setInputError(null);
    setApiError(null);
    setMessages([
      { from: "bot", text: "Hi 👋 Welcome to our mobile service centre. How can we help you?" },
    ]);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition hover:bg-brand-600"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Enquiry chat"
          className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between bg-ink-900 px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{siteConfig.shopName}</p>
              <p className="text-xs text-ink-300">Usually replies within a few hours</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-ink-50 px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.from === "bot" ? "justify-start" : "justify-end"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                    message.from === "bot"
                      ? "bg-white text-ink-800 shadow-sm"
                      : "bg-brand-500 text-white"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {step === "success" && (
              <div className="flex items-center gap-2 rounded-xl bg-green-50 px-3.5 py-2.5 text-sm text-green-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Enquiry submitted successfully.
              </div>
            )}
          </div>

          <div className="border-t border-ink-100 bg-white p-3">
            {step === "menu" && (
              <div className="flex flex-wrap gap-2">
                {menuOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleMenuChoice(option)}
                    className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step === "info" && (
              <button
                type="button"
                onClick={resetChat}
                className="w-full rounded-full bg-ink-100 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-200"
              >
                Back to menu
              </button>
            )}

            {(step === "repair_name" ||
              step === "repair_phone" ||
              step === "repair_brand" ||
              step === "repair_model" ||
              step === "repair_problem") && (
              <form onSubmit={handleTextSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 rounded-full border border-ink-200 px-3.5 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
                    placeholder="Type your answer..."
                    aria-label="Your answer"
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white hover:bg-brand-600"
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                {inputError && <p className="px-1 text-xs text-red-600">{inputError}</p>}
              </form>
            )}

            {step === "repair_review" && (
              <div className="space-y-2">
                {apiError && <p className="text-xs text-red-600">{apiError}</p>}
                <button
                  type="button"
                  onClick={handleSubmitEnquiry}
                  className="w-full rounded-full bg-brand-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Submit Repair Enquiry
                </button>
                <a
                  href={getWhatsappLink(
                    `Hi, I'd like a repair for my ${details.brand} ${details.model}. Issue: ${details.problem_description}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-medium text-ink-600 underline"
                >
                  Or continue on WhatsApp instead
                </a>
              </div>
            )}

            {step === "submitting" && (
              <p className="text-center text-sm text-ink-500">Submitting...</p>
            )}

            {step === "success" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={resetChat}
                  className="w-full rounded-full bg-ink-100 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-200"
                >
                  Start a new enquiry
                </button>
                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-medium text-brand-600 underline"
                >
                  Prefer WhatsApp? Chat with us there
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
