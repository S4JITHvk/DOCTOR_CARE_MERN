import useGetConversations from "../../../../Socket/Hooks/useGetConversations";
import Conversation from "./Converstion";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div >
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;


 