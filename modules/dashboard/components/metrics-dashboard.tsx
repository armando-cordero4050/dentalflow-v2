import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react'
import { KPICard } from './kpi-card'
import { StageDistribution } from './stage-distribution'
import { RecentOrdersTable } from './recent-orders-table'
import { OrdersChart } from './orders-chart'
import {
  getDashboardMetrics,
  getOrdersByStage,
  getRecentOrders,
  getDailyOrderTrend
} from '../actions/metrics'

interface MetricsDashboardProps {
  clinicId?: string
}

export async function MetricsDashboard({ clinicId }: MetricsDashboardProps) {
  // Fetch all metrics
  const metrics = await getDashboardMetrics(clinicId)
  const stageData = await getOrdersByStage(clinicId)
  const recentOrders = await getRecentOrders(clinicId, 5)
  const dailyTrend = await getDailyOrderTrend(clinicId, 7)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Órdenes Hoy"
          value={metrics.ordersToday}
          icon={<ClipboardList className="w-5 h-5" />}
        />
        <KPICard
          title="Órdenes en Proceso"
          value={metrics.ordersInProgress}
          icon={<Clock className="w-5 h-5" />}
        />
        <KPICard
          title="Completadas (Mes)"
          value={metrics.ordersCompletedMonth}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <KPICard
          title="Ingresos del Mes"
          value={`Q ${metrics.monthRevenue.toFixed(2)}`}
          icon={<DollarSign className="w-5 h-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StageDistribution data={stageData} />
        <OrdersChart data={dailyTrend} />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable orders={recentOrders} />
    </div>
  )
}
