
'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'

interface YearFilterProps {
  availableYears: string[]
  selectedYear: string
  onYearChange: (year: string) => void
}

export function YearFilter({ availableYears, selectedYear, onYearChange }: YearFilterProps) {
  const formatYear = (year: string) => {
    if (year === 'all') return 'Todos os Anos'
    return `${year?.replace('o', 'º')?.replace('º', 'º')} Ano`
  }

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-blue-600" />
          <label className="text-sm font-medium text-gray-700">
            Filtrar por Ano de Ensino:
          </label>
        </div>
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-48 bg-white border-blue-300 focus:border-blue-500">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Anos</SelectItem>
            {availableYears?.map?.((year) => (
              <SelectItem key={year} value={year || 'all'}>
                {formatYear(year)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}
