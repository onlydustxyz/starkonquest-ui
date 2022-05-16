import cn from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "primary" | "secondary";
  children: ReactNode;
  size?: "small" | "regular";
}

export default function Button({ children, size, theme = "primary", className, ...buttonProps }: ButtonProps) {
  return (
    <button
      className={cn(
        className,
        styles[theme] ?? null,
        styles.button,
        size && styles[size],
        "cursor-pointer font-bold uppercase text-base outline-none focus:outline-none border-none"
      )}
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
