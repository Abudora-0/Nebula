import { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import 'react-toastify/dist/ReactToastify.css'

const getStrength = (pwd) => {
  if (!pwd) return null
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 14) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  if (score <= 1) return { label: 'WEAK', color: '#ff5252', segments: 1 }
  if (score === 2) return { label: 'FAIR', color: '#ff8c42', segments: 2 }
  if (score === 3) return { label: 'GOOD', color: '#ffb000', segments: 3 }
  if (score === 4) return { label: 'STRONG', color: '#9ef01a', segments: 4 }
  return { label: 'MAXIMUM', color: '#9ef01a', segments: 5 }
}

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const parseCSV = (text) => {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else {
        field += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(field); field = ''
    } else if (char === '\r') {
      // skip, handled by \n
    } else if (char === '\n') {
      row.push(field); field = ''
      rows.push(row); row = []
    } else {
      field += char
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter(r => !(r.length === 1 && r[0].trim() === ''))
}

const csvEscape = (value) => {
  const str = String(value ?? '')
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
}

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)
const ShuffleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const UploadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
)

const FieldLabel = ({ children }) => (
  <label className="block text-[10px] uppercase tracking-[0.25em] text-[#5a7050] mb-1.5">
    {children}
  </label>
)

const Manager = () => {
  const [form, setForm] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])
  const [showPwd, setShowPwd] = useState(false)
  const [visiblePasswords, setVisiblePasswords] = useState(new Set())
  const [pendingDelete, setPendingDelete] = useState(null)
  const [pendingClearAll, setPendingClearAll] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('nebula-v1') || localStorage.getItem('npass-v2')
    if (stored) setPasswordArray(JSON.parse(stored))
  }, [])

  const persist = (arr) => {
    setPasswordArray(arr)
    localStorage.setItem('nebula-v1', JSON.stringify(arr))
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleGenerate = () => {
    setForm({ ...form, password: generatePassword() })
    setShowPwd(true)
  }

  const savePassword = () => {
    if (form.site.length < 3 || form.username.length < 2 || form.password.length < 4) {
      toast.error('ERROR // all fields required')
      return
    }
    if (editId) {
      persist(passwordArray.map(p => p.id === editId ? { ...form, id: editId } : p))
      setEditId(null)
      toast.success('ENTRY UPDATED // vault synced')
    } else {
      persist([...passwordArray, { ...form, id: uuidv4() }])
      toast.success('ENTRY SECURED // vault synced')
    }
    setForm({ site: '', username: '', password: '' })
    setShowPwd(false)
  }

  const editPassword = (id) => {
    const item = passwordArray.find(p => p.id === id)
    setForm({ site: item.site, username: item.username, password: item.password })
    setEditId(id)
    setShowPwd(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const doDelete = () => {
    persist(passwordArray.filter(p => p.id !== pendingDelete))
    setPendingDelete(null)
    toast.success('ENTRY PURGED // vault synced')
  }

  const clearAll = () => {
    persist([])
    setPendingClearAll(false)
    toast.success('VAULT WIPED // all records purged')
  }

  const toggleVisible = (id) => {
    setVisiblePasswords(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const copyText = (text, id, field) => {
    navigator.clipboard.writeText(text)
    setCopiedId({ id, field })
    setTimeout(() => setCopiedId(null), 1500)
  }

  const handleExport = () => {
    if (passwordArray.length === 0) {
      toast.error('EXPORT FAILED // vault is empty')
      return
    }
    const header = 'name,url,username,password,note'
    const lines = passwordArray.map(p =>
      [p.site, p.site, p.username, p.password, ''].map(csvEscape).join(',')
    )
    const csv = [header, ...lines].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nebula-export-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('EXPORTED // vault written to CSV')
  }

  const handleImportClick = () => fileInputRef.current?.click()

  const handleImportFile = (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const rows = parseCSV(String(ev.target.result))
        if (rows.length < 2) throw new Error('empty file')

        const header = rows[0].map(h => h.trim().toLowerCase())
        const idx = {
          name: header.indexOf('name'),
          url: header.indexOf('url'),
          username: header.indexOf('username'),
          password: header.indexOf('password'),
        }
        if (idx.username === -1 || idx.password === -1 || (idx.name === -1 && idx.url === -1)) {
          throw new Error('missing required columns')
        }

        const imported = []
        for (let i = 1; i < rows.length; i++) {
          const r = rows[i]
          const site = (idx.url !== -1 ? r[idx.url] : '') || (idx.name !== -1 ? r[idx.name] : '')
          const username = r[idx.username]
          const password = r[idx.password]
          if (!site || !username || !password) continue
          imported.push({ site, username, password, id: uuidv4() })
        }
        if (imported.length === 0) throw new Error('no valid rows')

        persist([...passwordArray, ...imported])
        toast.success(`IMPORTED // ${imported.length} entr${imported.length === 1 ? 'y' : 'ies'} added`)
      } catch {
        toast.error('IMPORT FAILED // invalid CSV file')
      }
    }
    reader.onerror = () => toast.error('IMPORT FAILED // could not read file')
    reader.readAsText(file)
  }

  const filtered = passwordArray.filter(p =>
    p.site.toLowerCase().includes(search.toLowerCase()) ||
    p.username.toLowerCase().includes(search.toLowerCase())
  )

  const strength = getStrength(form.password)
  const isEditing = !!editId

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" hideProgressBar={false} />

      <div className="max-w-4xl mx-auto px-5 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[#5a7050] mb-3">
            /// local-first · zero backend · your machine only
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#d6e8cf]">
            SECURE VAULT<span className="cursor-blink text-[#9ef01a]">▌</span>
          </h1>
          <p className="text-[#5a7050] text-sm mt-2">
            {passwordArray.length} record{passwordArray.length === 1 ? '' : 's'} on file, nothing ever leaves this device.
          </p>
        </div>

        {/* Entry form */}
        <div className="vault-panel p-6 sm:p-7 mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#9ef01a] text-sm font-bold">&gt;</span>
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d6e8cf]">
              {isEditing ? 'Edit entry' : 'New entry'}
            </h2>
            {isEditing && (
              <span className="text-[10px] uppercase tracking-widest text-[#ffb000] border border-[#ffb000]/40 px-2 py-0.5 ml-2">
                editing
              </span>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <FieldLabel>Site / Service</FieldLabel>
              <input
                value={form.site}
                onChange={handleChange}
                name="site"
                placeholder="github.com"
                className="vault-input"
              />
            </div>
            <div>
              <FieldLabel>Login / Identity</FieldLabel>
              <input
                value={form.username}
                onChange={handleChange}
                name="username"
                placeholder="you@machine.local"
                className="vault-input"
              />
            </div>

            <div>
              <FieldLabel>Passphrase</FieldLabel>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    placeholder="••••••••••••••••"
                    className="vault-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#47593f] hover:text-[#9ef01a] transition-colors"
                  >
                    {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <button onClick={handleGenerate} className="btn-ghost flex items-center justify-center gap-2">
                  <ShuffleIcon /> Generate
                </button>
              </div>

              {strength && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <span
                        key={i}
                        className="block w-7 h-2 transition-colors duration-200"
                        style={{
                          background: i <= strength.segments ? strength.color : '#1a231a',
                          boxShadow: i <= strength.segments ? `0 0 8px ${strength.color}55` : 'none',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: strength.color }}>
                    [{strength.label}]
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button onClick={savePassword} className="btn-primary">
                {isEditing ? '↑ Update entry' : '+ Secure entry'}
              </button>
              {isEditing && (
                <button
                  onClick={() => { setEditId(null); setForm({ site: '', username: '', password: '' }) }}
                  className="btn-ghost"
                >
                  Abort
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Vault records */}
        <div className="vault-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#223021]">
            <div className="flex items-center gap-2">
              <span className="text-[#9ef01a] text-sm font-bold">&gt;</span>
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#d6e8cf]">Vault records</h2>
              <span className="text-[10px] text-[#47593f] ml-1">[{passwordArray.length}]</span>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="grep records…"
                className="vault-input w-full sm:w-56 !py-1.5 text-xs"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleImportFile}
                className="hidden"
              />
              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-2">
                <button
                  onClick={handleImportClick}
                  className="btn-ghost !py-1.5 !px-2 sm:!px-3 flex items-center justify-center gap-1.5 whitespace-nowrap"
                  title="Import CSV (Chrome / Brave / Google Password Manager)"
                >
                  <span className="hidden sm:inline-flex"><UploadIcon /></span> Import
                </button>
                <button
                  onClick={handleExport}
                  className="btn-ghost !py-1.5 !px-2 sm:!px-3 flex items-center justify-center gap-1.5 whitespace-nowrap"
                  title="Export vault to CSV"
                >
                  <span className="hidden sm:inline-flex"><DownloadIcon /></span> Export
                </button>
                {pendingClearAll ? (
                  <div className="col-span-3 sm:col-auto flex items-center justify-center gap-2 border border-[#ff5252]/30 py-1.5 sm:border-0 sm:py-0">
                    <span className="text-[#ff5252] text-[10px] uppercase tracking-widest whitespace-nowrap">wipe all {passwordArray.length}?</span>
                    <button
                      onClick={clearAll}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold text-[#ff5252] border border-[#ff5252]/50 hover:bg-[#ff5252] hover:text-[#0b0f0c] transition-all"
                    >
                      Y
                    </button>
                    <button
                      onClick={() => setPendingClearAll(false)}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#5a7050] border border-[#223021] hover:border-[#5a7050] transition-all"
                    >
                      N
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPendingClearAll(true)}
                    disabled={passwordArray.length === 0}
                    className="btn-ghost !py-1.5 !px-2 sm:!px-3 flex items-center justify-center gap-1.5 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Erase all records"
                  >
                    <span className="hidden sm:inline-flex"><TrashIcon /></span> Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Empty state */}
          {passwordArray.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16">
              <pre className="text-[#2b3a28] text-xs leading-tight select-none">{String.raw`
   .--------.
   |  ____  |
   | |    | |
   | |____| |
   |  [==]  |
   '--------'`}</pre>
              <p className="text-xs uppercase tracking-[0.25em] text-[#47593f]">vault empty, add your first entry</p>
            </div>
          )}

          {/* Rows */}
          {filtered.map((item, idx) => {
            const isVisible = visiblePasswords.has(item.id)
            const isPendingDel = pendingDelete === item.id
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 border-b border-[#1a231a] last:border-0 hover:bg-[#131a11] transition-colors row-enter"
              >
                {/* Index + site */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-[10px] text-[#3a4a35] w-8 shrink-0">{String(idx + 1).padStart(3, '0')}</span>
                  <a
                    href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9ef01a] hover:underline underline-offset-4 text-sm truncate"
                  >
                    {item.site}
                  </a>
                </div>

                {/* Username */}
                <div className="flex items-center gap-2 min-w-0 sm:w-44">
                  <span className="text-[#8ba382] text-xs truncate">{item.username}</span>
                  <button
                    onClick={() => copyText(item.username, item.id, 'user')}
                    className="text-[#3a4a35] hover:text-[#9ef01a] transition-colors shrink-0"
                    title="Copy login"
                  >
                    {copiedId?.id === item.id && copiedId?.field === 'user' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>

                {/* Password */}
                <div className="flex items-center gap-2 min-w-0 sm:w-48">
                  <span className="text-[#8ba382] text-xs truncate">
                    {isVisible ? item.password : '▪'.repeat(Math.min(item.password.length, 12))}
                  </span>
                  <button
                    onClick={() => toggleVisible(item.id)}
                    className="text-[#3a4a35] hover:text-[#9ef01a] transition-colors shrink-0"
                  >
                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  <button
                    onClick={() => copyText(item.password, item.id, 'pwd')}
                    className="text-[#3a4a35] hover:text-[#9ef01a] transition-colors shrink-0"
                    title="Copy passphrase"
                  >
                    {copiedId?.id === item.id && copiedId?.field === 'pwd' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isPendingDel ? (
                    <>
                      <span className="text-[#ff5252] text-[10px] uppercase tracking-widest">purge?</span>
                      <button
                        onClick={doDelete}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold text-[#ff5252] border border-[#ff5252]/50 hover:bg-[#ff5252] hover:text-[#0b0f0c] transition-all"
                      >
                        Y
                      </button>
                      <button
                        onClick={() => setPendingDelete(null)}
                        className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#5a7050] border border-[#223021] hover:border-[#5a7050] transition-all"
                      >
                        N
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => editPassword(item.id)}
                        className="p-1.5 text-[#3a4a35] hover:text-[#ffb000] transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setPendingDelete(item.id)}
                        className="p-1.5 text-[#3a4a35] hover:text-[#ff5252] transition-colors"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}

          {passwordArray.length > 0 && filtered.length === 0 && (
            <div className="py-12 text-center text-[#47593f] text-xs uppercase tracking-[0.25em]">
              no match for "{search}"
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager
