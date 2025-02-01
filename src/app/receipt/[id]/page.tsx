/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Order } from "../../lib/types"

export default function ReceiptPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`)
        console.log("API call at /api/orders/[id] with id: ", id, response)
        
        if (!response.ok) {
          throw new Error(
            response.status === 404 
              ? "Order not found" 
              : "Failed to fetch order details"
          )
        }
        
        const orderData = await response.json()
        setOrder(orderData)
      } catch (err) {
        console.log("error occurred while fetching order details =>", err)
        setError(err instanceof Error ? err.message : "Failed to fetch order details")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>
  }

  if (!order) {
    return <div className="text-center mt-8">Order not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="mr-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
        >
          <span>← Back</span>
        </button>
        <h1 className="text-3xl font-bold ml-32">Receipt</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Order ID: {order.id}</h2>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Customer Details:</h3>
          <p>Name: {order.customer.name}</p>
          <p>Email: {order.customer.email}</p>
          <p>Phone: {order.customer.phone}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Items:</h3>
          <table className="w-full mt-2">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-left">Quantity</th>
                <th className="text-right">Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                  <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xl font-bold mb-4 text-right">Total: ${order.total.toFixed(2)}</div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Payment Information:</h3>
          <p>Payment ID: {order.paymentId}</p>
          <p>Status: Paid</p>
        </div>
      </div>
    </div>
  )
}

