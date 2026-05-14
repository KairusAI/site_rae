import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { LucideIcon } from "lucide-react";
import { CircleDollarSign, Layers3, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stats: {
  figure: string;
  text: string;
  source: string;
  icon: LucideIcon;
  step: string;
}[] = [
  {
    figure: "R$ 1.800",
    text: "Custo médio por colaborador por ano só em absenteísmo — e isso é a ponta do iceberg. Na indústria, pode ultrapassar R$ 4.500.",
    source: "IBPT, 2022",
    icon: CircleDollarSign,
    step: "01",
  },
  {
    figure: "3 a 5×",
    text: "O custo real de cada falta vai muito além do salário do dia. Cobertura, horas extras, perda de fluxo e retrabalho multiplicam o impacto.",
    source: "Mercer Marsh Benefits",
    icon: Layers3,
    step: "02",
  },
  {
    figure: "40%",
    text: "Dos colaboradores têm excesso de peso. São eles que mais usam o plano, mais faltam e mais geram sinistralidade — e a maioria das empresas não sabe quem são.",
    source: "IBGE + base RAE",
    icon: Scale,
    step: "03",
  },
];

export function DataSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".data-head",
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".data-stat",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="data"
      className="relative scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-background/20 bg-foreground py-10 text-background dark:border-foreground/15 dark:bg-background dark:text-foreground sm:py-12 md:py-14 lg:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 45%), radial-gradient(circle at 80% 70%, hsl(var(--accent)) 0%, transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container relative z-[1]">
        <p className="data-head gsap-hidden mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/80 dark:text-foreground/85 sm:text-xs">
          O custo real que ninguém quantifica
        </p>
        <h2 className="data-head gsap-hidden mb-3 max-w-2xl text-lg font-semibold leading-snug tracking-tight sm:text-xl md:text-[1.35rem] lg:text-[1.45rem]">
          Cada colaborador doente custa muito mais do que o salário dele.
        </h2>
        <p className="data-head gsap-hidden mb-8 max-w-2xl text-sm leading-relaxed text-background/75 dark:text-foreground/90 md:mb-9 md:text-[0.9375rem]">
          Dados que o RH precisa levar para o CFO antes de aprovar qualquer orçamento de saúde.
        </p>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-4 lg:gap-5">
          {stats.map(({ figure, text, source, icon: Icon, step }) => (
            <article
              key={figure}
              className={cn(
                "data-stat gsap-hidden group relative flex flex-col overflow-hidden rounded-2xl border border-background/18 bg-gradient-to-b from-background/[0.12] to-background/[0.04] p-4 shadow-[0_16px_36px_-22px_rgba(0,0,0,0.42)] backdrop-blur-sm transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-background/28 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.5)]",
                "dark:border-foreground/18 dark:from-foreground/[0.08] dark:to-black/25 dark:shadow-[0_16px_36px_-22px_rgba(0,0,0,0.6)]",
                "dark:hover:border-foreground/30 dark:hover:shadow-[0_22px_48px_-24px_hsl(var(--primary)/0.3)]",
                "sm:p-5 md:p-4 lg:p-5"
              )}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-background/70 to-transparent opacity-90 dark:via-foreground/75"
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.32em] text-background/40 dark:text-foreground/45 sm:text-[11px]">
                  {step}
                </span>
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-background/20 bg-background/[0.1] text-background/90 transition-colors duration-300",
                    "group-hover:border-background/35 group-hover:bg-background/[0.16]",
                    "dark:border-foreground/20 dark:bg-foreground/[0.08] dark:text-foreground",
                    "dark:group-hover:border-foreground/35 dark:group-hover:bg-foreground/[0.12]"
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </div>
              </div>

              <p
                className={cn(
                  "relative mt-3 text-[1.6rem] font-bold tabular-nums leading-none tracking-tight text-background sm:text-[1.75rem] md:text-[1.55rem] lg:text-[1.85rem]",
                  "[text-shadow:0_2px_20px_rgba(255,255,255,0.12)]",
                  "dark:text-foreground dark:[text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
                )}
              >
                {figure}
              </p>

              <div
                className="my-3.5 h-px w-11 bg-gradient-to-r from-background/50 to-transparent dark:from-foreground/45"
                aria-hidden
              />

              <p className="grow text-[13px] leading-relaxed text-background/88 dark:text-foreground/93 sm:text-sm">
                {text}
              </p>

              <p className="mt-4 inline-flex w-fit rounded-full border border-background/18 bg-background/[0.08] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-background/65 dark:border-foreground/18 dark:bg-black/25 dark:text-foreground/65 sm:text-[11px]">
                {source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
