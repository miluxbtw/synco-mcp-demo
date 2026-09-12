import { cn } from "cn";

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("border-t border-border/60 py-16 sm:py-24", className)}
    >
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {(eyebrow || title || description) && (
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={cn(eyebrow || title || description ? "mt-10" : "")}>
          {children}
        </div>
      </div>
    </section>
  );
}
