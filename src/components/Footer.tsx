import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { RAE_LOGO_SRC } from "@/lib/branding";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".footer-col"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="border-t border-white/15 bg-foreground pt-12 text-background pb-[calc(3rem+env(safe-area-inset-bottom,0px))] shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.15)] dark:border-primary-foreground/15 dark:bg-[hsl(158_38%_11%)] dark:text-[hsl(88_38%_97%)] md:pt-14 md:pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="footer-col gsap-hidden">
            <div className="mb-4">
              <div className="inline-flex rounded-lg bg-white p-1.5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.18)] ring-1 ring-black/8 dark:bg-white dark:ring-black/10">
                <img
                  src={RAE_LOGO_SRC}
                  alt="RAE Nutrition"
                  className="h-12 w-auto max-w-[16rem] object-contain object-left sm:h-14 sm:max-w-[18rem] md:h-16 md:max-w-[20rem]"
                  width={224}
                  height={56}
                  decoding="async"
                />
              </div>
            </div>
            <p className="text-sm text-background/75 dark:text-[hsl(88_25%_82%)]">
              Nutrição estratégica corporativa com método, tecnologia e dados. São Paulo + Paraná.
            </p>
            <p className="mt-3 text-sm text-background/75 dark:text-[hsl(88_25%_82%)]">
              <a
                href="tel:+5511978603500"
                className="font-medium text-background hover:text-white hover:underline"
              >
                (11) 97860-3500
              </a>
              <span className="mx-2 text-background/35">·</span>
              <a
                href="mailto:contato@raeconsulting.com.br"
                className="text-background/90 underline-offset-2 hover:text-white hover:underline"
              >
                contato@raeconsulting.com.br
              </a>
            </p>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-background/75 dark:text-[hsl(88_25%_82%)]">
              <li>
                <a href="#services" className="transition-colors hover:text-white">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#testimonials" className="transition-colors hover:text-white">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Soluções
            </h3>
            <ul className="space-y-2 text-sm text-background/75 dark:text-[hsl(88_25%_82%)]">
              <li>RAE FOR YOU</li>
              <li>RAE For All</li>
              <li>SIPAT RAE</li>
            </ul>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background">
              Redes
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/5 text-background transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/5 text-background transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@raeconsulting.com.br"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/5 text-background transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white"
                aria-label="E-mail"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-center text-xs text-background/65 dark:text-[hsl(88_20%_70%)] md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} RAE Nutrition. Todos os direitos reservados.</p>
          <Link to="/" className="text-background/90 transition-colors hover:text-white">
            Voltar ao início
          </Link>
        </div>
      </div>
    </footer>
  );
}
