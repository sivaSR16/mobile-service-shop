import {
  Battery,
  Camera,
  Cpu,
  Droplets,
  Mic,
  Plug,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "../types";

const iconByKeyword: Array<[string, LucideIcon]> = [
  ["screen", Smartphone],
  ["display", Smartphone],
  ["battery", Battery],
  ["charg", Plug],
  ["speaker", Mic],
  ["microphone", Mic],
  ["software", Cpu],
  ["water", Droplets],
  ["camera", Camera],
];

function iconFor(name: string): LucideIcon {
  const lower = name.toLowerCase();
  const match = iconByKeyword.find(([keyword]) => lower.includes(keyword));
  return match ? match[1] : Smartphone;
}

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconFor(service.name);

  return (
    <div className="group flex flex-col rounded-2xl border border-ink-100 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-ink-900">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-600">{service.description}</p>
      {service.price && (
        <p className="mt-3 text-sm font-medium text-brand-600">{service.price}</p>
      )}
      <a
        href="#contact"
        className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        Get a quote &rarr;
      </a>
    </div>
  );
}
