// "use client"

// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { ReactNode } from 'react'

// interface AuthLayoutProps {
//   children: ReactNode
//   title: string
//   description?: string
// }

// export default function AuthLayout({ 
//   children, 
//   title, 
//   description 
// }: AuthLayoutProps) {
//   return (
//     <div className='bg-darkBackground min-h-screen'>
//       <div className="bg-primary-300 md:w-[50dvh] md:h-[50dvh] w-[40dvh] h-[40dvh] fixed rounded-full opacity-50 blur-[170px] md:top-1/4 top-1/3 md:right-1/4" />
//       <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[150px] -top-10" />
//       <Navbar />
//       <div className="md:h-[80dvh] h-[100dvh] relative overflow-hidden flex items-center justify-center">
//         {children}
//       </div>
//       <Footer />
//     </div>
//   )
// }

"use client"

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

export default function AuthLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div className='bg-darkBackground min-h-screen'>
      <div className="bg-primary-300 md:w-[50dvh] md:h-[50dvh] w-[40dvh] h-[40dvh] fixed rounded-full opacity-50 blur-[170px] md:top-1/4 top-1/3 md:right-1/4" />
      <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[150px] -top-10" />
      <Navbar />
      <div className="md:h-[80dvh] h-[100dvh] relative overflow-hidden flex items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  )
}