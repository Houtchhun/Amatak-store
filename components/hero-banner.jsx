"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const bannerImages = [
  {
    src: "/placeholder.svg?height=700&width=1200",
    title: "Summer Collection 2025",
    description: "Discover our premium footwear collection with up to 50% off on selected items. Limited time offer!",
  },
  {
    src: "/placeholder.svg?height=700&width=1200",
    title: "New Arrivals",
    description: "Step into style with our latest collection of premium sneakers and casual wear.",
  },
  {
    src: "/placeholder.svg?height=700&width=1200",
    title: "Athletic Performance",
    description: "Unleash your potential with our high-performance athletic footwear collection.",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  return (
    <section className="relative h-[500px] md:h-[700px] overflow-hidden rounded-2xl mx-4 my-8">
      {bannerImages.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.src || "/placeholder.svg"}
            alt={banner.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-12 left-12 text-white max-w-lg">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{banner.title}</h2>
            <p className="text-lg md:text-xl mb-6 drop-shadow-md">{banner.description}</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center gap-2">
              SHOP NOW
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
      >
        <ArrowRight size={24} className="rotate-180" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
      >
        <ArrowRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
