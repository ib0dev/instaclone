import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  Button,
  Popover,
  PopoverButton,
  PopoverPanel,
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
import { CreateIcon } from "@/assets/icons/allicons";
import PopoverMenuItem from "@/components/PopoverMenuItem";
import ThemeModal from "@/components/ThemeModal";
import { logOut } from "@/supabase/auth";
import CreateComponent from "@/components/CreateComponent";
import { supabase } from '@/supabase/config';

function SidebarMenu() {

  const [profilePictureUrl, setProfilePictureUrl] = useState("")

  useEffect(() => {
      const fetchUserData = async () => {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
        if (authError) {
          console.error("Error fetching user:", authError);
          return;
        }
        if (user) {
          try {
            const { data: userDoc, error: userError } = await supabase
              .from("users")
              .select("*")
              .eq("id", user.id)
              .single();
            if (userError) throw userError;
  
            setProfilePictureUrl({
              profilePicture: userDoc.profile_picture,
            });
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };
      fetchUserData();
    }, []);

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

        <NavLink
          to="profile"
          className="flex gap-4 hover:bg-[#1a1a1a] rounded-xl transition-all p-3 m-0.5"
        >
          <div className="flex gap-4">
            <img
              className="w-[24px] h-[24px] rounded-full object-cover"
              crossOrigin="anonymous"
              draggable="false"
              src={profilePictureUrl ? profilePictureUrl.profilePicture : "/src/assets/images/nopp.jpg"}
            />
            Profile
          </div>
        </NavLink>

        <CreateComponent isOpen={isOpen} close={close} />
      </div>
      <div className="flex flex-col mx-1 gap-1 mt-10">
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
            <button
              className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer"
              onClick={() => logOut()}
            >
              Log out
            </button>
          </PopoverPanel>
        </Popover>
        {showAppearancePanel && <ThemeModal onClick={closeAppearancePanel} />}
      </div>
    </div>
  );
}

export default SidebarMenu;
