import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default:
        "bg-gradient-to-r from-[#a07820] to-[#c9a84c] text-[hsl(222,47%,5%)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,0.45)]",
      outline:
        "border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--card)/0.6)] text-[hsl(var(--foreground)/0.8)] backdrop-blur hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))]",
      ghost:
        "text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card)/0.5)]",
    };

    const sizes = {
      default: "h-10 px-5 py-2 text-sm rounded-lg",
      sm: "h-8 px-4 py-1.5 text-xs rounded-md",
      lg: "h-12 px-8 py-3 text-base rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
