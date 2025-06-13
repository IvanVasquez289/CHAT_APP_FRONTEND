import { create } from "zustand";
import { axioInstance } from "../lib/axios";
import type { AuthUser, LoginData, SignUpData } from "../types";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type AuthState = {
    authUser: AuthUser | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    checkAuth: () => Promise<void>;
    signup: (data: SignUpData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => Promise<void>
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
            console.log("Error checking authentication:", error);
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
    },

    logout: async () => {
        try {
            await axioInstance.post("/auth/logout");
            set({authUser: null})
            toast.success("Logged out successfully")
        } catch (error) {
            if(error instanceof AxiosError){
                toast.error(error.response?.data)
            }
        }
    },
    login: async (data: LoginData) => {
        set({isLoggingIn: true})
        try {
            const res = await axioInstance.post("/auth/login", data)
            set({authUser: res.data})
            toast.success("Logged in successfully")
        } catch (error) {
            if(error instanceof AxiosError){
                const {response, status} = error
                if([404,401,500].includes(status!)){
                    toast.error(response?.data)
                }
            }
        }finally{
            set({isLoggingIn: false})
        }
    }
}))