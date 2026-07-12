'use client'

import { ProductSize, ProductVariation } from './types'

type Props = {
  variations: ProductVariation[]

  onChange: (variations: ProductVariation[]) => void
}

const LETTER_SIZES: ProductSize[] = ['PP', 'P', 'M', 'G', 'GG', 'U']

const NUMBER_SIZES: ProductSize[] = ['34', '36', '38', '40', '42', '44', '46']

export function ProductSizes({ variations, onChange }: Props) {
  function isSelected(size: ProductSize) {
    return variations.some((item) => item.size === size)
  }

  function toggleSize(size: ProductSize) {
    const exists = isSelected(size)

    if (exists) {
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
          flex

          h-16

          items-center

          justify-center

          rounded-2xl

          border

          text-sm

          font-medium

          transition-all


          ${
            active
              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-neutral-900'
              : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
          }

        `}
      >
        {size}
      </button>
    )
  }

  return (
    <section
      className="
        rounded-3xl

        border

        border-neutral-200

        bg-white

        p-8

        shadow-sm
      "
    >
      <div className="mb-8">
        <p
          className="
            text-sm

            uppercase

            tracking-[0.2em]

            text-[#D4AF37]
          "
        >
          Estoque
        </p>

        <h2
          className="
            mt-2

            text-2xl

            font-semibold

            text-neutral-900
          "
        >
          Tamanhos Disponíveis
        </h2>

        <p
          className="
            mt-2

            text-sm

            text-neutral-500
          "
        >
          Selecione todos os tamanhos que estarão disponíveis para venda.
        </p>
      </div>

      {/* Tamanhos letras */}

      <div>
        <h3
          className="
            mb-4

            text-sm

            font-medium

            text-neutral-700
          "
        >
          Tamanhos por letra
        </h3>

        <div
          className="
            grid

            grid-cols-3

            gap-4

            sm:grid-cols-6
          "
        >
          {LETTER_SIZES.map(renderSizeButton)}
        </div>
      </div>

      {/* Tamanhos números */}

      <div className="mt-8">
        <h3
          className="
            mb-4

            text-sm

            font-medium

            text-neutral-700
          "
        >
          Tamanhos numéricos
        </h3>

        <div
          className="
            grid

            grid-cols-3

            gap-4

            sm:grid-cols-7
          "
        >
          {NUMBER_SIZES.map(renderSizeButton)}
        </div>
      </div>

      {/* Resumo */}

      {variations.length > 0 && (
        <div
          className="
              mt-8

              rounded-2xl

              bg-neutral-50

              p-5
            "
        >
          <p
            className="
                text-sm

                text-neutral-600
              "
          >
            Tamanhos selecionados:
          </p>

          <div
            className="
                mt-3

                flex

                flex-wrap

                gap-2
              "
          >
            {variations.map((item) => (
              <span
                key={item.size}

                className="
                        rounded-full

                        bg-white

                        px-4

                        py-2

                        text-sm

                        shadow-sm
                      "
              >
                {item.size}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
