import React from "react";
import { NavLink } from "react-router";
import { mainMenu } from "../../../../utils/consts";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import {
  ActivityIcon,
  MoreIcon,
  ReportProblemIcon,
  SavedIcon,
  SettingsIcon,
  SwitchAppearance,
  ThreadsIcon,
} from "./../../../../assets/icons/allicons";
function SidebarMenu() {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col mx-1 gap-2">
        {mainMenu.map((menuItem, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              isActive
                ? "flex gap-4 font-bold p-3 m-0.5 transition-all rounded-xl"
                : "flex gap-4 hover:bg-[#1a1a1a] rounded-xl transition-all p-3 m-0.5"
            }
            to={menuItem.path}
          >
            <div>{menuItem.icon}</div>
            {menuItem.title}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col mx-1 gap-1 mt-24">
        <button className="flex gap-4 hover:bg-[#1a1a1a] rounded-xl transition-all p-3 m-0.5 w-full text-left cursor-pointer">
          <div>
            <ThreadsIcon />
          </div>
          Threads
        </button>
        <Popover className="relative">
          <PopoverButton className="flex gap-4 hover:bg-[#1a1a1a] rounded-xl transition-all p-3 m-0.5 w-full text-left cursor-pointer">
            <div>
              <MoreIcon />
            </div>
            More
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col w-[250px] h-[388px] bg-[#262626] p-2 rounded-xl text-[14px] ml-2.5"
          >
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              <SettingsIcon />
              Settings
            </button>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              <ActivityIcon />
              Your Activity
            </button>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              <SavedIcon />
              Saved
            </button>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              <SwitchAppearance />
              Switch appearance
            </button>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              <ReportProblemIcon />
              Report a problem
            </button>
            <div className="w-full h-[6px] bg-[#353535]"></div>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              Switch Accounts
            </button>
            <div className="w-full h-[3px] bg-[#353535]"></div>
            <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer">
              Log out
            </button>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}

export default SidebarMenu;
