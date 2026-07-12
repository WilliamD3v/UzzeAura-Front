import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

import { AuthProvider } from '@/context/authContext'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  metadataBase: new URL('https://willtech.com.br'),

  title: {
    default: 'UzzeAura',
    template: '%s | UzzeAura',
  },

  description:
    'Desenvolvimento de sites, landing pages e sistemas personalizados para empresas.',

  keywords: [
    'criação de sites',
    'desenvolvimento web',
    'landing page',
    'sistema web',
    'Next.js',
    'React',
    'WillTech',
  ],

  authors: [{ name: 'WillTech' }],

  creator: 'WillTech',

  openGraph: {
    title: 'WillTech',
    description:
      'Desenvolvimento de sites profissionais e sistemas personalizados.',
    url: 'https://willtech.com.br',
    siteName: 'WillTech',
    locale: 'pt_BR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'WillTech',
    description:
      'Desenvolvimento de sites profissionais e sistemas personalizados.',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={cn('font-sans', geist.variable)}>
      <body>
        <QueryClientProvider client={queryClient}>
          <main>
            <AuthProvider>{children}</AuthProvider>
          </main>
        </QueryClientProvider>
      </body>
    </html>
  )
}
