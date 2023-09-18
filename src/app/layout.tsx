import './globals.css'
import Navbar from './components/Navbar'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({ subsets: ['latin'], weight: ["400", "500", "700"] })

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'Calendar app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
        <Toaster
          position='top-center'
          reverseOrder={false}
        />
      </body>
    </html>
  )
}
