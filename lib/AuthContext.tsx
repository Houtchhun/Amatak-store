"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: { email: string } | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("isAuthenticated") === "true"
      const storedEmail = localStorage.getItem("loginEmail")
      
      if (storedAuth && storedEmail) {
        setIsAuthenticated(true)
        setUser({ email: storedEmail })
      }
    }
  }, [])

  const login = (email: string) => {
    setIsAuthenticated(true)
    setUser({ email })
    if (typeof window !== "undefined") {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("loginEmail", email)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("loginEmail")
      localStorage.removeItem("isAmatakAdmin")
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
