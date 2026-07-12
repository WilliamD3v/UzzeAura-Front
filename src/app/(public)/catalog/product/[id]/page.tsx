'use client'

import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { useProduct } from '@/data/products'
import { useParams } from 'next/navigation'

export default function ProductPage() {
  const params = useParams()

  const id = params.id as string

  const { data: product, isLoading } = useProduct(id)

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando produto...</p>
      </main>
    )
  }

  if (!product) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery product={product} />

          <ProductInfo product={product} />
        </div>
      </section>
    </main>
  )
}
