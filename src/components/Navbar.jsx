const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#223021] bg-[#0b0f0c]/90 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="#10160f"/>
            <rect x="1" y="1" width="30" height="30" rx="5" stroke="#9ef01a" strokeOpacity="0.4"/>
            <path d="M6 6h4M6 6v4" stroke="#9ef01a" strokeWidth="1.6"/>
            <path d="M26 26h-4M26 26v-4" stroke="#9ef01a" strokeWidth="1.6"/>
            <circle cx="12" cy="16" r="5" fill="#9ef01a"/>
            <circle cx="12" cy="16" r="2.1" fill="#10160f"/>
            <rect x="16.5" y="14.7" width="10" height="2.6" rx="0.4" fill="#9ef01a"/>
            <rect x="20.5" y="17.3" width="1.8" height="3.2" fill="#9ef01a"/>
            <rect x="24" y="17.3" width="1.8" height="2.2" fill="#9ef01a"/>
          </svg>
          <span className="text-sm font-bold tracking-[0.2em] text-[#d6e8cf]">
            NEBULA<span className="text-[#9ef01a]">_</span>
          </span>
        </div>

        {/* Status + GitHub */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#5a7050]">
            <span className="status-dot inline-block w-1.5 h-1.5 bg-[#9ef01a]" />
            local-only
          </div>
          <a
            href="https://github.com/Abudora-0/Nebula"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-[11px] uppercase tracking-widest text-[#5a7050] border border-[#223021] hover:text-[#9ef01a] hover:border-[#9ef01a] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Source
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
