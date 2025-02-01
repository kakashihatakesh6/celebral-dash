export interface Service {
  id: string
  name: string
  price: number
  description: string
}

export interface CartItem extends Service {
  quantity: number
}

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Order {
  id: string
  customer: Customer
  items: CartItem[]
  total: number
  paymentId: string
  createdAt: string
  status: string
}

