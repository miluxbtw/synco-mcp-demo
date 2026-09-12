import { cn } from "cn";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-26">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-[28px] font-semibold tracking-[-0.02em] sm:text-[34px] lg:text-[38px] lg:leading-[1.15]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
