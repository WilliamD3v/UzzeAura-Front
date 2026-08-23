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

    /*
    |--------------------------------------------------------------------------
    | ENCONTRAR TAMANHO SELECIONADO
    |--------------------------------------------------------------------------
    */

    const selectedSize = product.sizes.find((item) => item.size === size)

    if (!selectedSize) {
      console.error('Tamanho selecionado não encontrado.')
      return
    }

    /*
    |--------------------------------------------------------------------------
    | ENCONTRAR COR SELECIONADA
    |--------------------------------------------------------------------------
    */

    const selectedColor = selectedSize.colors.find(
      (item) => item.name === color,
    )

    if (!selectedColor) {
      console.error('Cor selecionada não encontrada.')
      return
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDAR ESTOQUE
    |--------------------------------------------------------------------------
    */

    if (selectedColor.stock <= 0) {
      console.error('Produto sem estoque.')
      return
    }

    /*
    |--------------------------------------------------------------------------
    | DEFINIR IMAGEM
    |--------------------------------------------------------------------------
    */

    const imageUrl = selectedColor.image || product.image.url

    /*
    |--------------------------------------------------------------------------
    | ADICIONAR AO CARRINHO
    |--------------------------------------------------------------------------
    */

    addItem({
      productId: product._id,

      name: product.name,

      price: product.price,

      image: {
        url: imageUrl,
      },

      size: selectedSize.size,

      color: selectedColor.name,

      hex: selectedColor.hex,

      // Quantidade adicionada ao carrinho
      quantity: 1,

      // Estoque disponível dessa variação
      stock: selectedColor.stock,
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
