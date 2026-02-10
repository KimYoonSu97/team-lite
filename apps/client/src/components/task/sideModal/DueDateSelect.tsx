import dayjs from "dayjs";
import React, { useRef } from "react";

const DueDateSelect = ({
  setState,
  state,
}: {
  setState: (value: string) => void;
  state: string;
}) => {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full rounded-[4px] overflow-hidden">
      <input
        type="date"
        onChange={(e) => {
          setState(e.target.value);
        }}
        ref={dateRef}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div
        onClick={() => {
          dateRef.current?.showPicker();
        }}
        className="flex-1 py-2 px-3 relative cursor-pointer hover:bg-bg-2"
      >
        {state ? (
          <p className="typo-regular typo-base text-text-1">
            {dayjs(state).format("YYYY-MM-DD")}
          </p>
        ) : (
          <p className="typo-regular typo-base text-text-5">선택</p>
        )}
      </div>
    </div>
  );
};

export default DueDateSelect;
