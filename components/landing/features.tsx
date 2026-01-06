'use client'

import { motion } from 'framer-motion'
import { Users, FileText, Beaker, CreditCard, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Gestión de Pacientes',
    description: 'Administra historiales médicos completos y expedientes digitales de forma segura y organizada.',
  },
  {
    icon: FileText,
    title: 'Odontograma Digital',
    description: 'Registro visual interactivo del estado dental de cada paciente con anotaciones detalladas.',
  },
  {
    icon: Beaker,
    title: 'Órdenes de Laboratorio',
    description: 'Sistema completo de seguimiento con 10 etapas KAMBA desde diseño hasta entrega.',
  },
  {
    icon: CreditCard,
    title: 'Facturación Integrada',
    description: 'Genera facturas automáticamente con integración a sistemas de pago y contabilidad.',
  },
  {
    icon: BarChart3,
    title: 'Reportes y Analytics',
    description: 'Análisis detallado de operaciones, productividad y métricas financieras en tiempo real.',
  },
]

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-xl text-gray-300">
            Potencia tu clínica con herramientas profesionales diseñadas para el éxito
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect p-6 rounded-xl hover:bg-white/20 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
