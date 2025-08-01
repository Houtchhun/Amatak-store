"use client"

import React, { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function OrderManagementPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("loginEmail")
      setIsAdmin(email && email.trim().toLowerCase() === "khikhe@gmail.com")
      // Load all orders from localStorage (simulate backend)
      const stored = localStorage.getItem("orders")
      setOrders(stored ? JSON.parse(stored) : [])
    }
  }, [])

  // Remove order
  const handleRemoveOrder = (orderNumber) => {
    const updated = orders.filter((o) => o.orderNumber !== orderNumber)
    setOrders(updated)
    localStorage.setItem("orders", JSON.stringify(updated))
  }

  // Mark as shipped
  const handleMarkShipped = (orderNumber) => {
    const updated = orders.map((o) =>
      o.orderNumber === orderNumber ? { ...o, status: "Shipped" } : o
    )
    setOrders(updated)
    localStorage.setItem("orders", JSON.stringify(updated))
  }

  // Filter orders by search query (order number or customer name)
  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.shippingInfo &&
      `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Order Management</h1>
        {!isAdmin ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-red-600 font-semibold">
            Access denied. Only khikhe@gmail.com can manage orders.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8">
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
              <input
                type="text"
                placeholder="Search by order number or customer name"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="border px-4 py-2 rounded-lg w-full md:w-1/3"
              />
              <span className="text-gray-600">{filteredOrders.length} orders</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-2">Order #</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Customer</th>
                    <th className="py-2 px-2">Total</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-gray-500 text-center">No orders found.</td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.orderNumber}>
                        <td className="py-2 px-2 font-mono">{order.orderNumber}</td>
                        <td className="py-2 px-2">{order.date ? new Date(order.date).toLocaleDateString() : ""}</td>
                        <td className="py-2 px-2">
                          {order.shippingInfo
                            ? `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`
                            : "—"}
                        </td>
                        <td className="py-2 px-2">${order.total?.toFixed(2)}</td>
                        <td className="py-2 px-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            order.status === "Shipped"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status || "Pending"}
                          </span>
                        </td>
                        <td className="py-2 px-2 flex gap-2 justify-center">
                          <button
                            onClick={() => handleMarkShipped(order.orderNumber)}
                            disabled={order.status === "Shipped"}
                            className={`px-3 py-1 rounded font-semibold ${
                              order.status === "Shipped"
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                          >
                            Mark Shipped
                          </button>
                          <button
                            onClick={() => handleRemoveOrder(order.orderNumber)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
