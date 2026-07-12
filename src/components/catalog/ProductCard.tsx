'use client'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/data/products'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  return (
    <Link href={`/catalog/product/${product._id}`} className="group block">
      <article>
        {/* Imagem */}
        <div
          className="
            relative
            aspect-[3/4]
            overflow-hidden
            rounded-xl
            bg-neutral-100
          "
        >
          {/* Badge */}
          {product.status.estreia && (
            <span
              className="
                absolute
                left-3
                top-3
                z-10
                rounded-full
                bg-white
                px-3
                py-1
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-neutral-800
                shadow-sm
              "
            >
              Novo
            </span>
          )}

          <Image
            src={product.image.url}
            alt={product.name}
            fill
            sizes="
              (max-width:640px) 50vw,
              (max-width:1024px) 33vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* Botão Desktop */}
          <div
            className="
              absolute
              inset-x-3
              bottom-3
              hidden
              translate-y-5
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
              md:block
            "
          >
            <div
              className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                text-sm
                tracking-wide
                text-neutral-900
                shadow-sm
                transition
                hover:bg-neutral-100
              "
            >
              <ShoppingBag size={17} />
              Ver Produto
            </div>
          </div>
        </div>

        {/* Informações */}
        <div
          className="
            mt-4
            flex
            flex-col
            gap-1
            md:mt-5
          "
        >
          <h3
            className="
              text-sm
              font-medium
              tracking-wide
              text-[#D4AF37]
              drop-shadow-[0_0_5px_rgba(212,175,55,0.25)]
              md:text-[15px]
            "
          >
            {product.name}
          </h3>

          <span
            className="
              text-sm
              text-neutral-500
              md:text-base
            "
          >
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </article>
    </Link>
  )
}
