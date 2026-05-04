import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram, Linkedin, Mail } from "lucide-react";

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
    <footer ref={root} className="border-t border-border bg-card py-12 md:py-14">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="footer-col gsap-hidden">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
                R
              </span>
              RAE Nutrition
            </div>
            <p className="text-sm text-muted-foreground">
              Soluções nutricionais estratégicas com a metodologia de Reprogramação Alimentar
              Estratégica — para você e para sua empresa.
            </p>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="hover:text-primary">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Soluções
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>RAE FOR YOU</li>
              <li>RAE For All</li>
              <li>SIPAT RAE</li>
            </ul>
          </div>
          <div className="footer-col gsap-hidden">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Redes
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@raenutrition.com.br"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="E-mail"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} RAE Nutrition. Todos os direitos reservados.</p>
          <Link to="/" className="hover:text-primary">
            Voltar ao início
          </Link>
        </div>
      </div>
    </footer>
  );
}
