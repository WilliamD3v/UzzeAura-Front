export interface ProductColor {
  id: string
  name: string
  hex: string
  stock: number
}

export interface ProductVariation {
  size: string
  colors: ProductColor[]
}

export interface ProductFormData {
  name: string

  description: string

  image: string

  imageFile: File | null

  price: number

  status: {
    destaque: boolean
    estreia: boolean
    post: boolean
  }

  variations: ProductVariation[]
}
