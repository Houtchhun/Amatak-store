"use client"

import React, { useEffect, useState } from "react"
function getIsAdmin() {
  if (typeof window === "undefined") return false;
  const loginEmail = localStorage.getItem("loginEmail")
  return loginEmail && loginEmail.trim().toLowerCase() === "khikhe@gmail.com"
}
import Header from "@/components/header"
import Footer from "@/components/footer"


export default function DashboardPage() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [inStockProducts, setInStockProducts] = useState(0)
  const [stockList, setStockList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [editId, setEditId] = useState(null)
  const [editQty, setEditQty] = useState(1)
  const [productsLoaded, setProductsLoaded] = useState(false)

  // Load products
  const loadProducts = () => {
    if (typeof window !== "undefined") {
      const staticProducts = JSON.parse(localStorage.getItem("staticProducts") || "[]")
      const adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      const all = [...staticProducts, ...adminProducts]
      setTotalProducts(all.length)
      setInStockProducts(all.filter(p => p.inStock !== false && (typeof p.quantity === "undefined" || p.quantity > 0)).length)
      setStockList(all)
      setProductsLoaded(true)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Edit quantity handler
  const handleEditQty = (product) => {
    setEditId(product.id)
    setEditQty(product.quantity ?? 1)
  }

  // Save quantity handler (always update both static and admin, so shop and dashboard stay in sync)
  const handleSaveQty = (product) => {
    if (typeof window !== "undefined") {
      let staticProducts = JSON.parse(localStorage.getItem("staticProducts") || "[]")
      let adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      let found = false
      staticProducts = staticProducts.map(p => {
        if (p.id === product.id) {
          found = true
          return { ...p, quantity: Number(editQty) }
        }
        return p
      })
      adminProducts = adminProducts.map(p => {
        if (p.id === product.id) {
          found = true
          return { ...p, quantity: Number(editQty) }
        }
        return p
      })
      localStorage.setItem("staticProducts", JSON.stringify(staticProducts))
      localStorage.setItem("adminProducts", JSON.stringify(adminProducts))
      setEditId(null)
      setEditQty(1)
      loadProducts()
    }
  }

  // Delete product handler (always remove from both static and admin, so shop and dashboard stay in sync)
  const handleDeleteProduct = (product) => {
    if (typeof window !== "undefined") {
      let staticProducts = JSON.parse(localStorage.getItem("staticProducts") || "[]")
      let adminProducts = JSON.parse(localStorage.getItem("adminProducts") || "[]")
      staticProducts = staticProducts.filter(p => p.id !== product.id)
      adminProducts = adminProducts.filter(p => p.id !== product.id)
      localStorage.setItem("staticProducts", JSON.stringify(staticProducts))
      localStorage.setItem("adminProducts", JSON.stringify(adminProducts))
      loadProducts()
    }
  }

  if (!productsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-500 text-lg">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h2>
            <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Products In Stock</h2>
            <div className="text-3xl font-bold text-green-600">{inStockProducts}</div>
          </div>
        </div>
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-bold mb-6 text-center">Product Stock List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-2 rounded-l-xl">Image</th>
                  <th className="py-2 px-2">Name</th>
                  <th className="py-2 px-2">Category</th>
                  <th className="py-2 px-2">Price</th>
                  <th className="py-2 px-2">Quantity</th>
                  <th className="py-2 px-2">Status</th>
                  <th className="py-2 px-2 rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stockList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-gray-500 text-center">No products in stock.</td>
                  </tr>
                ) : (
                  stockList.map((product) => (
                    <tr key={product.id} className="bg-gray-50 hover:bg-blue-50 transition">
                      <td className="py-2 px-2 flex justify-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded shadow"
                        />
                      </td>
                      <td className="py-2 px-2 font-medium">{product.name}</td>
                      <td className="py-2 px-2">{product.category}</td>
                      <td className="py-2 px-2 text-blue-700 font-semibold">${product.price?.toFixed(2)}</td>
                      <td className="py-2 px-2 text-center">
                        {editId === product.id ? (
                          <form onSubmit={e => { e.preventDefault(); handleSaveQty(product); }} className="flex gap-2 items-center justify-center">
                            <input
                              type="number"
                              min={0}
                              className="border px-2 py-1 rounded w-20 text-center"
                              value={editQty}
                              onChange={e => setEditQty(e.target.value)}
                              autoFocus
                            />
                            <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">Save</button>
                            <button type="button" onClick={() => setEditId(null)} className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400">Cancel</button>
                          </form>
                        ) : (
                          <>
                            {product.quantity ?? 1}
                            <button onClick={() => handleEditQty(product)} className="ml-2 bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
                          </>
                        )}
                      </td>
                      <td className="py-2 px-2 text-center">
                        {product.inStock !== false && (typeof product.quantity === "undefined" || product.quantity > 0)
                          ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">In Stock</span>
                          : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Out of Stock</span>
                        }
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button onClick={() => handleDeleteProduct(product)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
