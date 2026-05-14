import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building2, Leaf, ShieldCheck } from "lucide-react";
import { LiquidGlass } from "@/components/LiquidGlass";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Leaf,
    title: "RAE FOR YOU",
    badges: ["App", "Presencial", "Personalizado"],
    description:
      "Metodologia exclusiva de reprogramação do metabolismo basal, com emagrecimento sustentável e acompanhamento contínuo. Escolha entre o app com consultas periódicas ou atendimento presencial ainda mais personalizado.",
  },
  {
    icon: Building2,
    title: "RAE For All (Corporativo)",
    badges: ["Cultura", "Engajamento", "Diagnóstico"],
    description:
      "Nutrição estratégica como pilar da cultura corporativa — saúde, bem-estar e performance dos colaboradores. Mais do que palestras: experiência prática que conecta educação nutricional, engajamento e diagnóstico de saúde real.",
  },
  {
    icon: ShieldCheck,
    title: "SIPAT RAE",
    badges: ["NR-5", "InBody", "Relatório 24h"],
    description:
      "Transforme a obrigação da NR-5 em diagnóstico real: palestra adaptada ao seu setor, bioimpedância InBody individual e relatório executivo de saudabilidade em até 24h — com dados que o RH apresenta à diretoria e engajamento médio +62% vs. SIPAT tradicional.",
  },
];

export function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-head",
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
        ".service-card",
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 70%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-secondary/20 bg-gradient-to-b from-background via-secondary/10 to-background py-16 dark:via-secondary/10 sm:py-20 md:py-28"
    >
      <div className="container">
        <p className="services-head gsap-hidden mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Soluções para você e para sua empresa
        </p>
        <h2 className="services-head gsap-hidden mb-5 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
          O que fazemos
        </h2>
        <p className="services-head gsap-hidden mb-12 max-w-2xl text-base text-muted-foreground md:mb-14 md:text-lg">
          Três frentes para levar a Reprogramação Alimentar Estratégica ao indivíduo, ao time e aos
          momentos de prevenção na empresa.
        </p>
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, badges, description }) => (
            <LiquidGlass
              key={title}
              className="service-card gsap-hidden group flex h-full flex-col p-6 sm:p-8 dark:bg-white/[0.04]"
              whileHover={fineHover ? { y: -4 } : undefined}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight sm:text-xl">
                {title}
                <ArrowRight className="h-5 w-5 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </LiquidGlass>
          ))}
        </div>
      </div>
    </section>
  );
}
