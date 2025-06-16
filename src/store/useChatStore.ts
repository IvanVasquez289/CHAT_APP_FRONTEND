import { create } from "zustand";
import type { ChatUser } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { axioInstance } from "../lib/axios";

type ChatState = {
    users: ChatUser[],
    messages: string[],
    selectedUser: ChatUser | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    getUsers: () => void,
    getMessages : (userId: ChatUser["_id"]) => void,
    setSelectedUser: (user: ChatUser) => void
}

export const useChatStore = create<ChatState>((set) => ({
    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axioInstance.get("/message/users")
            set({users: res.data})
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.message)
                console.log(error.response?.data.message)
            }
        }finally{
            set({isUsersLoading: false})
        }
    },
    getMessages : async (userId: ChatUser["_id"]) => {
        set({isMessagesLoading: true})
        try {
            const res = await axioInstance.get(`/messages/${userId}`)
            set({messages: res.data})
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data.message)
                console.log(error.response?.data.message)
            }
        }finally{
            set({isMessagesLoading: false})
        }
    },
    // TODO: OPTIMIZE LATER
    setSelectedUser: (user: ChatUser) => {
        set({selectedUser: user})
    }

}))