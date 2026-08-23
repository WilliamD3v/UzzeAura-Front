'use client'

import { ImagePlus, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { ProductFormData } from './types'

interface Props {
  form: ProductFormData
  setForm: Dispatch<SetStateAction<ProductFormData>>
}

export function ProductImage({ form, setForm }: Props) {
  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const preview = URL.createObjectURL(file)

    setForm((old) => ({
      ...old,
      image: preview,
      imageFile: file,
    }))
  }

  function removeImage() {
    setForm((old) => ({
      ...old,
      image: '',
      imageFile: null,
    }))
  }

  return (
    <section className="border-b border-neutral-200 py-10">
      <label className="mb-3 block text-sm font-medium text-neutral-800">
        Imagem do produto
      </label>

      {!form.image ? (
        <label
          className="
            flex min-h-52 cursor-pointer flex-col items-center justify-center
            rounded-xl border border-dashed border-neutral-300
            bg-[#FAF8F3] px-6 text-center
            transition
            hover:border-[#B8963E] hover:bg-[#B8963E]/[0.03]
          "
        >
          <div
            className="
              mb-4 flex h-11 w-11 items-center justify-center
              rounded-full border border-neutral-200 bg-white
              text-neutral-500
            "
          >
            <ImagePlus size={19} />
          </div>

          <span className="text-sm font-medium text-neutral-800">
            Selecionar imagem
          </span>

          <span className="mt-1 text-xs text-neutral-400">
            PNG, JPG ou WEBP
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>
      ) : (
        <div className="flex items-start gap-5">
          <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            <img
              src={form.image}
              alt="Preview"
              className="h-52 w-40 object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              className="
                cursor-pointer rounded-lg border border-neutral-300
                bg-white px-4 py-2.5 text-sm font-medium text-neutral-700
                transition hover:border-neutral-400 hover:bg-neutral-50
              "
            >
              Alterar imagem
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={removeImage}
              className="
                flex items-center justify-center gap-2 rounded-lg
                px-4 py-2.5 text-sm text-neutral-500
                transition hover:bg-red-50 hover:text-red-600
              "
            >
              <Trash2 size={15} />
              Remover
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
