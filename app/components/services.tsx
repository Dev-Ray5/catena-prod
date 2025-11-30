"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Services = () => {
  const [currentService, setCurrentService] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  const services = [
    {
      title: "General Construction",
      subtitle: "Our experts are always ready to carry out your construction works according to plan and as scheduled",
      image: "/hero6.jpg",
    },
    {
      title: "Real Estate",
      subtitle:
        "We provide comprehensive real estate solutions, from property development to investment consulting, helping you make informed decisions in the property market",
      image: "/real-estate.webp",
    },
    {
      title: "Modern Roofing Materials",
      subtitle:
        "We supply and install Stone coated metal roofing tiles, Aluminium roofing sheets, and PVC rainwater system",
      image: "/roof (2).jpg",
    },
    {
      title: "High Quality Catena Paints & Painting Services",
      subtitle:
        "Our paints are produced according to our clients' taste to liven up your space, giving a neat & beautiful finish. Skilled painters are available to carry out all your paint works",
      image: "/paint.jpg",
    },
    {
      title: "Carpentry Services",
      subtitle:
        "We offer excellent carpentry services and supply high-quality wood that is termite-free and doesn't need to be preserved with chemicals",
      image: "/carpentry.jpg",
    },
    {
      title: "Building Accessories",
      subtitle:
        "We supply and install Aluminium casement windows, high quality doors, South African bricks, stainless steel handrails and Ornamental Wrought Iron components for a beautiful finish",
      image: "/building-accessories.webp",
    },
    {
      title: "Product Installation",
      subtitle:
        "We not only supply high quality roofing products and building accessories; but also carry out their installations",
      image: "/hero6.jpg",
    },
    {
      title: "Maintenance Services",
      subtitle:
        "We repair and revamp old, faded, leaking and faulty roofing jobs. Our services are carried out by highly skilled and experienced professionals",
      image: "/maintenance.avif",
    },
  ]

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length)
    setIsAutoplay(false)
  }

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoplay(false)
  }

  const goToService = (index: number) => {
    setCurrentService(index)
    setIsAutoplay(false)
  }

  useEffect(() => {
    if (!isAutoplay) {
      const timer = setTimeout(() => setIsAutoplay(true), 10000)
      return () => clearTimeout(timer)
    }

    const autoplayInterval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(autoplayInterval)
  }, [isAutoplay, services.length])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    if (titleRef.current) observer.observe(titleRef.current)
    if (subtitleRef.current) observer.observe(subtitleRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 opacity-0 transition-all duration-700 animate-in:opacity-100"
          >
            Our Services
          </h2>
          <p 
            ref={subtitleRef} 
            className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto opacity-0 transition-all duration-700 delay-200 animate-in:opacity-100 leading-relaxed"
          >
            We have worked on different successful projects and supplied quality Roofing Materials of different kinds
            such as Stone Coated Metal Roofing Tiles, Aluminium Roofing Sheets, and Many other Building products.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevService}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Previous service"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextService}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-blue-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Next service"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentService * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden group">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index === currentService}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      

                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToService(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentService 
                  ? "bg-blue-600 w-10 h-3" 
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}

export default Services