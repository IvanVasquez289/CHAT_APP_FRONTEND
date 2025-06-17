import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=>{
    getMessages(selectedUser!._id)
  },[getMessages, selectedUser])

  if(isMessagesLoading) return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div className=" flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg._id}
            className={`chat ${authUser?._id === msg.senderId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img 
                  src={authUser?._id === msg.senderId ? authUser.profilePic || "/avatar.png" : selectedUser?.profilePic || "/avatar.png"} 
                  alt="avatar" 
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatMessageTime(msg.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img src={msg.image} alt="attachment" className="sm:max-w-[200px] mb-2" />
              )}
              {msg.text && (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer