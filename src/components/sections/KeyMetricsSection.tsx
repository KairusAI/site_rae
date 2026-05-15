import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { figure: "+62%", label: "Engajamento vs. SIPAT tradicional" },
  { figure: "R$ 1,8k", label: "Absenteísmo médio por colaborador/ano" },
  { figure: "24h", label: "Para o RH receber o relatório" },
] as const;

export function KeyMetricsSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".metric-head",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".metric-item",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 76%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="metrics"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-border/40 bg-secondary/12 py-12 dark:bg-secondary/10 sm:py-14 md:py-16"
    >
      <div className="container">
        <div className="metric-head gsap-hidden mb-8 space-y-3 sm:mb-10 md:mb-12">
          <div className="h-1 w-14 rounded-full bg-gradient-to-r from-primary to-primary/40" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary sm:text-sm">
            Metodologia RAE
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 md:gap-10 lg:gap-12">
          {metrics.map(({ figure, label }, index) => (
            <div
              key={label}
              className="metric-item gsap-hidden group relative min-w-0 border-l-[3px] border-primary/35 pl-6 transition-colors duration-300 hover:border-primary/55 sm:pl-7"
            >
              <span className="mb-2 block font-mono text-[11px] font-semibold tabular-nums tracking-[0.2em] text-primary/60 sm:text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[2rem] font-bold tabular-nums leading-[0.95] tracking-tight text-primary sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.65rem]">
                {figure}
              </p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/85 sm:text-base md:text-[1.05rem]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
