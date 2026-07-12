'use client'

type Variant = {
  size: string
}

type Props = {
  variants: Variant[]
  selectedSize: string
  onSelect: (size: string) => void
}

export function SizeSelector({ variants, selectedSize, onSelect }: Props) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-700">
        Escolha o tamanho
      </h3>

      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const active = selectedSize === variant.size

          return (
            <button
              key={variant.size}
              onClick={() => onSelect(variant.size)}
              className={`
                flex h-12 min-w-12 items-center justify-center
                rounded-full border text-sm
                transition-all duration-300
                ${
                  active
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900'
                }
              `}
            >
              {variant.size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
