'use client';

import { Card } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface SubjectPerformanceChartProps {
  data: any
}

export function SubjectPerformanceChart({ data }: SubjectPerformanceChartProps) {
  const prepareSubjectData = () => {
    const subjectStats: any = {}

    Object.values(data ?? {})?.forEach?.((yearData: any) => {
      if (Array.isArray(yearData)) {
        yearData?.forEach?.((turma: any) => {
          Object.entries(turma?.materias ?? {})?.forEach?.((entry: [string, any]) => {
            const [materia, media] = entry;
            if (!subjectStats[materia]) {
              subjectStats[materia] = { total: 0, count: 0, name: '' }
            }
            subjectStats[materia].total += Number(media) ?? 0
            subjectStats[materia].count += 1
          })
        })
      }
    })

    const chartData = Object.entries(subjectStats)?.map?.((entry: [string, any]) => {
      const [subject, stats] = entry;
      const subjectNames: any = {
        'LP': 'Língua Portuguesa',
        'MAT': 'Matemática',
        'CN': 'Ciências Naturais'
      }

      return {
        materia: subjectNames[subject] ?? subject,
        codigo: subject,
        media: stats?.count > 0 ? (stats?.total / stats?.count) : 0,
        turmas: stats?.count ?? 0
      }
    })

    return chartData?.sort?.((a, b) => (b?.media ?? 0) - (a?.media ?? 0)) ?? []
  }

  const chartData = prepareSubjectData()

  if (!chartData?.length) {
    return (
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum dado de matérias disponível</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Desempenho por Matéria
        </h3>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <XAxis 
              dataKey="materia"
              tickLine={false}
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
              label={{ 
                value: 'Matérias', 
                position: 'insideBottom', 
                offset: -15, 
                style: { textAnchor: 'middle', fontSize: 11 } 
              }}
            />
            <YAxis 
              tickLine={false}
              tick={{ fontSize: 10 }}
              label={{ 
                value: 'Média (%)', 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle', fontSize: 11 } 
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                fontSize: 11
              }}
              formatter={(value: any, name: string) => [
                `${Number(value)?.toFixed?.(1) ?? '0.0'}%`, 
                'Média Geral'
              ]}
              labelFormatter={(label: string, payload: any) => {
                const data = payload?.[0]?.payload
                return `${label} (${data?.turmas} turmas)`
              }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{ fontSize: 11 }}
            />
            <Bar 
              dataKey="media" 
              fill="#34D399"
              name="Média da Matéria"
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
