import cn from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({ children, theme = "primary", className, ...buttonProps }: ButtonProps) {
  const themeClasses =
    theme === "primary"
      ? "bg-primary-600 hover:bg-primary-500 disabled:bg-primary-200"
      : "bg-secondary-600 hover:bg-secondary-500 disabled:bg-secondary-200";
  return (
    <button
      className={cn(
        className,
        themeClasses,
        "py-2 px-4 cursor-pointer disabled:cursor-auto text-white text-xl font-bold uppercase text-base outline-none focus:outline-none border-none rounded"
      )}
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
