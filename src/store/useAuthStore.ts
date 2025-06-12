import { create } from "zustand";
import { axioInstance } from "../lib/axios";

type AuthState = {
    authUser: string | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    checkAuth: () => Promise<void>;
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
    }
}))