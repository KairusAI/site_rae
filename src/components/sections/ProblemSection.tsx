import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, FileWarning, Scale } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icon: FileWarning,
    title: "Cumpre a lei, sem dado",
    text: "A SIPAT tradicional entrega certificado, mas o RH gasta orçamento e a empresa segue sem saber o risco real da equipe — palestra genérica e nenhum indicador para a liderança.",
  },
  {
    icon: BarChart3,
    title: "Risco invisível",
    text: "Cerca de 40% dos colaboradores têm excesso de peso. Sem diagnóstico, é difícil agir: sinistralidade alta e reajuste do plano de saúde acima de 20% ao ano afetam direto o CFO.",
  },
  {
    icon: Scale,
    title: "O problema não é falta de vontade",
    text: "Doenças crônicas ligadas ao peso são a principal causa de afastamentos prolongados. O gargalo costuma ser falta de dado acionável — não falta de interesse do time.",
  },
];

export function ProblemSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".problem-head",
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".problem-card",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
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
      id="problem"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-secondary/25 bg-secondary/15 py-16 dark:bg-secondary/10 sm:py-20 md:py-28"
    >
      <div className="container">
        <p className="problem-head gsap-hidden mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Por que a SIPAT atual costuma falhar
        </p>
        <h2 className="problem-head gsap-hidden mb-4 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
          A SIPAT tradicional cumpre a lei. Mas não gera nenhum dado.
        </h2>
        <p className="problem-head gsap-hidden mb-12 max-w-2xl text-base font-medium text-foreground md:mb-14 md:text-lg">
          40% da sua equipe tem excesso de peso. Sem diagnóstico, você não sabe quais são.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }, index) => (
            <article
              key={title}
              className="problem-card gsap-hidden group relative overflow-hidden rounded-2xl border border-primary/25 bg-card p-6 shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.28)] ring-1 ring-primary/10 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_hsl(var(--primary)/0.35)] dark:border-primary/35 dark:bg-card dark:ring-primary/20 sm:p-8"
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
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground/75 dark:text-foreground/70">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
