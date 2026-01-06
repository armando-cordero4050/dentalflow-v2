export default function MedicalDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel Clínico</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Pacientes Totales</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Citas Hoy</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Órdenes Pendientes</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Facturación Mes</p>
          <p className="text-3xl font-bold text-gray-900">$0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/patients" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Pacientes</h3>
            <p className="text-sm text-gray-600">Ver y gestionar pacientes</p>
          </a>
          
          <a href="/dashboard/dental-chart" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Odontograma</h3>
            <p className="text-sm text-gray-600">Registro dental digital</p>
          </a>
          
          <a href="/dashboard/lab-orders" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Órdenes Lab</h3>
            <p className="text-sm text-gray-600">Crear y seguir órdenes</p>
          </a>
        </div>
      </div>
    </div>
  )
}
