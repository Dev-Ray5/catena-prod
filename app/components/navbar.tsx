"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
        setServicesOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setServicesOpen(false)
  }

  const toggleServices = () => {
    setServicesOpen(!servicesOpen)
  }

  const toggleDesktopServices = () => {
    setDesktopServicesOpen(!desktopServicesOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
    setServicesOpen(false)
    setDesktopServicesOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.services-dropdown')) {
        setDesktopServicesOpen(false)
      }
    }

    if (desktopServicesOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [desktopServicesOpen])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md" 
          : "bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" onClick={handleLinkClick}>
            <Image 
              src="/logo.png" 
              alt="Catena Dynamic Resources" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              Home
            </a>
            <a 
              href="/about" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              About Us
            </a>

            {/* Services Dropdown - Touch & Click Compatible */}
            <div className="relative services-dropdown">
              <button 
                onClick={toggleDesktopServices}
                className={`transition-colors flex items-center gap-1 font-medium ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600" 
                    : "text-white hover:text-blue-300"
                }`}
              >
                Services
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform duration-200 ${
                    desktopServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div 
                className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 z-50 ${
                  desktopServicesOpen 
                    ? "opacity-100 visible translate-y-0" 
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <a
                  href="#roofing"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 first:rounded-t-lg transition-colors"
                  onClick={handleLinkClick}
                >
                  Roofing Solutions
                </a>
                <a
                  href="#construction"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
                  onClick={handleLinkClick}
                >
                  Construction Materials
                </a>
                <a
                  href="/services/painting-services"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100"
                  onClick={handleLinkClick}
                >
                  Painting Services
                </a>
                <a
                  href="#consultation"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 last:rounded-b-lg transition-colors border-t border-gray-100"
                  onClick={handleLinkClick}
                >
                  Design Consultation
                </a>
              </div>
            </div>

            <a 
              href="{process.env.NEXT_PUBLIC_STORE_LINK}" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              Store
            </a>
            <a 
              href="/projects" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              Our Projects
            </a>
            <a 
              href="/testimonials" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              Testimonials
            </a>
            <a 
              href="/contact" 
              className={`transition-colors font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white hover:text-blue-300"
              }`}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden transition-colors ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <a
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                About Us
              </a>

              {/* Mobile Services Dropdown */}
              <button
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center justify-between font-medium"
                onClick={toggleServices}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-200 ${
                  servicesOpen ? "max-h-64" : "max-h-0"
                }`}
              >
                <div className="pl-4 space-y-1 py-1">
                  <a
                    href="/services/painting-services"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    onClick={handleLinkClick}
                  >
                    Painting Services
                  </a>
                  <a
                    href="#roofing"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    onClick={handleLinkClick}
                  >
                    Roofing Solutions
                  </a>
                  <a
                    href="#construction"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    onClick={handleLinkClick}
                  >
                    Construction Materials
                  </a>
                  <a
                    href="#consultation"
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    onClick={handleLinkClick}
                  >
                    Design Consultation
                  </a>
                </div>
              </div>

              <a
                href="{process.env.NEXT_PUBLIC_STORE_LINK}"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                Store
              </a>
              <a
                href="/projects"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                Our Projects
              </a>
              <a
                href="/testimonials"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                Testimonials
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium"
                onClick={handleLinkClick}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}