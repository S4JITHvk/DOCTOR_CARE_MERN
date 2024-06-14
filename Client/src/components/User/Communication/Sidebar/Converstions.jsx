import useGetConversations from "../../../../Socket/Hooks/useGetConversations";
import Conversation from "./Converstion";
// import { getRandomEmoji } from "../../utils/emoji";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  return (
    <div >
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation?._id}
          conversation={conversation}
        //   emoji={getRandomEmoji()}
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


 