import React, { useEffect, useState } from "react";
import { TASK_STATUS_LIST } from "../../../constants";
import type { SelectItem } from "../../modalContent/Task";
import SelectInput from "../../SelectInput/SelectInput";
import StatusBadge from "../StatusBadge/StatusBadge";

const StatusSelect = ({
  setState,
  status,
}: {
  setState: (status: SelectItem) => void;
  status: string;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<SelectItem | null>(null);

  useEffect(() => {
    if (status) {
      setSelectedStatus(
        TASK_STATUS_LIST.find((item) => item.value === status)!,
      );
    }
  }, [status]);

  return (
    <SelectInput<SelectItem>
      mode="single"
      items={TASK_STATUS_LIST}
      value={selectedStatus}
      onChange={(value) => {
        setSelectedStatus(value as SelectItem);
        setState(value as SelectItem);
      }}
      getItemKey={(item) => item.value}
      renderSelectedItem={(item) => (
        <div className="flex gap-2 items-center">
          <StatusBadge status={item.value} />
        </div>
      )}
      renderListItem={(item) => <StatusBadge status={item.value} />}
      emptyMessage="상태가 없습니다."
      placeholder="선택"
      dropdownClassName="flex gap-2"
    />
  );
};

export default StatusSelect;
