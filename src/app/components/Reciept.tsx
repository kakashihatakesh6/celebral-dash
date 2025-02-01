import type { Order } from "../lib/types"
import Link from "next/link"

interface ReceiptProps {
  order: Order
  onClose: () => void
}

export default function Receipt({ order, onClose }: ReceiptProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Receipt</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Order ID: {order.id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Customer Details:</h3>
          <p>Name: {order.customer.name}</p>
          <p>Email: {order.customer.email}</p>
          <p>Phone: {order.customer.phone}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Items:</h3>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="text-xl font-bold mb-4">Total: ${order.total.toFixed(2)}</div>
        <div className="mb-4">
          <h3 className="font-semibold">Payment Information:</h3>
          <p>Payment ID: {order.paymentId}</p>
          <p>Status: {order.status}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
          <Link href={`/receipt/${order.id}`} target="_blank" rel="noopener noreferrer">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              View Full Receipt
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

