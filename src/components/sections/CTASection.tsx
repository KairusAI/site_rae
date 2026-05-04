import { type FormEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-card",
        { y: 48, autoAlpha: 0, rotateX: 8 },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section ref={root} id="contact" className="scroll-mt-20 py-20 md:py-28">
      <div className="container">
        <div
          className="cta-card gsap-hidden gpu-accelerated mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/20 p-6 shadow-glow sm:rounded-3xl md:p-8 lg:max-w-4xl"
          style={{ perspective: 1200 }}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Fale conosco
              </p>
              <h2 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl md:leading-tight lg:text-[1.65rem] xl:text-[1.85rem]">
                Pronto para reprogramar sua alimentação?
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Entre em contato. Conte um pouco sobre você ou sobre a sua empresa — retornamos com
                o próximo passo.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-6">
              {sent ? (
                <p className="py-6 text-center text-base font-medium text-primary md:text-lg">
                  Obrigado pelo contato!
                </p>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3.5">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="first" className="mb-1 block text-xs font-medium text-muted-foreground">
                        Nome
                      </label>
                      <input
                        id="first"
                        name="first"
                        required
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="last" className="mb-1 block text-xs font-medium text-muted-foreground">
                        Sobrenome
                      </label>
                      <input
                        id="last"
                        name="last"
                        required
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-xs font-medium text-muted-foreground">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-xs font-medium text-muted-foreground">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className="mb-1 block text-xs font-medium text-muted-foreground">
                      Assunto
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Escolha uma opção
                      </option>
                      <option value="for-you">RAE FOR YOU</option>
                      <option value="corporate">RAE For All (Corporativo)</option>
                      <option value="sipat">SIPAT RAE</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="msg" className="mb-1 block text-xs font-medium text-muted-foreground">
                      Mensagem
                    </label>
                    <textarea
                      id="msg"
                      name="msg"
                      rows={3}
                      required
                      placeholder="Digite sua mensagem..."
                      className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2 md:px-4 md:py-2.5"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="default">
                    Enviar
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
