import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";
import styled from "styled-components";
import TeamHeader from "../../components/TeamHeader";

const DefaultLayout = () => {
  return (
    <div className="flex w-dvw h-dvh">
      <div className="w-[313px] h-full ">
        <SideBar />
      </div>
      <div className="w-full">
        <div>
          <TeamHeader />
          <Outlet />
        </div>
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
