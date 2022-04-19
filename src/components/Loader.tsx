import styles from "./Loader.module.css";

export interface LoaderProps {
  message?: string;
}

export default function Loader({ message }: LoaderProps) {
  return (
    <div className="relative">
      <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center">
        <span className="text-white text-[36px] uppercase text-center mx-8">{message ?? "Loading"}</span>
      </div>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
