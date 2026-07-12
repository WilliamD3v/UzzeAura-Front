import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { ProductForm } from '@/components/product/form/ProductForm'

export default function NewProductPage() {
  return (
    <main
      className="
        min-h-screen

        bg-neutral-50

        p-6

        md:p-10
      "
    >
      <div
        className="
          mx-auto

          max-w-6xl
        "
      >
        {/* Cabeçalho */}

        <div
          className="
            mb-10

            flex

            flex-col

            gap-4

            md:flex-row

            md:items-center

            md:justify-between
          "
        >
          <div>
            <Link
              href="/dashboard/products"

              className="
                mb-4

                inline-flex

                items-center

                gap-2

                text-sm

                text-neutral-500

                transition

                hover:text-black
              "
            >
              <ChevronLeft size={16} />
              Produtos
            </Link>

            <p
              className="
                text-sm

                uppercase

                tracking-[0.2em]

                text-[#D4AF37]
              "
            >
              Catálogo
            </p>

            <h1
              className="
                mt-2

                text-3xl

                font-semibold

                text-neutral-900

                md:text-4xl
              "
            >
              Novo Produto
            </h1>

            <p
              className="
                mt-3

                max-w-xl

                text-sm

                leading-6

                text-neutral-500
              "
            >
              Cadastre uma nova peça informando preço, imagem, tamanhos, cores e
              estoque.
            </p>
          </div>
        </div>

        {/* Formulário */}

        <ProductForm />
      </div>
    </main>
  )
}
