import { useState, useEffect } from 'react'
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
  if (score <= 1) return { label: 'Weak', color: 'bg-red-400', text: 'text-red-500', width: 'w-1/5' }
  if (score === 2) return { label: 'Fair', color: 'bg-orange-400', text: 'text-orange-500', width: 'w-2/5' }
  if (score === 3) return { label: 'Good', color: 'bg-yellow-400', text: 'text-yellow-600', width: 'w-3/5' }
  if (score === 4) return { label: 'Strong', color: 'bg-emerald-400', text: 'text-emerald-600', width: 'w-4/5' }
  return { label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-600', width: 'w-full' }
}

const generatePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const ShuffleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
  </svg>
)
const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
)
const LockIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

const inputClass = "w-full px-4 py-2.5 rounded-xl text-slate-800 text-sm placeholder-slate-400 bg-white border border-sky-200 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all shadow-sm"

const Manager = () => {
  const [form, setForm] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])
  const [showPwd, setShowPwd] = useState(false)
  const [visiblePasswords, setVisiblePasswords] = useState(new Set())
  const [pendingDelete, setPendingDelete] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('npass-v2')
    if (stored) setPasswordArray(JSON.parse(stored))
  }, [])

  const persist = (arr) => {
    setPasswordArray(arr)
    localStorage.setItem('npass-v2', JSON.stringify(arr))
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleGenerate = () => {
    setForm({ ...form, password: generatePassword() })
    setShowPwd(true)
  }

  const savePassword = () => {
    if (form.site.length < 3 || form.username.length < 2 || form.password.length < 4) {
      toast.error('Please fill all fields properly.', { theme: 'light' })
      return
    }
    if (editId) {
      persist(passwordArray.map(p => p.id === editId ? { ...form, id: editId } : p))
      setEditId(null)
      toast.success('Password updated!', { theme: 'light' })
    } else {
      persist([...passwordArray, { ...form, id: uuidv4() }])
      toast.success('Password saved!', { theme: 'light' })
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
    toast.success('Password deleted.', { theme: 'light' })
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

  const filtered = passwordArray.filter(p =>
    p.site.toLowerCase().includes(search.toLowerCase()) ||
    p.username.toLowerCase().includes(search.toLowerCase())
  )

  const strength = getStrength(form.password)
  const isEditing = !!editId

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-white" style={{ background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)' }}>
            <LockIcon />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">N-Pass</h1>
          <p className="text-slate-400 text-sm">Your personal, local-first password vault</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-6 mb-8">
          <h2 className="text-slate-700 font-semibold text-base mb-5">
            {isEditing ? '✏️ Edit password' : '+ Add new password'}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              value={form.site}
              onChange={handleChange}
              name="site"
              placeholder="Website URL (e.g. github.com)"
              className={inputClass}
            />
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Username or email"
              className={inputClass}
            />

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    value={form.password}
                    onChange={handleChange}
                    name="password"
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Password"
                    className={inputClass + ' pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-500 transition-colors"
                  >
                    {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-sky-600 bg-sky-50 border border-sky-200 hover:bg-sky-100 hover:border-sky-300 transition-all"
                >
                  <ShuffleIcon /> Generate
                </button>
              </div>

              {strength && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                  <span className={`text-xs font-medium ${strength.text}`}>{strength.label}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={savePassword}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-sm hover:shadow-md"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#0ea5e9)' }}
              >
                <SaveIcon /> {isEditing ? 'Update' : 'Save'}
              </button>
              {isEditing && (
                <button
                  onClick={() => { setEditId(null); setForm({ site: '', username: '', password: '' }) }}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200 hover:border-slate-300 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Passwords list */}
        <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
          {/* List header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-sky-100">
            <div>
              <h2 className="text-slate-700 font-semibold">Saved Passwords</h2>
              <p className="text-slate-400 text-xs mt-0.5">{passwordArray.length} entr{passwordArray.length === 1 ? 'y' : 'ies'}</p>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><SearchIcon /></span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 rounded-xl text-slate-700 text-sm placeholder-slate-400 bg-sky-50 border border-sky-200 focus:outline-none focus:border-sky-400 w-56 transition-all"
              />
            </div>
          </div>

          {/* Empty state */}
          {passwordArray.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-slate-300">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <p className="text-sm text-slate-400">No passwords saved yet</p>
            </div>
          )}

          {/* Rows */}
          {filtered.map((item) => {
            const isVisible = visiblePasswords.has(item.id)
            const isPendingDel = pendingDelete === item.id
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-sky-50 last:border-0 hover:bg-sky-50/60 transition-colors row-enter"
              >
                {/* Site */}
                <div className="flex-1 min-w-0">
                  <a
                    href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600 text-sm font-medium truncate block"
                  >
                    {item.site}
                  </a>
                </div>

                {/* Username */}
                <div className="flex items-center gap-1.5 min-w-0 sm:w-44">
                  <span className="text-slate-600 text-sm truncate">{item.username}</span>
                  <button
                    onClick={() => copyText(item.username, item.id, 'user')}
                    className="text-slate-300 hover:text-sky-500 transition-colors shrink-0"
                    title="Copy username"
                  >
                    {copiedId?.id === item.id && copiedId?.field === 'user' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>

                {/* Password */}
                <div className="flex items-center gap-1.5 sm:w-44">
                  <span className="text-slate-600 text-sm font-mono truncate">
                    {isVisible ? item.password : '•'.repeat(Math.min(item.password.length, 12))}
                  </span>
                  <button
                    onClick={() => toggleVisible(item.id)}
                    className="text-slate-300 hover:text-sky-500 transition-colors shrink-0"
                  >
                    {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                  <button
                    onClick={() => copyText(item.password, item.id, 'pwd')}
                    className="text-slate-300 hover:text-sky-500 transition-colors shrink-0"
                    title="Copy password"
                  >
                    {copiedId?.id === item.id && copiedId?.field === 'pwd' ? <CheckIcon /> : <CopyIcon />}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {isPendingDel ? (
                    <>
                      <span className="text-red-400 text-xs">Delete?</span>
                      <button
                        onClick={doDelete}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setPendingDelete(null)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 border border-slate-200 hover:border-slate-300 transition-all"
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => editPassword(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-all"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setPendingDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
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
            <div className="py-12 text-center text-slate-400 text-sm">No matches for "{search}"</div>
          )}
        </div>
      </div>
    </>
  )
}

export default Manager
