import clsx from "clsx";
import React from "react";

const InputRow = ({
  title,
  children,
  multiLine = false,
}: {
  title: string;
  children: React.ReactNode;
  multiLine?: boolean;
}) => {
  return (
    <div className={clsx("flex gap-5 ", multiLine ? "" : "items-center")}>
      <p
        className={clsx(
          "typo-regular typo-base text-text-3 shrink-0 min-w-[44px]",
          multiLine ? "pt-2" : "",
        )}
      >
        {title}
      </p>
      {children}
    </div>
  );
};

export default InputRow;
