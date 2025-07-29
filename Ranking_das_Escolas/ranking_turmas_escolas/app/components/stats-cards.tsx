
'use client';

import { Card } from '@/components/ui/card'
import { Trophy, Users, School, Target } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsCardsProps {
  data: any
}

export function StatsCards({ data }: StatsCardsProps) {
  const calculateStats = () => {
    let totalTurmas = 0
    let totalAlunos = 0
    let totalEscolas = new Set()
    let mediaGeral = 0
    let somaMedias = 0

    Object.values(data ?? {})?.forEach?.((yearData: any) => {
      if (Array.isArray(yearData)) {
        totalTurmas += yearData?.length ?? 0
        yearData?.forEach?.((turma: any) => {
          totalAlunos += turma?.total_alunos_geral ?? 0
          totalEscolas.add(turma?.escola)
          somaMedias += turma?.media_geral ?? 0
        })
      }
    })

    if (totalTurmas > 0) {
      mediaGeral = somaMedias / totalTurmas
    }

    return {
      totalTurmas,
      totalAlunos,
      totalEscolas: totalEscolas.size,
      mediaGeral: mediaGeral?.toFixed?.(1) ?? '0.0'
    }
  }

  const stats = calculateStats()

  const cards = [
    {
      title: 'Total de Turmas',
      value: stats?.totalTurmas?.toString?.() ?? '0',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Total de Alunos',
      value: stats?.totalAlunos?.toString?.() ?? '0',
      icon: Target,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Escolas Participantes',
      value: stats?.totalEscolas?.toString?.() ?? '0',
      icon: School,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Média Geral',
      value: `${stats?.mediaGeral}%`,
      icon: Trophy,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards?.map?.((card, index) => {
        const Icon = card?.icon
        return (
          <motion.div
            key={card?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 ${card?.bgColor} ${card?.borderColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card?.title}</p>
                  <p className={`text-3xl font-bold text-gray-900 drop-shadow-sm`}>
                    {card?.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card?.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
