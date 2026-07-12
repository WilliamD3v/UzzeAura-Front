'use client'

import { Bell, Search } from 'lucide-react'

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Bom dia'
  }

  if (hour < 18) {
    return 'Boa tarde'
  }

  return 'Boa noite'
}

function getCurrentDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

export function DashboardHeader() {
  return (
    <header
      className="
        flex
        flex-col
        gap-6

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Esquerda */}

      <div>
        <span
          className="
            text-sm
            uppercase
            tracking-[0.35em]
            text-[#D4AF37]
          "
        >
          Dashboard
        </span>

        <h1
          className="
            mt-2
            text-3xl
            font-semibold
            text-neutral-900
          "
        >
          {getGreeting()}, William 👋
        </h1>

        <p
          className="
            mt-2
            text-sm
            capitalize
            text-neutral-500
          "
        >
          {getCurrentDate()}
        </p>
      </div>

      {/* Direita */}

      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
        "
      >
        {/* Pesquisa */}

        <div
          className="
            flex
            h-12
            w-full

            items-center

            gap-3

            rounded-xl

            border

            border-neutral-200

            bg-white

            px-4

            shadow-sm

            sm:w-80
          "
        >
          <Search size={18} className="text-neutral-400" />

          <input
            type="text"
            placeholder="Pesquisar..."

            className="
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-neutral-400
            "
          />
        </div>

        {/* Notificações */}

        <button
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-xl

            border

            border-neutral-200

            bg-white

            shadow-sm

            transition

            hover:bg-neutral-100
          "
        >
          <Bell size={20} />
        </button>

        {/* Perfil */}

        <button
          className="
            flex
            items-center
            gap-3

            rounded-xl

            border

            border-neutral-200

            bg-white

            px-4

            py-2

            shadow-sm

            transition

            hover:bg-neutral-100
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full

              bg-[#D4AF37]

              text-sm

              font-semibold

              text-white
            "
          >
            W
          </div>

          <div className="text-left">
            <p
              className="
                text-sm
                font-medium
                text-neutral-900
              "
            >
              William
            </p>

            <span
              className="
                text-xs
                text-neutral-500
              "
            >
              Administrador
            </span>
          </div>
        </button>
      </div>
    </header>
  )
}
