import { cn } from "cn";

/** The amber status lamp that sits beside the wordmark. */
export function StatusLamp({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_2px_rgb(255_176_32/0.45)]",
        className,
      )}
    />
  );
}
