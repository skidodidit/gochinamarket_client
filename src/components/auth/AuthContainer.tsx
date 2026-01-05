"use client"

import Image from 'next/image'
import { ReactNode } from 'react'
import Link from 'next/link'

interface AuthContainerProps {
  children: ReactNode
  title: string
  description?: ReactNode
  showBackLink?: boolean
  backLinkHref?: string
  backLinkText?: string
  imageSrc?: string
}

export default function AuthContainer({
  children,
  title,
  description,
  showBackLink = false,
  backLinkHref = "/",
  backLinkText = "Back to website",
  imageSrc = "/images/auth.png"
}: AuthContainerProps) {
  return (
    <div className="relative z-10 md:p-2 overflow-y-auto flex md:items-center md:justify-between w-[90%] md:w-[70%] md:h-[70dvh] bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
      {/* Left Panel - Hidden on Mobile */}
      <div className="desktop-visibility relative h-full w-[45%]">
        <div className="relative flex flex-col rounded-lg overflow-hidden justify-center items-center text-center p-12 h-full w-full">
          <Image
            src={imageSrc}
            alt="Authentication illustration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-5">
        <div className="w-full">
          {/* Back to website link */}
          {showBackLink && (
            <div className="mb-6 lg:hidden">
              <Link href={backLinkHref} className="text-primary-300 text-sm hover:underline">
                ← {backLinkText}
              </Link>
            </div>
          )}

          {/* Glassmorphism Form Container */}
          <div className="overflow-y-auto h-[80dvh] md:h-[60dvh]">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary-300 mb-2">{title}</h1>
              {description && (
                <p className="text-gray-200">{description}</p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}