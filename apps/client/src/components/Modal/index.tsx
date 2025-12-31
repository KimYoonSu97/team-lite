import React from "react";
import styled from "styled-components";

const index = ({
  onClose,
  item,
}: {
  onClose: () => void;
  item: React.ReactNode;
}) => {
  return (
    <S.Container onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{item}</div>
    </S.Container>
  );
};

export default index;

const S = {
  Container: styled.div`
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
