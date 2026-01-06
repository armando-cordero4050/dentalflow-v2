'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Gestión Dental
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Inteligente
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Sistema completo de gestión para clínicas dentales y laboratorios.
            Pacientes, odontogramas, órdenes y facturación en una sola plataforma.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
            >
              Comenzar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="glass-effect px-8 py-4 rounded-lg text-white font-semibold hover:bg-white/20 transition-all">
              Ver Demo
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-effect p-8 rounded-2xl">
            <div className="relative w-full aspect-square">
              {/* 3D Tooth Illustration Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  {/* Tooth Icon SVG */}
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full drop-shadow-2xl"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="toothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M100 20C75 20 60 35 60 60C60 70 58 80 55 90C50 110 45 130 45 150C45 170 55 185 70 185C80 185 85 175 90 165C92 160 95 155 100 155C105 155 108 160 110 165C115 175 120 185 130 185C145 185 155 170 155 150C155 130 150 110 145 90C142 80 140 70 140 60C140 35 125 20 100 20Z"
                      fill="url(#toothGradient)"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Holographic circles */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full blur-sm"></div>
                <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full blur-sm"></div>
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-400 rounded-full blur-sm"></div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white">Gestión Clínica</h3>
              <p className="text-gray-300 mt-2">
                Visualización holográfica de pacientes e historias clínicas
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
