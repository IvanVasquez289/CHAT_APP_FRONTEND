import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import type { SignUpData } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthState = {
    authUser: string | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    checkAuth: () => Promise<void>;
    signup: (data: SignUpData) => Promise<void> 
}

export const useAuthStore = create<AuthState>((set)=> ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    
    checkAuth: async () => {
        try {
            const res = await axioInstance.get("/auth/check");
            set({authUser: res.data})
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data: SignUpData) => {
        set({isSigningUp: true})
        try {
            const res = await axioInstance.post("/auth/signup", data);
            set({authUser: res.data})
            toast.success("Account created successfully")
        } catch (error) {
            if(error instanceof AxiosError && error.response?.status === 409){
                toast.error("User already exists")
            }
        }finally{
            set({isSigningUp: false})
        }
    }
}))