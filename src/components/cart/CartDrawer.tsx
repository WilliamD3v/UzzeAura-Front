'use client'

import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useCart } from './CartProvider'

export function CartDrawer() {
  const router = useRouter()

  const { items, cartOpen, closeCart, removeItem, updateQuantity, total } =
    useCart()

  function handleCheckout() {
    if (items.length === 0) return

    closeCart()
    router.push('/checkout')
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]
          transition-all duration-300
          ${
            cartOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }
        `}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md
          flex-col bg-[#FAF9F6] shadow-2xl
          transition-transform duration-500 ease-out
          ${cartOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
              UZZE AURA
            </p>

            <h2 className="mt-1 text-lg font-medium tracking-wide text-neutral-950">
              Seu Carrinho
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="
              flex h-10 w-10 items-center justify-center rounded-full
              transition-colors hover:bg-black/5
            "
          >
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.04]">
                <ShoppingBag
                  size={25}
                  strokeWidth={1.5}
                  className="text-neutral-600"
                />
              </div>

              <h3 className="text-base font-medium text-neutral-950">
                Seu carrinho está vazio
              </h3>

              <p className="mt-2 max-w-[260px] text-sm leading-6 text-neutral-500">
                Adicione suas peças favoritas para continuar sua compra.
              </p>

              <button
                type="button"
                onClick={closeCart}
                className="
                  mt-6 rounded-full border border-neutral-900
                  px-6 py-3 text-xs font-medium uppercase
                  tracking-[0.16em] transition
                  hover:bg-neutral-900 hover:text-white
                "
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6 p-5 sm:p-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 border-b border-black/10 pb-6"
                >
                  {/* Image */}
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-medium text-neutral-950">
                          {item.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                          <span>Tamanho: {item.size}</span>

                          <span>•</span>

                          <div className="flex items-center gap-1.5">
                            {item.hex && (
                              <span
                                className="h-3 w-3 rounded-full border border-black/10"
                                style={{ backgroundColor: item.hex }}
                              />
                            )}

                            <span>{item.color}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        aria-label="Remover produto"
                        className="
                          flex h-8 w-8 shrink-0 items-center justify-center
                          rounded-full text-neutral-400 transition
                          hover:bg-red-50 hover:text-red-500
                        "
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="mt-3 text-sm font-medium text-neutral-950">
                      R$ {item.price.toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex h-9 items-center rounded-full border border-black/15 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1,
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="
                            flex h-full w-9 items-center justify-center
                            rounded-l-full transition hover:bg-black/5
                            disabled:cursor-not-allowed disabled:opacity-30
                          "
                        >
                          <Minus size={13} />
                        </button>

                        <span className="min-w-7 text-center text-xs font-medium">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1,
                            )
                          }
                          disabled={item.quantity >= item.stock}
                          className="
                            flex h-full w-9 items-center justify-center
                            rounded-r-full transition hover:bg-black/5
                            disabled:cursor-not-allowed disabled:opacity-30
                          "
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-neutral-950">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {item.quantity >= item.stock && item.stock > 0 && (
                      <p className="mt-2 text-[11px] text-amber-700">
                        Quantidade máxima disponível.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-black/10 bg-white px-5 pb-5 pt-5 sm:px-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Subtotal</span>

              <strong className="text-lg font-medium text-neutral-950">
                R$ {total.toFixed(2)}
              </strong>
            </div>

            <p className="mb-5 text-[11px] leading-5 text-neutral-500">
              Frete e demais valores serão calculados na finalização.
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              className="
                h-13 w-full rounded-full bg-neutral-950
                px-6 py-4 text-xs font-medium uppercase
                tracking-[0.18em] text-white
                transition-all duration-300
                hover:bg-[#B89555]
              "
            >
              Finalizar compra
            </button>

            <button
              type="button"
              onClick={closeCart}
              className="
                mt-3 w-full py-2 text-xs uppercase
                tracking-[0.14em] text-neutral-500
                transition hover:text-neutral-950
              "
            >
              Continuar comprando
            </button>
          </footer>
        )}
      </aside>
    </>
  )
}
