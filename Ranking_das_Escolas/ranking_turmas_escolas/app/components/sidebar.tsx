
'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, 
  Trophy, 
  BarChart3, 
  Users, 
  GraduationCap,
  School,
  Target,
  TrendingUp 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard Geral', href: '/', icon: BarChart3 },
  { name: 'Ranking de Turmas', href: '#', icon: Trophy },
  { name: 'Análise por Matéria', href: '#', icon: BookOpen },
  { name: 'Desempenho Escolar', href: '#', icon: School },
  { name: 'Estatísticas', href: '#', icon: Users },
  { name: 'Relatórios', href: '#', icon: GraduationCap },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm border-r border-blue-200 shadow-lg">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-white" />
            <h1 className="text-lg font-bold text-white">EduRanking</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation?.map?.((item) => {
            const Icon = item?.icon;
            return (
              <Link
                key={item?.name}
                href={item?.href ?? '/'}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 group',
                  pathname === item?.href
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:shadow-sm'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item?.name}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-200">
          <div className="text-xs text-gray-500 text-center">
            Sistema de Análise Escolar
            <br />
            <span className="font-medium">v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
