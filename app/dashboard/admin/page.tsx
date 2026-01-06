export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Usuarios</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Clínicas Activas</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Órdenes Activas</p>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Roles Configurados</p>
          <p className="text-3xl font-bold text-gray-900">16</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/users" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Gestión de Usuarios</h3>
            <p className="text-sm text-gray-600">Crear y administrar usuarios del sistema</p>
          </a>
          
          <a href="/dashboard/roles" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Administrar Roles</h3>
            <p className="text-sm text-gray-600">Configurar roles y permisos</p>
          </a>
          
          <a href="/dashboard/clinics" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium mb-1">Clínicas</h3>
            <p className="text-sm text-gray-600">Administrar clínicas registradas</p>
          </a>
        </div>
      </div>
    </div>
  )
}
