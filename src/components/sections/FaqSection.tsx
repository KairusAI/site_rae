import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP =
  "https://wa.me/5511978603500?text=Ol%C3%A1%2C%20vim%20do%20site%20RAE%20Nutrition%20e%20tenho%20uma%20d%C3%BAvida.";

const faqs = [
  {
    q: "Já temos fornecedor de SIPAT. Por que a RAE?",
    a: (
      <>
        Você não precisa trocar. Pode usar os dois. O que a RAE entrega é o que nenhum fornecedor
        tradicional de SIPAT oferece:{" "}
        <strong className="font-semibold text-foreground">diagnóstico individual por bioimpedância</strong>{" "}
        e relatório coletivo de saudabilidade com dado real para a diretoria. Muitos clientes
        contratam a RAE para o componente de nutrição e dados, ao lado do fornecedor habitual de
        segurança do trabalho.
      </>
    ),
  },
  {
    q: "Nossa SIPAT é em 3 semanas. Dá tempo?",
    a: (
      <>
        Depende da nossa agenda.{" "}
        <strong className="font-semibold text-foreground">
          Atendemos pedidos com menos de 2 semanas de antecedência
        </strong>{" "}
        quando há disponibilidade. Entre em contato agora com a data: verificamos imediatamente.
        Não adie por medo de prazo.
      </>
    ),
  },
  {
    q: "A NR-5 aceita nutrição como tema da SIPAT?",
    a: (
      <>
        Sim. A NR-5 não especifica o tema — exige que o conteúdo seja relevante para saúde e
        bem-estar dos trabalhadores.{" "}
        <strong className="font-semibold text-foreground">Nutrição se enquadra plenamente.</strong>{" "}
        Podemos confirmar com o seu SESMT antes do evento se necessário.
      </>
    ),
  },
  {
    q: "Como apresento para a liderança aprovar?",
    a: (
      <>
        A gente facilita isso.{" "}
        <strong className="font-semibold text-foreground">
          Enviamos um material executivo de 1 página
        </strong>{" "}
        com o que será entregue, resultados esperados e comparativo com SIPAT tradicional — pronto
        para encaminhar para quem precisar aprovar internamente.
      </>
    ),
  },
  {
    q: "O InBody é diferente de uma pesagem comum?",
    a: (
      <>
        <strong className="font-semibold text-foreground">
          A balança mede peso. O InBody mede composição corporal
        </strong>
        : percentual de gordura, massa muscular, hidratação e distribuição. Dois colaboradores com o
        mesmo peso podem ter perfis de saúde completamente diferentes. O InBody revela isso com
        precisão clínica em menos de 2 minutos.
      </>
    ),
  },
  {
    q: "Precisamos de mais de 50 avaliações. É possível?",
    a: (
      <>
        Sim. Para empresas que queiram avaliação para toda a equipe,{" "}
        <strong className="font-semibold text-foreground">
          agendamos múltiplas diárias ou ampliamos a equipe
        </strong>{" "}
        de acordo com o volume. O custo por colaborador adicional é mais acessível em contratações
        maiores. Informe o número total no contato e calculamos o melhor formato.
      </>
    ),
  },
];

export function FaqSection() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-head",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".faq-item",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="faq"
      className="scroll-mt-[calc(5rem+env(safe-area-inset-top,0px))] border-t border-secondary/20 bg-gradient-to-b from-secondary/12 via-muted/35 to-background py-16 dark:from-secondary/10 dark:via-muted/20 dark:to-background sm:py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <p className="faq-head gsap-hidden mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="faq-head gsap-hidden mb-4 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.25rem] lg:leading-tight">
              O que o RH pergunta antes de aprovar.
            </h2>
            <p className="faq-head gsap-hidden text-base text-muted-foreground md:text-lg">
              Respondemos as objeções mais comuns. Se a sua não estiver aqui, fale direto com a gente.
            </p>
          </div>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-head gsap-hidden inline-flex items-center gap-3 rounded-2xl border border-primary/25 bg-card px-5 py-4 text-left shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <MessageCircle className="h-8 w-8 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                WhatsApp
              </span>
              <span className="text-base font-semibold text-foreground">(11) 97860-3500</span>
            </span>
          </a>
        </div>

        <div className="mx-auto max-w-3xl space-y-2">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="faq-item gsap-hidden overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground touch-manipulation sm:px-6 sm:py-5 sm:text-base"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="border-t border-border/80 px-5 pb-4 pt-0 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-5 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
