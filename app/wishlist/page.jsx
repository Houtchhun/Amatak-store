"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductList from "@/components/product-list"
import { allProducts as staticProducts } from "@/data/products"
import Link from "next/link"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Read wishlist from profile object in localStorage
      const profile = JSON.parse(localStorage.getItem("profile") || "{}")
      const ids = Array.isArray(profile.wishlist) ? profile.wishlist : []
      setWishlist(ids)
      // Optionally, also load admin products if you support them
      const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      const all = [...staticProducts, ...adminProducts]
      setProducts(all)
    }
  }, [])

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Link href="/shop" className="text-blue-600 font-semibold hover:underline">
            Back to Shop
          </Link>
        </div>
        {wishlistedProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <p>No items in your wishlist.</p>
            <Link href="/shop" className="text-blue-600 font-semibold hover:underline">
              Browse Products
            </Link>
          </div>
        ) : (
          <ProductList products={wishlistedProducts} />
        )}
      </main>
      <Footer />
    </div>
  )
}
