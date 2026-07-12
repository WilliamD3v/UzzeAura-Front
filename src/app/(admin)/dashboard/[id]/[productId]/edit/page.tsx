'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { useProduct } from '@/data/products'

import { ProductForm } from '@/components/product/form/ProductForm'

type Props = {
  params: {
    id: string

    productId: string
  }
}

export default function EditProductPage({ params }: Props) {
  const { data: product, isLoading } = useProduct(params.productId)

  if (isLoading) {
    return (
      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        Carregando...
      </main>
    )
  }

  if (!product) {
    return (
      <main
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        Produto não encontrado
      </main>
    )
  }

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
        <Link
          href={`/dashboard/${params.id}`}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            text-neutral-500
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
          "
        >
          Editar Produto
        </h1>

        <p
          className="
            mt-3
            text-neutral-500
          "
        >
          Atualize todas as informações do produto.
        </p>

        <div className="mt-10">
          <ProductForm product={product} />
        </div>
      </div>
    </main>
  )
}
