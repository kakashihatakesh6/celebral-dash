/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Service, CartItem, Customer, Order } from "./lib/types"
import ServiceList from "./components/ServiceList"
import Cart from "./components/Cart"
import CustomerForm from "./components/CustomerForm"
import Receipt from "./components/Reciept"
import CartButton from "./components/CartButton"
import { loadRazorpay } from "./lib/razorpay"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const sampleServices: Service[] = [
  { id: "1", name: "Haircut", price: 30, description: "Standard haircut" },
  { id: "2", name: "Manicure", price: 25, description: "Basic manicure" },
  { id: "3", name: "Massage", price: 60, description: "60-minute massage" },
  { id: "4", name: "Facial", price: 45, description: "Refreshing facial treatment" },
  { id: "5", name: "Pedicure", price: 35, description: "Relaxing pedicure" },
  { id: "6", name: "Hair Coloring", price: 80, description: "Full hair coloring service" },
]

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "" })
  const [showCart, setShowCart] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadRazorpay()
  }, [])

  const addToCart = (service: Service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === service.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { ...service, quantity: 1 }]
    })
    setShowCart(true)
    toast.success(`Added ${service.name} to cart`)
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    toast.info("Item removed from cart")
  }

  const handleProceed = () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to the cart before proceeding.")
      return
    }
    setShowCustomerForm(true)
    setShowCart(false)
  }

  const handlePayment = async () => {
    if (!customer.name || !customer.email || !customer.phone) {
      toast.error("Please fill in all customer details before proceeding to payment.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "POS System",
        description: "Payment for services",
        order_id: data.id,
        handler: (response: any) => {
          handlePaymentSuccess(response)
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: {
          color: "#3B82F6",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.error("Payment initiation failed:", error)
      toast.error("Failed to initiate payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = async (response: any) => {
    try {
      const verificationResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }),
      })

      const verificationData = await verificationResponse.json()

      if (!verificationResponse.ok) {
        throw new Error(verificationData.message || "Payment verification failed")
      }

      const newOrder: Order = {
        id: response.razorpay_order_id,
        customer,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        paymentId: response.razorpay_payment_id,
        createdAt: new Date().toISOString(),
        status: "success",
      }

      // Save order to JSON file
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      })

      setOrder(newOrder)
      setShowCustomerForm(false)
      setCartItems([])
      setCustomer({ name: "", email: "", phone: "" })
      toast.success("Payment successful!")
    } catch (error) {
      console.error("Payment verification failed:", error)
      toast.error("Payment verification failed. Please contact support.")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Beauty & Wellness Services
          </h1>
          <div className="flex items-center space-x-4 pr-20">
            <Link 
              href="/payment-history" 
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
              Payment History
            </Link>
            <CartButton 
              itemCount={cartItems.length} 
              onClick={() => setShowCart(true)} 
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <ServiceList services={sampleServices} addToCart={addToCart} />
        </div>

        <Cart
          items={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          onClose={() => setShowCart(false)}
          onProceed={handleProceed}
          isOpen={showCart}
        />
        {showCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
              <button
                onClick={() => setShowCustomerForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="mb-4">
                <h3 className="font-semibold">Items:</h3>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <CustomerForm customer={customer} setCustomer={setCustomer} />
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </div>
        )}
        {order && <Receipt order={order} onClose={() => setOrder(null)} />}
        <ToastContainer 
          position="bottom-center" 
          autoClose={1000}
          theme="colored"
        />
      </div>
    </main>
  )
}

