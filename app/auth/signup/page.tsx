"use client"

import { useState } from "react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
  })
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false) // Loading state for sending OTP
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [otpExpiration, setOtpExpiration] = useState(0) // State for OTP expiration timer

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = () => {
    if (!formData.phone) {
      alert("Please enter a valid phone number.")
      return
    }
    setIsSendingOtp(true) // Start loading state
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString() // Generate 6-digit OTP
      setGeneratedOtp(otp)
      setIsOtpSent(true)
      setIsSendingOtp(false) // End loading state
      console.log("Generated OTP:", otp) // Simulate sending OTP
      alert("OTP sent successfully!")
    }, 2000) // Simulate network delay

    setOtpExpiration(60) // Set expiration timer to 60 seconds
    const timer = setInterval(() => {
      setOtpExpiration((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsOtpSent(false) // Reset OTP state
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleVerifyOtp = () => {
    if (formData.otp === generatedOtp) {
      alert("OTP verified successfully!")
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true")
      }
      // Optionally redirect to profile or home
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  return (
    <div className="auth-container bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="auth-form bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        <form>
          {/* Name Field */}
          <div className="form-row mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number Field */}
          <div className="form-row mb-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Send OTP Button */}
          {!isOtpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
              className={`w-full py-3 rounded text-white ${
                isSendingOtp ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          )}

          {/* OTP Input Field */}
          {isOtpSent && (
            <div className="form-row mb-4">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          {/* Verify OTP Button */}
          {isOtpSent && (
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full py-3 rounded text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Verify OTP
            </button>
          )}

          {isOtpSent && otpExpiration > 0 && (
            <p className="text-center text-gray-500 mb-4">OTP expires in {otpExpiration} seconds</p>
          )}
        </form>
      </div>
    </div>
  )
}
