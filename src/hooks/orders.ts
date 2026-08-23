import axios from '@/lib/axios'

export type OrderStatus =
  | 'received'
  | 'payment_confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'pix' | 'credit_card'

export type OrderItem = {
  productId: string

  name: string

  image: string

  size: string

  color: string

  colorHex?: string

  quantity: number

  unitPrice: number

  totalPrice: number
}

export type TrackingHistory = {
  status: OrderStatus

  title: string

  description: string

  date: string
}

export type Order = {
  _id: string

  orderNumber: string

  trackingCode: string

  shippingTrackingCode?: string | null

  customer: {
    name: string
    email: string
    phone: string
    cpf: string
  }

  address: {
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }

  items: OrderItem[]

  subtotal: number

  shipping: number

  total: number

  payment: {
    method: PaymentMethod
    status: PaymentStatus
  }

  status: OrderStatus

  trackingHistory: TrackingHistory[]

  createdAt: string

  updatedAt: string
}

/*
|--------------------------------------------------------------------------
| LISTAR PEDIDOS
|--------------------------------------------------------------------------
*/

export async function getOrders() {
  const response = await axios.get('/order/get')

  return response.data.orders as Order[]
}

/*
|--------------------------------------------------------------------------
| BUSCAR PEDIDO
|--------------------------------------------------------------------------
*/

export async function getOrderById(id: string) {
  const response = await axios.get(`/order/${id}`)

  return response.data.order as Order
}

/*
|--------------------------------------------------------------------------
| RASTREAR PEDIDO
|--------------------------------------------------------------------------
*/

export async function getOrderByTrackingCode(trackingCode: string) {
  const response = await axios.get(`/order/tracking/${trackingCode}`)

  return response.data.order as Order
}

/*
|--------------------------------------------------------------------------
| ATUALIZAR STATUS
|--------------------------------------------------------------------------
*/

export async function updateOrderStatus(
  id: string,
  data: {
    status: OrderStatus
    shippingTrackingCode?: string
  },
) {
  const response = await axios.patch(`/order/${id}/status`, data)

  return response.data.order as Order
}
