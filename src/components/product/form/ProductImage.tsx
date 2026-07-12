'use client'

import { ProductFormData } from './types'

import { Dispatch, SetStateAction } from 'react'

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

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-6
      "
    >
      <label
        className="
          block
          text-sm
          font-medium
        "
      >
        Imagem do produto
      </label>

      <input
        type="file"

        accept="image/*"

        onChange={handleImage}

        className="
          mt-4
        "
      />

      {form.image && (
        <img
          src={form.image}

          alt="Preview"

          className="
              mt-5
              h-40
              w-40
              rounded-xl
              object-cover
            "
        />
      )}
    </div>
  )
}
