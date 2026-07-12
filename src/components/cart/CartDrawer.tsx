'use client'

import { Minus, Plus, Trash, X } from 'lucide-react'
import Image from 'next/image'

import { useCart } from './CartProvider'

export function CartDrawer() {
  const { items, cartOpen, closeCart, removeItem, updateQuantity, total } =
    useCart()

  console.log(items)

  return (
    <>
      {cartOpen && (
        <div
          className="
fixed
inset-0
z-50
bg-black/30
backdrop-blur-sm
"
          onClick={closeCart}
        />
      )}

      <div
        className={`
fixed
right-0
top-0
z-50
h-full
w-full
max-w-md
bg-white
shadow-xl
transition-transform
duration-500

${cartOpen ? 'translate-x-0' : 'translate-x-full'}

`}
      >
        <div
          className="
flex
items-center
justify-between
border-b
p-6
"
        >
          <h2
            className="
text-lg
tracking-wide
"
          >
            Seu Carrinho
          </h2>

          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        <div
          className="
h-[calc(100%-180px)]
overflow-y-auto
p-6
space-y-6
"
        >
          {items.length === 0 ? (
            <p className="text-neutral-500">Seu carrinho está vazio.</p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="
flex
gap-4
"
              >
                <div
                  className="
relative
h-24
w-20
overflow-hidden
rounded-lg
bg-neutral-100
"
                >
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm">{item.name}</h3>

                  <p className="text-xs text-neutral-500">
                    {item.size} • {item.color}
                  </p>

                  <p className="mt-2 text-sm">R$ {item.price.toFixed(2)}</p>

                  <div
                    className="
mt-3
flex
items-center
gap-3
"
                  >
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity - 1,
                        )
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size,
                          item.color,
                          item.quantity + 1,
                        )
                      }
                    >
                      <Plus size={14} />
                    </button>

                    <button
                      className="ml-auto"
                      onClick={() =>
                        removeItem(item.productId, item.size, item.color)
                      }
                    >
                      <Trash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="
border-t
p-6
"
        >
          <div
            className="
mb-5
flex
justify-between
"
          >
            <span>Subtotal</span>

            <strong>R$ {total.toFixed(2)}</strong>
          </div>

          <button
            className="
h-12
w-full
rounded-full
bg-neutral-900
text-white
uppercase
tracking-widest
text-sm
"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  )
}
