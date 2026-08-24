import { AlertCircle, Loader2, Inbox } from "lucide-react";

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-ink-600">
      <Loader2 className="h-6 w-6 animate-spin text-brand-500" aria-hidden="true" />
      <p role="status">{label}</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 py-10 text-center text-red-700"
    >
      <AlertCircle className="h-6 w-6" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-ink-600">
      <Inbox className="h-6 w-6" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
