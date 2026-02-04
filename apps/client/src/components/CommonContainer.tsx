import React from "react";

/**
 * 공통 컨테이너
 *
 * 팀헤더 아래에 위치하는 컨테이너
 *
 * 최대넓이 900px
 */

const CommonContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center px-8">
      <div className="max-w-[900px] flex-1 ">{children}</div>
    </div>
  );
};

export default CommonContainer;
