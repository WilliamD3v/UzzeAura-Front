'use client'

import { useState } from 'react'

import { CatalogHero } from '@/components/catalog/CatalogHero'
import { CatalogPagination } from '@/components/catalog/CatalogPagination'
import { CollectionDivider } from '@/components/catalog/CollectionDivider'
import { ProductFilter } from '@/components/catalog/ProductFilter'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { Footer } from '@/components/layout/footer'

import { useProducts } from '@/data/products'

const PRODUCTS_PER_PAGE = 8

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const [filterOpen, setFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: '',

    size: '',

    color: '',

    minPrice: '',

    maxPrice: '',

    estreia: false,
  })

  const { data: products, isLoading } = useProducts()

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Carregando produtos...</p>
      </main>
    )
  }

  const filteredProducts =
    products?.filter((product) => {
      if (!product.status.destaque) {
        return false
      }

      if (
        filters.search &&
        !product.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      if (filters.minPrice && product.price < Number(filters.minPrice)) {
        return false
      }

      if (filters.maxPrice && product.price > Number(filters.maxPrice)) {
        return false
      }

      if (filters.estreia && !product.status.estreia) {
        return false
      }

      if (filters.size) {
        const hasSize = product.sizes.some((item) => item.size === filters.size)

        if (!hasSize) {
          return false
        }
      }

      if (filters.color) {
        const hasColor = product.sizes.some((item) =>
          item.colors.some((color) => color.name === filters.color),
        )

        if (!hasColor) {
          return false
        }
      }

      return true
    }) ?? []

  const sizes = Array.from(
    new Set(
      products?.flatMap((product) => product.sizes.map((item) => item.size)) ??
        [],
    ),
  )

  const colors = Array.from(
    new Set(
      products?.flatMap((product) =>
        product.sizes.flatMap((item) => item.colors.map((color) => color.name)),
      ) ?? [],
    ),
  )

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE

  const currentProducts = filteredProducts.slice(
    start,
    start + PRODUCTS_PER_PAGE,
  )

  return (
    <main className="bg-white min-h-screen">
      <CatalogHero onFilterClick={() => setFilterOpen(true)} />

      <CollectionDivider />

      {filterOpen && (
        <ProductFilter
          filters={filters}

          setFilters={setFilters}

          sizes={sizes}

          colors={colors}

          onClose={() => setFilterOpen(false)}
        />
      )}

      <section
        className="
          mx-auto
          max-w-7xl
          px-5
          py-3
        "
      >
        <div className="mt-12">
          <ProductGrid products={currentProducts} />
        </div>

        <div className="mt-16">
          <CatalogPagination
            currentPage={currentPage}

            totalPages={totalPages}

            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}
