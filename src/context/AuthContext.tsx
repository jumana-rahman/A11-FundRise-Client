import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { authClient, useSession } from "../lib/auth-client";
import { api } from "../lib/api";

export type UserRole = "supporter" | "creator" | "admin";

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
  refreshUser: () => Promise<void>;
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
  const [jwtUser, setJwtUser] = useState<User | null>(null);

  const fetchJWT = useCallback(async () => {
    try {
      const res = await api.post<{ token: string }>("/api/auth/jwt");
      if (res.token) {
        localStorage.setItem("fundrise_token", res.token);
        const payload = JSON.parse(atob(res.token.split(".")[1]));
        setJwtUser({
          id: payload.id,
          name: payload.name,
          email: payload.email,
          photoUrl: payload.photoUrl ?? "",
          role: payload.role ?? "supporter",
          credits: payload.credits ?? 0,
        });
      }
    } catch {
      localStorage.removeItem("fundrise_token");
      setJwtUser(null);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchJWT();
    } else if (!isPending) {
      localStorage.removeItem("fundrise_token");
      setJwtUser(null);
    }
  }, [session, isPending, fetchJWT]);

  const user = jwtUser;

  const login = async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({ email, password });
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
      const result = await authClient.signIn.social({ provider: "google" });
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
      await api.post("/api/auth/register-credits", { role: data.role });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Registration failed" };
    }
  };

  const logout = async () => {
    await authClient.signOut();
    localStorage.removeItem("fundrise_token");
    setJwtUser(null);
    await refetch();
  };

  const refreshUser = async () => {
    await fetchJWT();
  };

  const updateCredits = (_amount: number) => {
    fetchJWT();
  };

  const updateUser = (_updates: Partial<User>) => {
    fetchJWT();
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
        refreshUser,
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
