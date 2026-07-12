'use client'

import { ShoppingBag } from 'lucide-react'

import { useCart } from './CartProvider'

export function CartButton() {
  const { openCart, items } = useCart()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <button
      onClick={openCart}
      className="
        fixed
        right-6
        bottom-6
        z-40

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full

        bg-neutral-900

        text-white

        shadow-lg

        transition-all
        duration-300

        hover:scale-105
      "
      aria-label="Abrir carrinho"
    >
      <ShoppingBag size={24} />

      {totalItems > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1

            flex
            h-6
            w-6
            items-center
            justify-center

            rounded-full

            bg-[#D4AF37]

            text-xs
            font-medium

            text-neutral-900
          "
        >
          {totalItems}
        </span>
      )}
    </button>
  )
}
