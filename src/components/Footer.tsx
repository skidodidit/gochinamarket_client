import { Send, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, Play } from 'lucide-react';
import Image from 'next/image';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function Footer() {
  const {contacts, settings}= useGlobalStore()

  return (
    <footer className="bg-black text-white ">
      <div className="w-full max-w-7xl mx-auto md:px-10 px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Exclusive - Subscribe */}
          <div>
            <div className="flex items-center">
              <Image src={'/images/logos/logo.png'} width={50} height={20} alt="GoChinaMarket" />
              <p className="text-primary-300 font-bold">{settings?.siteName || 'GoChinaMarket'}</p>
            </div>
            {/* <h4 className="text-lg font-medium mb-4">Subscribe</h4>
            <p className="text-gray-300 mb-4">Get 10% off your first order</p> */}
            {/* <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-white rounded px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-gray-300"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div> */}
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-gray-300">
              <li>{contacts?.address}</li>
              <li className="pt-2">
                <a href="mailto:exclusive@gmail.com" className="hover:text-white transition-colors">
                  {contacts?.email}
                </a>
              </li>
              <li>
                <a href="tel:+88015-88888-9999" className="hover:text-white transition-colors">
                  {contacts?.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Account</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Link</h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Socials</h3>
            <p className="text-gray-400 text-sm mb-4">Follow us or reach out to us on any of these</p>

            {/* Social Media Icons */}
            <div className="grid md:grid-cols-2 grid-cols-6 gap-6 text-white">
              <a href={contacts?.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Facebook className="w-5 h-5" fill="currentColor" />
              </a>
              <a href={contacts?.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Twitter className="w-5 h-5" fill="currentColor" />
              </a>
              <a href={contacts?.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={contacts?.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Play className="w-5 h-5" fill="currentColor" />
              </a>
              <a href={contacts?.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Youtube className="w-5 h-5" fill="currentColor" />
              </a>
              <a href={contacts?.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <MessageCircle className="w-5 h-5" fill="currentColor" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <div className="text-center text-gray-600 text-sm">
          © Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
}