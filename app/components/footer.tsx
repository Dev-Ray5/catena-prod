"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Catena Dynamic Resources" 
                width={40} 
                height={40} 
                className="h-10 w-auto"
              />
              <h3 className="text-white font-bold text-lg">Catena Dynamic</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Your premier partner in paint manufacturing, construction, and roofing solutions. 
              Building excellence, one project at a time.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={process.env.NEXT_PUBLIC_STORE_LINK}
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Store
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="/projects" 
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/terms" 
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-sm hover:text-blue-500 transition-colors duration-300 inline-block hover:translate-x-1 transform"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                <a href="tel:+234" className="text-sm hover:text-blue-500 transition-colors duration-300">
                  +234 XXX XXX XXXX
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:info@catena.com" className="text-sm hover:text-blue-500 transition-colors duration-300">
                  info@catena.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Catena Dynamic Resources. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Developed by{" "}
              <span className="drexx-tech font-semibold">
                Drexx Tech
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .drexx-tech {
          background: linear-gradient(90deg, #10b981, #34d399, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .drexx-tech:hover {
          animation: shimmer 1.5s linear infinite;
        }
      `}</style>
    </footer>
  )
}