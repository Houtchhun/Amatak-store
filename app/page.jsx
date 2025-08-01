"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroBanner from "@/components/hero-banner"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/data/products" // Import allProducts from data file


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("") // State for search query
  const [cart, setCart] = useState([]) // State for cart

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product])
    alert(`${product.name} added to cart!`)
  }

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId))
    alert("Product removed from cart!")
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0)
  }


  // No filter change handler needed


  // Auto-refresh products every 30 seconds (simulating real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch new data from an API
      console.log("Auto-refreshing product data...")
    }, 30000)
    return () => clearInterval(interval)
  }, [])


  // Products for specific sections
  const newArrivals = allProducts.filter((product) => product.badge === "NEW")
  const discountProducts = allProducts.filter(
    (product) => product.originalPrice && product.price < product.originalPrice,
  )
  const featuredProducts = allProducts.slice(0, 8) // Display first 8 products as featured

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />


      <main>
        <HeroBanner />


        {/* Search Results Section */}
        {searchQuery ? (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
              Search Results
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 mt-2"></span>
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts
                .filter((product) =>
                  product.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
                ))}
            </div>
          </section>
        ) : (
          <>
            {/* Featured Products Section */}
            <section className="container mx-auto px-4 py-12">
              <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
                Popular Products
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 mt-2"></span>
              </h2>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
                ))}
              </div>
            </section>

            {/* New Arrivals Section */}
            {newArrivals.length > 0 && (
              <section className="container mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
                  New Arrivals
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 mt-2"></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {newArrivals.map((product) => (
                    <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
                  ))}
                </div>
              </section>
            )}

            {/* Discount Products Section */}
            {discountProducts.length > 0 && (
              <section className="container mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 relative">
                  On Sale!
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange-500 mt-2"></span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {discountProducts.map((product) => (
                    <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

      </main>

      <Footer />
    </div>
  )
}
