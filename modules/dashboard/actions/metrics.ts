'use server'

import { createClient } from '@/lib/supabase/server'

// Define proper types for database query results
interface LabOrder {
  id: string
  order_number: string
  created_at: string
  status: string
  current_stage_id?: string
  completed_at?: string
  patients?: {
    first_name: string
    last_name: string
  }
  lab_stages?: {
    name: string
  }
  lab_order_items?: Array<{
    total_price: string
  }>
}

export async function getDashboardMetrics(clinicId?: string) {
  const supabase = await createClient()
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const startOfToday = new Date(today.setHours(0, 0, 0, 0))

  // Get orders created today
  let ordersToday = supabase
    .from('lab_orders')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', startOfToday.toISOString())

  if (clinicId) {
    ordersToday = ordersToday.eq('clinic_id', clinicId)
  }

  const { count: todayCount } = await ordersToday

  // Get orders in progress
  let ordersInProgress = supabase
    .from('lab_orders')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'in_progress')

  if (clinicId) {
    ordersInProgress = ordersInProgress.eq('clinic_id', clinicId)
  }

  const { count: inProgressCount } = await ordersInProgress

  // Get orders completed this month
  let ordersCompletedMonth = supabase
    .from('lab_orders')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'completed')
    .gte('completed_at', startOfMonth.toISOString())

  if (clinicId) {
    ordersCompletedMonth = ordersCompletedMonth.eq('clinic_id', clinicId)
  }

  const { count: completedMonthCount } = await ordersCompletedMonth

  // Get revenue for the month (sum of completed orders)
  let revenueQuery = supabase
    .from('lab_orders')
    .select('id, lab_order_items(total_price)')
    .eq('status', 'completed')
    .gte('completed_at', startOfMonth.toISOString())

  if (clinicId) {
    revenueQuery = revenueQuery.eq('clinic_id', clinicId)
  }

  const { data: revenueData } = await revenueQuery

  const monthRevenue = revenueData?.reduce((total, order) => {
    const orderTotal = (order as unknown as LabOrder).lab_order_items?.reduce((sum, item) => sum + parseFloat(item.total_price || '0'), 0) || 0
    return total + orderTotal
  }, 0) || 0

  return {
    ordersToday: todayCount || 0,
    ordersInProgress: inProgressCount || 0,
    ordersCompletedMonth: completedMonthCount || 0,
    monthRevenue: monthRevenue
  }
}

export async function getOrdersByStage(clinicId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('lab_orders')
    .select('current_stage_id, lab_stages(name)')
    .eq('status', 'in_progress')

  if (clinicId) {
    query = query.eq('clinic_id', clinicId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching orders by stage:', error)
    return []
  }

  // Count orders by stage
  const stageCounts: Record<string, number> = {}
  data?.forEach((order) => {
    const stageName = (order as unknown as LabOrder).lab_stages?.name || 'Sin etapa'
    stageCounts[stageName] = (stageCounts[stageName] || 0) + 1
  })

  return Object.entries(stageCounts).map(([stage, count]) => ({
    stage,
    count
  }))
}

export async function getRecentOrders(clinicId?: string, limit = 5) {
  const supabase = await createClient()

  let query = supabase
    .from('lab_orders')
    .select(`
      id,
      order_number,
      created_at,
      status,
      patients(first_name, last_name),
      lab_stages(name)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (clinicId) {
    query = query.eq('clinic_id', clinicId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching recent orders:', error)
    return []
  }

  return data?.map((order) => {
    const o = order as unknown as LabOrder
    return {
      id: o.id,
      orderNumber: o.order_number,
      createdAt: o.created_at,
      status: o.status,
      patientName: `${o.patients?.first_name || ''} ${o.patients?.last_name || ''}`.trim(),
      stage: o.lab_stages?.name || 'Sin etapa'
    }
  }) || []
}

export async function getUpcomingDeliveries(clinicId?: string, days = 3) {
  const supabase = await createClient()
  const today = new Date()
  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + days)

  let query = supabase
    .from('lab_orders')
    .select(`
      id,
      order_number,
      created_at,
      status,
      patients(first_name, last_name)
    `)
    .eq('status', 'in_progress')
    .order('created_at', { ascending: true })
    .limit(10)

  if (clinicId) {
    query = query.eq('clinic_id', clinicId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching upcoming deliveries:', error)
    return []
  }

  return data?.map((order) => {
    const o = order as unknown as LabOrder
    return {
      id: o.id,
      orderNumber: o.order_number,
      createdAt: o.created_at,
      status: o.status,
      patientName: `${o.patients?.first_name || ''} ${o.patients?.last_name || ''}`.trim()
    }
  }) || []
}

export async function getDailyOrderTrend(clinicId?: string, days = 7) {
  const supabase = await createClient()
  const today = new Date()
  const pastDate = new Date(today)
  pastDate.setDate(pastDate.getDate() - days)

  let query = supabase
    .from('lab_orders')
    .select('created_at')
    .gte('created_at', pastDate.toISOString())
    .order('created_at', { ascending: true })

  if (clinicId) {
    query = query.eq('clinic_id', clinicId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching daily trend:', error)
    return []
  }

  // Group by day
  const dayCounts: Record<string, number> = {}
  data?.forEach((order) => {
    const date = new Date((order as unknown as LabOrder).created_at).toLocaleDateString('es-GT')
    dayCounts[date] = (dayCounts[date] || 0) + 1
  })

  return Object.entries(dayCounts).map(([date, count]) => ({
    date,
    count
  }))
}
