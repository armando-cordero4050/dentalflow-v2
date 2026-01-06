export default function LabDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Laboratorio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Órdenes Activas</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Diseño</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En Manufactura</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En QA</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completadas Hoy</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">10 Etapas KAMBA</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            'Clínica',
            'Ingresos', 
            'Yesos',
            'Diseño',
            'Apro Cliente',
            'Nesting',
            'MAN',
            'QA',
            'Billing',
            'Delivery'
          ].map((stage, i) => (
            <div key={stage} className="p-3 border border-gray-200 rounded-lg text-center">
              <p className="text-xs text-gray-500">Etapa {i + 1}</p>
              <p className="font-medium">{stage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/lab-orders" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Órdenes</h3>
            <p className="text-sm text-gray-600">Ver todas las órdenes</p>
          </a>
          
          <a href="/dashboard/lab/design" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Diseño</h3>
            <p className="text-sm text-gray-600">Órdenes en diseño</p>
          </a>
          
          <a href="/dashboard/lab/manufacturing" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Manufactura</h3>
            <p className="text-sm text-gray-600">Órdenes en producción</p>
          </a>
        </div>
      </div>
    </div>
  )
}
