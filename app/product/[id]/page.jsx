"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AddToCartModal from "@/components/add-to-cart-modal"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react'

// Mock product data (in real app, this would come from API)
// Ensure each product object has its ID as the key
const productData = {
  1: {
    id: "1",
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "Sneakers",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 128,
    description:
      "The Nike Air Max 90 delivers visible cushioning under every step. The design draws inspiration from the Air Max 93 and Air Max 180, featuring Nike's largest heel Air unit yet for a super-soft ride that feels as impossible as it looks.",
    features: [
      "Nike's largest Air unit provides maximum cushioning",
      "Engineered mesh upper for breathability",
      "Rubber outsole with waffle pattern for traction",
      "Pull tabs on tongue and heel for easy on/off",
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Black",
        value: "#000000",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "White",
        value: "#ffffff",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      },
      {
        name: "Red",
        value: "#FF0000",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
      },
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    inStock: true,
    badge: "SALE",
  },
  2: {
    id: "2",
    name: "Adidas Ultraboost",
    brand: "Adidas",
    category: "Running",
    price: 179.99,
    rating: 4.8,
    reviewCount: 150,
    description:
      "The Adidas Ultraboost offers unparalleled comfort and energy return. Designed for runners, its Boost midsole provides responsive cushioning for a smooth ride.",
    features: [
      "Boost midsole for incredible energy return",
      "Primeknit upper for adaptive support and comfort",
      "Stretchweb outsole with Continental™ Rubber for superior grip",
      "Fitcounter molded heel counter for a natural fit",
    ],
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Black",
        value: "#000000",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
      },
      {
        name: "Blue",
        value: "#0000FF",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
      },
      {
        name: "Gray",
        value: "#808080",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop",
      },
    ],
    sizes: ["7", "8", "9", "10"],
    inStock: true,
  },
  3: {
    id: "3",
    name: "Jordan 1 Retro High",
    brand: "Jordan",
    category: "Basketball",
    price: 229.99,
    rating: 4.7,
    reviewCount: 100,
    description:
      "The iconic Jordan 1 Retro High brings classic style and comfort to the court and the streets. A must-have for sneaker enthusiasts.",
    features: [
      "Premium leather upper for durability and support",
      "Air-Sole unit in the heel for lightweight cushioning",
      "Solid rubber outsole for traction on a variety of surfaces",
      "Classic high-top silhouette",
    ],
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Red",
        value: "#FF0000",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      },
      {
        name: "White",
        value: "#ffffff",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      },
      {
        name: "Black",
        value: "#000000",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
      },
    ],
    sizes: ["8", "9", "10", "11"],
    inStock: true,
    badge: "NEW",
  },
  4: {
    id: "4",
    name: "Vans Old Skool",
    brand: "Vans",
    category: "Skate",
    price: 79.99,
    rating: 4.6,
    reviewCount: 180,
    description:
      "The Vans Old Skool, the first to bear the iconic side stripe, is a low top lace-up shoe with re-enforced toecaps to withstand repeated wear, padded collars for support and flexibility, and signature rubber waffle outsoles.",
    features: [
      "Sturdy canvas and suede uppers",
      "Re-enforced toecaps",
      "Padded collars for support",
      "Signature rubber waffle outsoles",
    ],
    images: [
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Black",
        value: "#000000",
        image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Navy",
        value: "#000080",
        image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
      },
      {
        name: "Gray",
        value: "#808080",
        image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=2070&auto=format&fit=crop",
      },
    ],
    sizes: ["6", "7", "8", "9"],
    inStock: true,
  },
  5: {
    id: "5",
    name: "New Balance 574",
    brand: "New Balance",
    category: "Casual",
    price: 99.99,
    rating: 4.4,
    reviewCount: 90,
    description:
      "The New Balance 574 is a classic and versatile sneaker, known for its comfortable fit and timeless design. Perfect for everyday wear.",
    features: [
      "ENCAP midsole technology for support and durability",
      "Lightweight EVA foam cushioning in the midsole and heel",
      "Suede and mesh upper for breathability and style",
      "Rubber outsole for traction",
    ],
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Gray",
        value: "#808080",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
      },
      {
        name: "Blue",
        value: "#0000FF",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
      },
      {
        name: "Green",
        value: "#008000",
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1964&auto=format&fit=crop",
      },
    ],
    sizes: ["7", "8", "9", "10"],
    inStock: true,
  },
  6: {
    id: "6",
    name: "Salomon Speedcross 5",
    brand: "Salomon",
    category: "Running",
    price: 149.99,
    rating: 4.9,
    reviewCount: 200,
    description:
      "The Salomon Speedcross 5 is a trail running shoe designed for aggressive grip and dynamic comfort. Ideal for technical trails and soft ground.",
    features: [
      "Contagrip® TA outsole for maximum grip on loose, soft, or rugged uneven surfaces",
      "EnergyCell™+ high-rebound midsole for exceptional energy return",
      "SensiFit™ cradles the foot from the midsole to the lacing system",
      "Welded upper construction for a smooth, glove-like fit",
    ],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    ],
    colors: [
      {
        name: "Black",
        value: "#000000",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      },
      {
        name: "Red",
        value: "#FF0000",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      },
      {
        name: "Yellow",
        value: "#FFFF00",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      },
    ],
    sizes: ["8", "9", "10", "11"],
    inStock: true,
  },
  7: {
    id: "7",
    name: "Allbirds Wool Runner",
    brand: "Allbirds",
    category: "Casual",
    price: 119.99,
    rating: 4.7,
    reviewCount: 130,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop",
    colors: ["Gray", "Blue", "Green"],
    sizes: ["6", "7", "8", "9"],
  },
  8: {
    id: "8",
    name: "Converse Chuck Taylor All Star",
    brand: "Converse",
    category: "Skate",
    price: 64.99,
    rating: 4.5,
    reviewCount: 160,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
    colors: ["Black", "White", "Red"],
    sizes: ["7", "8", "9", "10"],
  },
  9: {
    id: "9",
    name: "Puma RS-X",
    brand: "Puma",
    category: "Sneakers",
    price: 109.99,
    rating: 4.6,
    reviewCount: 140,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887&auto=format&fit=crop",
    colors: ["White", "Black", "Blue"],
    sizes: ["8", "9", "10", "11"],
  },
  10: {
    id: "10",
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "Casual",
    price: 99.99,
    rating: 4.8,
    reviewCount: 170,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    colors: ["White", "Black", "Gray"],
    sizes: ["6", "7", "8", "9"],
  },
  // Shirts
  11: { // Added key '11'
    id: "11",
    name: "Classic Cotton T-Shirt",
    brand: "BasicWear",
    category: "Shirts",
    price: 24.99,
    rating: 4.3,
    reviewCount: 90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  12: { // Added key '12'
    id: "12",
    name: "Women's Linen Blouse",
    brand: "Elegance",
    category: "Shirts",
    price: 49.99,
    originalPrice: 60.0,
    rating: 4.7,
    reviewCount: 55,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    badge: "SALE",
    colors: ["White", "Blue", "Pink"],
    sizes: ["XS", "S", "M", "L"],
  },
  13: { // Added key '13'
    id: "13",
    name: "Performance Dry-Fit Tee",
    brand: "ActiveFit",
    category: "Shirts",
    price: 34.99,
    rating: 4.6,
    reviewCount: 72,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
    colors: ["Navy", "Black", "Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  // Caps & Hats
  14: { // Added key '14'
    id: "14",
    name: "Classic Baseball Cap",
    brand: "Headwear Co.",
    category: "Caps & Hats",
    price: 19.99,
    rating: 4.1,
    reviewCount: 110,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2036&auto=format&fit=crop",
    colors: ["Black", "Navy", "Red"],
    sizes: ["One Size"],
  },
  15: { // Added key '15'
    id: "15",
    name: "Winter Beanie",
    brand: "Warmth Gear",
    category: "Caps & Hats",
    price: 29.99,
    rating: 4.8,
    reviewCount: 60,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=2036&auto=format&fit=crop",
    badge: "NEW",
    colors: ["Gray", "Black", "Burgundy"],
    sizes: ["One Size"],
  },
  // Pants & Jeans
  16: { // Added key '16'
    id: "16",
    name: "Men's Slim Fit Jeans",
    brand: "DenimPro",
    category: "Pants & Jeans",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviewCount: 130,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  17: { // Added key '17'
    id: "17",
    name: "Women's High-Waisted Leggings",
    brand: "FlexiWear",
    category: "Pants & Jeans",
    price: 39.99,
    rating: 4.9,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2026&auto=format&fit=crop",
    colors: ["Black", "Navy", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  // Jackets & Coats
  18: { // Added key '18'
    id: "18",
    name: "Men's Bomber Jacket",
    brand: "UrbanStyle",
    category: "Jackets & Coats",
    price: 119.99,
    rating: 4.5,
    reviewCount: 70,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2070&auto=format&fit=crop",
    colors: ["Black", "Olive", "Navy"],
    sizes: ["S", "M", "L", "XL"],
  },
  19: { // Added key '19'
    id: "19",
    name: "Women's Puffer Coat",
    brand: "WinterShield",
    category: "Jackets & Coats",
    price: 189.99,
    originalPrice: 220.0,
    rating: 4.7,
    reviewCount: 45,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2070&auto=format&fit=crop",
    badge: "SALE",
    colors: ["Black", "Cream", "Red"],
    sizes: ["XS", "S", "M", "L"],
  },
  // Accessories
  20: { // Added key '20'
    id: "20",
    name: "Leather Wallet",
    brand: "CraftedGoods",
    category: "Accessories",
    price: 59.99,
    rating: 4.6,
    reviewCount: 80,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    colors: ["Brown", "Black"],
    sizes: ["One Size"],
  },
  21: { // Added key '21'
    id: "21",
    name: "Classic Aviator Sunglasses",
    brand: "ShadeCo",
    category: "Accessories",
    price: 39.99,
    rating: 4.2,
    reviewCount: 100,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1974&auto=format&fit=crop",
    colors: ["Gold", "Silver"],
    sizes: ["One Size"],
  },
  // Sportswear
  22: { // Added key '22'
    id: "22",
    name: "Men's Athletic Shorts",
    brand: "SportPro",
    category: "Sportswear",
    price: 29.99,
    rating: 4.5,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    colors: ["Black", "Gray", "Blue"],
    sizes: ["S", "M", "L", "XL"],
  },
  23: { // Added key '23'
    id: "23",
    name: "Women's Yoga Leggings",
    brand: "ZenFit",
    category: "Sportswear",
    price: 44.99,
    rating: 4.8,
    reviewCount: 150,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
    colors: ["Black", "Navy", "Burgundy"],
    sizes: ["XS", "S", "M", "L"],
  },
  // Underwear & Socks
  24: { // Added key '24'
    id: "24",
    name: "Men's Boxer Briefs (3-pack)",
    brand: "ComfortWear",
    category: "Underwear & Socks",
    price: 25.0,
    rating: 4.3,
    reviewCount: 115,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=2070&auto=format&fit=crop",
    colors: ["Multi", "Black", "White"],
    sizes: ["S", "M", "L", "XL"],
  },
  25: { // Added key '25'
    id: "25",
    name: "Athletic Ankle Socks (6-pack)",
    brand: "FootComfort",
    category: "Underwear & Socks",
    price: 18.0,
    rating: 4.6,
    reviewCount: 200,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=2070&auto=format&fit=crop",
    colors: ["White", "Black", "Gray"],
    sizes: ["One Size"],
  },
}

// This page component is for app/product/[id]/page.jsx
// It should display details for a single product based on the 'id' param.
const ProductDetailPage = () => {
  const params = useParams()
  const productId = params.id

  const [searchQuery, setSearchQuery] = useState("") // Add this line

  const product = productData[productId]

  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.image || '')
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || product?.colors?.[0] || ''
  )
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
          <p className="mt-4 text-lg text-gray-700">The product with ID "{productId}" does not exist.</p>
          <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Go to Homepage
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    // Use "default" for color/size if not applicable
    const colorValue =
      product.colors && product.colors.length > 0
        ? selectedColor
        : "default"
    const sizeValue =
      product.sizes && product.sizes.length > 0
        ? selectedSize
        : "default"

    // Prevent adding if color or size is required but not selected
    if (
      (product.colors && product.colors.length > 0 && !selectedColor) ||
      (product.sizes && product.sizes.length > 0 && !selectedSize)
    ) {
      alert("Please select a color and size.")
      return
    }

    // Get current cart from localStorage
    let cart = []
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cartItems")
      cart = stored ? JSON.parse(stored) : []
    }
    // Check if item already exists (by id, color, size)
    const idx = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === colorValue &&
        item.size === sizeValue
    )
    if (idx > -1) {
      // Update quantity
      cart[idx].quantity += quantity
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        color: colorValue,
        size: sizeValue,
        quantity,
        price: product.price,
        originalPrice: product.originalPrice,
        image: selectedImage,
        inStock: product.inStock,
      })
    }
    // Save back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart))
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Product Images */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-lg h-96 relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={selectedImage}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                onError={(e) => { e.target.src = 'https://placehold.co/400x400/cccccc/000000?text=Image+Not+Found'; }}
              />
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {(product.images || [product.image]).map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 relative cursor-pointer rounded-md overflow-hidden border-2 ${
                    selectedImage === img ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    onError={(e) => { e.target.src = 'https://placehold.co/80x80/cccccc/000000?text=Img'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {product.badge && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block self-start">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 text-lg">{product.brand} - {product.category}</p>

            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} size={20} />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} Reviews)</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-xl">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Colors:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, index) => {
                    const colorName = typeof color === "string" ? color : color.name
                    const colorValue = typeof color === "string" ? color : color.value
                    return (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === colorName ? 'border-blue-500' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: colorValue }}
                        onClick={() => setSelectedColor(colorName)}
                        title={colorName}
                      ></button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sizes:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-md border-2 ${
                        selectedSize === size ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-gray-300 text-gray-700'
                      } hover:border-blue-400 transition`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Quantity:</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 border border-gray-300 rounded-md text-center"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2">
                <Heart size={20} /> Add to Wishlist
              </button>
            </div>

            {/* Features/Highlights */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Details</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Shipping & Returns */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                <Truck size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm">On all orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                <RotateCcw size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Easy Returns</h4>
                  <p className="text-sm">30-day money-back guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                <Shield size={24} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold">Secure Payment</h4>
                  <p className="text-sm">100% protected transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AddToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} quantity={quantity} />
    </div>
  )
}

export default ProductDetailPage