"use client"

import { useState, useEffect, useRef } from "react"

type StatKey = "projects" | "clients" | "experience" | "quality"

interface StatItem {
  key: StatKey
  target: number
  suffix: string
  label: string
  icon: string
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    quality: 0,
  })
  const [progress, setProgress] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    quality: 0,
  })
  const sectionRef = useRef(null)
  const hasAnimated = useRef(false)

  const statsData: StatItem[] = [
    {
      key: "projects",
      target: 1000,
      suffix: "+",
      label: "Completed Projects",
      icon: "🏗️",
    },
    {
      key: "clients",
      target: 200,
      suffix: "+",
      label: "Happy Clients",
      icon: "😊",
    },
    {
      key: "experience",
      target: 15,
      suffix: " years",
      label: "Years Experience",
      icon: "⭐",
    },
    {
      key: "quality",
      target: 100,
      suffix: "%",
      label: "Quality Assurance",
      icon: "✅",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true)
            hasAnimated.current = true
            startCountAnimation()
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const startCountAnimation = () => {
    const duration = 2000
    const frameRate = 60
    const totalFrames = (duration / 1000) * frameRate
    let currentFrame = 0

    const animate = () => {
      currentFrame++
      const progress = currentFrame / totalFrames

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      // Update both counts and progress bars simultaneously
      setCounts({
        projects: Math.floor(statsData[0].target * easeOutQuart),
        clients: Math.floor(statsData[1].target * easeOutQuart),
        experience: Math.floor(statsData[2].target * easeOutQuart),
        quality: Math.floor(statsData[3].target * easeOutQuart),
      })

      setProgress({
        projects: easeOutQuart * 100,
        clients: easeOutQuart * 100,
        experience: easeOutQuart * 100,
        quality: easeOutQuart * 100,
      })

      if (currentFrame < totalFrames) {
        requestAnimationFrame(animate)
      } else {
        // Ensure final values are exact
        setCounts({
          projects: statsData[0].target,
          clients: statsData[1].target,
          experience: statsData[2].target,
          quality: statsData[3].target,
        })
        setProgress({
          projects: 100,
          clients: 100,
          experience: 100,
          quality: 100,
        })
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <section ref={sectionRef} className="w-full py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
              Our Track Record
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Numbers That Define{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Excellence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our commitment to quality and client satisfaction speaks through these milestones
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.key}
              className={`group bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="mb-4 text-5xl transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Stat Number */}
              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {counts[stat.key as StatKey].toLocaleString()}
                  <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                </div>
              </div>

              {/* Stat Label */}
              <p className="text-gray-700 font-semibold text-base md:text-lg mb-6">{stat.label}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-full shadow-sm"
                  style={{
                    width: `${progress[stat.key as StatKey]}%`,
                    transition: "none",
                  }}
                />
              </div>

              {/* Percentage indicator */}
              <div className="mt-2 text-sm font-medium text-gray-500">
                {Math.round(progress[stat.key as StatKey])}%
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6 text-lg">Ready to be part of our success story?</p>
          <a 
            href={process.env.NEXT_PUBLIC_STORE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Project Today
          </a>
        </div>
      </div>
    </section>
  )
}