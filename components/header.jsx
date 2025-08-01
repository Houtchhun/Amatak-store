"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, User, ShoppingCart, Menu, X, LayoutDashboard } from "lucide-react"
import { allProducts } from "@/data/products" // Import allProducts for search functionality
import { useRouter } from "next/navigation"

export default function Header({ searchQuery, setSearchQuery }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([]) // State for search suggestions
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const [showAddStock, setShowAddStock] = useState(false)
  const [stockName, setStockName] = useState("")
  const [stockImage, setStockImage] = useState("")
  const [stockQuantity, setStockQuantity] = useState(1)
  const [stockPrice, setStockPrice] = useState("")
  const [addSuccess, setAddSuccess] = useState(false)

  useEffect(() => {
    // Update suggestions for dropdown
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSuggestions(results.slice(0, 5)) // Limit to 5 suggestions
  }, [searchQuery])

  useEffect(() => {
    // Defensive: ensure allProducts is an array and product.name is a string
    const safeProducts = Array.isArray(allProducts) ? allProducts : []
    const safeSearchQuery = typeof searchQuery === "string" ? searchQuery : ""
    const results = safeProducts.filter((product) =>
      product &&
      typeof product.name === "string" &&
      product.name.toLowerCase().includes(safeSearchQuery.toLowerCase())
    )
    setSuggestions(results.slice(0, 5))
  }, [searchQuery])

  useEffect(() => {
    // Set isAuthenticated if loginEmail exists (simulate real website logic)
    if (typeof window !== "undefined") {
      const loginEmail = localStorage.getItem("loginEmail")
      setIsAuthenticated(!!loginEmail)
    }
  }, [])

  // Get user email for display (optional)
  // const [userEmail, setUserEmail] = useState("")
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const loginEmail = localStorage.getItem("loginEmail")
  //     setUserEmail(loginEmail || "")
  //   }
  // }, [isAuthenticated])

  // Add product to stock (adminProducts in localStorage)
  const handleAddStock = (e) => {
    e.preventDefault()
    if (!stockName || !stockImage || !stockPrice || stockQuantity < 1) {
      alert("Please fill all product fields.")
      return
    }
    const newProduct = {
      id: Date.now().toString(),
      name: stockName,
      image: stockImage,
      price: Number(stockPrice),
      quantity: Number(stockQuantity),
      brand: "Other",
      category: "Admin",
      subcategory: "",
      description: "",
      rating: 5,
      reviewCount: 0,
      sizes: ["M"],
      inStock: true,
    }
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("adminProducts")
      const arr = stored ? JSON.parse(stored) : []
      arr.push(newProduct)
      localStorage.setItem("adminProducts", JSON.stringify(arr))
    }
    setStockName("")
    setStockImage("")
    setStockQuantity(1)
    setStockPrice("")
    setAddSuccess(true)
    setTimeout(() => setAddSuccess(false), 2000)
    setShowAddStock(false)
  }

  // Delete product from stock (admin only)
  const handleDeleteStockProduct = (productId) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("adminProducts")
      const arr = stored ? JSON.parse(stored) : []
      const updated = arr.filter(p => p.id !== productId)
      localStorage.setItem("adminProducts", JSON.stringify(updated))
    }
    // Optionally, force reload to update dashboard/shop
    window.location.reload()
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            AMATAK
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
            </li>
          </ul>

          {/* Search Form */}
          <div className="relative w-80">
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-full focus:border-blue-600 focus:outline-none transition-colors"
            />
            {searchQuery && suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-2 z-10">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => setSearchQuery(product.name)} // Set search query on click
                  >
                    <span>{product.name}</span>
                    {/* Show quantity if available */}
                    {typeof product.quantity === "number" && (
                      <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        Qty: {product.quantity}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Icons and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/account/profile">
                  <User className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
                </Link>
                {/* Show Dashboard icon only for khikhe@gmail.com */}
                {typeof window !== "undefined" &&
                  localStorage.getItem("loginEmail") &&
                  localStorage.getItem("loginEmail").trim().toLowerCase() === "khikhe@gmail.com" && (
                    <Link href="/dashboard">
                      <LayoutDashboard className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" title="Dashboard" />
                    </Link>
                  )
                }
              </>
            ) : null}
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
            </Link>
            {/* Show Register/Login only if NOT authenticated */}
            {!isAuthenticated && (
              <div className="hidden md:flex space-x-2">
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="/auth/signin"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border-2 border-gray-200 rounded-full focus:border-blue-600 focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </button>
              </form>

              <div className="flex flex-col space-y-2">
                <Link href="/" className="text-gray-700 hover:text-blue-600 py-2">
                  Home
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-blue-600 py-2">
                  Categories
                </Link>
                <Link href="/shop" className="text-gray-700 hover:text-blue-600 py-2">
                  Shop
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-blue-600 py-2">
                  Blog
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2">
                  About
                </Link>
              </div>

              <div className="flex space-x-2 pt-4">
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 text-center"
                >
                  Register
                </Link>
                <Link
                  href="/auth/signin"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex-1 text-center"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Add Product to Stock Modal */}
        {showAddStock && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add Product to Stock</h3>
              <form
                onSubmit={handleAddStock}
                className="space-y-4"
              >
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Product Name"
                  value={stockName}
                  onChange={e => setStockName(e.target.value)}
                  required
                />
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Image URL"
                  value={stockImage}
                  onChange={e => setStockImage(e.target.value)}
                  required
                />
                <input
                  type="number"
                  min={1}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Quantity"
                  value={stockQuantity}
                  onChange={e => setStockQuantity(Number(e.target.value))}
                  required
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Price"
                  value={stockPrice}
                  onChange={e => setStockPrice(e.target.value)}
                  required
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddStock(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
                {addSuccess && (
                  <div className="text-green-600 mt-2 text-center">Product added to stock!</div>
                )}
              </form>
              {/* Show current stock list with delete button */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Current Stock</h4>
                <div className="max-h-48 overflow-y-auto">
                  {typeof window !== "undefined" &&
                    (JSON.parse(localStorage.getItem("adminProducts") || "[]").length > 0 ? (
                      JSON.parse(localStorage.getItem("adminProducts") || "[]").map((p) => (
                        <div key={p.id} className="flex items-center justify-between py-1 border-b text-sm">
                          <span>{p.name}</span>
                          <button
                            onClick={() => handleDeleteStockProduct(p.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-xs">No products in stock.</div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
