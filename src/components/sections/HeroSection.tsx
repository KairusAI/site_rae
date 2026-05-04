import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RAE_LOGO_SRC } from "@/lib/branding";

const rotating = [
  "longevidade corporativa",
  "metabolismo em equilíbrio",
  "adesão que dura",
  "resultados mensuráveis",
];

const heroStats = [
  { figure: "+62%", label: "Engajamento vs. SIPAT tradicional" },
  { figure: "R$ 1,8k", label: "Absenteísmo médio por colaborador/ano" },
  { figure: "24h", label: "Para o RH receber o relatório" },
] as const;

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordIndex = useRef(0);
  const [activeWord, setActiveWord] = useState(0);
  const [parallaxRange, setParallaxRange] = useState<[number, number]>([0, 120]);

  useEffect(() => {
    const reduce = () => {
      const narrow = window.matchMedia("(max-width: 1023px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) setParallaxRange([0, 0]);
      else if (narrow) setParallaxRange([0, 40]);
      else setParallaxRange([0, 120]);
    };
    reduce();
    const mqN = window.matchMedia("(max-width: 1023px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqN.addEventListener("change", reduce);
    mqR.addEventListener("change", reduce);
    return () => {
      mqN.removeEventListener("change", reduce);
      mqR.removeEventListener("change", reduce);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallaxRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-grid-line",
        { opacity: 0.15 },
        { opacity: 0.35, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 }
      );
      gsap.fromTo(
        ".hero-word",
        { filter: "blur(8px)", y: 24, autoAlpha: 0 },
        {
          filter: "blur(0px)",
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );
      gsap.fromTo(
        ".hero-sub",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut", delay: 0.35 }
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: "power2.out", delay: 0.55 }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const id = window.setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % rotating.length;
      setActiveWord(wordIndex.current);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[min(100dvh,56rem)] overflow-hidden bg-gradient-hero pt-[calc(5rem+env(safe-area-inset-top,0px))] md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="hero-grid-line absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="container relative z-[1] grid items-center gap-6 px-4 pb-16 pt-8 sm:gap-8 sm:pb-20 sm:pt-10 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:pt-6 xl:px-12">
        <motion.div style={{ y, opacity, scale }} className="flex max-w-xl flex-col gap-1.5 sm:gap-2 lg:max-w-none">
          <img
            src={RAE_LOGO_SRC}
            alt="RAE Nutrition"
            className="hero-word gsap-hidden mb-0 h-32 w-auto max-w-[min(42rem,98vw)] object-contain object-left max-h-[min(28rem,52vh)] sm:h-44 sm:max-w-[min(48rem,98vw)] sm:max-h-[min(32rem,48vh)] md:h-56 md:max-w-[56rem] md:max-h-[min(36rem,52vh)] lg:h-72 lg:max-w-[62rem] lg:max-h-[min(42rem,56vh)] xl:h-80 xl:max-w-[68rem] xl:max-h-[min(48rem,52vh)] 2xl:h-[22rem] 2xl:max-w-[72rem] 2xl:max-h-[min(52rem,54vh)]"
            width={512}
            height={512}
            decoding="async"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="hero-word gsap-hidden text-2xl font-semibold leading-[1.1] tracking-tight sm:text-4xl sm:leading-[1.06] lg:text-5xl lg:leading-[1.04] xl:text-[2.75rem] xl:leading-[1.03]">
              <span className="text-gradient">Reprogramação</span>
              <br />
              Alimentar Estratégica
            </h1>
            <div className="hero-sub gsap-hidden min-h-[1.75rem] text-lg font-medium leading-tight text-muted-foreground sm:min-h-[1.9rem] sm:text-xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotating[activeWord]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block capitalize"
                >
                  {rotating[activeWord]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <p className="hero-word gsap-hidden -mt-1 max-w-lg text-sm leading-snug text-muted-foreground sm:-mt-1.5 sm:text-base">
            Nutrição estratégica com ciência, método e acompanhamento contínuo — para pessoas e para
            organizações que querem saúde com propósito e performance.
          </p>
          <div className="hero-cta gsap-hidden flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button
              size="lg"
              className="min-h-12 w-full touch-manipulation sm:w-auto"
              onClick={() => scrollTo("contact")}
            >
              Fale conosco
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-12 w-full touch-manipulation sm:w-auto"
              onClick={() => scrollTo("services")}
            >
              Ver soluções
            </Button>
          </div>
        </motion.div>

        <div className="relative mx-auto flex w-full max-w-lg flex-col items-center lg:max-w-xl xl:max-w-2xl">
          <div className="mx-auto flex w-full max-w-xl flex-col gap-10 sm:gap-11 md:gap-12 lg:ml-auto lg:mr-0 lg:max-w-none lg:pl-2">
            <div className="space-y-3">
              <div className="h-1 w-14 rounded-full bg-gradient-to-r from-primary to-primary/40" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary sm:text-sm">
                Metodologia RAE
              </p>
            </div>
            <div className="flex flex-col gap-10 sm:gap-12 md:gap-14">
              {heroStats.map(({ figure, label }, index) => (
                <div
                  key={label}
                  className="group relative min-w-0 border-l-[3px] border-primary/35 pl-6 transition-colors duration-300 hover:border-primary/55 sm:pl-7 md:pl-8"
                >
                  <span className="mb-2 block font-mono text-[11px] font-semibold tabular-nums tracking-[0.2em] text-primary/60 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[2.35rem] font-bold tabular-nums leading-[0.95] tracking-tight text-primary sm:text-[2.85rem] md:text-[3.35rem] lg:text-[3.65rem] xl:text-[3.85rem]">
                    {figure}
                  </p>
                  <p className="mt-3 max-w-[22rem] text-base font-medium leading-relaxed text-foreground/80 sm:max-w-[26rem] sm:text-lg md:text-xl md:leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.button
            type="button"
            aria-label="Rolar para baixo"
            className="mt-8 flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground"
            onClick={() => scrollTo("problem")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Scroll
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
