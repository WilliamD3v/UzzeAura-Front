import {
  Montserrat,
  Playfair_Display as PlayfairDisplay,
} from 'next/font/google'

export const playfair = PlayfairDisplay({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
})
