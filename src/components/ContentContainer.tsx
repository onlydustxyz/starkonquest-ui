import cn from "classnames";
import { CSSProperties, forwardRef, Ref, useMemo } from "react";

import styles from "./ContentContainer.module.css";

export interface ContentContainerProps {
  theme?: "primary" | "secondary";
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

function ContentContainer(
  { children, className, style, theme = "primary" }: ContentContainerProps,
  ref: Ref<HTMLDivElement>
) {
  const paddingClass = useMemo(() => {
    if (theme === "primary") {
      return "p-8";
    }

    return "py-4 px-8";
  }, [theme]);

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        paddingClass,
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

export default forwardRef(ContentContainer);
