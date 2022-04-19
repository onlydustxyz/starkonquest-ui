import cn from "classnames";
import { CSSProperties } from "react";

import styles from "./ContentContainer.module.css";

export interface ContentContainerProps {
  theme?: "primary" | "secondary";
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function ContentContainer({ children, className, style, theme = "primary" }: ContentContainerProps) {
  return (
    <div
      style={style}
      className={cn(
        className,
        styles.container,
        styles[theme],
        "rounded-lg text-light-purple relative border-solid border-transparent bg-clip-padding"
      )}
    >
      {children}
    </div>
  );
}
