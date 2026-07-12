'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { Product } from '@/data/products'

type Props = {
  product: Product
}

export function ProductGallery({ product }: Props) {
  const [zoom, setZoom] = useState(false)

  return (
    <div className="flex justify-center">
      <div
        className="group relative w-full overflow-hidden rounded-3xl bg-white shadow-sm"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.image.url}
            alt={product.name}
            fill
            priority
            className={`object-cover transition-all duration-700 ${
              zoom ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>

        {/* Gradiente inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Badge */}
        {product.status.estreia && (
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-800 backdrop-blur">
            Nova Coleção
          </div>
        )}
      </div>
    </div>
  )
}
