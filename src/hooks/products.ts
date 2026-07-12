import { Product } from '@/data/products'
import axios from '@/lib/axios'

export async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get('/product')

  return data.products
}

export async function getProductById(id: string): Promise<Product> {
  const { data } = await axios.get(`/product/${id}`)

  return data.product
}
