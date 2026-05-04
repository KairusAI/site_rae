import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="testimonials" className="scroll-mt-20 bg-muted/30 py-20 md:py-28">
      <div className="container">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Depoimentos
        </p>
        <h2 className="mb-10 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight md:mb-12">
          Quem confia na RAE
        </h2>
        <article className="testimonial-card gsap-hidden relative mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-lg md:p-12">
          <Quote className="absolute right-8 top-8 h-10 w-10 text-primary/20" />
          <blockquote className="relative z-[1] text-base leading-relaxed text-foreground md:text-lg">
            &ldquo;A RAE trabalha com estratégias nutricionais que geram resultados duradouros,
            visando a alimentação como principal pilar de saudabilidade na busca de um emagrecimento
            saudável e duradouro.&rdquo;
          </blockquote>
          <footer className="mt-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              CR
            </div>
            <div>
              <p className="font-semibold">Cris Rocha</p>
              <p className="text-sm text-muted-foreground">Fundadora e CEO — RAE Nutrition</p>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}
