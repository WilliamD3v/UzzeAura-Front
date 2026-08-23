'use client'

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { ProductForm } from '@/components/product/form/ProductForm'
import { useProduct } from '@/data/products'

export default function EditProductPage() {
  const params = useParams()

  const id = params.id as string
  const productId = params.productId as string

  const { data: product, isLoading, isError } = useProduct(productId)

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
        <div
          className="
            h-7
            w-7
            animate-spin
            rounded-full
            border-2
            border-neutral-200
            border-t-[#B8963E]
          "
        />
      </main>
    )
  }

  if (isError || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F0]">
        <div className="text-center">
          <p className="font-medium text-neutral-900">Produto não encontrado</p>

          <Link
            href={`/dashboard/${id}/products`}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              text-sm
              text-[#B8963E]
            "
          >
            <ChevronLeft size={16} />
            Voltar para produtos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] p-5 sm:p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/dashboard/${id}/products`}
          className="
            mb-7
            inline-flex
            items-center
            gap-2
            text-sm
            text-neutral-500
            transition
            hover:text-neutral-950
          "
        >
          <ChevronLeft size={16} />
          Produtos
        </Link>

        <div className="mb-8">
          <p
            className="
              text-xs
              font-medium
              uppercase
              tracking-[0.2em]
              text-[#B8963E]
            "
          >
            Catálogo
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-semibold
              tracking-tight
              text-neutral-950
            "
          >
            Editar produto
          </h1>

          <p className="mt-2 text-sm text-neutral-500">{product.name}</p>
        </div>

        <ProductForm product={product} />
      </div>
    </main>
  )
}
