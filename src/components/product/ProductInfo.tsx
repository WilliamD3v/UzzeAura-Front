'use client'

import { useState } from 'react'

import type { Product } from '@/data/products'

import { AddToCart } from './AddToCart'
import { ColorSelector } from './ColorSelector'
import { SizeSelector } from './SizeSelector'

type Props = {
  product: Product
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  const selectedVariant = product.sizes?.find(
    (size) => size.size === selectedSize,
  )

  function handleSizeSelect(size: string) {
    setSelectedSize(size)
    setSelectedColor('')
  }

  function handleColorSelect(color: string) {
    setSelectedColor(color)
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-light
            tracking-wide
            text-neutral-900
            md:text-4xl
          "
        >
          {product.name}
        </h1>

        <div className="mt-4 h-px w-16 bg-neutral-300" />
      </div>

      {product.description && (
        <p
          className="
            mb-10
            max-w-lg
            text-sm
            leading-relaxed
            text-neutral-600
          "
        >
          {product.description}
        </p>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-8">
          <SizeSelector
            variants={product.sizes}
            selectedSize={selectedSize}
            onSelect={handleSizeSelect}
          />
        </div>
      )}

      {selectedVariant && (
        <div className="mb-10">
          <ColorSelector
            colors={selectedVariant.colors}
            selectedColor={selectedColor}
            onSelect={handleColorSelect}
          />
        </div>
      )}

      <div className="mb-8">
        <span className="text-sm text-neutral-500">Valor</span>

        <p
          className="
            mt-2
            text-3xl
            font-medium
            tracking-wide
            text-neutral-900
          "
        >
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>

      <AddToCart
        product={product}
        size={selectedSize}
        color={selectedColor}
        disabled={!selectedSize || !selectedColor}
      />

      <div
        className="
          mt-10
          space-y-3
          border-t
          border-neutral-200
          pt-8
          text-sm
          text-neutral-600
        "
      >
        <p>✓ Envio para todo Brasil</p>
        <p>✓ Troca fácil em até 7 dias</p>
        <p>✓ Pagamento seguro</p>
      </div>
    </div>
  )
}
