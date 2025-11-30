"use client"

import { useState, useEffect, SetStateAction } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { 
  Hammer,
  Shield,
  CheckCircle,
  Trees,
  Sparkles,
  DollarSign,
  Timer,
  Award,
  Leaf,
  Bug,
  Home,
  Ruler,
  Drill,
  Wrench,
  Users,
  Clock,
  ShieldCheck,
  Phone,
  FileText,
  Zap,
  Target
} from "lucide-react"

export default function CarpentryServices() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const carouselImages = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    src: `/carpentry (${i + 1}).jpg`,
    alt: `Catena Professional Carpentry Service ${i + 1}`,
  }))

  const benefits = [
    {
      icon: Trees,
      title: "Premium Wood Quality",
      description: "High-quality timber sourced from trusted suppliers for superior craftsmanship",
    },
    {
      icon: Bug,
      title: "Naturally Termite-Free",
      description: "Our wood is naturally resistant to termites without chemical treatments",
    },
    {
      icon: Leaf,
      title: "No Chemical Preservation",
      description: "Pure, untreated wood that's safe for your family and the environment",
    },
    {
      icon: Shield,
      title: "Built to Last",
      description: "Durable constructions designed to withstand years of daily use",
    },
    {
      icon: Hammer,
      title: "Expert Craftsmanship",
      description: "Skilled carpenters with years of experience in fine woodworking",
    },
    {
      icon: Sparkles,
      title: "Custom Designs",
      description: "Tailored solutions that perfectly match your vision and space",
    },
    {
      icon: Timer,
      title: "Timely Delivery",
      description: "Projects completed on schedule without compromising quality",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Excellent value for premium quality carpentry services",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive quality assurance",
    },
    {
      icon: Target,
      title: "Precision Work",
      description: "Meticulous attention to detail in every cut, joint, and finish",
    },
  ]

  const services = [
    {
      title: "Custom Furniture",
      icon: Home,
      description: "Bespoke furniture pieces crafted to your exact specifications and style preferences",
      features: [
        "Dining tables & chairs",
        "Wardrobes & closets",
        "Kitchen cabinets",
        "Bed frames & headboards",
        "Shelving units",
      ],
    },
    {
      title: "Door & Window Frames",
      icon: Ruler,
      description: "Expertly crafted door and window frames that combine beauty with functionality",
      features: [
        "Interior door frames",
        "Exterior door installations",
        "Window frames & sills",
        "Custom sizing available",
        "Weather-resistant finishes",
      ],
    },
    {
      title: "Structural Carpentry",
      icon: Drill,
      description: "Solid structural work including roofing, framing, and foundation support",
      features: [
        "Roof trusses & rafters",
        "Wall framing",
        "Floor joists",
        "Deck construction",
        "Pergolas & gazebos",
      ],
    },
  ]

  const woodTypes = [
    {
      name: "Hardwood Timber",
      icon: Trees,
      properties: ["Naturally termite-resistant", "Dense & durable", "Beautiful grain patterns", "No chemical treatment needed"],
    },
    {
      name: "Premium Plywood",
      icon: Shield,
      properties: ["Multi-layer strength", "Moisture resistant", "Stable & warp-free", "Eco-friendly adhesives"],
    },
    {
      name: "Specialty Woods",
      icon: Sparkles,
      properties: ["Exotic hardwoods", "Weather-resistant species", "Custom finishes available", "Sustainably sourced"],
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, carouselImages.length])

  const goToSlide = (index: SetStateAction<number>) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold tracking-wide uppercase">
                Master Carpentry Services
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Expert Carpentry Services &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-gray-200">
                Premium Termite-Free Wood Supply
              </span>
            </h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto mb-8">
              Transforming spaces with exceptional woodwork crafted from high-quality, naturally termite-resistant 
              timber that requires no chemical preservation. Pure quality, expert craftsmanship.
            </p>
          </div>

          {/* Image Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              {/* Images */}
              {carouselImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Autoplay Control */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-10"
              >
                {isAutoPlay ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-8 h-2 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">
                Carpentry Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From custom furniture to structural work, we deliver excellence in every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
                >
                  <div className="mb-4">
                    <IconComponent className="w-12 h-12 text-slate-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wood Quality Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Premium{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-gray-600">
                  Termite-Free Wood
                </span>
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  We supply and work exclusively with <strong>high-quality wood that is naturally termite-resistant</strong>, 
                  eliminating the need for harmful chemical preservatives. Our timber is carefully selected for its natural 
                  durability and resistance to pests.
                </p>
                <p>
                  This means your carpentry projects are not only beautiful and long-lasting, but also <strong>completely 
                  safe for your family and the environment</strong>. No toxic chemicals, no harsh treatments—just pure, 
                  natural wood at its finest.
                </p>
                <p>
                  Our wood selection includes premium hardwoods known for their natural termite resistance, structural 
                  integrity, and stunning aesthetics. Each piece is inspected to ensure it meets our rigorous quality 
                  standards before being crafted into your custom project.
                </p>
                <p>
                  Whether you're building furniture, installing door frames, or undertaking structural work, you can trust 
                  that our wood will stand the test of time without compromising your health or the environment.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-slate-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-slate-600" />
                  Wood Quality Guarantee
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Bug className="w-6 h-6 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Naturally termite-resistant timber species</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Leaf className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Zero chemical preservation required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-slate-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Premium grade hardwoods for longevity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Trees className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Sustainably sourced from trusted suppliers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Rigorous quality inspection process</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Wood Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {woodTypes.map((wood, index) => {
              const IconComponent = wood.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="w-8 h-8 text-amber-600" />
                    <h3 className="text-xl font-bold text-gray-900">{wood.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {wood.properties.map((property, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                        <span className="text-sm text-gray-700">{property}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Catena Carpentry
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Excellence in craftsmanship, quality materials, and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-amber-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="mb-4">
                    <IconComponent className="w-10 h-10 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Professional Team Section */}
      <section className="py-20 bg-gradient-to-br from-amber-700 to-orange-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Expert Carpentry Team
            </h2>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Our skilled carpenters bring decades of combined experience to every project, delivering 
              exceptional craftsmanship with precision, care, and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Master Craftsmen</h3>
              <p className="text-amber-100">
                Highly skilled professionals with years of experience in fine woodworking and carpentry
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Wrench className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Professional Tools</h3>
              <p className="text-amber-100">
                State-of-the-art equipment ensuring precision cuts and flawless finishes every time
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-14 h-14 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Reliable Service</h3>
              <p className="text-amber-100">
                Punctual, professional, and committed to completing your project on time and on budget
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Contact us today for a free consultation and discover how our expert carpentry services 
            and premium termite-free wood can bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-amber-700 to-orange-800 text-white font-semibold rounded-xl hover:from-amber-800 hover:to-orange-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Request a Quote
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-amber-700 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </>
  )
}