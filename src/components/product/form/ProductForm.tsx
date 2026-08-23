'use client'

import { useEffect, useState } from 'react'

import type { Product } from '@/data/products'
import axios from '@/lib/axios'

import { ProductFormData, ProductVariation } from './types'

import { BasicInformation } from './BasicInformation'
import { ProductActions } from './ProductActions'
import { ProductImage } from './ProductImage'
import { ProductSizes } from './ProductSizes'
import { ProductStatus } from './ProductStatus'
import { ProductVariants } from './ProductVariants'

type Props = {
  product?: Product
}

const initialData: ProductFormData = {
  name: '',
  description: '',
  image: '',
  imageFile: null,
  price: 0,

  status: {
    destaque: false,
    estreia: false,
    post: false,
  },

  variations: [],
}

export function ProductForm({ product }: Props) {
  const [form, setForm] = useState<ProductFormData>(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!product) return

    setForm({
      name: product.name,
      description: product.description,
      image: product.image.url,
      imageFile: null,
      price: product.price,
      status: product.status,

      variations: product.sizes.map((item) => ({
        size: item.size,

        colors: item.colors.map((color) => ({
          id: color._id,
          name: color.name,
          hex: color.hex || '',
          stock: color.stock,
        })),
      })),
    })
  }, [product])

  function updateVariations(variations: ProductVariation[]) {
    setForm((old) => ({
      ...old,
      variations,
    }))
  }

  async function handleSubmit() {
    try {
      if (!form.name.trim()) {
        alert('Informe o nome do produto')
        return
      }

      setLoading(true)

      const formData = new FormData()

      if (form.imageFile) {
        formData.append('image', form.imageFile)
      }

      const sizes = form.variations.map((variation) => ({
        size: variation.size,

        colors: variation.colors.map((color) => ({
          name: color.name,
          hex: color.hex,
          stock: Number(color.stock),
        })),
      }))

      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', String(form.price))
      formData.append('status', JSON.stringify(form.status))
      formData.append('sizes', JSON.stringify(sizes))

      console.log('➡️ Enviando produto')
      console.log('Nome:', form.name)
      console.log('Descrição:', form.description)
      console.log('Preço:', form.price)
      console.log('Status:', form.status)
      console.log('Tamanhos:', sizes)

      const response = product
        ? await axios.put(`/product/${product._id}`, formData)
        : await axios.post('/product/create', formData)

      console.log('✅ Produto salvo:', response.data)

      alert(
        product
          ? 'Produto atualizado com sucesso'
          : 'Produto criado com sucesso',
      )
    } catch (error) {
      console.error('🔥 Erro ao salvar produto:', error)

      alert('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        rounded-2xl border border-neutral-200
        bg-white px-6 py-7
        shadow-[0_8px_30px_rgba(0,0,0,0.035)]
        sm:px-8
        lg:px-10
      "
    >
      <BasicInformation form={form} setForm={setForm} />

      <ProductImage form={form} setForm={setForm} />

      <ProductStatus form={form} setForm={setForm} />

      <ProductSizes variations={form.variations} onChange={updateVariations} />

      <ProductVariants
        variations={form.variations}
        onChange={updateVariations}
      />

      <ProductActions onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
