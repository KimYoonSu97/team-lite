import clsx from "clsx";
import React from "react";

const index = ({
  onClose,
  item,
  type,
  tint = true,
}: {
  onClose: () => void;
  item: React.ReactNode;
  type: "modal" | "alert" | "sideModal";
  tint?: boolean;
}) => {
  return (
    <div
      onClick={onClose}
      className={clsx(
        "fixed inset-0  z-50 flex w-full h-full ",
        type === "modal" && "items-center justify-center",
        type === "alert" && "justify-center pt-[30px]",
        type === "sideModal" && "justify-end",
        tint && "bg-black/50",
        tint === false && "bg-transparent",
      )}
    >
      <div onClick={(e) => e.stopPropagation()}>{item}</div>
    </div>
  );
};

export default index;
