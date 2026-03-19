import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...props}
        initial={{ "--x": "100%", scale: 1 } as any}
        animate={{ "--x": "-100%" } as any}
        whileTap={{ scale: 0.97 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          },
        }}
        className={`relative rounded-xl px-6 py-2.5 font-semibold backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-white/10 border border-white/20 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)] ${className}`}
      >
        <span
          className="relative block size-full text-sm tracking-wide text-gray-900 dark:text-white"
          style={{
            maskImage:
              "linear-gradient(-75deg,rgba(0,0,0,1) calc(var(--x) + 20%),rgba(0,0,0,0.5) calc(var(--x) + 25%),rgba(0,0,0,1) calc(var(--x) + 100%))",
            WebkitMaskImage:
              "linear-gradient(-75deg,rgba(0,0,0,1) calc(var(--x) + 20%),rgba(0,0,0,0.5) calc(var(--x) + 25%),rgba(0,0,0,1) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.1)_calc(var(--x)+20%),rgba(255,255,255,0.5)_calc(var(--x)+25%),rgba(255,255,255,0.1)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    );
  },
);

ShinyButton.displayName = "ShinyButton";
