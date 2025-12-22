import React from "react";
import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";

const DefaultLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
