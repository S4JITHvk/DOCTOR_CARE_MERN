import Conversations from "./Converstions";
import SearchInput from "./Searchinput";

function Sidebar() {
  return (
    <div className="w-1/4 bg-white border-r h-full overflow-y-auto">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
    </div>
  );
}

export default Sidebar;

