'use client'

import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

import { montserrat } from '@/lib/fonts'

type Props = {
  onFilterClick: () => void
}

export function CatalogHero({ onFilterClick }: Props) {
  return (
    <section className="border-b border-neutral-100">
      <div
        className="
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          md:px-8
          pt-5
          md:pt-6
          pb-8
          md:pb-10
        "
      >
        <Link
          href="/"
          className="
            inline-flex
            h-10
            w-10
            md:h-11
            md:w-11
            items-center
            justify-center
            rounded-full
            border
            border-neutral-200
            text-neutral-700
            transition-all
            duration-300
            hover:border-black
            hover:bg-black
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="mt-8 md:mt-10">
          <span
            className="
              text-[11px]
              md:text-xs
              uppercase
              tracking-[0.35em]
              text-neutral-500
            "
          >
            Nova Coleção
          </span>

          <p
            className={`
              ${montserrat.className}
              mt-6
              max-w-3xl
              text-xl
              sm:text-2xl
              md:text-4xl
              font-semibold
              uppercase
              leading-tight
              tracking-[0.08em]
              text-neutral-900
            `}
          >
            Coleções pensadas para expressar seu estilo com elegância.
          </p>
        </div>

        <div
          className="
            mt-8
            md:mt-10
            flex
            items-center
            justify-between
            border-t
            border-neutral-100
            pt-5
            md:pt-6
          "
        >
          <span
            className="
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.3em]
              text-neutral-400
            "
          >
            Coleção feminina
          </span>

          <span
            className="
              text-[10px]
              md:text-xs
              uppercase
              tracking-[0.3em]
              text-neutral-400
            "
          >
            Seleção exclusiva
          </span>
        </div>

        <div className="mt-6 md:mt-8 relative">
          <Link
            href="/lancamentos"
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              bg-black
              px-5
              md:px-6
              py-4
              md:py-5
              transition-all
              duration-300
              hover:bg-[#f7f4ee]
            "
          >
            <span
              className="
                text-xs
                md:text-sm
                uppercase
                tracking-[0.3em]
                md:tracking-[0.35em]
                text-white
                transition-colors
                duration-300
                group-hover:text-black
              "
            >
              Lançamentos
            </span>

            <span className="w-24 md:w-32" />
          </Link>

          <button
            onClick={onFilterClick}
            className="
              absolute
              right-3
              sm:right-4
              md:right-6
              top-1/2
              -translate-y-1/2
              flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-4
              md:px-5
              py-3
              text-[10px]
              md:text-xs
              uppercase
              tracking-widest
              text-white
              transition-all
              duration-300
              hover:bg-[#f7f4ee]
              hover:text-black
            "
          >
            <SlidersHorizontal size={15} />

            <span>Filtros</span>
          </button>
        </div>
      </div>
    </section>
  )
}
