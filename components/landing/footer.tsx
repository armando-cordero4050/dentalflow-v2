export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/10 bg-slate-900/50">
      <div className="max-w-7xl mx-auto text-center text-gray-400">
        <p>
          <span className="text-white font-bold">IMFOHSA</span> © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
