'use client'

import { products } from '@/data/products'
import { playfair } from '@/lib/fonts'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export function PremiereProducts() {
  const premiereProducts = products
    .filter((product) => product.status.estreia)
    .slice(0, 4)

  return (
    <section className="w-full py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Título */}

        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.35em] text-neutral-500 text-sm">
            Conheça antes de todos
          </p>

          <h2
            className={`${playfair.className}
              text-4xl
              md:text-5xl
              mt-3
              text-neutral-900`}
          >
            Em Estreia
          </h2>

          {/* Divisor */}

          <div className="mt-6 flex items-center justify-center gap-4">
            <div
              className="
                h-px
                w-20
                md:w-32
                bg-gradient-to-r
                from-transparent
                via-[#C8A85A]
                to-[#E8D28A]
              "
            />

            <span
              className="
                text-xl
                text-[#D4AF37]
                drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]
              "
            >
              ✦
            </span>

            <div
              className="
                h-px
                w-20
                md:w-32
                bg-gradient-to-l
                from-transparent
                via-[#C8A85A]
                to-[#E8D28A]
              "
            />
          </div>
        </div>

        {/* Produtos */}

        <div
          className="
            flex
            gap-6
            overflow-x-auto
            snap-x
            snap-mandatory
            scrollbar-hide

            md:grid
            md:grid-cols-2

            lg:grid-cols-4
          "
        >
          {premiereProducts.map((product) =>
            product.status.post ? (
              <div
                key={product._id}
                className="
                  group
                  rounded-3xl
                  overflow-hidden
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-500

                  min-w-[85%]
                  snap-center

                  md:min-w-0
                "
              >
                {/* Imagem */}

                <div
                  className="
                    relative
                    aspect-[3/4]
                    overflow-hidden
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="
                      object-cover
                      group-hover:scale-110
                      transition-transform
                      duration-700
                    "
                  />
                </div>

                {/* Informações */}

                <div className="p-5">
                  <h3 className="font-medium text-lg text-neutral-900">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xl font-semibold text-neutral-900">
                    R$ {product.price.toFixed(2)}
                  </p>

                  <button
                    className="
                      mt-5
                      w-full
                      h-11
                      rounded-xl
                      bg-black
                      text-white

                      flex
                      items-center
                      justify-center
                      gap-2

                      hover:bg-neutral-800
                      transition
                    "
                  >
                    <ShoppingBag size={18} />
                    Comprar
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={product._id}
                className="
                  relative
                  rounded-3xl
                  overflow-hidden

                  bg-gradient-to-br
                  from-neutral-900
                  via-neutral-800
                  to-black

                  aspect-[3/4]

                  min-w-[85%]
                  snap-center

                  md:min-w-0

                  flex
                  flex-col
                  items-center
                  justify-center

                  text-white
                "
              >
                {/* Brilho */}

                <div
                  className="
                    absolute
                    w-56
                    h-56
                    rounded-full
                    bg-white/5
                    blur-3xl
                  "
                />

                {/* Interrogação */}

                <span
                  className="
                    text-8xl
                    font-light
                    animate-bounce
                    relative
                  "
                >
                  ?
                </span>

                <p
                  className="
                    mt-6
                    uppercase
                    tracking-[0.3em]
                    text-sm
                  "
                >
                  Em breve
                </p>

                <span
                  className="
                    text-xs
                    text-neutral-400
                    mt-2
                  "
                >
                  Nova coleção
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
