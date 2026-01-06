'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { DevQuickLogin } from '@/components/auth/dev-quick-login'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'clinic' | 'lab'>('clinic')

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">DentalFlow</span>
          </div>

          {/* Welcome Text */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('clinic')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === 'clinic'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clínica
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === 'lab'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Laboratorio
            </button>
          </div>

          {/* Form */}
          <LoginForm type={activeTab} />

          {/* Dev Quick Login */}
          <DevQuickLogin type={activeTab} />

          {/* Back to Home */}
          <div className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-md"
        >
          {/* 3D Tooth Illustration */}
          <div className="relative w-64 h-64 mx-auto">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-2xl"
              fill="none"
            >
              <defs>
                <linearGradient id="loginToothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M100 20C75 20 60 35 60 60C60 70 58 80 55 90C50 110 45 130 45 150C45 170 55 185 70 185C80 185 85 175 90 165C92 160 95 155 100 155C105 155 108 160 110 165C115 175 120 185 130 185C145 185 155 170 155 150C155 130 150 110 145 90C142 80 140 70 140 60C140 35 125 20 100 20Z"
                fill="url(#loginToothGradient)"
                className="animate-pulse"
              />
            </svg>
            
            {/* Floating particles */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s' }}>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full blur-sm"></div>
              <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full blur-sm"></div>
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full blur-sm"></div>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Gestión Clínica</h2>
            <p className="text-lg text-white/90">
              Visualización holográfica de pacientes e historias clínicas
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
