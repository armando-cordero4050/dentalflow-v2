export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-4 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} DentalFlow. Todos los derechos reservados.</p>
      <p>
        Desarrollado por{' '}
        <a 
          href="https://smartnetgt.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          SmartNetGT.com
        </a>
      </p>
    </footer>
  )
}
