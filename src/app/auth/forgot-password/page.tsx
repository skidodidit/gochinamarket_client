"use client"

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { forgotPassword } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { notifySuccess, notifyError } from '@/lib/toast'
import Link from 'next/link'
import AuthContainer from '@/components/auth/AuthContainer'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { loading, error, success, run: runForgotPassword } = useApi(forgotPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email) {
      notifyError('Please enter your email address')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      notifyError('Please enter a valid email address')
      return
    }

    try {
      // API call with just email parameter
      const data = await runForgotPassword(email) // Changed from { email } to just email
      
      if (data && !error) {
        localStorage.setItem('resetEmail', email)
        setIsSubmitted(true)
        notifySuccess(data.message || "Password reset instructions sent to your email.")
      }
    } catch (err) {
      notifyError(error || "Failed to send reset instructions")
    }
  }

  return (
    <AuthContainer
      title="Forgot Password?"
      description={
        isSubmitted ? (
          <div className="text-green-500">
            Instructions sent! Check your email.
          </div>
        ) : (
          <>
            Enter your email and we'll send you instructions to reset your password.
          </>
        )
      }
      showBackLink
      backLinkHref="/auth/login"
      backLinkText="Back to login"
    >
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-500">
          Password reset instructions sent! Check your email.
        </div>
      )}

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6 px-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={20} className="text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 pl-12 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-300 rounded-lg text-black py-4 px-6 flex items-center justify-center space-x-2 hover:bg-primary-300/60 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending Instructions...</span>
              </>
            ) : (
              <>
                <span>Send Reset Instructions</span>
              </>
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link href="/auth/login" className="text-primary-300 hover:underline text-sm">
              ← Return to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6 px-1">
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-green-500 mb-2">Check Your Email</h3>
            <p className="text-gray-200 mb-4">
              We've sent password reset instructions to:<br />
              <span className="font-medium text-primary-300">{email}</span>
            </p>
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setIsSubmitted(false)
                setEmail('')
              }}
              className="w-full bg-primary-300/20 text-primary-300 py-4 px-6 rounded-lg font-medium hover:bg-primary-300/30 transition-all border border-primary-300/30"
            >
              Try Another Email
            </button>
            
            <Link
              href="/auth/login"
              className="w-full bg-transparent text-primary-300 py-4 px-6 rounded-lg font-medium hover:bg-white/5 transition-all border border-white/10 text-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </AuthContainer>
  )
}