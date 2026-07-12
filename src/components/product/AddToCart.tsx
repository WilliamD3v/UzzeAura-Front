'use client'

import { ShoppingBag } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import type { Product } from '@/data/products'

type Props = {
  product: Product
  size: string
  color: string
  disabled: boolean
}

export function AddToCart({ product, size, color, disabled }: Props) {
  const { addItem } = useCart()

  function handleAddToCart() {
    if (disabled) return

    addItem({
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      quantity: 1,
    })
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleAddToCart}
      className={`
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-full
        text-sm
        font-medium
        uppercase
        tracking-[0.18em]
        transition-all
        duration-300

        ${
          disabled
            ? 'cursor-not-allowed bg-neutral-200 text-neutral-400'
            : 'bg-neutral-900 text-white hover:scale-[1.02] hover:bg-neutral-800'
        }
      `}
    >
      <ShoppingBag size={18} />

      {disabled ? 'Selecione tamanho e cor' : 'Adicionar ao carrinho'}
    </button>
  )
}
