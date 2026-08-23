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

  price: number

  image: {
    url: string
  }

  size: string

  color: string

  hex?: string

  /*
   * Quantidade que o cliente
   * colocou no carrinho.
   */
  quantity: number

  /*
   * Quantidade disponível
   * no estoque.
   */
  stock: number
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

  totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const [cartOpen, setCartOpen] = useState(false)

  /*
   * Carrega carrinho salvo.
   */
  useEffect(() => {
    const saved = localStorage.getItem('cart')

    if (!saved) {
      return
    }

    try {
      const parsed = JSON.parse(saved) as CartItem[]

      /*
       * Compatibilidade com carrinhos
       * antigos que ainda não possuem
       * quantity.
       */
      const normalized = parsed.map((item) => ({
        ...item,

        quantity:
          typeof item.quantity === 'number' && item.quantity > 0
            ? item.quantity
            : 1,

        stock: typeof item.stock === 'number' ? item.stock : 0,
      }))

      setItems(normalized)
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)

      localStorage.removeItem('cart')
    }
  }, [])

  /*
   * Salva alterações.
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addItem(item: CartItem) {
    /*
     * Não permite adicionar
     * produto sem estoque.
     */
    if (item.stock <= 0) {
      return
    }

    setItems((prev) => {
      const exists = prev.find(
        (product) =>
          product.productId === item.productId &&
          product.size === item.size &&
          product.color === item.color,
      )

      /*
       * Se a mesma variação já está
       * no carrinho, aumenta QUANTITY.
       */
      if (exists) {
        return prev.map((product) => {
          const isSameProduct =
            product.productId === item.productId &&
            product.size === item.size &&
            product.color === item.color

          if (!isSameProduct) {
            return product
          }

          const quantityToAdd = item.quantity > 0 ? item.quantity : 1

          const newQuantity = product.quantity + quantityToAdd

          /*
           * Nunca ultrapassa o estoque.
           */
          return {
            ...product,

            stock: item.stock,

            quantity: Math.min(newQuantity, item.stock),
          }
        })
      }

      /*
       * Produto ainda não existe.
       */
      return [
        ...prev,
        {
          ...item,

          quantity: Math.min(item.quantity > 0 ? item.quantity : 1, item.stock),
        },
      ]
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
    /*
     * Se chegar em zero,
     * remove do carrinho.
     */
    if (quantity <= 0) {
      removeItem(productId, size, color)

      return
    }

    setItems((prev) =>
      prev.map((item) => {
        const isSameProduct =
          item.productId === productId &&
          item.size === size &&
          item.color === color

        if (!isSameProduct) {
          return item
        }

        /*
         * Impede quantidade maior
         * que o estoque disponível.
         */
        const safeQuantity = Math.min(quantity, item.stock)

        return {
          ...item,

          quantity: safeQuantity,
        }
      }),
    )
  }

  function clearCart() {
    setItems([])

    localStorage.removeItem('cart')
  }

  /*
   * TOTAL FINANCEIRO
   *
   * price × quantity
   *
   * NÃO:
   * price × stock
   */
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  /*
   * Quantidade total de produtos
   * no carrinho.
   *
   * Exemplo:
   *
   * Camisa: 2
   * Calça: 1
   *
   * totalItems = 3
   */
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

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

        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart precisa estar dentro do CartProvider')
  }

  return context
}
