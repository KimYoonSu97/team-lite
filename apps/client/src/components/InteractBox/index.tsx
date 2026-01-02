import React from "react";

const index = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="transform-gpu transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg cursor-pointer rounded-[20px]">
      {children}
    </div>
  );
};

export default index;
