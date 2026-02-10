import type { IUser } from "@teamlite/types";
import React, { useEffect, useState } from "react";
import SelectInput from "../../SelectInput/SelectInput";

const AssigneeSelect = ({
  memberList,
  setState,
  state,
}: {
  memberList: IUser[];
  setState: (user: IUser) => void;
  state: string;
}) => {
  const [selectedMember, setSelectedMember] = useState<IUser[]>([]);
  useEffect(() => {
    if (state) {
      setSelectedMember([memberList.find((member) => member.id === state)!]);
    }
  }, [state]);
  return (
    <SelectInput<IUser>
      mode="single"
      items={memberList}
      value={selectedMember}
      onChange={(value) => {
        setState(value as IUser);
      }}
      getItemKey={(member) => member.id}
      renderSelectedItem={(member, onRemove) => (
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-[4px] overflow-hidden">
            <img src={member.profileImage!} alt={member.nickname} />
          </div>
          <p className="typo-medium typo-sm text-text-1">{member.nickname}</p>
        </div>
      )}
      renderListItem={(member) => (
        <div className="cursor-pointer flex gap-2 items-center p-2 hover:bg-bg-2 rounded-[4px]">
          <div className="w-6 h-6 rounded-[4px] overflow-hidden">
            <img src={member.profileImage!} alt={member.nickname} />
          </div>
          <p className="typo-medium typo-sm text-text-1">{member.nickname}</p>
          <p className="typo-regular typo-sm text-text-4">{member.email}</p>
        </div>
      )}
      emptyMessage="팀원이 없습니다."
      placeholder="선택"
    />
  );
};
export default AssigneeSelect;
