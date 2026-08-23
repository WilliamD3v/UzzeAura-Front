'use client'

import { Instagram, Sparkles, Star } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { ProductFormData } from './types'

type Props = {
  form: ProductFormData
  setForm: Dispatch<SetStateAction<ProductFormData>>
}

const options = [
  {
    key: 'destaque',
    title: 'Destaque',
    icon: Star,
  },
  {
    key: 'estreia',
    title: 'Estreia',
    icon: Sparkles,
  },
  {
    key: 'post',
    title: 'Post',
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
    <section className="border-b border-neutral-200 py-10">
      <label className="mb-4 block text-sm font-medium text-neutral-800">
        Exibição
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon
          const key = option.key as keyof ProductFormData['status']
          const active = form.status[key]

          return (
            <button
              type="button"
              key={option.key}
              onClick={() => toggleStatus(key)}
              className={`
                flex h-14 items-center justify-between
                rounded-lg border px-4
                transition
                ${
                  active
                    ? 'border-[#B8963E] bg-[#B8963E]/[0.06]'
                    : 'border-neutral-300 bg-white hover:border-neutral-400'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={17}
                  className={active ? 'text-[#B8963E]' : 'text-neutral-400'}
                />

                <span
                  className={`text-sm font-medium ${
                    active ? 'text-neutral-950' : 'text-neutral-600'
                  }`}
                >
                  {option.title}
                </span>
              </div>

              <div
                className={`
                  relative h-5 w-9 rounded-full transition
                  ${active ? 'bg-[#B8963E]' : 'bg-neutral-200'}
                `}
              >
                <span
                  className={`
                    absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2
                    rounded-full bg-white shadow-sm transition-all
                    ${active ? 'left-[18px]' : 'left-[3px]'}
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
