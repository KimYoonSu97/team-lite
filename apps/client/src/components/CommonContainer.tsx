import React from "react";

const CommonContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center px-8">
      <div className="max-w-[900px] flex-1 ">{children}</div>
    </div>
  );
};

export default CommonContainer;
