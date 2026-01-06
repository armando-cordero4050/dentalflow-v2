# DentalFlow 2.0

Sistema completo de gestión para clínicas dentales y laboratorios. Incluye gestión de pacientes, odontograma digital, órdenes de laboratorio con 10 etapas KAMBA, facturación integrada y sistema de permisos dinámico.

## 🚀 Características

- **Landing Page Pública**: Diseño moderno con glassmorphism y animaciones
- **Sistema de Autenticación**: Login con 2 tabs (Clínica/Laboratorio)
- **DEV Quick Login**: Acceso rápido con usuarios de prueba en desarrollo
- **Dashboard Dinámico**: Vistas específicas según rol del usuario
- **Sistema de Permisos**: Matriz dinámica de roles y permisos CRUD
- **16 Roles Predefinidos**: Core, Lab, Clinic, Logistics
- **10 Etapas KAMBA**: Flujo completo de laboratorio
- **RLS (Row Level Security)**: Seguridad a nivel de base de datos

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Estado**: Zustand
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

## 📦 Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.local.example .env.local`
4. Ejecutar migraciones en Supabase
5. Crear usuarios de prueba en Supabase Auth
6. Iniciar servidor: `npm run dev`

## 🔐 Sistema de Permisos

Matriz dinámica de permisos CRUD con 16 roles predefinidos y 10 etapas KAMBA para laboratorio.

## 📄 Licencia

© 2025 DentalFlow. Todos los derechos reservados.
