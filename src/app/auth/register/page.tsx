"use client"

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useApi } from '@/hooks/useApi'
import { registerUser } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'
import { notifySuccess, notifyError } from '@/lib/toast'
import Link from 'next/link'
import AuthContainer from '@/components/auth/AuthContainer'

interface RegisterPayload {
  name: string
  email: string
  password: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  })
  const [showAddressFields, setShowAddressFields] = useState(false)

  const { loading, error, success, run: runRegister } = useApi(registerUser)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Password validation
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    // Clean up empty address fields
    const cleanFormData = {
      ...formData,
      phone: formData.phone || undefined,
      address: showAddressFields ? formData.address : undefined
    }

    try {
      const data = await runRegister(cleanFormData)
      console.log(data)

      if (data && !error) {
        localStorage.setItem('email', formData.email)
        notifySuccess("An otp has been sent to your email.")
        router.push('/auth/verify-otp')
      }
    } catch (err) {
      notifyError(error || "Registration failed")
    }
  }

  return (
    <AuthContainer
      title="Create an account"
      description={
        <>
          Already have an account?
          <Link href={'/auth/login'} className="text-primary-300 ml-1 hover:underline cursor-pointer">
            Log in
          </Link>
        </>
      }
      showBackLink
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
          Registration successful! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 px-1">
        {/* Name Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
              placeholder="First name"
            />
          </div>
          <div>
            <input
              name="lastName"
              type="text"
              className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
            placeholder="Phone number"
          />
        </div>

        {/* Address Toggle */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAddressFields}
              onChange={(e) => setShowAddressFields(e.target.checked)}
              className="mr-3 h-4 w-4 text-primary-300 focus:ring-primary-300 border-gray-300 rounded bg-gray-100"
            />
            <span className="text-sm text-gray-500">I agree to the Terms & Conditions</span>
          </label>
        </div>

        {/* Address Fields */}
        {showAddressFields && (
          <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="address.street"
                type="text"
                value={formData.address?.street || ''}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                placeholder="Street Address"
              />
              <input
                name="address.city"
                type="text"
                value={formData.address?.city || ''}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                placeholder="City"
              />
              <input
                name="address.state"
                type="text"
                value={formData.address?.state || ''}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                placeholder="State"
              />
              <input
                name="address.postalCode"
                type="text"
                value={formData.address?.postalCode || ''}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                placeholder="Postal Code"
              />
              <input
                name="address.country"
                type="text"
                value={formData.address?.country || ''}
                onChange={handleInputChange}
                className="w-full p-3 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm md:col-span-2"
                placeholder="Country"
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
            className="w-full p-4 bg-white/5 border border-white/5 text-white backdrop-blur-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm pr-12"
            placeholder="Create your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !showAddressFields}
          className="w-full bg-primary-300 rounded-lg text-black py-4 px-6 flex items-center justify-center space-x-2 hover:bg-primary-300/60 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create account</span>
            </>
          )}
        </button>
      </form>
    </AuthContainer>
  )
}