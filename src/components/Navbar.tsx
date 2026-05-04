import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RAE_LOGO_SRC } from "@/lib/branding";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Contato", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full border-b pt-[env(safe-area-inset-top,0px)] transition-colors duration-300",
          scrolled
            ? "border-border/80 bg-background/90 backdrop-blur-md shadow-sm"
            : "border-transparent bg-background/50 backdrop-blur-sm"
        )}
      >
        <div className="container flex min-h-[3.75rem] items-center justify-between py-1 md:min-h-[4rem]">
          <Link
            to="/"
            className="flex min-h-11 min-w-0 items-center py-0.5 pr-2 touch-manipulation md:min-h-12"
          >
            <img
              src={RAE_LOGO_SRC}
              alt="RAE Nutrition"
              className="h-10 w-auto max-h-11 max-w-[min(16rem,58vw)] shrink-0 object-contain object-left sm:h-11 sm:max-h-12 sm:max-w-[18rem] md:h-12 md:max-w-[20rem]"
              width={512}
              height={512}
              decoding="async"
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </button>
            ))}
            <Button size="sm" onClick={() => scrollTo("#contact")}>
              Fale conosco
            </Button>
          </nav>

          <button
            type="button"
            className="flex h-11 min-h-[44px] w-11 min-w-[44px] touch-manipulation items-center justify-center rounded-lg border border-border active:bg-muted md:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-md md:hidden"
            style={{
              paddingTop: "max(4rem, calc(3.75rem + env(safe-area-inset-top, 0px)))",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="container flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-4"
            >
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  className="min-h-[48px] touch-manipulation rounded-xl px-4 py-3 text-left text-base font-medium text-foreground active:bg-muted"
                  onClick={() => scrollTo(l.href)}
                >
                  {l.label}
                </motion.button>
              ))}
              <Button className="mt-4 min-h-12 w-full touch-manipulation" onClick={() => scrollTo("#contact")}>
                Fale conosco
              </Button>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
