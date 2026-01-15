import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";
import styled from "styled-components";

const DefaultLayout = () => {
  return (
    <div className="flex w-dvw h-dvh">
      <div className="w-[313px] h-full bg-pink-300">
        <SideBar />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;

const S = {
  Container: styled.div`
    width: 100dvw;
    height: 100dvh;
    display: flex;
  `,
  SideBar: styled.section`
    width: 100px;
    background-color: yellow;
  `,
  Outlet: styled.section`
    width: calc(100% - 100px);
  `,
};
