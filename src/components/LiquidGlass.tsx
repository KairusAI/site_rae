import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LiquidGlassProps = Omit<HTMLMotionProps<"div">, "children"> & {
  className?: string;
  children?: ReactNode;
};

export function LiquidGlass({ className, children, ...props }: LiquidGlassProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.5) 0%, transparent 45%, rgba(255,255,255,0.08) 100%)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
