
'use client';

import { useState, useEffect } from 'react'
import { RankingChart } from '@/components/ranking-chart'
import { YearFilter } from '@/components/year-filter'
import { StatsCards } from '@/components/stats-cards'
import { RankingTable } from '@/components/ranking-table'
import { SubjectPerformanceChart } from '@/components/subject-performance-chart'
import { motion } from 'framer-motion'

export function MainDashboard() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [rankingData, setRankingData] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Adicionar timestamp para evitar cache
        const timestamp = new Date().getTime();
        const response = await fetch(`./data/ranking_turmas_por_ano.json?v=${timestamp}`)
        const data = await response.json()
        setRankingData(data ?? {})
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setRankingData({})
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const availableYears = Object.keys(rankingData ?? {})
  const currentData = selectedYear === 'all' ? rankingData : { [selectedYear]: rankingData?.[selectedYear] ?? [] }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Ranking das Turmas Escolares
        </h1>
        <p className="text-lg text-gray-600">
          Análise de desempenho e classificação por ano de ensino
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <YearFilter
          availableYears={availableYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <StatsCards data={currentData} />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RankingChart data={currentData} selectedYear={selectedYear} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SubjectPerformanceChart data={currentData} />
        </motion.div>
      </div>

      {/* Ranking Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <RankingTable data={currentData} />
      </motion.div>
    </div>
  )
}
