import type { Service } from "../lib/types"

interface ServiceListProps {
  services: Service[]
  addToCart: (service: Service) => void
}

export default function ServiceList({ services, addToCart }: ServiceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div 
          key={service.id} 
          className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mt-2 min-h-[48px]">{service.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-3">${service.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(service)}
              className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Add to Cart</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

