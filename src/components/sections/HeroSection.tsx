import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const rotating = [
  "longevidade corporativa",
  "metabolismo em equilíbrio",
  "adesão que dura",
  "resultados mensuráveis",
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const wordIndex = useRef(0);
  const [activeWord, setActiveWord] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
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
      className="relative min-h-[min(100svh,56rem)] overflow-hidden bg-gradient-hero pt-20 md:pt-24"
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

      <div className="container relative z-[1] grid items-center gap-8 px-4 pb-16 pt-8 sm:gap-10 sm:pb-20 sm:pt-10 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pt-6 xl:px-12">
        <motion.div style={{ y, opacity, scale }} className="max-w-xl lg:max-w-none">
          <p className="hero-word gsap-hidden mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            RAE Nutrition
          </p>
          <h1 className="hero-word gsap-hidden text-2xl font-semibold leading-[1.18] tracking-tight sm:text-4xl sm:leading-[1.12] lg:text-5xl lg:leading-[1.1] xl:text-[2.75rem] xl:leading-[1.08]">
            <span className="text-gradient">Reprogramação</span>
            <br />
            Alimentar Estratégica
          </h1>
          <div className="hero-sub gsap-hidden mt-4 min-h-[2.25rem] text-lg font-medium text-muted-foreground sm:mt-5 sm:min-h-[2.5rem] sm:text-xl">
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
          <p className="hero-word gsap-hidden mt-5 max-w-lg text-sm text-muted-foreground sm:mt-6 sm:text-base">
            Nutrição estratégica com ciência, método e acompanhamento contínuo — para pessoas e para
            organizações que querem saúde com propósito e performance.
          </p>
          <div className="hero-cta gsap-hidden mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <Button size="lg" onClick={() => scrollTo("contact")}>
              Fale conosco
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("services")}>
              Ver soluções
            </Button>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-glow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
            <div className="absolute inset-6 flex flex-col justify-end rounded-2xl bg-gradient-to-t from-background/90 to-transparent p-6">
              <p className="text-sm font-medium text-primary">Metodologia RAE</p>
              <p className="mt-2 text-base font-semibold leading-snug text-foreground sm:text-lg">
                Adesão contínua e resultados que você consegue medir no dia a dia.
              </p>
            </div>
          </motion.div>
          <motion.button
            type="button"
            aria-label="Rolar para baixo"
            className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-muted-foreground"
            onClick={() => scrollTo("problem")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
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
