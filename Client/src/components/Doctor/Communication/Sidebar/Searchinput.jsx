import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useConversation } from "../../../../Socket/zustand/useConversation";
import useGetConversations from "../../../../Socket/Hooks/useGetConversations";
import toast from "react-hot-toast";

function SearchInput() {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) {
      return;
    }

    if(search.length < 3) {
      return toast.error("Search term must be at least three charactors long");
    }

    const conversation = conversations.find((c) => c.userName.toLowerCase().includes(search.toLowerCase()));

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!")
    }
  }
  return (
    
<div className="p-4 bg-blue-700 text-white flex justify-between items-center">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input inpu-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle text-white">
        <FaSearch className="text-xl cursor-pointer" />
      </button>
    </form>
    </div>
  );
}

export default SearchInput;
