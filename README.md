# N-Pass — Local-First Password Manager

A clean, minimal password manager that runs entirely in your browser. No accounts, no servers, no cloud — your passwords live in your device's local storage.

---

## About

N-Pass was built to solve a simple problem: storing passwords without trusting a third-party service. Everything is saved locally using `localStorage`, meaning your data never leaves your device. The app includes a built-in password generator, strength indicator, and one-click copy — all wrapped in a lightweight React + Tailwind interface.

---

## Features

- **Save & manage passwords** — store site URL, username, and password in one place
- **Password generator** — instantly generate a secure 16-character password
- **Strength indicator** — real-time feedback (Weak → Very Strong) as you type
- **Show/hide toggle** — reveal or mask individual passwords in your vault
- **One-click copy** — copy usernames or passwords to clipboard with visual confirmation
- **Search** — filter your vault by site or username instantly
- **Edit & delete** — update or remove entries with a confirm-before-delete safeguard
- **Persistent storage** — all data survives page refreshes via `localStorage`

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| react-toastify | Toast notifications |
| uuid | Unique ID generation per entry |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Notes

- Data is stored in `localStorage` under the key `npass-v2`
- No backend, no authentication — this is a local-only tool
- Clearing browser storage will erase all saved passwords
