import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type UserRole = 'supporter' | 'creator' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  photoUrl: string
  role: UserRole
  credits: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGoogle: () => Promise<{ success: boolean }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateCredits: (amount: number) => void
  updateUser: (updates: Partial<User>) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  photoUrl?: string
  role: UserRole
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', role: 'admin', credits: 1000 },
  { id: '2', name: 'Alex Rivera', email: 'creator@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', role: 'creator', credits: 20 },
  { id: '3', name: 'Jordan Kim', email: 'supporter@fundrise.io', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: 'supporter', credits: 50 },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('fundrise_user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('fundrise_user', JSON.stringify(user))
    else localStorage.removeItem('fundrise_user')
  }, [user])

  const login = async (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email)
    if (!found) return { success: false, error: 'No account found with this email.' }
    if (password.length < 6) return { success: false, error: 'Invalid password.' }
    setUser(found)
    return { success: true }
  }

  const loginWithGoogle = async () => {
    setUser(MOCK_USERS[2])
    return { success: true }
  }

  const register = async (data: RegisterData) => {
    if (MOCK_USERS.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already in use.' }
    }
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      photoUrl: data.photoUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop`,
      role: data.role,
      credits: data.role === 'supporter' ? 50 : 20,
    }
    MOCK_USERS.push(newUser)
    setUser(newUser)
    return { success: true }
  }

  const logout = () => setUser(null)

  const updateCredits = (amount: number) => {
    setUser(prev => prev ? { ...prev, credits: prev.credits + amount } : null)
  }

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, updateCredits, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
