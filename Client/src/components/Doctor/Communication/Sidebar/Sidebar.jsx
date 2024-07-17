import Conversations from "./Converstions";


function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-full overflow-y-auto">
      <div className="p-4 bg-blue-700 h-[50px] text-white flex justify-between items-center"></div>
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
}

export default Sidebar;
