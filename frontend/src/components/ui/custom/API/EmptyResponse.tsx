import type { PropsWithChildren } from "react";

interface EmptyResponse extends PropsWithChildren {
  label?: string;
}

function EmptyResponse({ label, children }: EmptyResponse) {
  return (
    <div
      data-testid="empty-reponse"
      className="grid place-items-center py-5 min-h-1/2"
      aria-label={label}
      role="status"
      aria-live="polite"
    >
      {children}
    </div>
  );
}

export default EmptyResponse;
