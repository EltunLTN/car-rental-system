import type { PropsWithChildren } from "react";

interface ErrorProps extends PropsWithChildren {
  error: Error | null;
}
function ErrorMessage({ error, children }: ErrorProps) {
  console.error(error);

  return (
    <div
      role="status"
      aria-live="polite"
      className="font-mono grid place-items-center"
      data-testid="api-error"
    >
      {children}
    </div>
  );
}

export default ErrorMessage;
