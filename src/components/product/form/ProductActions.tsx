'use client'

import { Save, X } from 'lucide-react'

type Props = {
  onSubmit: () => void

  loading?: boolean
}

export function ProductActions({ onSubmit, loading = false }: Props) {
  return (
    <section
      className="
        flex
        flex-col
        gap-4

        rounded-3xl

        border

        border-neutral-200

        bg-white

        p-8

        shadow-sm

        sm:flex-row

        sm:justify-end
      "
    >
      <button
        type="button"
        className="
          flex
          h-12
          items-center
          justify-center
          gap-2

          rounded-xl

          border

          border-neutral-300

          px-6

          text-sm

          font-medium

          text-neutral-700

          transition

          hover:bg-neutral-50
        "
      >
        <X size={18} />
        Cancelar
      </button>

      <button
        type="button"

        disabled={loading}

        onClick={onSubmit}

        className="
          flex
          h-12
          items-center
          justify-center
          gap-2

          rounded-xl

          bg-neutral-900

          px-8

          text-sm

          font-medium

          text-white

          transition

          hover:bg-neutral-800

          disabled:cursor-not-allowed

          disabled:opacity-60
        "
      >
        <Save size={18} />

        {loading ? 'Salvando...' : 'Salvar Produto'}
      </button>
    </section>
  )
}
