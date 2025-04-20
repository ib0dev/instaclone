import { Description, Field, Label, Switch } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useTheme } from '@/hooks/useTheme';
import useClickOutside from './../hooks/use-click-outside';

function ThemeModal({ onClick }) {
  const ref = useClickOutside(onClick);

  const { theme, changeTheme } = useTheme();

  const isDark = theme === "dark";
  const toggleTheme = () => {
    changeTheme(theme === "dark" ? "light" : "dark");
  };

  return (
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
            onClick={onClick}
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
        </div>
      </Field>
    </div>
  );
}

export default ThemeModal;
