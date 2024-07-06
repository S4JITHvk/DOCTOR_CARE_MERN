import useGetConversations from "../../../../Socket/Hooks/useGetConversations";
import Conversation from "./Converstion";
import { useConversation } from "../../../../Socket/zustand/useConversation";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  const { selectedConversation } = useConversation();

  const reorderedConversations = selectedConversation
    ? [
        selectedConversation,
        ...conversations.filter((c) => c._id !== selectedConversation._id),
      ]
    : conversations;

  return (
    <div>
      {reorderedConversations.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx={idx === reorderedConversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto">Loading..</span>
      ) : null}
    </div>
  );
}

export default Conversations;
