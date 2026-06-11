const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-sky-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="nv" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#0ea5e9"/>
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#nv)"/>
            <path d="M16 4l8 3.5v7c0 5-3.5 9-8 10.5C11.5 23.5 8 19.5 8 14.5v-7L16 4z" fill="white" fillOpacity="0.25"/>
            <rect x="12.5" y="16.5" width="7" height="6" rx="1.5" fill="white"/>
            <path d="M14.2 16.5v-3a1.8 1.8 0 013.6 0v3" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <circle cx="16" cy="19.5" r="1" fill="#3b82f6"/>
          </svg>
          <span className="text-slate-800 font-bold text-xl tracking-tight">
            N<span className="text-sky-500">-Pass</span>
          </span>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 border border-sky-300 hover:border-sky-500 hover:bg-sky-50 transition-all duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  )
}

export default Navbar
