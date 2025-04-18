import { RightMenu } from "../../../utils/consts";

function RightBar() {

  return (
    <div className="w-[383px] h-[535px] pl-16 mt-9">
      <div className="flex justify-between items-center px-4">
        <div className="flex gap-3">
          <img
            className="w-[44px] h-[44px] rounded-full object-cover"
            crossorigin="anonymous"
            draggable="false"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhTOyPSYEY5Du1YdayQiHaEWtqRcEnGLn9dg&s"
          />
          <div>
            <h1 className="text-sm font-semibold">iboismylv</h1>
            <h1 className="text-[#A8A8A8] text-sm">Ibrahim</h1>
          </div>
        </div>
        <div className="text-[#0095f6] text-xs hover:text-[#E0F1FF] cursor-pointer">
          Switch
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 px-4 py-1">
        <div className="text-sm font-semibold text-[#9C9C9C]">
          Suggested for you
        </div>
        <div className="text-[12px] font-semibold">See All</div>
      </div>
      {RightMenu.map((item, index) => (
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex gap-3">
            <img
              className="w-[44px] h-[44px] rounded-full object-cover"
              draggable="false"
              src={item.imageUrl}
            />
            <div>
              <h1 className="text-sm font-semibold">{item.username}</h1>
              <h1 className="text-[#A8A8A8] text-sm">{item.fullName}</h1>
            </div>
          </div>
          <div className="text-[#0095f6] text-xs hover:text-[#E0F1FF] cursor-pointer">
            Follow
          </div>
        </div>
      ))}
      <div className="mt-4 text-[12px] text-[#6E6E6E] uppercase">© 2025 Instagram from Meta</div>
    </div>
  );
}

export default RightBar;
