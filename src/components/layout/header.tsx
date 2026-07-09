'use client'

import { playfair } from '@/lib/fonts'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'

interface HeaderProps {
  onOpenMenu: () => void
}

export function Header({ onOpenMenu }: HeaderProps) {
  return (
    <header
      className="
        absolute
        top-0
        left-0
        z-50
        w-full
        h-20
        px-4
        md:px-8
        text-white
      "
    >
      <div className="relative h-full flex items-center justify-between">
        {/* Menu mobile */}
        <button
          onClick={onOpenMenu}
          className="
            flex
            md:hidden
            items-center
            justify-center
            h-10
            w-10
          "
          aria-label="Abrir menu"
        >
          <Menu size={25} />
        </button>

        {/* Menu esquerdo desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            className="
              flex
              items-center
              h-10
              text-sm
              font-medium
              hover:opacity-70
              transition
            "
          >
            Novidades
          </button>

          <button
            className="
              flex
              items-center
              h-10
              text-sm
              font-medium
              hover:opacity-70
              transition
            "
          >
            Vestidos
          </button>
        </nav>

        {/* Logo */}

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
          "
        >
          {/* Mobile */}

          <h1
            className={`
              block
              md:hidden
              ${playfair.className}
              text-2xl
              font-semibold
              tracking-[0.35em]
              text-white
              drop-shadow-lg
            `}
          >
            UA
          </h1>

          {/* Desktop */}

          <h1
            className={`
              hidden
              md:block
              ${playfair.className}
              text-3xl
              font-semibold
              tracking-wide
              text-white
              drop-shadow-lg
            `}
          >
            UzzeAura
          </h1>
        </div>

        {/* Menu direito */}

        <nav className="ml-auto flex items-center gap-2 md:gap-6">
          {/* Links desktop */}

          <div className="hidden md:flex items-center gap-8">
            <button
              className="
                flex
                items-center
                h-10
                text-sm
                font-medium
                hover:opacity-70
                transition
              "
            >
              Conjuntos
            </button>

            <button
              className="
                flex
                items-center
                h-10
                text-sm
                font-medium
                hover:opacity-70
                transition
              "
            >
              Coleção
            </button>
          </div>

          {/* Ícones */}

          <div className="flex items-center gap-2 md:gap-4">
            {/* Pesquisa */}

            <button
              className="
                flex
                items-center
                justify-center
                h-10
                w-10
                hover:opacity-70
                transition
              "
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>

            {/* Login desktop */}

            <button
              className="
                hidden
                md:flex
                items-center
                justify-center
                h-10
                w-10
                hover:opacity-70
                transition
              "
              aria-label="Usuário"
            >
              <User size={20} />
            </button>

            {/* Sacola */}

            <button
              className="
                flex
                items-center
                justify-center
                h-10
                w-10
                hover:opacity-70
                transition
              "
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
