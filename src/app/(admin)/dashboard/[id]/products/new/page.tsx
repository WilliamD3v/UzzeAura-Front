import { ChevronLeft, PackagePlus } from 'lucide-react'
import Link from 'next/link'

import { ProductForm } from '@/components/product/form/ProductForm'

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-[#F6F3ED]">
      {/* Barra superior decorativa */}
      <div className="h-[3px] w-full bg-gradient-to-r from-black via-[#C7A44A] to-black" />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Voltar */}
        <Link
          href="/dashboard/products"
          className="
            group
            mb-8
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-neutral-500
            transition-colors
            duration-200
            hover:text-neutral-950
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-neutral-200
              bg-white/70
              transition-all
              duration-200
              group-hover:border-[#C7A44A]
              group-hover:bg-white
            "
          >
            <ChevronLeft size={16} strokeWidth={1.8} />
          </span>
          Voltar para produtos
        </Link>

        {/* Cabeçalho */}
        <header
          className="
            relative
            mb-8
            overflow-hidden
            rounded-[28px]
            border
            border-black/[0.06]
            bg-[#111111]
            px-6
            py-8
            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
            sm:px-8
            md:px-10
            md:py-10
          "
        >
          {/* Detalhe visual */}
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#D4AF37]/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-12
              h-44
              w-44
              rounded-full
              border
              border-[#D4AF37]/10
            "
          />

          <div className="relative z-10 flex items-start gap-5">
            <div
              className="
                hidden
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-[#D4AF37]/25
                bg-[#D4AF37]/10
                text-[#D4AF37]
                sm:flex
              "
            >
              <PackagePlus size={22} strokeWidth={1.7} />
            </div>

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />

                <p
                  className="
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#D4AF37]
                  "
                >
                  Gestão de catálogo
                </p>
              </div>

              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-[-0.03em]
                  text-[#F8F5EF]
                  sm:text-4xl
                  md:text-[42px]
                "
              >
                Novo Produto
              </h1>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-neutral-400
                  sm:text-[15px]
                "
              >
                Adicione uma nova peça ao catálogo e configure suas informações,
                imagem, disponibilidade, tamanhos, cores e estoque.
              </p>
            </div>
          </div>
        </header>

        {/* Formulário */}
        <ProductForm />
      </div>
    </main>
  )
}
