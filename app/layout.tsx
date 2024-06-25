import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConvexClientProvider } from '@/providers/convex-client-provider'
import { Toaster } from 'sonner'
import { ModalProvider } from '@/providers/modal-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genie Board',
  description: 'Genie Board',
  icons: {
    icon: [
      {
        url: '/logo.svg',
        href: '/logo.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}