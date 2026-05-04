import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Alinhamento e logística",
    text: "Briefing com o RH para entender perfil da equipe, setor e objetivos. A RAE prepara InBody, material educativo e roteiro da palestra — sem trabalho operacional extra para o time interno.",
    badge: "Pré-evento",
  },
  {
    n: "02",
    title: "Palestra interativa",
    text: "Nutrição estratégica adaptada ao perfil da empresa — não é palestra genérica. Dinâmica, linguagem acessível e aplicação prática, conduzida por nutricionistas RAE.",
    badge: "Até 200 pessoas",
  },
  {
    n: "03",
    title: "Bioimpedância InBody",
    text: "Cada colaborador com avaliação individual: gordura, massa muscular, hidratação e distribuição. Dois pesos iguais podem ser perfis de saúde completamente diferentes.",
    badge: "Até 50 avaliações",
  },
  {
    n: "04",
    title: "Relatório executivo",
    text: "Entregue ao RH em até 24h: IMC médio, % com risco metabólico alto, perfil coletivo e comparativo por área ou turno — formato pronto para a diretoria.",
    badge: "Em até 24h",
  },
];

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-step",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.11,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="process"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-border/40 bg-secondary/65 py-16 dark:bg-secondary/45 sm:py-20 md:py-28"
    >
      <div className="container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Como funciona
        </p>
        <h2 className="mb-4 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
          Da assinatura do contrato ao relatório para a diretoria — a RAE executa tudo.
        </h2>
        <p className="mb-12 max-w-2xl text-base text-muted-foreground md:mb-14 md:text-lg">
          O RH assina, comunica a data e recebe o relatório. A gente cuida do resto.
        </p>

        {/* Mobile / tablet: linha do tempo vertical */}
        <div className="relative lg:hidden">
          <div
            className="absolute bottom-2 left-[1.25rem] top-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/15 via-primary/55 to-primary/15 md:left-[1.5rem]"
            aria-hidden
          />
          <ol className="relative m-0 list-none p-0">
            {steps.map(({ n, title, text, badge }) => (
              <li
                key={n}
                className="process-step gsap-hidden flex gap-4 pb-10 last:pb-0 md:gap-5 md:pb-12"
              >
                <div className="relative z-[1] flex w-10 shrink-0 justify-center md:w-12">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-[10px] font-bold text-primary shadow-md ring-4 ring-background md:h-10 md:w-10 md:text-xs">
                    {n}
                  </div>
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-primary/20 bg-card/90 p-5 shadow-[0_8px_28px_-12px_hsl(var(--primary)/0.2)] ring-1 ring-primary/5 md:p-6">
                  <h3 className="mb-2 text-base font-semibold text-foreground md:text-lg">{title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-foreground/75">{text}</p>
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {badge}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: trilha horizontal + cartões */}
        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 h-1 rounded-full bg-gradient-to-r from-primary/20 via-primary/90 to-primary/20"
            aria-hidden
          />
          <ol className="relative m-0 grid list-none grid-cols-4 gap-5 p-0 xl:gap-6">
            {steps.map(({ n, title, text, badge }) => (
              <li
                key={n}
                className="process-step gsap-hidden flex flex-col items-center text-center"
              >
                <div className="relative z-[1] mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/85 text-sm font-bold tabular-nums text-primary-foreground shadow-lg shadow-primary/35 ring-4 ring-background">
                  {n}
                </div>
                <div className="w-full rounded-2xl border border-primary/20 bg-card p-6 text-left shadow-[0_10px_36px_-14px_hsl(var(--primary)/0.25)] ring-1 ring-primary/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-12px_hsl(var(--primary)/0.32)]">
                  <div className="mb-3 flex items-center gap-2 border-b border-border/80 pb-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
                    </span>
                    <h3 className="text-base font-semibold leading-snug text-foreground">{title}</h3>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-foreground/75">{text}</p>
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {badge}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
