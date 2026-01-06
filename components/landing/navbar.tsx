'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-blue-600 rounded-lg transform rotate-45"
          />
          <span className="text-2xl font-bold text-blue-900 tracking-tight">
            IMFOHSA
          </span>
          <span className="hidden sm:inline text-gray-400 font-light text-sm">
            | Innovación Dental
          </span>
        </div>
        
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-medium transition-all hover:scale-105 shadow-lg"
        >
          Portal Clientes
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.nav>
  )
}
