import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SADE - Ranking das Escolas',
  description: 'Sistema de Ranking das Turmas por Desempenho Escolar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-blue-600 text-white py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">SADE - Ranking das Escolas</h1>
              <p className="text-blue-100">Sistema de Avaliação e Desempenho Escolar</p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
