import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { RAE_MEAL_IMAGE_IMG_CLASS, RAE_MEAL_IMAGE_SRC } from "@/lib/raeMealBackground";

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  "Metodologia própria com respaldo científico",
  "Foco em adesão e hábitos sustentáveis",
  "Linguagem clara — sem modismos nem promessas vazias",
  "Programas para pessoa física e para cultura organizacional",
  "Parceria contínua, não consulta avulsa",
];

export function WhyRaeSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-content",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".why-item",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative min-h-[min(46vh,24rem)] scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] overflow-hidden border-t border-border/40 bg-background py-16 sm:py-20 md:min-h-[min(52vh,28rem)] md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden sm:block"
        aria-hidden
      >
        <img
          src={RAE_MEAL_IMAGE_SRC}
          alt=""
          className={RAE_MEAL_IMAGE_IMG_CLASS}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
        />
      </div>
      {/* Desktop: véu só na faixa do texto para legibilidade (mobile: imagem oculta, sem véu) */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[min(100%,48rem)] bg-gradient-to-r from-background from-[8%] via-background/55 via-[50%] to-transparent dark:from-background dark:via-background/45 sm:block"
        aria-hidden
      />

      <div className="container relative z-[2]">
        <div className="why-content gsap-hidden max-w-xl lg:max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Por que a RAE
          </p>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
            Estratégia e cuidado — não só um cardápio
          </h2>
          <p className="mb-8 text-base text-muted-foreground md:mb-10 md:text-lg">
            Acreditamos que nutrição de impacto nasce da combinação entre método, escuta e contexto.
            Por isso a RAE existe: para reprogramar a forma como pessoas e empresas se relacionam com
            alimentação e saúde.
          </p>
          <ul className="relative space-y-2.5 md:space-y-3">
            {bullets.map((b, index) => (
              <li
                key={b}
                className={cn(
                  "why-item gsap-hidden group flex overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-[0_10px_38px_-16px_rgba(0,0,0,0.12)] backdrop-blur-[6px] transition-[box-shadow,border-color,transform] duration-300",
                  "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_14px_44px_-14px_hsl(var(--primary)/0.22)]",
                  "dark:border-border/80 dark:bg-card/80 dark:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.45)] dark:hover:border-primary/40"
                )}
              >
                <div
                  className="w-1 shrink-0 bg-gradient-to-b from-primary via-primary/85 to-primary/55 dark:to-primary/70"
                  aria-hidden
                />
                <div className="flex min-w-0 flex-1 items-start gap-3.5 py-3.5 pl-4 pr-4 sm:gap-4 sm:py-4 sm:pl-5 sm:pr-5 md:gap-4">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/18 to-primary/[0.07] text-primary shadow-inner ring-1 ring-primary/15",
                      "dark:from-primary/28 dark:to-primary/10 dark:ring-primary/25",
                      "transition-colors duration-300 group-hover:ring-primary/35"
                    )}
                  >
                    <span className="sr-only">Ponto {index + 1}</span>
                    <Sparkles className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.85} aria-hidden />
                  </div>
                  <p className="min-w-0 flex-1 pt-0.5 text-[0.9375rem] font-medium leading-relaxed tracking-tight text-foreground md:text-base">
                    {b}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
