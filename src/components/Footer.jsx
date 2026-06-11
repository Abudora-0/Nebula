const Footer = () => {
  return (
    <footer className="border-t border-sky-200 bg-white/60 py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center gap-2">
        <span className="text-slate-700 font-bold text-lg tracking-tight">
          N<span className="text-sky-500">-Pass</span>
        </span>
        <p className="text-slate-400 text-sm flex items-center gap-1.5">
          Made with
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#f43f5e">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
          by Making Of Ab
        </p>
      </div>
    </footer>
  )
}

export default Footer
