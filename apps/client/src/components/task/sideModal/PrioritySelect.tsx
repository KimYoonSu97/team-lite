import React, { useEffect, useState } from "react";
import { PRIORITY_LIST } from "../../../constants";
import SelectInput from "../../SelectInput/SelectInput";
import type { PriorityItem } from "../../modalContent/Task";

const PrioritySelect = ({
  setState,
  state,
}: {
  setState: (value: PriorityItem) => void;
  state: string;
}) => {
  const [selectedPriority, setSelectedPriority] = useState<PriorityItem | null>(
    null,
  );

  useEffect(() => {
    if (state) {
      setSelectedPriority(PRIORITY_LIST.find((item) => item.value === state)!);
    }
  }, [state]);

  return (
    <SelectInput<PriorityItem>
      mode="single"
      items={PRIORITY_LIST}
      value={selectedPriority}
      onChange={(value) => {
        setSelectedPriority(value as PriorityItem);
        setState(value as PriorityItem);
      }}
      getItemKey={(item) => item.value}
      renderSelectedItem={(item) => (
        <div className="flex gap-2 items-center">
          <p className="typo-regular typo-base text-text-1">{item.label}</p>
        </div>
      )}
      renderListItem={(item) => (
        <div className="cursor-pointer flex gap-2 items-center p-2 hover:bg-bg-2 rounded-[4px]">
          <p className="typo-regular typo-base text-text-1 shrink-0">
            {item.label}
          </p>
          <p className="typo-regular typo-sm text-text-5 flex-1 truncate">
            {item.description}
          </p>
        </div>
      )}
      emptyMessage="우선순위가 없습니다."
      placeholder="선택"
    />
  );
};
export default PrioritySelect;
