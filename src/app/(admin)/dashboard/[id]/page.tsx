'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { useProducts } from '@/data/products'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

export default function DashboardPage({ params }: Props) {
  const { data: products, isLoading } = useProducts()

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
          max-w-7xl
          space-y-6
        "
      >
        <DashboardHeader />

        <section
          className="
            flex
            flex-wrap
            gap-4
            rounded-2xl
            bg-white
            p-6
            shadow-sm
          "
        >
          <Link
            href={`/dashboard/${params.id}/products/new`}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-neutral-800
            "
          >
            <Plus size={18} />
            Cadastrar Produto
          </Link>
        </section>

        <section
          className="
            rounded-2xl
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="mb-6 text-xl font-medium text-neutral-900">
            Produtos cadastrados
          </h2>

          {isLoading ? (
            <p className="text-neutral-500">Carregando produtos...</p>
          ) : products && products.length > 0 ? (
            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                  "
                >
                  <div
                    className="
                      relative
                      aspect-[3/4]
                      bg-neutral-100
                    "
                  >
                    <Image
                      src={product.image.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3 p-5">
                    <h3 className="font-medium text-neutral-900">
                      {product.name}
                    </h3>

                    <p className="text-lg font-semibold">
                      {product.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>

                    <div className="flex gap-2 text-xs">
                      {product.status.destaque && (
                        <span className="rounded-full bg-black px-3 py-1 text-white">
                          Destaque
                        </span>
                      )}

                      {product.status.estreia && (
                        <span className="rounded-full bg-neutral-200 px-3 py-1">
                          Estreia
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/dashboard/${params.id}/${product._id}/edit`}
                      className="
                        block
                        rounded-xl
                        border
                        border-neutral-300
                        py-2
                        text-center
                        text-sm
                        transition
                        hover:bg-neutral-100
                      "
                    >
                      Gerenciar produto
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">Nenhum produto cadastrado.</p>
          )}
        </section>
      </div>
    </main>
  )
}
