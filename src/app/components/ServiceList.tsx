import type { Service } from "../lib/types"

interface ServiceListProps {
  services: Service[]
  addToCart: (service: Service) => void
}

export default function ServiceList({ services, addToCart }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <div key={service.id} className="border p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-gray-600">{service.description}</p>
          <p className="text-xl font-bold mt-2">${service.price.toFixed(2)}</p>
          <button
            onClick={() => addToCart(service)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

