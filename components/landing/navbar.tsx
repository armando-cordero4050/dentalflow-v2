'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold text-white">DentalFlow</span>
        </div>
        
        <Link
          href="/login"
          className="glass-effect px-6 py-2.5 rounded-lg text-white font-medium hover:bg-white/20 transition-all"
        >
          Iniciar Sesión
        </Link>
      </div>
    </motion.nav>
  )
}
