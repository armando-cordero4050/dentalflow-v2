// Print utility functions

export function printDocument(elementId: string) {
  // Use window.print() with CSS @media print rules instead of DOM manipulation
  // This preserves event listeners and component state
  window.print()
}

export function formatOrderNumber(orderNumber: string | number, year?: number) {
  const currentYear = year || new Date().getFullYear()
  const num = typeof orderNumber === 'string' ? parseInt(orderNumber) : orderNumber
  return `ORD-${currentYear}-${num.toString().padStart(4, '0')}`
}

export function formatCurrency(amount: number, currency = 'Q') {
  return `${currency} ${amount.toFixed(2)}`
}

export function formatDate(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
