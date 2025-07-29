
import { Sidebar } from '@/components/sidebar'
import { MainDashboard } from '@/components/main-dashboard'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <MainDashboard />
      </div>
    </div>
  )
}
