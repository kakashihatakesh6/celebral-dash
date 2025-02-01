"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Order } from "../lib/types"
import { Download, Eye } from "lucide-react"
import { generatePDF } from "../lib/pdfGenerator"

export default function PaymentHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // const fetchOrders = async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    //   const mockOrders: Order[] = [
    //     {
    //       id: "order_1",
    //       customer: { name: "John Doe", email: "john@example.com", phone: "1234567890" },
    //       items: [{ id: "1", name: "Haircut", price: 30, quantity: 1, description: "Standard haircut" }],
    //       total: 30,
    //       paymentId: "pay_123456",
    //       createdAt: "2023-06-01T10:00:00Z",
    //       status: "success",
    //     },
    //     {
    //       id: "order_2",
    //       customer: { name: "Jane Smith", email: "jane@example.com", phone: "0987654321" },
    //       items: [{ id: "2", name: "Manicure", price: 25, quantity: 1, description: "Basic manicure" }],
    //       total: 25,
    //       paymentId: "pay_789012",
    //       createdAt: "2023-06-02T14:30:00Z",
    //       status: "pending",
    //     },
    //     {
    //       id: "order_3",
    //       customer: { name: "Bob Johnson", email: "bob@example.com", phone: "5555555555" },
    //       items: [{ id: "3", name: "Massage", price: 60, quantity: 1, description: "60-minute massage" }],
    //       total: 60,
    //       paymentId: "pay_345678",
    //       createdAt: "2023-06-03T16:45:00Z",
    //       status: "failed",
    //     },
    //   ]
    //   setOrders(mockOrders)
    //   setLoading(false)
    // }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        const data = await response.json()
        setOrders(data.reverse()) // Show newest orders first
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (order: Order) => {
    generatePDF(order)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer.name}</td>
                <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Link href={`/receipt/${order.id}`}>
                      <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDownload(order)}
                      className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          &larr; Back to POS
        </Link>
      </div>
    </div>
  )
}

