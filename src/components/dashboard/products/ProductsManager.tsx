'use client'

import {
  ChevronLeft,
  Edit3,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import axios from '@/lib/axios'

import { useProducts } from '@/data/products'

type Props = {
  dashboardId: string
}

export function ProductsManager({ dashboardId }: Props) {
  const { data: products = [], isLoading, isError } = useProducts()

  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) {
      return products
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(term),
    )
  }, [products, search])

  function getStock(product: (typeof products)[number]) {
    return product.sizes.reduce((total, size) => {
      return (
        total +
        size.colors.reduce((colorTotal, color) => {
          return colorTotal + color.stock
        }, 0)
      )
    }, 0)
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  async function handleDelete(productId: string, productName: string) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir "${productName}"?\n\nEssa ação não poderá ser desfeita.`,
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(productId)

      const response = await axios.delete(`/product/${productId}`)

      console.log('Produto excluído:', response.data)

      await queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    } catch (error: unknown) {
      console.error('Erro ao excluir produto:', error)

      let message = 'Não foi possível excluir o produto.'

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string
            }
          }
        }

        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message
        }
      }

      alert(message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] p-5 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-8">
          <Link
            href={`/dashboard/${dashboardId}`}
            className="
              mb-6 inline-flex items-center gap-2
              text-sm text-neutral-500
              transition hover:text-neutral-950
            "
          >
            <ChevronLeft size={16} />
            Dashboard
          </Link>

          <div
            className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <h1
                className="
                  text-3xl font-semibold
                  tracking-tight text-neutral-950
                "
              >
                Produtos
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                {products.length}{' '}
                {products.length === 1
                  ? 'produto no catálogo'
                  : 'produtos no catálogo'}
              </p>
            </div>

            <Link
              href={`/dashboard/${dashboardId}/products/new`}
              className="
                inline-flex h-11
                items-center justify-center gap-2
                rounded-lg bg-neutral-950
                px-5 text-sm font-medium
                text-[#E1C56E]
                transition hover:bg-black
              "
            >
              <Plus size={17} />
              Novo produto
            </Link>
          </div>
        </div>

        {/* CONTAINER */}

        <div
          className="
            overflow-hidden rounded-2xl
            border border-neutral-200
            bg-white
            shadow-[0_8px_30px_rgba(0,0,0,0.035)]
          "
        >
          {/* BUSCA */}

          <div className="border-b border-neutral-200 p-5 sm:p-6">
            <div className="relative max-w-md">
              <Search
                size={17}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-neutral-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar produto..."
                className="
                  h-11 w-full rounded-lg
                  border border-neutral-300
                  bg-[#FFFEFB]
                  pl-11 pr-4
                  text-sm
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-[#B8963E]
                  focus:ring-2
                  focus:ring-[#B8963E]/10
                "
              />
            </div>
          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="flex min-h-72 items-center justify-center">
              <div
                className="
                  h-6 w-6 animate-spin
                  rounded-full
                  border-2 border-neutral-200
                  border-t-[#B8963E]
                "
              />
            </div>
          )}

          {/* ERRO */}

          {isError && (
            <div
              className="
                flex min-h-72
                flex-col items-center
                justify-center p-8
                text-center
              "
            >
              <Package size={28} className="mb-3 text-red-400" />

              <p className="font-medium text-neutral-800">
                Erro ao carregar produtos
              </p>

              <p className="mt-1 text-sm text-neutral-400">
                Não foi possível buscar os produtos cadastrados.
              </p>
            </div>
          )}

          {/* LISTA VAZIA */}

          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div
              className="
                flex min-h-72
                flex-col items-center
                justify-center p-8
                text-center
              "
            >
              <div
                className="
                  mb-4 flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-neutral-100
                  text-neutral-400
                "
              >
                <Package size={21} />
              </div>

              <p className="font-medium text-neutral-800">
                Nenhum produto encontrado
              </p>

              <p className="mt-1 text-sm text-neutral-400">
                {search
                  ? 'Tente buscar por outro nome.'
                  : 'Nenhum produto cadastrado no catálogo.'}
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredProducts.length > 0 && (
            <>
              {/* ====================================================== */}
              {/* DESKTOP */}
              {/* ====================================================== */}

              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr
                      className="
                        border-b border-neutral-200
                        bg-[#FAF8F3]
                      "
                    >
                      <th
                        className="
                          px-6 py-4
                          text-left text-xs
                          font-medium uppercase
                          tracking-wider
                          text-neutral-400
                        "
                      >
                        Produto
                      </th>

                      <th
                        className="
                          px-6 py-4
                          text-left text-xs
                          font-medium uppercase
                          tracking-wider
                          text-neutral-400
                        "
                      >
                        Preço
                      </th>

                      <th
                        className="
                          px-6 py-4
                          text-left text-xs
                          font-medium uppercase
                          tracking-wider
                          text-neutral-400
                        "
                      >
                        Estoque
                      </th>

                      <th
                        className="
                          px-6 py-4
                          text-left text-xs
                          font-medium uppercase
                          tracking-wider
                          text-neutral-400
                        "
                      >
                        Status
                      </th>

                      <th
                        className="
                          px-6 py-4
                          text-right text-xs
                          font-medium uppercase
                          tracking-wider
                          text-neutral-400
                        "
                      >
                        Ações
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-neutral-100">
                    {filteredProducts.map((product) => {
                      const stock = getStock(product)
                      const isDeleting = deletingId === product._id

                      return (
                        <tr
                          key={product._id}
                          className="
                            transition
                            hover:bg-[#FAF8F3]/60
                          "
                        >
                          {/* PRODUTO */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div
                                className="
                                  h-16 w-12
                                  shrink-0
                                  overflow-hidden
                                  rounded-lg
                                  border
                                  border-neutral-200
                                  bg-neutral-100
                                "
                              >
                                {product.image?.url ? (
                                  <img
                                    src={product.image.url}
                                    alt={product.name}
                                    className="
                                      h-full w-full
                                      object-cover
                                    "
                                  />
                                ) : (
                                  <div
                                    className="
                                      flex h-full w-full
                                      items-center
                                      justify-center
                                      text-neutral-300
                                    "
                                  >
                                    <Package size={18} />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p
                                    className="
                                      truncate
                                      text-sm font-medium
                                      text-neutral-900
                                    "
                                  >
                                    {product.name}
                                  </p>

                                  {product.status.destaque && (
                                    <Star
                                      size={13}
                                      className="
                                        fill-[#B8963E]
                                        text-[#B8963E]
                                      "
                                    />
                                  )}
                                </div>

                                <p
                                  className="
                                    mt-1
                                    max-w-xs
                                    truncate
                                    text-xs
                                    text-neutral-400
                                  "
                                >
                                  {product.description || 'Sem descrição'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* PREÇO */}

                          <td className="px-6 py-4">
                            <span
                              className="
                                text-sm font-medium
                                text-neutral-800
                              "
                            >
                              {formatPrice(product.price)}
                            </span>
                          </td>

                          {/* ESTOQUE */}

                          <td className="px-6 py-4">
                            <span
                              className={`
                                text-sm
                                ${
                                  stock === 0
                                    ? 'text-red-500'
                                    : 'text-neutral-700'
                                }
                              `}
                            >
                              {stock} un.
                            </span>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">
                            <span
                              className="
                                inline-flex
                                rounded-full
                                bg-emerald-50
                                px-2.5 py-1
                                text-xs
                                font-medium
                                text-emerald-700
                              "
                            >
                              Ativo
                            </span>
                          </td>

                          {/* AÇÕES */}

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              {/* EDITAR */}

                              <Link
                                href={`/dashboard/${dashboardId}/products/${product._id}/edit`}
                                title="Editar produto"
                                className="
                                  inline-flex
                                  h-9 w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-neutral-400
                                  transition
                                  hover:bg-neutral-100
                                  hover:text-neutral-950
                                "
                              >
                                <Edit3 size={16} />
                              </Link>

                              {/* EXCLUIR */}

                              <button
                                type="button"
                                title="Excluir produto"
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDelete(product._id, product.name)
                                }
                                className="
                                  inline-flex
                                  h-9 w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-neutral-400
                                  transition
                                  hover:bg-red-50
                                  hover:text-red-600
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                "
                              >
                                {isDeleting ? (
                                  <div
                                    className="
                                      h-4 w-4
                                      animate-spin
                                      rounded-full
                                      border-2
                                      border-red-200
                                      border-t-red-600
                                    "
                                  />
                                ) : (
                                  <Trash2 size={16} />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* ====================================================== */}
              {/* MOBILE */}
              {/* ====================================================== */}

              <div className="divide-y divide-neutral-100 md:hidden">
                {filteredProducts.map((product) => {
                  const stock = getStock(product)
                  const isDeleting = deletingId === product._id

                  return (
                    <div key={product._id} className="p-4">
                      <div className="flex gap-4">
                        {/* IMAGEM */}

                        <div
                          className="
                            h-24 w-20
                            shrink-0
                            overflow-hidden
                            rounded-lg
                            border
                            border-neutral-200
                            bg-neutral-100
                          "
                        >
                          {product.image?.url ? (
                            <img
                              src={product.image.url}
                              alt={product.name}
                              className="
                                h-full w-full
                                object-cover
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex h-full
                                items-center
                                justify-center
                                text-neutral-300
                              "
                            >
                              <Package size={20} />
                            </div>
                          )}
                        </div>

                        {/* CONTEÚDO */}

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className="
                                    truncate
                                    font-medium
                                    text-neutral-900
                                  "
                                >
                                  {product.name}
                                </p>

                                {product.status.destaque && (
                                  <Star
                                    size={13}
                                    className="
                                      shrink-0
                                      fill-[#B8963E]
                                      text-[#B8963E]
                                    "
                                  />
                                )}
                              </div>

                              <p
                                className="
                                  mt-1
                                  text-sm
                                  font-semibold
                                  text-neutral-800
                                "
                              >
                                {formatPrice(product.price)}
                              </p>
                            </div>

                            {/* AÇÕES */}

                            <div className="flex shrink-0 items-center gap-1">
                              {/* EDITAR */}

                              <Link
                                href={`/dashboard/${dashboardId}/products/${product._id}/edit`}
                                title="Editar produto"
                                className="
                                  flex h-9 w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  border-neutral-200
                                  text-neutral-500
                                  transition
                                  hover:bg-neutral-50
                                  hover:text-neutral-950
                                "
                              >
                                <Edit3 size={15} />
                              </Link>

                              {/* EXCLUIR */}

                              <button
                                type="button"
                                title="Excluir produto"
                                disabled={isDeleting}
                                onClick={() =>
                                  handleDelete(product._id, product.name)
                                }
                                className="
                                  flex h-9 w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  border-neutral-200
                                  text-neutral-500
                                  transition
                                  hover:border-red-200
                                  hover:bg-red-50
                                  hover:text-red-600
                                  disabled:cursor-not-allowed
                                  disabled:opacity-40
                                "
                              >
                                {isDeleting ? (
                                  <div
                                    className="
                                      h-4 w-4
                                      animate-spin
                                      rounded-full
                                      border-2
                                      border-red-200
                                      border-t-red-600
                                    "
                                  />
                                ) : (
                                  <Trash2 size={15} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* ESTOQUE E STATUS */}

                          <div
                            className="
                              mt-4 flex
                              items-center
                              justify-between
                              text-xs
                            "
                          >
                            <span className="text-neutral-500">
                              Estoque: {stock}
                            </span>

                            <span
                              className="
                                rounded-full
                                bg-emerald-50
                                px-2.5 py-1
                                font-medium
                                text-emerald-700
                              "
                            >
                              Ativo
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
