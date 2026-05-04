import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

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
    <section ref={root} id="about" className="scroll-mt-20 bg-muted/40 py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Por que a RAE
            </p>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
              Estratégia e cuidado — não só um cardápio
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Acreditamos que nutrição de impacto nasce da combinação entre método, escuta e
              contexto. Por isso a RAE existe: para reprogramar a forma como pessoas e empresas se
              relacionam com alimentação e saúde.
            </p>
          </div>
          <ul className="space-y-4">
            {bullets.map((b) => (
              <li
                key={b}
                className="why-item gsap-hidden flex gap-3 rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-sm"
              >
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
