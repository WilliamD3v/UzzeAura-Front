'use client'

import { logout } from '@/utils/logout'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  function handleLogout() {
    logout()

    router.push('/auth?auth=login')

    router.refresh()
  }

  return (
    <button
      type="button"

      onClick={handleLogout}

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

        text-neutral-700

        transition

        hover:bg-neutral-100
      "
    >
      <LogOut size={17} />
      Sair
    </button>
  )
}
