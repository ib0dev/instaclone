import React, { useState } from "react";
import { NavLink } from "react-router";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  Field,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Select,
  Switch,
} from "@headlessui/react";
import {
  ActivityIcon,
  MoreIcon,
  ReportProblemIcon,
  SavedIcon,
  SettingsIcon,
  SwitchAppearance,
  ThreadsIcon,
} from "@/assets/icons/allicons";
import { mainMenu } from "@/utils/consts";
import useTheme from "@/hooks/useTheme";
import { clsx } from "clsx";
import { CreateIcon, MorePostIcon, MediaIcon } from "@/assets/icons/allicons";
import useClickOutside from "@/hooks/use-click-outside";
import PopoverMenuItem from "../../../../components/PopoverMenuItem";
function SidebarMenu() {
  const { theme, changeTheme } = useTheme();

  const isDark = theme === "dark";
  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  const [showAppearancePanel, setShowAppearancePanel] = useState(false);

  const toggleAppearancePanel = (e) => {
    e.stopPropagation();
    setShowAppearancePanel((prev) => !prev);
  };

  const closeAppearancePanel = () => {
    setShowAppearancePanel(false);
  };

  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const ref = useClickOutside(() => closeAppearancePanel());

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
        <Button
          onClick={open}
          className="flex gap-4 hover:bg-[#1a1a1a] rounded-xl transition-all p-3 m-0.5"
        >
          <div className="flex gap-4">
            <CreateIcon />
            Create
          </div>
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 flex-col">
              <DialogPanel
                transition
                className="w-[537px] h-[543px] bg-[#262626] flex justify-center flex-col items-center"
              >
                <p className="mt-2 text-sm/6 text-white/50">
                  <MediaIcon />
                </p>
                <p className="text-xl ">Drag photos and videos here</p>
                <div className="mt-4">
                  <Button className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold bg-[#0095f6] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#1877F2] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                    Select From Computer
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
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
            <PopoverMenuItem
              componentIcon={<SettingsIcon />}
              componentTitle={"Settings"}
            />
            <PopoverMenuItem
              componentIcon={<ActivityIcon />}
              componentTitle={"Your Activity"}
            />
            <PopoverMenuItem
              componentIcon={<SavedIcon />}
              componentTitle={"Saved"}
            />
            <PopoverMenuItem
              componentIcon={<SwitchAppearance />}
              componentTitle={"Switch Appearance"}
              onClick={toggleAppearancePanel}
            />

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
        {showAppearancePanel && (
          <div
            className="absolute bottom-[230px] left-[260px] z-10 w-[230px] bg-[#353535] p-4 rounded-xl shadow-lg"
            ref={ref}
          >
            <Field>
              <Label className="text-sm/6 font-medium text-white flex items-center justify-between">
                <div>Theme</div>
                <IoClose
                  className="size-4 fill-white/60"
                  aria-hidden="true"
                  onClick={closeAppearancePanel}
                />
              </Label>
              <Description className="text-sm/6 text-white/50">
                Choose theme appearance
              </Description>
              <div className="relative mt-3">
                <Switch
                  checked={isDark}
                  onChange={toggleTheme}
                  className={clsx(
                    "group relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none",
                    isDark ? "bg-white/20" : "bg-white/10"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                  />
                </Switch>
                {/* <Select
                  onChange={(e) => changeTheme(e.target.value)}
                  className={clsx(
                    "block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none"
                  )}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System</option>
                </Select> */}
              </div>
            </Field>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarMenu;
