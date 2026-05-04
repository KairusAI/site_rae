import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "Quem busca emagrecimento sustentável com método e acompanhamento",
  "Empresas que querem cultura de saúde e engajamento real",
  "Times que precisam de SIPAT com conteúdo estratégico em nutrição",
  "Quem já tentou dietas genéricas e quer reprogramação alimentar de verdade",
];

/** Substitua por `/use-cases.jpg` na pasta `public` — use proporção horizontal (ex. 16:9 ou 3:2). */
const IMAGE_SRC =
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&h=675&q=80";

/** Máscara: centro opaco → bordas transparentes (some o retângulo da foto). */
const IMAGE_EDGE_MASK =
  "radial-gradient(ellipse 58% 54% at 50% 50%, #000 0%, #000 18%, rgba(0,0,0,0.5) 38%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.04) 72%, transparent 88%)";

export function AudienceSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".aud-line",
        { x: 20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".aud-visual",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="use-cases" className="scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-14 xl:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Para quem é
            </p>
            <h2 className="mb-8 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl md:mb-10 md:text-4xl lg:text-[2.25rem] lg:leading-tight">
              Faz sentido para o seu cenário?
            </h2>
            <ul className="max-w-xl space-y-3 md:space-y-4">
              {lines.map((line) => (
                <li
                  key={line}
                  className="aud-line gsap-hidden rounded-2xl border border-dashed border-primary/25 bg-primary/5 px-5 py-3.5 text-sm text-foreground md:px-6 md:py-4 md:text-base"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="aud-visual gsap-hidden mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-md xl:max-w-lg">
            {/* Máscara na imagem: bordas somem (transparente) e o fundo da página aparece — sem recorte duro */}
            <div className="relative aspect-[16/10] w-full sm:aspect-[3/2] md:aspect-[16/9]">
              <img
                src={IMAGE_SRC}
                alt="Contexto de alimentação e bem-estar"
                className="absolute left-1/2 top-1/2 min-h-[114%] min-w-[114%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={675}
                style={{
                  WebkitMaskImage: IMAGE_EDGE_MASK,
                  maskImage: IMAGE_EDGE_MASK,
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
