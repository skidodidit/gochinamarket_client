"use client"

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Mail } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { verifyOtp, resendOtp } from '@/lib/api/auth'
import { notifySuccess, notifyError } from '@/lib/toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthContainer from '@/components/auth/AuthContainer'

interface VerifyOtpPayload {
  email: string
  otp: string
}

export default function VerifyOtpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { loading, error, success, run: runVerifyOtp } = useApi(verifyOtp)
  const { loading: loadingResend, error: errorResend, success: successResend, run: runResend } = useApi(resendOtp)

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || ''
    setEmail(storedEmail)
  }, [])

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Handle success redirect - separate useEffect to avoid timing issues
  useEffect(() => {
    if (success) {
      notifySuccess("Email verified successfully.")
      // Small delay to ensure the success message is shown
      const timer = setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [success, router])

  // Handle verification errors
  useEffect(() => {
    if (error) {
      notifyError(error)
    }
  }, [error])

  // Handle resend success/error
  useEffect(() => {
    if (successResend) {
      notifySuccess("New verification code sent to your email.")
    }
  }, [successResend])

  useEffect(() => {
    if (errorResend) {
      notifyError(errorResend)
    }
  }, [errorResend])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i]
      }
    }

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => !digit)
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpString = otp.join('')

    if (otpString.length !== 6) {
      notifyError('Please enter the complete 6-digit OTP')
      return
    }

    if (!email) {
      notifyError('Email not found. Please go back to registration.')
      return
    }

    const payload: VerifyOtpPayload = {
      email,
      otp: otpString
    }

    await runVerifyOtp(payload)
  }

  const handleResendOtp = async () => {
    if (!email) {
      notifyError('Email not found. Please go back to registration.')
      return
    }

    // Reset timer
    setTimeLeft(300)
    // Clear current OTP
    setOtp(['', '', '', '', '', ''])
    // Focus first input
    inputRefs.current[0]?.focus()

    // Call the resend OTP API
    await runResend(email)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const maskEmail = (email: string) => {
    if (!email) return ''
    const [username, domain] = email.split('@')
    if (username.length <= 3) return email
    const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2)
    return `${maskedUsername}@${domain}`
  }

  return (
    <AuthContainer
      title="Verify Your Email"
      description={
        <div className="text-center">
          <div className="w-12 h-12 bg-primary-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary-300" />
          </div>
          <p className="text-gray-200 mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-primary-300 font-medium">
            {maskEmail(email)}
          </p>
        </div>
      }
      showBackLink
      backLinkHref="/auth/register"
      backLinkText="Back to registration"
    >
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {/* Resend Error Message */}
      {errorResend && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500">
          {errorResend}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-500">
          Email verified successfully! Redirecting...
        </div>
      )}

      {/* Resend Success Message */}
      {successResend && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-500">
          New verification code sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 px-1">
        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-4 text-center">
            Enter verification code
          </label>
          <div className="flex justify-center space-x-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                disabled={loading || success}
              />
            ))}
          </div>
        </div>

        {/* Timer */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-gray-500 text-sm">
              Code expires in <span className="text-primary-300 font-medium">{formatTime(timeLeft)}</span>
            </p>
          ) : (
            <p className="text-red-500 text-sm">
              Code has expired. Please request a new one.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || otp.some(digit => !digit) || success}
          className="w-full bg-primary-300 text-black py-4 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-primary-300/60 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Verifying...</span>
            </>
          ) : success ? (
            <>
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <span>Verify Email</span>
            </>
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-gray-200 text-sm mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || loadingResend || success}
            className="text-primary-300 hover:underline text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto space-x-2"
          >
            {loadingResend ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-300"></div>
                <span>Sending...</span>
              </>
            ) : timeLeft > 0 ? (
              `Resend in ${formatTime(timeLeft)}`
            ) : (
              'Resend Code'
            )}
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}