import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./sidebar/index";
import RightBar from "./rightbar/index";

function MainLayout() {
  return (
    <div className="w-[1520px] mx-auto flex">
      <div className="border-r border-[#2f3336] fixed top-0 h-screen w-[250px]">
        <Sidebar />
      </div>
      <main className="flex-1 flex justify-center ml-[250px]">
        <div className="w-[950px] flex">
          <div className="w-[630px] h-svh">
            <Outlet />
          </div>
          <div className="w-[320px]">
            <RightBar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainLayout;