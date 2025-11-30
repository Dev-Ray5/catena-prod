"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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

    if (contentRef.current) observer.observe(contentRef.current)
    if (imageRef.current) observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div
            ref={contentRef}
            className="opacity-0 translate-y-8 transition-all duration-700 animate-in:opacity-100 animate-in:translate-y-0"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-pretty">
              About Catena Dynamic Resources
            </h2>
            <div className="mb-6 pb-6 border-b-2 border-blue-600">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-600">
                Your Premier Paint Manufacturing & Construction Partner
              </h3>
            </div>

            <div className="space-y-4 text-gray-800">
              <p className="text-base md:text-lg leading-relaxed">
                At Catena Dynamic Resources Limited, we are passionate about transforming spaces through our{" "}
                <strong className="text-gray-900">high-quality paint manufacturing and comprehensive painting services</strong>. As a leading
                paint producer, we create custom formulations tailored to our clients' unique tastes and preferences,
                ensuring every project receives the perfect color and finish.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                Beyond our core paint business, we are a full-service construction company offering general
                construction, real estate solutions, modern roofing materials, carpentry services, building accessories,
                and maintenance. Our skilled professionals combine decades of experience with cutting-edge techniques to
                deliver exceptional results that stand the test of time.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                From residential homes to commercial buildings, we bring your vision to life with our comprehensive
                approach to construction and our signature paint products that truly make spaces come alive.
              </p>
            </div>

            <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Learn More
            </button>
          </div>

          {/* Image Section */}
          <div
            ref={imageRef}
            className="opacity-0 lg:translate-x-8 transition-all duration-700 delay-300 animate-in:opacity-100 lg:animate-in:translate-x-0"
          >
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/hero2.jpg"
                alt="Catena Dynamic Resources - Paint Manufacturing and Construction Services"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
      `}</style>
    </section>
  )
}

export default About