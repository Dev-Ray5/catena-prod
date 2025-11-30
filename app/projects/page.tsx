"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface ImageItem {
  id: number
  src: string
  alt: string
  category: "residential" | "commercial" | "industrial"
}

export default function PortfolioGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<string>("all")
  const [galleryMode, setGalleryMode] = useState(false)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [transition, setTransition] = useState("fade")
  const galleryIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Generate image array with categories
  const images: ImageItem[] = [
    // Residential: img (1) - (20)
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      src: `/img (${i + 1}).jpg`,
      alt: `Residential Project ${i + 1} - Catena Dynamic Resources`,
      category: "residential" as const,
    })),
    // Industrial: img (21) - (35)
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 21,
      src: `/img (${i + 21}).jpg`,
      alt: `Industrial Project ${i + 21} - Catena Dynamic Resources`,
      category: "industrial" as const,
    })),
    // Commercial: img (36) - (50)
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 36,
      src: `/img (${i + 36}).jpg`,
      alt: `Commercial Project ${i + 36} - Catena Dynamic Resources`,
      category: "commercial" as const,
    })),
  ]

  const filteredImages = filter === "all" 
    ? images 
    : images.filter((img) => img.category === filter)

  const transitions = ["fade", "slide", "zoom", "rotate"]

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5)
    return shuffled
  }

  const [galleryImages, setGalleryImages] = useState(shuffleImages())

  const startGalleryMode = () => {
    setGalleryMode(true)
    setCurrentGalleryImage(0)
    setIsPaused(false)
    setGalleryImages(shuffleImages())
    document.body.style.overflow = "hidden"
  }

  const closeGalleryMode = () => {
    setGalleryMode(false)
    setIsPaused(false)
    if (galleryIntervalRef.current) {
      clearInterval(galleryIntervalRef.current)
    }
    document.body.style.overflow = "unset"
  }

  useEffect(() => {
    if (galleryMode && !isPaused) {
      galleryIntervalRef.current = setInterval(() => {
        setTransition(transitions[Math.floor(Math.random() * transitions.length)])
        setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
      }, 3000)
    } else if (galleryIntervalRef.current) {
      clearInterval(galleryIntervalRef.current)
    }

    return () => {
      if (galleryIntervalRef.current) {
        clearInterval(galleryIntervalRef.current)
      }
    }
  }, [galleryMode, isPaused, galleryImages])

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set([...prev, id]))
  }

  const openLightbox = (image: ImageItem) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const newIndex = direction === "next" 
      ? (currentIndex + 1) % filteredImages.length 
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") navigateImage("next")
      if (e.key === "ArrowLeft") navigateImage("prev")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, filteredImages])

  const getCategoryCount = (category: string) => {
    if (category === "all") return images.length
    return images.filter((img) => img.category === category).length
  }

  return (
    <>
      <Navbar />
      <section className="w-full py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                Our Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Project{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Portfolio
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our extensive collection of completed projects showcasing quality craftsmanship, 
              innovative solutions, and exceptional results
            </p>

            {/* Gallery Mode Button */}
            <div className="mb-8">
              <button
                onClick={startGalleryMode}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🎬 Gallery Mode
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { key: "all", label: "All Projects" },
                { key: "residential", label: "Residential" },
                { key: "industrial", label: "Industrial" },
                { key: "commercial", label: "Commercial" },
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setFilter(category.key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    filter === category.key
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-75">
                    ({getCategoryCount(category.key)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                onClick={() => openLightbox(image)}
              >
                {/* Skeleton Loader */}
                {!loadedImages.has(image.id) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
                  </div>
                )}

                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                    loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(image.id)}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-blue-600 rounded text-xs font-semibold uppercase">
                        {image.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-200">Click to expand</p>
                  </div>
                </div>

                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Stats */}
          <div className="mt-16 text-center">
            <div className="inline-block px-6 py-3 bg-white rounded-full shadow-md">
              <p className="text-gray-700">
                Showing <span className="font-bold text-blue-600">{filteredImages.length}</span> {filter === "all" ? "total" : filter} projects
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Solutions Like These
            </h3>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Ready to transform your space with our expert services? Explore our products or get in touch for a consultation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={process.env.NEXT_PUBLIC_STORE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🛒 Visit Store
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                📧 Make Enquiries
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Mode Modal */}
        {galleryMode && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-50">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                {isPaused ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>
              <button
                onClick={closeGalleryMode}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Display */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div 
                key={currentGalleryImage}
                className={`absolute inset-0 gallery-${transition}`}
              >
                <Image
                  src={galleryImages[currentGalleryImage].src}
                  alt={galleryImages[currentGalleryImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <p className="text-white font-medium capitalize">
                {galleryImages[currentGalleryImage].category} Project
              </p>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              onClick={closeLightbox}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button - Always visible */}
            <button
              className="absolute left-2 sm:left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("prev")
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button - Always visible */}
            <button
              className="absolute right-2 sm:right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50"
              onClick={(e) => {
                e.stopPropagation()
                navigateImage("next")
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <p className="text-white font-medium">
                <span className="capitalize">{selectedImage.category}</span> - {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .gallery-fade {
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .gallery-slide {
            animation: slideIn 1s ease-out;
          }

          @keyframes zoomIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .gallery-zoom {
            animation: zoomIn 1s ease-out;
          }

          @keyframes rotateIn {
            from { transform: rotate(-180deg) scale(0); opacity: 0; }
            to { transform: rotate(0) scale(1); opacity: 1; }
          }
          .gallery-rotate {
            animation: rotateIn 1s ease-out;
          }
        `}</style>
      </section>
      <Footer />
    </>
  )
}