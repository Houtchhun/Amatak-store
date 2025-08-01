"use client"

import type React from "react"

import { AuthProvider, useAuth } from "@/lib/AuthContext"
import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignInPageWrapper() {
  return (
    <AuthProvider>
      <SignInPage />
    </AuthProvider>
  )
}

function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    })) 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      // No validation, just simulate successful sign-in
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      login(formData.email)
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("loginEmail", formData.email) // <-- Add this line
        // Admin logic: if email is khikhe@gmail.com, set admin flag and redirect to admin dashboard
        if (formData.email.trim().toLowerCase() === "khikhe@gmail.com") {
          localStorage.setItem("isAmatakAdmin", "true")
          window.location.href = "/Amatak-admin"
          return
        } else {
          localStorage.removeItem("isAmatakAdmin")
        }
      }
      router.push("/account/profile")
    } catch (err: any) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked")
    // Handle Google OAuth logic here
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-6">
          Sign In
          <User className="text-blue-500" size={28} />
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row single">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row single">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/auth/change-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <p className="login-text">
            Don't have an account? <Link href="/auth/signup">Sign Up</Link>
          </p>

          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm mb-2">Signed in successfully!</div>
          )}

          <div className="button-row">
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google Icon" />
              Sign in with Google
            </button>
            <span className="text-gray-500">or</span>
            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
