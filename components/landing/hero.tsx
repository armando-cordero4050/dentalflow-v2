'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
            <Star className="w-3 h-3" /> Líderes desde 1996
          </div>
          
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            Tu aliado en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Excelencia Dental
            </span>
            .
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
            Desde la importación de las mejores marcas mundiales hasta la sala de ventas más confortable de Latinoamérica.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Ingresar al Portal
            </Link>
            
            <button className="glass-effect px-8 py-4 rounded-full text-white font-semibold hover:bg-white/20 transition-all border-2 border-white/30">
              Conocer Más
            </button>
          </div>
        </motion.div>
        
        {/* Right Column - 3D Tooth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-effect p-12 rounded-3xl relative overflow-hidden">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* 3D Tooth SVG with Holographic Effect */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full max-w-sm drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="toothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Main Tooth Shape with Animation */}
                <motion.path
                  d="M100,30 C120,30 140,50 140,70 L140,120 C140,150 120,170 100,170 C80,170 60,150 60,120 L60,70 C60,50 80,30 100,30"
                  fill="url(#toothGradient)"
                  filter="url(#glow)"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Holographic Shine */}
                <motion.circle
                  cx="85"
                  cy="60"
                  r="15"
                  fill="rgba(255,255,255,0.4)"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                
                {/* Additional Shine */}
                <motion.circle
                  cx="110"
                  cy="90"
                  r="8"
                  fill="rgba(255,255,255,0.3)"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                />
              </svg>
              
              {/* Animated Background Particles */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute w-2 h-2 bg-blue-400 rounded-full blur-sm"
                  animate={{
                    x: [20, 80, 20],
                    y: [30, 70, 30],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full blur-sm"
                  animate={{
                    x: [150, 180, 150],
                    y: [100, 140, 100],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm"
                  animate={{
                    x: [100, 120, 100],
                    y: [150, 180, 150],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
