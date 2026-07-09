'use client'

import { CatalogHero } from '@/components/catalog/CatalogHero'
import { CatalogPagination } from '@/components/catalog/CatalogPagination'
import { CollectionDivider } from '@/components/catalog/CollectionDivider'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { Footer } from '@/components/layout/footer'
import { products } from '@/data/products'
import { useState } from 'react'

const PRODUCTS_PER_PAGE = 4

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const featuredProducts = products.filter((product) => product.status.destaque)

  const totalPages = Math.ceil(featuredProducts.length / PRODUCTS_PER_PAGE)

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE
  const end = start + PRODUCTS_PER_PAGE

  const currentProducts = featuredProducts.slice(start, end)

  return (
    <main className="bg-white min-h-screen">
      <CatalogHero />

      <div>
        <CollectionDivider />
      </div>

      <section className="mx-auto max-w-7xl px-5 py-3">
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

      <div>
        <Footer />
      </div>
    </main>
  )
}
