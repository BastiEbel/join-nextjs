"use client";
import { useRouter } from "next/navigation";
import { CSSProperties, ReactNode } from "react";

type ButtonProps = {
  name?: string;
  className: string;
  href?: string;
  children: ReactNode;
  style?: CSSProperties;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mouseOver?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  className,
  disabled,
  style,
  type,
  onClick,
  mouseOver,
  mouseLeave,
  href,
  children,
}: ButtonProps) {
  const router = useRouter();

  function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) onClick(e);
    if (href && !disabled) {
      router.push(href);
    }
  }

  return (
    <button
      type={type}
      onMouseOver={mouseOver}
      onMouseLeave={mouseLeave}
      style={style}
      disabled={disabled}
      className={className}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
