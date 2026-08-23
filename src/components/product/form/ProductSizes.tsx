'use client'

import { ProductVariation } from './types'

type Props = {
  variations: ProductVariation[]
  onChange: (variations: ProductVariation[]) => void
}

type ProductSize = ProductVariation['size']

const LETTER_SIZES: ProductSize[] = ['PP', 'P', 'M', 'G', 'GG', 'U']

const NUMBER_SIZES: ProductSize[] = ['34', '36', '38', '40', '42', '44', '46']

export function ProductSizes({ variations, onChange }: Props) {
  function isSelected(size: ProductSize) {
    return variations.some((item) => item.size === size)
  }

  function toggleSize(size: ProductSize) {
    if (isSelected(size)) {
      onChange(variations.filter((item) => item.size !== size))
      return
    }

    onChange([
      ...variations,
      {
        size,
        colors: [],
      },
    ])
  }

  function renderSizeButton(size: ProductSize) {
    const active = isSelected(size)

    return (
      <button
        key={size}
        type="button"
        onClick={() => toggleSize(size)}
        className={`
          h-11
          min-w-14
          rounded-lg
          border
          px-4
          text-sm
          font-medium
          transition

          ${
            active
              ? 'border-neutral-950 bg-neutral-950 text-[#D6B85A]'
              : `
                border-neutral-300
                bg-white
                text-neutral-600
                hover:border-neutral-500
              `
          }
        `}
      >
        {size}
      </button>
    )
  }

  return (
    <section className="border-b border-neutral-200 py-10">
      <label className="mb-4 block text-sm font-medium text-neutral-800">
        Tamanhos
      </label>

      <div className="flex flex-wrap gap-2">
        {LETTER_SIZES.map(renderSizeButton)}
      </div>

      <div className="my-5 h-px bg-neutral-100" />

      <div className="flex flex-wrap gap-2">
        {NUMBER_SIZES.map(renderSizeButton)}
      </div>
    </section>
  )
}
