import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation, setMessages } from "../../ReduxStore/features/conversationSlice";
import { useSocketContext } from "../Context/SocketContext";
import notificationSound from "/assets/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.conversation.messages);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        dispatch(setMessages([...messages, newMessage])); 
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, dispatch, messages]);

  return messages; 
};

export default useListenMessages;
