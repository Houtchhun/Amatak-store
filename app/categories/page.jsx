"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Grid, List } from "lucide-react"
import { categories as allCategoriesData } from "@/data/products" // Import from data file

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter categories by search query (exclude "all")
  const filteredCategories = allCategoriesData
    .filter((cat) => cat.id !== "all")
    .filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our wide range of products organized by category. Find exactly what you're looking for.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600">{filteredCategories.length} categories available</p>
          </div>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Categories Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-64 overflow-hidden">
                  {" "}
                  {/* Increased height */}
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold">
                    {category.productCount} items
                  </div>
                </div>

                <div className="p-8">
                  {" "}
                  {/* Increased padding */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Popular subcategories:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span key={sub} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs text-gray-500">+{category.subcategories.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/shop?category=${category.id}`}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Shop {category.name}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-8"
              >
                <div className="flex gap-6">
                  <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                    {" "}
                    {/* Increased width/height */}
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={192} // Corresponds to w-48
                      height={192} // Corresponds to h-48
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {category.productCount} items
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{category.description}</p>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available subcategories:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub) => (
                          <span key={sub} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/shop?category=${category.id}`}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Shop {category.name}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-64 rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                alt="New Arrivals"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                  <p className="mb-4">Latest trends and styles</p>
                  <Link
                    href="/shop?filter=new"
                    className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop"
                alt="Sale Items"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-red-600 bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Sale Items</h3>
                  <p className="mb-4">Up to 50% off selected items</p>
                  <Link
                    href="/shop?filter=sale"
                    className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Sale
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
    
