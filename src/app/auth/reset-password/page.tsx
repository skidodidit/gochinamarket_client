"use client"

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Lock, Key, Mail } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { resetPassword } from '@/lib/api/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { notifySuccess, notifyError } from '@/lib/toast'
import Link from 'next/link'
import AuthContainer from '@/components/auth/AuthContainer'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('otp') // Changed from 'token' to 'otp' to match API
  const emailParam = searchParams.get('email')
  const [email, setEmail] = useState<string>('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    newPassword: '', // Changed from 'password' to match API
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')

  const { loading, error, success, run: runResetPassword } = useApi(resetPassword)

  useEffect(() => {
    // Check if we have the required OTP and email
    if (!token) {
      notifyError('Invalid or expired reset link')
      setTimeout(() => router.push('/auth/forgot-password'), 2000)
      return
    }

    // Try to get email from various sources
    const storedEmail = localStorage.getItem('resetEmail')
    if (emailParam) {
      setEmail(emailParam)
      localStorage.setItem('resetEmail', emailParam)
    } else if (storedEmail) {
      setEmail(storedEmail)
    } else {
      notifyError('Email not found. Please request a new reset link.')
      setTimeout(() => router.push('/auth/forgot-password'), 2000)
    }
  }, [token, emailParam, router])

  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const validatePassword = (password: string) => {
    const errors = []
    
    if (password.length < 8) errors.push('at least 8 characters')
    if (!/(?=.*[a-z])/.test(password)) errors.push('one lowercase letter')
    if (!/(?=.*[A-Z])/.test(password)) errors.push('one uppercase letter')
    if (!/(?=.*\d)/.test(password)) errors.push('one number')
    if (!/(?=.*[@$!%*?&])/.test(password)) errors.push('one special character')
    
    return errors
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'newPassword') {
      const errors = validatePassword(value)
      if (errors.length > 0) {
        setPasswordError(`Password must contain: ${errors.join(', ')}`)
      } else {
        setPasswordError('')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.newPassword || !formData.confirmPassword) {
      notifyError('Please fill in all fields')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      notifyError('Passwords do not match')
      return
    }

    const passwordErrors = validatePassword(formData.newPassword)
    if (passwordErrors.length > 0) {
      notifyError(`Password requirements not met`)
      return
    }

    if (!token || !email) {
      notifyError('Invalid reset link. Please request a new one.')
      return
    }

    try {
      // API call with correct parameter structure
      const data = await runResetPassword({
        email: email,
        otp: token, // Changed from 'token' to 'otp' to match API
        newPassword: formData.newPassword
      })

      if (data && !error) {
        notifySuccess(data.message || "Password reset successfully!")
        localStorage.removeItem('resetEmail')
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      }
    } catch (err) {
      notifyError(error || "Failed to reset password")
    }
  }

  if (!token || !email) {
    return (
      <AuthContainer
        title="Invalid Link"
        description="The password reset link is invalid or has expired."
      >
        <div className="text-center space-y-6">
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-red-500 mb-2">Link Expired</h3>
            <p className="text-gray-200 mb-4">
              This password reset link is no longer valid. Please request a new one.
            </p>
          </div>
          
          <Link
            href="/auth/forgot-password"
            className="inline-block w-full bg-primary-300 text-black py-4 px-6 rounded-lg font-medium hover:bg-primary-300/60 transition-all text-center"
          >
            Request New Reset Link
          </Link>
        </div>
      </AuthContainer>
    )
  }

  return (
    <AuthContainer
      title="Reset Your Password"
      description="Create a new password for your account"
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
          Password reset successfully! Redirecting to login...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 px-1">
        {/* Current Password Info */}
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Lock size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-blue-500 font-medium">Reset Instructions</p>
              <p className="text-xs text-gray-400">Enter your new password below</p>
            </div>
          </div>
        </div>

        {/* Email Display */}
        <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center">
              <Mail size={20} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 font-medium">Account Email</p>
              <p className="text-sm text-white">{email}</p>
            </div>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              name="newPassword" // Changed to match API
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={8}
              className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm pr-12"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordError && (
            <p className="mt-2 text-sm text-red-500">{passwordError}</p>
          )}
          <div className="mt-2 text-xs text-gray-400">
            Password must contain: 8+ characters, uppercase, lowercase, number, special character
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handlePasswordChange}
              required
              className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm pr-12"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
            <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
          )}
        </div>

        {/* Password Strength Meter */}
        {formData.newPassword && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Password strength:</span>
              <span className={passwordError ? 'text-red-500' : 'text-green-500'}>
                {passwordError ? 'Weak' : 'Strong'}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  passwordError ? 'bg-red-500 w-1/4' : 'bg-green-500 w-full'
                }`}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !!passwordError || formData.newPassword !== formData.confirmPassword}
          className="w-full bg-primary-300 rounded-lg text-black py-4 px-6 flex items-center justify-center space-x-2 hover:bg-primary-300/60 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <Key size={20} />
              <span>Reset Password</span>
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
    </AuthContainer>
  )
}