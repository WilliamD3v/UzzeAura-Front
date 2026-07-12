'use client'

import { Dispatch, SetStateAction } from 'react'
import { ProductFormData } from './types'

type Props = {
  form: ProductFormData
  setForm: Dispatch<SetStateAction<ProductFormData>>
}

export function BasicInformation({ form, setForm }: Props) {
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
          Informações
        </p>

        <h2
          className="
            mt-2
            text-2xl
            font-semibold
            text-neutral-900
          "
        >
          Informações Básicas
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Preencha os dados principais do produto.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Nome */}

        <div>
          <label
            htmlFor="name"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-neutral-700
            "
          >
            Nome do produto
          </label>

          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                name: e.target.value,
              }))
            }
            placeholder="Ex.: Vestido Aurora"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-neutral-300
              bg-white
              px-4
              outline-none
              transition
              focus:border-[#D4AF37]
            "
          />
        </div>

        {/* Preço */}

        <div>
          <label
            htmlFor="price"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-neutral-700
            "
          >
            Preço
          </label>

          <input
            id="price"
            type="number"
            min={0}
            step="0.01"
            value={form.price || ''}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                price: Number(e.target.value),
              }))
            }
            placeholder="0,00"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-neutral-300
              bg-white
              px-4
              outline-none
              transition
              focus:border-[#D4AF37]
            "
          />
        </div>

        {/* Descrição */}

        <div>
          <label
            htmlFor="description"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-neutral-700
            "
          >
            Descrição (opcional)
          </label>

          <textarea
            id="description"
            rows={6}
            value={form.description}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                description: e.target.value,
              }))
            }
            placeholder="Descreva o produto..."
            className="
              w-full
              rounded-xl
              border
              border-neutral-300
              bg-white
              px-4
              py-3
              outline-none
              transition
              resize-none
              focus:border-[#D4AF37]
            "
          />
        </div>
      </div>
    </section>
  )
}
