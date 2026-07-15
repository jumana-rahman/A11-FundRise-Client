import { createContext, useContext, type ReactNode } from "react";
import { authClient, useSession } from "../lib/auth-client";
import type { UserRole } from "../data/mockData";

export type { UserRole };

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: UserRole;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateCredits: (amount: number) => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending, refetch } = useSession();

  const user: User | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        photoUrl: (session.user as any).photoUrl ?? "",
        role: (session.user as any).role ?? "supporter",
        credits: (session.user as any).credits ?? 0,
      }
    : null;

  const login = async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (result.error) {
        return { success: false, error: result.error.message ?? "Login failed" };
      }
      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Login failed" };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
      });
      if (result.error) {
        return { success: false, error: result.error.message ?? "Google sign-in failed" };
      }
      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Google sign-in failed" };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.photoUrl ?? "",
      });
      if (result.error) {
        return { success: false, error: result.error.message ?? "Registration failed" };
      }
      await refetch();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Registration failed" };
    }
  };

  const logout = async () => {
    await authClient.signOut();
    await refetch();
  };

  const updateCredits = (amount: number) => {
    // Re-fetch session to get updated credits
    refetch();
  };

  const updateUser = (_updates: Partial<User>) => {
    // Re-fetch session to get updated user data
    refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isPending,
        login,
        loginWithGoogle,
        register,
        logout,
        updateCredits,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
