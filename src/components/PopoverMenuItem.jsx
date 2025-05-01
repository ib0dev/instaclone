
function PopoverMenuItem({componentIcon,componentTitle,onClick}) {
  return (
    <button className="flex items-center p-4 gap-3 hover:bg-[#3C3C3C] rounded-xl transition-all w-full text-left cursor-pointer" onClick={onClick}>
      {componentIcon}
      {componentTitle}
    </button>
  );
}

export default PopoverMenuItem;
