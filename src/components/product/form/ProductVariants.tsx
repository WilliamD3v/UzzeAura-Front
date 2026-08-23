'use client'

import { Plus, Trash2 } from 'lucide-react'

import { ProductColor, ProductVariation } from './types'

type Props = {
  variations: ProductVariation[]
  onChange: (variations: ProductVariation[]) => void
}

export function ProductVariants({ variations, onChange }: Props) {
  function addColor(size: string) {
    const newColor: ProductColor = {
      id: crypto.randomUUID(),
      name: '',
      hex: '#000000',
      stock: 0,
    }

    onChange(
      variations.map((variation) =>
        variation.size === size
          ? {
              ...variation,
              colors: [...variation.colors, newColor],
            }
          : variation,
      ),
    )
  }

  function updateColor(
    size: string,
    colorId: string,
    data: Partial<ProductColor>,
  ) {
    onChange(
      variations.map((variation) =>
        variation.size === size
          ? {
              ...variation,
              colors: variation.colors.map((color) =>
                color.id === colorId
                  ? {
                      ...color,
                      ...data,
                    }
                  : color,
              ),
            }
          : variation,
      ),
    )
  }

  function removeColor(size: string, colorId: string) {
    onChange(
      variations.map((variation) =>
        variation.size === size
          ? {
              ...variation,
              colors: variation.colors.filter((color) => color.id !== colorId),
            }
          : variation,
      ),
    )
  }

  return (
    <section className="py-10">
      <label className="mb-5 block text-sm font-medium text-neutral-800">
        Cores e estoque
      </label>

      {variations.length === 0 ? (
        <div
          className="
            rounded-lg border border-dashed border-neutral-300
            bg-[#FAF8F3] px-5 py-8 text-center
            text-sm text-neutral-400
          "
        >
          Selecione ao menos um tamanho.
        </div>
      ) : (
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {variations.map((variation) => (
            <div key={variation.size} className="py-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex h-9 min-w-9 items-center justify-center
                      rounded-md bg-neutral-950 px-2
                      text-xs font-semibold text-[#D6B85A]
                    "
                  >
                    {variation.size}
                  </span>

                  <span className="text-sm font-medium text-neutral-800">
                    {variation.colors.length}{' '}
                    {variation.colors.length === 1 ? 'cor' : 'cores'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => addColor(variation.size)}
                  className="
                    flex items-center gap-2 rounded-lg
                    border border-neutral-300 bg-white
                    px-3.5 py-2 text-xs font-medium text-neutral-700
                    transition
                    hover:border-neutral-950 hover:text-neutral-950
                  "
                >
                  <Plus size={14} />
                  Adicionar cor
                </button>
              </div>

              {variation.colors.length > 0 && (
                <div className="space-y-2">
                  {variation.colors.map((color) => (
                    <div
                      key={color.id}
                      className="
                        grid items-center gap-3
                        rounded-lg bg-[#FAF8F3] p-3
                        sm:grid-cols-[44px_minmax(0,1fr)_130px_40px]
                      "
                    >
                      <label
                        className="
                          relative h-10 w-10 cursor-pointer
                          overflow-hidden rounded-lg
                          border border-neutral-300
                        "
                        style={{ backgroundColor: color.hex }}
                      >
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) =>
                            updateColor(variation.size, color.id, {
                              hex: e.target.value,
                            })
                          }
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>

                      <input
                        value={color.name}
                        onChange={(e) =>
                          updateColor(variation.size, color.id, {
                            name: e.target.value,
                          })
                        }
                        placeholder="Nome da cor"
                        className="
                          h-10 w-full rounded-lg border border-neutral-300
                          bg-white px-3 text-sm outline-none transition
                          placeholder:text-neutral-400
                          focus:border-[#B8963E]
                          focus:ring-2 focus:ring-[#B8963E]/10
                        "
                      />

                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          value={color.stock}
                          onChange={(e) =>
                            updateColor(variation.size, color.id, {
                              stock: Number(e.target.value),
                            })
                          }
                          placeholder="Estoque"
                          className="
                            h-10 w-full rounded-lg border border-neutral-300
                            bg-white px-3 pr-9 text-sm outline-none transition
                            focus:border-[#B8963E]
                            focus:ring-2 focus:ring-[#B8963E]/10
                          "
                        />

                        <span
                          className="
                            pointer-events-none absolute right-3 top-1/2
                            -translate-y-1/2 text-[10px] uppercase
                            text-neutral-400
                          "
                        >
                          un.
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeColor(variation.size, color.id)}
                        className="
                          flex h-10 w-10 items-center justify-center
                          rounded-lg text-neutral-400 transition
                          hover:bg-red-50 hover:text-red-600
                        "
                        aria-label="Remover cor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
