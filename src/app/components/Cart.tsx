import type { CartItem } from "../lib/types"
import { X, Plus, Minus } from "lucide-react"

interface CartProps {
  items: CartItem[]
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  onClose: () => void
  onProceed: () => void
  isOpen: boolean
}

export default function Cart({ items, updateQuantity, removeItem, onClose, onProceed, isOpen }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 bg-gray-100 p-2 rounded">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeItem(item.id)} className="ml-2 text-red-500 hover:text-red-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</div>
          <button
            onClick={onProceed}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

