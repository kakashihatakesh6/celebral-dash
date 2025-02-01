import type React from "react"
import type { Customer } from "../lib/types"

interface CustomerFormProps {
  customer: Customer
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>
}

export default function CustomerForm({ customer, setCustomer }: CustomerFormProps) {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 font-semibold">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </form>
    </div>
  )
}

