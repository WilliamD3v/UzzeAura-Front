'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export type CartItem = {
  productId: string
  name: string
  image: {
    url: string
  }
  price: number
  size: string
  color: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]

  cartOpen: boolean

  openCart: () => void

  closeCart: () => void

  addItem: (item: CartItem) => void

  removeItem: (productId: string, size: string, color: string) => void

  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void

  clearCart: () => void

  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cart')

    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addItem(item: CartItem) {
    setItems((prev) => {
      const exists = prev.find(
        (product) =>
          product.productId === item.productId &&
          product.size === item.size &&
          product.color === item.color,
      )

      if (exists) {
        return prev.map((product) =>
          product.productId === item.productId &&
          product.size === item.size &&
          product.color === item.color
            ? {
                ...product,
                quantity: product.quantity + item.quantity,
              }
            : product,
        )
      }

      return [...prev, item]
    })

    openCart()
  }

  function removeItem(productId: string, size: string, color: string) {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color
          ),
      ),
    )
  }

  function updateQuantity(
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      removeItem(productId, size, color)

      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    )
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  function openCart() {
    setCartOpen(true)
  }

  function closeCart() {
    setCartOpen(false)
  }

  return (
    <CartContext.Provider
      value={{
        items,

        cartOpen,

        openCart,

        closeCart,

        addItem,

        removeItem,

        updateQuantity,

        clearCart,

        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('UseCart precisa estar dentro do CartProvider')
  }

  return context
}
