import { CartButton } from '@/components/cart/CartButton'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CartProvider } from '@/components/cart/CartProvider'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      {children}

      <CartButton />

      <CartDrawer />
    </CartProvider>
  )
}
