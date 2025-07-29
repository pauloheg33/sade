'use client';

import { Card } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface RankingChartProps {
  data: any
  selectedYear: string
}

export function RankingChart({ data, selectedYear }: RankingChartProps) {
  const prepareChartData = () => {
    const chartData: any[] = []

    Object.entries(data ?? {})?.forEach?.((entry: [string, any]) => {
      const [year, turmas] = entry;
      if (Array.isArray(turmas)) {
        turmas?.slice?.(0, 10)?.forEach?.((turma: any, index: number) => {
          chartData.push({
            nome: `${turma?.escola?.substring?.(0, 15) ?? ''}... ${turma?.turma !== 'única' ? turma?.turma : ''}`,
            escola: turma?.escola,
            turma: turma?.turma,
            ano: year,
            media: turma?.media_geral ?? 0,
            posicao: turma?.posicao ?? (index + 1),
            alunos: turma?.total_alunos_geral ?? 0
          })
        })
      }
    })

    return chartData?.sort?.((a, b) => (b?.media ?? 0) - (a?.media ?? 0))?.slice?.(0, 15) ?? []
  }

  const chartData = prepareChartData()

  if (!chartData?.length) {
    return (
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum dado disponível para exibir</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Top 15 Turmas - Ranking por Média Geral
        </h3>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <XAxis 
              dataKey="nome"
              tickLine={false}
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval="preserveStartEnd"
              label={{ 
                value: 'Turmas', 
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
                return `${data?.escola} - Turma ${data?.turma} (${data?.ano?.replace('o', 'º')} Ano)`
              }}
            />
            <Legend 
              verticalAlign="top"
              wrapperStyle={{ fontSize: 11 }}
            />
            <Bar 
              dataKey="media" 
              fill="#60A5FA"
              name="Média Geral"
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
