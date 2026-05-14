import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Depois do programa corporativo, o time comentou que finalmente entendeu nutrição de um jeito prático. A adesão ao que a RAE propõe foi bem maior do que em iniciativas anteriores.",
    initials: "LF",
    name: "Luciana Freitas",
    role: "Diretora de RH",
    company: "Indústria de alimentos",
  },
  {
    quote:
      "Acompanhei pelo app e nas consultas: em seis meses não era só número na balança, era rotina e disposição. A metodologia da RAE fez diferença porque respeita a minha rotina de verdade.",
    initials: "RM",
    name: "Ricardo Mendes",
    role: "RAE FOR YOU",
    company: "Profissional autônomo",
  },
  {
    quote:
      "Na SIPAT deste ano trouxemos a RAE e saímos com diagnóstico e orientação que as pessoas realmente usaram depois. Foi o contrário de palestra genérica — teve estratégia e acompanhamento.",
    initials: "PS",
    name: "Paula Santana",
    role: "Coordenadora de SST",
    company: "Logística",
  },
];

export function TestimonialsSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 36, autoAlpha: 0, scale: 0.98 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="testimonials"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-secondary/25 bg-secondary/12 py-16 dark:bg-secondary/12 sm:py-20 md:py-28"
    >
      <div className="container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Depoimentos
        </p>
        <h2 className="mb-10 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl md:mb-12 md:text-4xl lg:text-[2.25rem] lg:leading-tight">
          Quem confia na RAE
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map(({ quote, initials, name, role, company }) => (
            <article
              key={name}
              className="testimonial-card gsap-hidden relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-md md:p-8"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15 md:right-6 md:top-6" />
              <blockquote className="relative z-[1] flex-1 text-sm leading-relaxed text-foreground md:text-base">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-border/80 pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground md:h-12 md:w-12 md:text-sm">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground md:text-sm">
                    {role}
                    {company ? ` · ${company}` : ""}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
