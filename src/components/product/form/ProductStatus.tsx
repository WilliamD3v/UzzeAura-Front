'use client'

import { Dispatch, SetStateAction } from 'react'

import { Instagram, Sparkles, Star } from 'lucide-react'

import { ProductFormData } from './types'

type Props = {
  form: ProductFormData

  setForm: Dispatch<SetStateAction<ProductFormData>>
}

const options = [
  {
    key: 'destaque',
    title: 'Produto em destaque',
    description: 'Exibe o produto na área principal da loja.',

    icon: Star,
  },

  {
    key: 'estreia',
    title: 'Produto estreia',

    description: 'Mostra o selo de novidade no catálogo.',

    icon: Sparkles,
  },

  {
    key: 'post',
    title: 'Disponível para post',

    description: 'Marca o produto para divulgação.',

    icon: Instagram,
  },
]

export function ProductStatus({ form, setForm }: Props) {
  function toggleStatus(key: keyof ProductFormData['status']) {
    setForm((old) => ({
      ...old,

      status: {
        ...old.status,

        [key]: !old.status[key],
      },
    }))
  }

  return (
    <section
      className="
        rounded-3xl
        border
        border-neutral-200
        bg-white
        p-8
        shadow-sm
      "
    >
      <div className="mb-8">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.2em]
            text-[#D4AF37]
          "
        >
          Configuração
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-semibold
          "
        >
          Status do Produto
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-neutral-500
          "
        >
          Defina onde esse produto será exibido.
        </p>
      </div>

      <div
        className="
          grid
          gap-4
          md:grid-cols-3
        "
      >
        {options.map((option) => {
          const Icon = option.icon

          const active =
            form.status[option.key as keyof ProductFormData['status']]

          return (
            <button
              type="button"

              key={option.key}

              onClick={() =>
                toggleStatus(option.key as keyof ProductFormData['status'])
              }

              className={`
                flex
                flex-col
                gap-4

                rounded-2xl

                border

                p-5

                text-left

                transition-all


                ${
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }

              `}
            >
              <div
                className={`
                  flex

                  h-12

                  w-12

                  items-center

                  justify-center

                  rounded-xl


                  ${
                    active
                      ? 'bg-[#D4AF37] text-white'
                      : 'bg-neutral-100 text-neutral-500'
                  }

                `}
              >
                <Icon size={22} />
              </div>

              <div>
                <h3
                  className="
                    font-medium
                    text-neutral-900
                  "
                >
                  {option.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-5
                    text-neutral-500
                  "
                >
                  {option.description}
                </p>
              </div>

              <div
                className={`
                  mt-auto

                  h-5

                  w-10

                  rounded-full

                  p-1

                  transition


                  ${active ? 'bg-[#D4AF37]' : 'bg-neutral-200'}

                `}
              >
                <div
                  className={`
                    h-3

                    w-3

                    rounded-full

                    bg-white

                    transition-transform


                    ${active ? 'translate-x-5' : 'translate-x-0'}

                  `}
                />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
