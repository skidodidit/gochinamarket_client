"use client";

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  Home,
  Phone,
  User,
  ChevronDown,
  Box
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Cart from './Cart';
import Profile from './Profile';
import UserAccountSidebar from './UserAccount';
import { useGlobalStore } from '@/store/useGlobalStore';

interface NavbarProps {
  show?: boolean;
}

export default function Navbar({ show = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { contacts, settings } = useGlobalStore()
  const [searchInput, setSearchInput] = useState("");


  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const loggedIn = typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') : null;

  // Animation variants
  const bannerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.9 }
  };

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15
      }
    }
  };

  const mobileMenuVariants: Variants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200
      }
    },
    exit: {
      x: "-100%",
      transition: {
        duration: 0.3
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Navigation items with their paths
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Box },
    { name: 'Used Products', path: '/used_products', icon: Box },
    { name: 'Contact', path: '/contact', icon: Phone },
    // { name: 'About', path: '/about', icon: Info },
  ];
  const mobileNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Box },
    { name: 'Used Products', path: '/used_products', icon: Box },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    // { name: 'About', path: '/about', icon: Info },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
  };

  const openAccount = () => {
    setIsAccountOpen(true);
    setIsMenuOpen(false);
  };

  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    if (!trimmed) return;

    // Navigate to absolute /products route with encoded query
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <>
      {/* Side components */}
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <Profile isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <UserAccountSidebar isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />

      {/* Top Banner */}
      {settings && (
        <motion.div
          className="bg-white/5 border-b border-white/20 backdrop-blur-sm text-white text-center py-3 md:px-4 px-2 text-center md:text-sm text-[10px]"
          initial="hidden"
          animate="visible"
          variants={bannerVariants}
        >
          <span>{settings?.bannerText}</span>
          <Link href={'/products'} className="underline font-semibold ml-2">
            ShopNow
          </Link>
        </motion.div>
      )}

      {/* Main Navbar */}
      <motion.nav
        className="bg-transparent px-4 lg:px-8 py-4 text-white relative"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href={'/'}>
            <motion.div
              className="flex items-center"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center relative pl-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={'/images/logos/logo.png'}
                  width={60}
                  height={60}
                  alt="GoChinaMarket"
                  className="absolute left-0 -ml-2"
                />
                <p className="text-primary-300 font-bold">{settings?.siteName}</p>
              </motion.div>
            </motion.div></Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-visibility flex items-center space-x-8">
            {navItems?.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-2 hover:text-primary-300 transition-colors ${active ? 'font-semibold text-primary-300' : 'text-white'
                      }`}
                  >
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full bg-primary-300 transition-all ${active ? 'opacity-100' : 'opacity-0'
                        }`}
                      whileHover={{ scale: 1.5 }}
                    />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}

            {loggedIn ? (
              <motion.div variants={itemVariants}>
                <button
                  onClick={openAccount}
                  className={`flex items-center gap-2 text-white hover:text-primary-300 transition-colors ${isActive('/account') ? 'font-semibold text-primary-300' : ''
                    }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-primary-300 transition-all ${isActive('/account') ? 'opacity-100' : 'opacity-0'
                    }`} />
                  Account
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="relative"
                ref={dropdownRef}
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:text-primary-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In <ChevronDown className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute z-50 right-0 mt-2 w-32 bg-transparent backdrop-blur-sm border border-white/60 shadow-md rounded-md flex flex-col text-sm overflow-hidden"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        href="/auth/register"
                        className="px-4 py-2 hover:bg-primary-300/20 transition-colors"
                      >
                        Sign Up
                      </Link>
                      <Link
                        href="/auth/login"
                        className="px-4 py-2 hover:bg-primary-300/20 transition-colors"
                      >
                        Login
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Search & Icons */}
          <div className="flex items-center">
            <motion.div
              className="desktop-visibility flex items-center bg-white/5 border border-white/20 backdrop-blur-sm rounded-md px-3 py-2"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent outline-none text-sm w-48"
              />
              <button onClick={handleSearch}>
                <Search className="w-4 h-4 text-white" />
              </button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/wishlist">
                <motion.button
                  className={`p-2 hover:bg-primary-300/20 rounded-full transition-colors relative ${isActive('/wishlist') ? 'text-primary-300' : ''
                    }`}
                  aria-label="Wishlist"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Heart className="w-4 h-4" />
                  <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-300 transition-all ${isActive('/wishlist') ? 'opacity-100' : 'opacity-0'
                    }`} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-primary-300/20 rounded-full transition-colors"
                aria-label="Cart"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ShoppingCart className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                className="lg:hidden p-2"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Menu className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {show && <motion.div
          className="md:hidden mt-3 flex items-center bg-white/5 border border-white/20 backdrop-blur-sm rounded-md px-3 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent outline-none text-sm flex-1"
          />
          <Search className="w-5 h-5 text-white" />
        </motion.div>}
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed h-[100dvh] overflow-hidden inset-0 bg-black/20 backdrop-blur-sm z-50 touch-none lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleMenu}
          >
            <motion.div
              className="relative touch-none left-0 top-0 h-full w-80 bg-black shadow-lg"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[100px] top-32" /> */}
              {/* Header */}
              <motion.div
                className="flex items-center justify-between py-4 pr-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center">
                  <Image src="/images/logos/logo.png" width={50} height={30} alt="GoChinaMarket" />
                  <p className="text-primary-300 font-bold">{settings?.siteName}</p>
                </div>
                <motion.button
                  onClick={toggleMenu}
                  className="p-2"
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" color='#30d9dc' />
                </motion.button>
              </motion.div>

              {/* Menu Links */}
              <div className="flex flex-col p-4 space-y-4 text-sm">
                {mobileNavItems?.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 py-2 transition-colors ${active ? 'text-primary-300 font-semibold' : 'text-white hover:text-primary-300'
                          }`}
                        onClick={toggleMenu}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full bg-primary-300 transition-all ${active ? 'opacity-100' : 'opacity-0'
                            }`} />
                          <Icon className="w-4 h-4" />
                        </div>
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {loggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={openAccount}
                      className={`flex items-center gap-3 py-2 transition-colors ${isActive('/account') ? 'text-primary-300 font-semibold' : 'text-white hover:text-primary-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-primary-300 transition-all ${isActive('/account') ? 'opacity-100' : 'opacity-0'
                          }`} />
                        <User className="w-4 h-4" />
                      </div>
                      Account
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-3 text-white hover:text-primary-300 py-2"
                    >
                      <User className="w-4 h-4 text-white" />
                      Sign In <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          className="ml-6 mt-2 flex flex-col gap-1 overflow-hidden shadow-md rounded-xl pl-4 pb-2"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            href="/auth/register"
                            className="py-1 text-white hover:text-primary-300"
                          >
                            Sign Up
                          </Link>
                          <Link
                            href="/auth/login"
                            className="py-1 text-white hover:text-primary-300"
                          >
                            Login
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <motion.div
                className="absolute bottom-1 border-t border-black/20 w-full text-sm px-5 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p>Get the best items on <span className='text-primary-300'>{settings?.siteName}</span></p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}