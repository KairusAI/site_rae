import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, HeartPulse, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Target,
    title: "Diagnóstico + relatório",
    text: "A SIPAT RAE transforma obrigação da NR-5 em diagnóstico real: dados individuais por bioimpedância InBody e relatório executivo em até 24h para o RH apresentar à diretoria.",
  },
  {
    icon: HeartPulse,
    title: "Engajamento que mede",
    text: "+62% de engajamento vs. SIPAT tradicional — colaboradores participam porque recebem valor individual, não só obrigação.",
  },
  {
    icon: CheckCircle2,
    title: "ROI que o CFO enxerga",
    text: "Sinistralidade alta pesa no plano de saúde; programas preventivos estruturados mostram ROI documentado — a SIPAT RAE é o primeiro dado real que o RH leva para reduzir esse custo.",
  },
];

export function SolutionSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
      tl.fromTo(
        ".solution-intro",
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.08, ease: "power2.out" }
      ).fromTo(
        ".solution-card",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.35"
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="solution"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-secondary/25 bg-secondary/20 py-16 dark:bg-secondary/12 sm:py-20 md:py-28"
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <div className="max-w-2xl lg:max-w-none lg:pt-1">
            <p className="solution-intro gsap-hidden mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Impacto direto
            </p>
            <h2 className="solution-intro gsap-hidden mb-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
              O problema custa caro. A prevenção paga de volta.
            </h2>
            <div className="solution-intro gsap-hidden space-y-4 text-base text-muted-foreground md:text-lg">
              <p>
                Cada colaborador doente custa muito mais que o salário dele: custo médio em torno de
                R$ 1.800/ano só em absenteísmo — e na indústria pode ultrapassar R$ 4.500. Doenças
                crônicas ligadas ao peso concentram sinistralidade e afastamentos.
              </p>
              <p>
                A RAE une nutricionistas, método e dados — da SIPAT ao programa contínuo — para sair
                do “evento obrigatório” e entrar em gestão ativa de saúde com números para a diretoria.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            {pillars.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="solution-card gsap-hidden group relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-6 shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.28)] ring-1 ring-primary/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.35)] dark:border-primary/35 dark:bg-card dark:ring-primary/20 sm:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary via-primary/80 to-primary/50"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/[0.07] blur-2xl transition-opacity group-hover:opacity-100 dark:bg-primary/15"
                  aria-hidden
                />
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-90 dark:opacity-100 ${
                    index === 0
                      ? "from-primary/[0.09] via-transparent to-accent/30"
                      : index === 1
                        ? "from-emerald-600/[0.06] via-transparent to-primary/[0.08]"
                        : "from-teal-700/[0.05] via-transparent to-accent/40"
                  }`}
                  aria-hidden
                />
                <div className="relative flex gap-4 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/20 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/75 dark:text-foreground/70">
                      {text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
