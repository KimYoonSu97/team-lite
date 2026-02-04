import React, { useState } from "react";
import clsx from "clsx";

export interface SelectInputProps<T> {
  /** 선택 모드: 'single' (단일 선택) 또는 'multiple' (다중 선택) */
  mode?: "single" | "multiple";

  /** 선택 가능한 아이템 리스트 */
  items: T[];

  /** 현재 선택된 아이템(들) */
  value: T | T[] | null;

  /** 선택 변경 핸들러 */
  onChange: (value: T | T[] | null) => void;

  /** 아이템의 고유 키를 추출하는 함수 */
  getItemKey: (item: T) => string;

  /** 선택된 아이템을 렌더링하는 함수 */
  renderSelectedItem: (item: T, onRemove?: () => void) => React.ReactNode;

  /** 드롭다운 리스트 아이템을 렌더링하는 함수 */
  renderListItem: (item: T, onClick: () => void) => React.ReactNode;

  /** 아이템이 없을 때 표시할 메시지 */
  emptyMessage?: string;

  /** 선택된 아이템이 없을 때 표시할 플레이스홀더 */
  placeholder?: string;

  /** 선택된 아이템을 필터링할 함수 (옵션) */
  filterSelected?: (item: T, selected: T[]) => boolean;

  /** 추가 CSS 클래스 */
  className?: string;

  /** 드롭다운 리스트의 추가 CSS 클래스 */
  dropdownClassName?: string;
}

export function SelectInput<T>({
  mode = "multiple",
  items,
  value,
  onChange,
  getItemKey,
  renderSelectedItem,
  renderListItem,
  emptyMessage = "항목이 없습니다.",
  placeholder = "선택",
  filterSelected,
  className,
  dropdownClassName,
}: SelectInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // 선택된 아이템을 배열로 정규화
  const selectedItems = Array.isArray(value) ? value : value ? [value] : [];

  // 드롭다운에 표시할 아이템 필터링
  const availableItems = items.filter((item) => {
    if (filterSelected) {
      return filterSelected(item, selectedItems);
    }
    // 기본: 이미 선택된 아이템은 제외
    return !selectedItems.some(
      (selected) => getItemKey(selected) === getItemKey(item),
    );
  });

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: T) => {
    if (mode === "single") {
      onChange(item);
      setIsOpen(false);
    } else {
      onChange([...selectedItems, item]);
    }
  };

  const handleRemove = (item: T) => {
    if (mode === "single") {
      onChange(null);
    } else {
      const newSelected = selectedItems.filter(
        (selected) => getItemKey(selected) !== getItemKey(item),
      );
      onChange(newSelected.length > 0 ? newSelected : null);
    }
  };

  return (
    <div
      className={clsx(
        "flex-1 py-2 px-3 relative cursor-pointer hover:bg-bg-2",
        isOpen && "rounded-t-[4px] border border-line-3 bg-bg-2",
        !isOpen && "rounded-[4px]",
        className,
      )}
      onClick={toggleOpen}
    >
      {/* 선택된 아이템 표시 영역 */}
      <div>
        {selectedItems.length > 0 ? (
          <div className={clsx(mode === "multiple" && "flex flex-col gap-1")}>
            {mode === "single"
              ? renderSelectedItem(selectedItems[0], () =>
                  handleRemove(selectedItems[0]),
                )
              : selectedItems.map((item) => (
                  <div key={getItemKey(item)}>
                    {renderSelectedItem(
                      item,
                      isOpen ? () => handleRemove(item) : undefined,
                    )}
                  </div>
                ))}
          </div>
        ) : (
          <p className="text-text-5">{placeholder}</p>
        )}
      </div>

      {/* 드롭다운 */}
      {isOpen && (
        <>
          {/* 백드롭 */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            className="fixed inset-0 z-10"
          />

          {/* 드롭다운 리스트 */}
          <div
            className={clsx(
              "absolute top-full left-0 p-2 w-full bg-white rounded-b-[4px] border border-line-3 z-30 max-h-60 overflow-y-auto",
              dropdownClassName || "",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {availableItems.length > 0 ? (
              availableItems.map((item) => (
                <div
                  key={getItemKey(item)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                >
                  {renderListItem(item, () => handleSelect(item))}
                </div>
              ))
            ) : (
              <div className="p-2 text-text-4">{emptyMessage}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SelectInput;
