'use client'

import { Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  onSubmit: () => void
  loading?: boolean
}

export function ProductActions({ onSubmit, loading = false }: Props) {
  const router = useRouter()

  return (
    <div
      className="
        flex flex-col-reverse gap-3
        border-t border-neutral-200 pt-6
        sm:flex-row sm:justify-end
      "
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="
          flex h-11 items-center justify-center gap-2
          rounded-lg border border-neutral-300
          bg-white px-5 text-sm font-medium text-neutral-600
          transition
          hover:border-neutral-400 hover:bg-neutral-50
          hover:text-neutral-950
        "
      >
        <X size={16} />
        Cancelar
      </button>

      <button
        type="button"
        disabled={loading}
        onClick={onSubmit}
        className="
          flex h-11 min-w-40 items-center justify-center gap-2
          rounded-lg border border-neutral-950
          bg-neutral-950 px-6
          text-sm font-medium text-[#E1C56E]
          transition
          hover:bg-black
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Save size={16} />

        {loading ? 'Salvando...' : 'Salvar produto'}
      </button>
    </div>
  )
}
