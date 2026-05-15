import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RAE_LOGO_SRC, INBODY_SCALE_SRC } from "@/lib/branding";

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
      className="relative min-h-0 overflow-x-hidden overflow-y-visible bg-gradient-hero pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-2 sm:pt-[calc(5rem+env(safe-area-inset-top,0px))] md:min-h-[min(100dvh,56rem)] md:pt-24 md:pb-0"
    >
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <div
          className="hero-grid-line absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-primary/[0.14] via-secondary/[0.08] to-transparent sm:from-primary/[0.22] sm:via-secondary/[0.14] md:from-primary/[0.28] md:via-secondary/[0.18] lg:w-[58%] lg:from-primary/[0.42] lg:via-accent/[0.28] lg:to-transparent"
        />
        <div className="absolute -right-16 top-[18%] h-64 w-64 rounded-full bg-primary/18 blur-3xl sm:-right-24 sm:top-1/4 sm:h-72 sm:w-72 sm:bg-primary/22 md:h-80 md:w-80 lg:-right-32 lg:h-[28rem] lg:w-[28rem] lg:bg-primary/35" />
        <div className="absolute -left-20 bottom-[15%] h-64 w-64 rounded-full bg-accent/30 blur-3xl sm:-left-24 sm:bottom-1/4 sm:h-72 sm:w-72 sm:bg-accent/38 md:bg-accent/45" />
      </div>

      <div className="container relative z-[1] grid grid-cols-1 items-start gap-5 px-4 pb-10 pt-6 sm:gap-7 sm:pb-14 sm:pt-8 md:gap-8 md:pb-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.28fr)] lg:items-center lg:gap-10 lg:px-10 lg:pb-20 lg:pt-6 xl:gap-12 xl:px-12">
        <motion.div
          style={{ y, opacity, scale }}
          className="relative flex max-w-xl flex-col gap-1.5 sm:max-w-2xl sm:gap-2 lg:max-w-none"
        >
          <img
            src={RAE_LOGO_SRC}
            alt="RAE Nutrition"
            className="hero-word gsap-hidden mx-auto mb-0 h-28 w-auto max-w-[min(42rem,96vw)] object-contain object-center max-h-[min(24rem,42vh)] sm:h-36 sm:max-h-[min(28rem,48vh)] md:h-44 md:max-w-[min(48rem,98vw)] md:max-h-[min(32rem,48vh)] lg:mx-0 lg:object-left lg:h-72 lg:max-w-[62rem] lg:max-h-[min(42rem,56vh)] xl:h-80 xl:max-w-[68rem] xl:max-h-[min(48rem,52vh)] 2xl:h-[22rem] 2xl:max-w-[72rem] 2xl:max-h-[min(52rem,54vh)]"
            width={512}
            height={512}
            decoding="async"
          />
          <div className="flex flex-col gap-0.5">
            <h1 className="hero-word gsap-hidden max-w-3xl text-xl font-semibold leading-[1.12] tracking-tight sm:text-3xl sm:leading-[1.08] lg:text-4xl lg:leading-[1.05] xl:text-[2.4rem] xl:leading-[1.04]">
              <span className="text-gradient">Paga por SIPAT todo ano.</span>
              <br />
              <span className="text-foreground">Quantos dados ela recebe em troca?</span>
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
          <div className="hero-word gsap-hidden -mt-1 max-w-2xl sm:-mt-1.5">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              A SIPAT RAE transforma uma obrigação da NR-5 em diagnóstico real de saúde da equipe,
              com dados individuais por bioimpedância InBody, relatório executivo em 24h e ROI que o
              RH apresenta para a diretoria.
            </p>
          </div>
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

        <div className="relative hidden min-h-0 w-full max-w-none flex-col items-center justify-center self-center overflow-x-clip overflow-y-visible lg:mt-0 lg:flex lg:items-end lg:justify-end lg:self-auto lg:overflow-visible lg:-mr-3 lg:pl-0 lg:pr-0 xl:-mr-6 2xl:-mr-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-[min(100%,min(98vw,36rem))] items-center justify-center sm:max-w-[min(100%,min(98vw,40rem))] md:max-w-[min(100%,min(98vw,46rem))] lg:max-w-none lg:justify-end"
          >
            <div className="flex min-h-[26rem] w-full items-center justify-center overflow-visible sm:min-h-[30rem] md:min-h-[36rem] lg:min-h-[min(78vh,44rem)] lg:justify-end lg:perspective-[1400px] lg:[perspective-origin:88%_42%] xl:min-h-[min(82vh,52rem)] 2xl:min-h-[min(84vh,58rem)]">
              <div className="translate-x-0 sm:translate-x-[2%] md:translate-x-[6%] lg:translate-x-[44%] xl:translate-x-[56%] 2xl:translate-x-[68%]">
                <div className="origin-center scale-[1.32] rotate-x-0 rotate-y-0 sm:scale-[1.44] sm:rotate-x-[2deg] sm:rotate-y-[-3deg] md:scale-[1.56] md:rotate-x-[3deg] md:rotate-y-[-5deg] lg:origin-right lg:scale-[2.02] lg:rotate-x-[6deg] lg:rotate-y-[-11deg] [transform-style:preserve-3d] xl:scale-[2.24] xl:rotate-x-[7deg] xl:rotate-y-[-12deg] 2xl:scale-[2.42] 2xl:rotate-x-[7deg] 2xl:rotate-y-[-13deg]">
                  <img
                    src={INBODY_SCALE_SRC}
                    alt="Balança de bioimpedância InBody"
                    className="hero-word gsap-hidden h-auto w-full max-w-full object-contain drop-shadow-[0_18px_40px_-10px_rgba(0,0,0,0.22)] max-h-[min(88dvh,min(52rem,98vw))] sm:max-h-[min(90dvh,min(56rem,98vw))] md:max-h-[min(92dvh,min(60rem,98vw))] lg:max-h-none lg:w-full lg:drop-shadow-[0_28px_50px_-12px_rgba(0,0,0,0.22)]"
                    width={900}
                    height={900}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="col-span-full flex w-full justify-center pt-4 sm:pt-6 lg:pt-4">
          <motion.button
            type="button"
            aria-label="Rolar para baixo"
            className="flex flex-col items-center gap-2 text-xs font-medium text-muted-foreground"
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
