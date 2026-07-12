'use client'

import { Palette, Plus, Trash2 } from 'lucide-react'

import { ProductColor, ProductVariation } from './types'

type Props = {
  variations: ProductVariation[]

  onChange: (variations: ProductVariation[]) => void
}

export function ProductVariants({ variations, onChange }: Props) {
  function addColor(size: string) {
    const newColor: ProductColor = {
      id: crypto.randomUUID(),

      name: 'Nova cor',

      hex: '#000000',

      stock: 0,
    }

    onChange(
      variations.map((variation) => {
        if (variation.size !== size) {
          return variation
        }

        return {
          ...variation,

          colors: [...variation.colors, newColor],
        }
      }),
    )
  }

  function updateColor(
    size: string,
    colorId: string,
    data: Partial<ProductColor>,
  ) {
    onChange(
      variations.map((variation) => {
        if (variation.size !== size) {
          return variation
        }

        return {
          ...variation,

          colors: variation.colors.map((color) => {
            if (color.id !== colorId) {
              return color
            }

            return {
              ...color,

              ...data,
            }
          }),
        }
      }),
    )
  }

  function removeColor(size: string, colorId: string) {
    onChange(
      variations.map((variation) => {
        if (variation.size !== size) {
          return variation
        }

        return {
          ...variation,

          colors: variation.colors.filter((color) => color.id !== colorId),
        }
      }),
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
          Variações
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-semibold
          "
        >
          Cores e Estoque
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-neutral-500
          "
        >
          Defina as cores e quantidades disponíveis para cada tamanho.
        </p>
      </div>

      <div className="space-y-8">
        {variations.map((variation) => (
          <div
            key={variation.size}
            className="
              rounded-2xl
              border
              border-neutral-200
              p-6
            "
          >
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h3
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Tamanho {variation.size}
                </h3>

                <p
                  className="
                    text-sm
                    text-neutral-500
                  "
                >
                  Cores disponíveis
                </p>
              </div>

              <button
                type="button"

                onClick={() => addColor(variation.size)}

                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-neutral-900
                  px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:bg-neutral-800
                "
              >
                <Plus size={16} />
                Adicionar cor
              </button>
            </div>

            <div className="space-y-4">
              {variation.colors.map((color) => (
                <div
                  key={color.id}

                  className="
                      grid
                      gap-4
                      rounded-2xl
                      bg-neutral-50
                      p-4
                      md:grid-cols-[80px_1fr_120px_50px]
                    "
                >
                  <div
                    className="
                        flex
                        items-center
                        justify-center
                      "
                  >
                    <div
                      className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-xl
                          border
                        "
                      style={{
                        backgroundColor: color.hex,
                      }}
                    >
                      <Palette size={18} className="text-white" />
                    </div>
                  </div>

                  <input
                    value={color.name}

                    onChange={(e) =>
                      updateColor(
                        variation.size,

                        color.id,

                        {
                          name: e.target.value,
                        },
                      )
                    }

                    placeholder="Nome da cor"

                    className="
                        h-12
                        rounded-xl
                        border
                        border-neutral-300
                        bg-white
                        px-4
                        outline-none
                        focus:border-[#D4AF37]
                      "
                  />

                  <input
                    type="number"

                    min={0}

                    value={color.stock}

                    onChange={(e) =>
                      updateColor(
                        variation.size,

                        color.id,

                        {
                          stock: Number(e.target.value),
                        },
                      )
                    }

                    placeholder="Estoque"

                    className="
                        h-12
                        rounded-xl
                        border
                        border-neutral-300
                        bg-white
                        px-4
                        outline-none
                        focus:border-[#D4AF37]
                      "
                  />

                  <button
                    type="button"

                    onClick={() => removeColor(variation.size, color.id)}

                    className="
                        flex
                        h-12
                        items-center
                        justify-center
                        rounded-xl
                        text-neutral-500
                        transition
                        hover:bg-red-50
                        hover:text-red-600
                      "
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {variation.colors.length === 0 && (
                <p
                  className="
                    rounded-xl
                    bg-neutral-100
                    p-4
                    text-sm
                    text-neutral-500
                  "
                >
                  Nenhuma cor adicionada para este tamanho.
                </p>
              )}
            </div>
          </div>
        ))}

        {variations.length === 0 && (
          <div
            className="
                rounded-xl
                bg-neutral-100
                p-5
                text-sm
                text-neutral-500
              "
          >
            Selecione os tamanhos disponíveis acima.
          </div>
        )}
      </div>
    </section>
  )
}
