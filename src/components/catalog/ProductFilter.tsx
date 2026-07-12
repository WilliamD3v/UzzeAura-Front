'use client'

import { X } from 'lucide-react'

type Props = {
  filters: {
    search: string
    size: string
    color: string
    minPrice: string
    maxPrice: string
    estreia: boolean
  }

  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string
      size: string
      color: string
      minPrice: string
      maxPrice: string
      estreia: boolean
    }>
  >

  sizes: string[]

  colors: string[]

  onClose: () => void
}

export function ProductFilter({
  filters,
  setFilters,
  sizes,
  colors,
  onClose,
}: Props) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        justify-end
        bg-black/40
      "
      onClick={onClose}
    >
      <aside
        className="
          h-full
          w-full
          max-w-md
          overflow-y-auto
          bg-white
          p-6
          shadow-xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            mb-8
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-xl
              font-medium
              text-neutral-900
            "
          >
            Filtros
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-neutral-100
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Busca */}

          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-neutral-700
              "
            >
              Buscar produto
            </label>

            <input
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              placeholder="Digite o nome..."
              className="
                w-full
                rounded-xl
                border
                border-neutral-200
                px-4
                py-3
                outline-none
                focus:border-black
              "
            />
          </div>

          {/* Tamanho */}

          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-neutral-700
              "
            >
              Tamanho
            </label>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      size: filters.size === size ? '' : size,
                    })
                  }
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    transition

                    ${
                      filters.size === size
                        ? 'bg-black text-white border-black'
                        : 'border-neutral-300 text-neutral-700'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cores */}

          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-neutral-700
              "
            >
              Cor
            </label>

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      color: filters.color === color ? '' : color,
                    })
                  }
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                    transition

                    ${
                      filters.color === color
                        ? 'bg-black text-white border-black'
                        : 'border-neutral-300 text-neutral-700'
                    }
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Preço */}

          <div>
            <label
              className="
                mb-3
                block
                text-sm
                font-medium
                text-neutral-700
              "
            >
              Faixa de preço
            </label>

            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              <input
                type="number"
                placeholder="Mínimo"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    minPrice: e.target.value,
                  })
                }
                className="
                  rounded-xl
                  border
                  border-neutral-200
                  px-3
                  py-3
                "
              />

              <input
                type="number"
                placeholder="Máximo"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: e.target.value,
                  })
                }
                className="
                  rounded-xl
                  border
                  border-neutral-200
                  px-3
                  py-3
                "
              />
            </div>
          </div>

          {/* Lançamentos */}

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              text-sm
              text-neutral-700
            "
          >
            <input
              type="checkbox"
              checked={filters.estreia}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  estreia: e.target.checked,
                })
              }
              className="
                h-4
                w-4
              "
            />
            Apenas lançamentos
          </label>

          {/* Limpar filtros */}

          <button
            onClick={() =>
              setFilters({
                search: '',
                size: '',
                color: '',
                minPrice: '',
                maxPrice: '',
                estreia: false,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-neutral-300
              py-3
              text-sm
              uppercase
              tracking-widest
              transition
              hover:bg-neutral-100
            "
          >
            Limpar filtros
          </button>
        </div>
      </aside>
    </div>
  )
}
