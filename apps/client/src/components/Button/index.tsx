import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  variant?: "primary" | "secondary" | "danger" | "gray" | "tintGray";
  size?: "small" | "medium" | "large";
}

const index = (props: ButtonProps) => {
  const { variant = "primary", size = "medium", name, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx("typo-base typo-medium text-white", {
        "bg-brand-primary": variant === "primary",
        "bg-zinc-600": variant === "secondary",
        "bg-red-600": variant === "danger",
        "bg-gray-600": variant === "gray",
        "bg-bg-2": variant === "tintGray",
        "px-8 py-3 rounded-[8px]": size === "medium",
        "px-3 py-2 rounded-[4px]": size === "small",
        "px-10 py-4 rounded-[10px]": size === "large",
      })}
    >
      <p
        className={clsx("", {
          "text-text-1": variant === "tintGray",
        })}
      >
        {name}
      </p>
    </button>
  );
};

export default index;
