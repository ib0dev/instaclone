import React from "react";
import Logo from "../logo/index";
import SidebarMenu from "./menu";
import ThemeContextProvider from "./../../../context/ThemeContext";
function Sidebar() {
  return (
    <div className="w-[244px]">
      <Logo />
      <ThemeContextProvider>
        <SidebarMenu />
      </ThemeContextProvider>
    </div>
  );
}

export default Sidebar;
