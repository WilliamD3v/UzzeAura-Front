'use client'

import { Dispatch, SetStateAction } from 'react'
import { ProductFormData } from './types'

type Props = {
  form: ProductFormData
  setForm: Dispatch<SetStateAction<ProductFormData>>
}

export function BasicInformation({ form, setForm }: Props) {
  return (
    <section className="border-b border-neutral-200 pb-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-neutral-800"
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
              h-12 w-full rounded-lg border border-neutral-300
              bg-[#FFFEFB] px-4 text-sm text-neutral-900
              outline-none transition
              placeholder:text-neutral-400
              hover:border-neutral-400
              focus:border-[#B8963E]
              focus:ring-2 focus:ring-[#B8963E]/10
            "
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Preço
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
              R$
            </span>

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
                h-12 w-full rounded-lg border border-neutral-300
                bg-[#FFFEFB] pl-11 pr-4 text-sm text-neutral-900
                outline-none transition
                placeholder:text-neutral-400
                hover:border-neutral-400
                focus:border-[#B8963E]
                focus:ring-2 focus:ring-[#B8963E]/10
              "
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-neutral-800"
          >
            Descrição
            <span className="ml-1 font-normal text-neutral-400">
              (opcional)
            </span>
          </label>

          <textarea
            id="description"
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm((old) => ({
                ...old,
                description: e.target.value,
              }))
            }
            placeholder="Descreva o produto..."
            className="
              w-full resize-none rounded-lg border border-neutral-300
              bg-[#FFFEFB] px-4 py-3 text-sm leading-6 text-neutral-900
              outline-none transition
              placeholder:text-neutral-400
              hover:border-neutral-400
              focus:border-[#B8963E]
              focus:ring-2 focus:ring-[#B8963E]/10
            "
          />
        </div>
      </div>
    </section>
  )
}
