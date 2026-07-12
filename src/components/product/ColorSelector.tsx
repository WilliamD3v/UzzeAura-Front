'use client'

type Color = {
  _id: string
  name: string
  image: string
  quantity: number
}

type Props = {
  colors: Color[]
  selectedColor: string
  onSelect: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onSelect }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-700">
        Cor disponível
      </h3>

      <div className="flex flex-wrap gap-5">
        {colors.map((color) => {
          const active = selectedColor === color.name

          const disabled = color.quantity <= 0

          return (
            <button
              key={color._id}
              disabled={disabled}
              onClick={() => onSelect(color.name)}
              className={`
        group
        flex
        flex-col
        items-center
        gap-3
        transition-all
        duration-300
        ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
      `}
            >
              <span
                className={`
          relative
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          transition-all
          duration-300
          ${
            active
              ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-4'
              : 'border-neutral-300 group-hover:border-neutral-900'
          }
        `}
              >
                <span className="h-8 w-8 rounded-full bg-neutral-800" />
              </span>

              <span className="text-xs text-neutral-700">{color.name}</span>

              <span className="text-[11px] text-neutral-400">
                {color.quantity} disponíveis
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
