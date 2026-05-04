import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Minus, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const traditional = [
  "Palestra genérica, mesma para qualquer empresa",
  "Colaborador não sai com nenhuma informação própria",
  "RH não tem dado nenhum para apresentar à liderança",
  "Presença obrigatória, adesão de 10 a 15%",
  "Investimento sem ROI mensurável",
];

const sipatRae = [
  "Palestra adaptada ao setor, porte e perfil da equipe",
  "Bioimpedância InBody individual: composição corporal completa para cada pessoa avaliada",
  "Relatório executivo de saudabilidade em até 24h — pronto para a diretoria",
  "+62% de engajamento real: colaboradores participam porque recebem valor individual",
  "18% convertem para programa contínuo em 30 dias — retorno documentado",
];

export function SipatCompareSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sipat-compare-head",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".sipat-compare-col",
        { y: 36, autoAlpha: 0 },
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
      id="sipat-compare"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-border/40 bg-card py-16 shadow-[inset_0_1px_0_0_hsl(var(--border)/0.45)] dark:border-border/30 dark:bg-card dark:shadow-none sm:py-20 md:py-28"
    >
      <div className="container">
        <p className="sipat-compare-head gsap-hidden mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Diferencial
        </p>
        <h2 className="sipat-compare-head gsap-hidden mb-4 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
          SIPAT tradicional vs. SIPAT RAE.
        </h2>
        <p className="sipat-compare-head gsap-hidden mb-10 max-w-2xl text-base text-muted-foreground md:mb-12 md:text-lg">
          Toda empresa faz SIPAT. Poucas saem com alguma coisa.
        </p>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="sipat-compare-col gsap-hidden hidden rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-8 dark:bg-muted/25 md:block">
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-border pb-4">
              <span className="rounded-full bg-muted-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                SIPAT tradicional
              </span>
              <span className="text-xs text-muted-foreground">Mercado atual</span>
            </div>
            <ul className="space-y-4">
              {traditional.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground/85 md:text-base">
                  <Minus className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="sipat-compare-col gsap-hidden rounded-2xl border border-primary/35 bg-primary/[0.06] p-6 shadow-[0_12px_40px_-16px_hsl(var(--primary)/0.35)] sm:p-8 dark:bg-primary/[0.08]">
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-primary/25 pb-4">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                SIPAT RAE
              </span>
              <span className="text-xs font-medium text-primary">Diferencial</span>
            </div>
            <ul className="space-y-4">
              {sipatRae.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground md:text-base">
                  <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
