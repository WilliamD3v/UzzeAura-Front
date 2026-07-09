'use client'

import { playfair } from '@/lib/fonts'
import { Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#f5f1ea]">
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          py-5
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
          "
        >
          {/* Marca */}

          <h2
            className={`
              ${playfair.className}
              text-2xl
              text-neutral-900
              tracking-wide
            `}
          >
            Uzze
          </h2>

          {/* Menu */}

          <nav
            className="
              flex
              justify-center
              gap-5
              mt-3

              text-xs
              text-neutral-500
            "
          >
            <span className="hover:text-[#C8A85A] transition">Novidades</span>

            <span className="hover:text-[#C8A85A] transition">Vestidos</span>

            <span className="hover:text-[#C8A85A] transition">Conjuntos</span>

            <span className="hover:text-[#C8A85A] transition">Coleção</span>
          </nav>

          {/* Redes */}

          <div
            className="
              flex
              gap-3
              mt-4
            "
          >
            <button
              className="
                w-7
                h-7
                rounded-full

                border
                border-neutral-300

                flex
                items-center
                justify-center

                text-neutral-500

                hover:border-[#C8A85A]
                hover:text-[#C8A85A]

                transition
              "
            >
              <Instagram size={14} />
            </button>

            <button
              className="
                w-7
                h-7
                rounded-full

                border
                border-neutral-300

                flex
                items-center
                justify-center

                text-neutral-500

                hover:border-[#C8A85A]
                hover:text-[#C8A85A]

                transition
              "
            >
              <Facebook size={14} />
            </button>
          </div>
        </div>

        {/* Copyright */}

        <div
          className="
            mt-4
            pt-3

            border-t
            border-neutral-200

            text-center

            text-[11px]
            text-neutral-400
          "
        >
          © {new Date().getFullYear()} Uzze
        </div>
      </div>
    </footer>
  )
}
