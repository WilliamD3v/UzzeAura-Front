import { getProductById, getProducts } from '@/hooks/products'
import { useQuery } from '@tanstack/react-query'

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  image: {
    url: string
    filename: string
    public_id: string
  }
  status: {
    destaque: boolean
    estreia: boolean
    post: boolean
  }
  sizes: {
    size: string
    colors: {
      _id: string
      name: string
      image: string
      quantity: number
    }[]
  }[]
  active: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
