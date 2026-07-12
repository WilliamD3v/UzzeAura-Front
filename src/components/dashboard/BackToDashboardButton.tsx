'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function BackToDashboardButton() {
  const router = useRouter()

  function handleBack() {
    router.push('/dashboard')
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-neutral-200
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-neutral-700
        transition
        hover:bg-neutral-100
      "
    >
      <ArrowLeft size={18} />
      Voltar ao Dashboard
    </button>
  )
}
