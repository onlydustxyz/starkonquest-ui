import cn from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "secondary";
  children: ReactNode;
}

export default function Button({ children, theme = "primary", className, ...buttonProps }: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        styles[theme] ?? null,
        styles.button,
        "cursor-pointer font-bold uppercase text-base outline-none focus:outline-none border-none"
      )}
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
