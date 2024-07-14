import { ComponentProps, ReactNode } from "react";

interface InputProps extends ComponentProps<"input"> {
  className?: string;
  icon?: ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <>
      {icon}
      <input
        {...props}
        className={`bg-transparent text-lg placeholder-zinc-400 outline-none ${className}`}
      />
    </>
  );
}
