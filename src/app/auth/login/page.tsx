"use client"

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useApi } from '../../../hooks/useApi';
import { loginUser } from '../../../lib/api/auth';
import { useRouter } from 'next/navigation';
import { notifySuccess, notifyError } from '../../../lib/toast';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'react-toastify';

interface LoginPayload {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginPayload>({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, error, success, run: runLogin } = useApi(loginUser);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast('Please enter a valid email address');
      return;
    }

    const data = await runLogin(formData);
    console.log(data);
    if(data && data.token){
      localStorage.setItem('token', data.token)
      localStorage.setItem('isAuthenticated', 'true')
      notifySuccess("Login Successful")
      router.push('/')
    }
    if(error){
      notifyError(error)
    }
  };

  return (
    <>
      <Navbar/>
      <div className="md:h-[80dvh] h-[100dvh] bg-gray-50 relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 md:p-2 overflow-y-auto flex md:items-center md:justify-between w-[90%] md:w-[70%] md:h-[70dvh] bg-white backdrop-blur-md">
          {/* Left Panel - Hidden on Mobile */}
          <div className="desktop-visibility relative h-full w-[45%]">
            <div className="relative flex flex-col justify-center items-center text-center p-12 h-full w-full">
              <Image
                src="/images/auth.png"
                alt="Mountain landscape"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-5">
            <div className="w-full">
              {/* Back to website link */}
              <div className="mb-6 lg:hidden">
                <Link href="/" className="text-primary-300 text-sm hover:underline">
                  ← Back to website
                </Link>
              </div>

              {/* Glassmorphism Form Container */}
              <div className="overflow-y-auto h-[80dvh] md:h-[60dvh]">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                  <p className="text-gray-500">
                    Don't have an account?{' '}
                    <Link href={'/auth/register'} className="text-primary-300 hover:underline cursor-pointer">
                      Sign up
                    </Link>
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-500">
                    Login successful! Redirecting...
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 px-1">
                  {/* Email */}
                  <div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gray-100 border border-white/10 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm"
                      placeholder="Email"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 bg-gray-100 border border-white/10 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent backdrop-blur-sm pr-12"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="mr-3 h-4 w-4 text-primary-300 focus:ring-primary-300 border-gray-300 rounded bg-gray-100"
                      />
                      <label htmlFor="remember-me" className="text-sm text-gray-500">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm text-primary-300 hover:underline cursor-pointer">
                      Forgot your password?
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-300 text-black py-4 px-6 flex items-center justify-center space-x-2 hover:bg-primary-300/60 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}