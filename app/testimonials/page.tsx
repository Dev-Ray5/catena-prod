"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { X, ChevronLeft, ChevronRight, MessageCircle, Quote } from "lucide-react"

export default function TestimonialsGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const testimonials = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: i === 0 ? `/testimonials (1).jpeg` : `/testimonials (${i + 1}).jpg`,
    alt: `Client Testimonial ${i + 1}`,
  }))

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + testimonials.length) % testimonials.length)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % testimonials.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }

  return (
    <>
      <Navbar />

      {/* Main content with top padding to account for fixed navbar */}
      <main className="pt-20">
        <section className="w-full py-20 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                <MessageCircle className="w-4 h-4" />
                <span>Client Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                What Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Clients Say
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Real feedback from real clients. See what makes our customers happy and why they trust us with their
                projects.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white border-2 border-gray-100"
                >
                  {/* WhatsApp Green Header Indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 z-10"></div>

                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={testimonial.src || "/placeholder.svg"}
                      alt={testimonial.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Quote className="w-5 h-5" />
                      <span>Click to view</span>
                    </div>
                  </div>

                  {/* WhatsApp icon indicator */}
                  <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2 shadow-lg opacity-90 group-hover:opacity-100 transition-opacity">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Message */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 text-lg mb-6">Join our growing family of satisfied customers</p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Project Today
              </a>
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedImage !== null && (
            <div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {selectedImage + 1} / {testimonials.length}
              </div>

              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    closeLightbox()
                  }
                }}
                className="relative w-full h-full md:w-auto md:h-auto md:max-w-4xl md:max-h-[90vh] flex items-center justify-center"
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={testimonials[selectedImage].src || "/placeholder.svg"}
                    alt={testimonials[selectedImage].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 90vw"
                    priority
                  />
                </div>
              </div>

              {/* Keyboard hints */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-white/60 text-xs">
                <span>← Previous</span>
                <span>|</span>
                <span>Next →</span>
                <span>|</span>
                <span>ESC to close</span>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
