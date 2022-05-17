import cn from "classnames";
import styles from "./Loader.module.css";

export interface LoaderProps {
  message?: string;
}

export default function Loader({ message }: LoaderProps) {
  return (
    <div className="absolute top-0 w-screen h-screen flex flex-row items-center justify-center">
      <div className="relative h-[350px] w-[350px]">
        <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center">
          <span className="text-white text-[36px] uppercase text-center mx-8">{message ?? "Loading"}</span>
        </div>
        <div className={cn(styles.loader, "h-[350px] w-[350px]")}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
