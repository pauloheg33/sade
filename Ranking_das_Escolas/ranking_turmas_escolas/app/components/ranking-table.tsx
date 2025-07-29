
'use client';

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'

interface RankingTableProps {
  data: any
}

export function RankingTable({ data }: RankingTableProps) {
  const prepareTableData = () => {
    const tableData: any[] = []

    Object.entries(data ?? {})?.forEach?.((entry: [string, any]) => {
      const [year, turmas] = entry;
      if (Array.isArray(turmas)) {
        turmas?.forEach?.((turma: any) => {
          tableData.push({
            ...turma,
            ano: year
          })
        })
      }
    })

    return tableData?.sort?.((a, b) => (b?.media_geral ?? 0) - (a?.media_geral ?? 0)) ?? []
  }

  const tableData = prepareTableData()

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-medium text-gray-600">#{position}</span>
    }
  }

  const getPositionBadge = (media: number) => {
    if (media >= 80) return <Badge className="bg-green-100 text-green-800">Excelente</Badge>
    if (media >= 70) return <Badge className="bg-blue-100 text-blue-800">Bom</Badge>
    if (media >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>
    return <Badge className="bg-red-100 text-red-800">Precisa Melhorar</Badge>
  }

  if (!tableData?.length) {
    return (
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
        <div className="text-center text-gray-500 py-8">
          <p>Nenhum dado disponível para exibir na tabela</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Ranking Detalhado das Turmas
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-blue-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Posição</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Escola</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Turma</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Ano</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Média Geral</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Alunos</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">LP</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">MAT</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">CN</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.slice?.(0, 50)?.map?.((turma: any, index: number) => (
              <tr 
                key={`${turma?.ano}-${turma?.escola}-${turma?.turma}`} 
                className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {getPositionIcon(index + 1)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{turma?.escola}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {turma?.turma !== 'única' ? `Turma ${turma?.turma}` : 'Única'}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">
                    {turma?.ano?.replace('o', 'º')?.replace('º', 'º')} Ano
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-lg text-blue-600" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    {turma?.media_geral?.toFixed?.(1) ?? '0.0'}%
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{turma?.total_alunos_geral}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium">
                    {turma?.materias?.LP?.toFixed?.(1) ?? '-'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium">
                    {turma?.materias?.MAT?.toFixed?.(1) ?? '-'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium">
                    {turma?.materias?.CN?.toFixed?.(1) ?? '-'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {getPositionBadge(turma?.media_geral ?? 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
