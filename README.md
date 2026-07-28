# Nebula, Local-First Password Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-9ef01a.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![No Backend](https://img.shields.io/badge/backend-none-9ef01a.svg)](#about)

**Live Demo:** https://nebuula.vercel.app/

A clean, minimal password manager that runs entirely in your browser. No accounts, no servers, no cloud, your passwords live in your device's local storage.

`password-manager` `react` `vite` `tailwindcss` `local-first` `offline-first`

---

## About

Nebula was built to solve a simple problem: storing passwords without trusting a third-party service. Everything is saved locally using `localStorage`, meaning your data never leaves your device. The app includes a built-in password generator, strength indicator, one-click copy, and CSV import/export, all wrapped in a lightweight React + Tailwind interface.

---

## Features

- **Save & manage passwords** - store site URL, username, and password in one place
- **Password generator** - instantly generate a secure 16-character password
- **Strength indicator** - real-time feedback (Weak to Very Strong) as you type
- **Show/hide toggle** - reveal or mask individual passwords in your vault
- **One-click copy** - copy usernames or passwords to clipboard with visual confirmation
- **Search** - filter your vault by site or username instantly
- **Edit & delete** - update or remove entries with a confirm-before-delete safeguard
- **Import / Export** - import a CSV exported from Chrome, Brave, or Google Password Manager, or export your vault to the same format
- **Persistent storage** - all data survives page refreshes via `localStorage`

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

## Import / Export

Nebula reads and writes the same CSV format used by Chrome, Brave, and Google Password Manager (`name,url,username,password,note`), so you can:

- **Import** a password export from Chrome/Brave/Google straight into Nebula.
- **Export** your Nebula vault to a CSV that those same tools can import.

Both actions are available from the Vault records panel.

---

## Notes

- Data is stored in `localStorage` under the key `nebula-v1`
- No backend, no authentication, this is a local-only tool
- Clearing browser storage will erase all saved passwords

---

## License

Released under the [MIT License](LICENSE).
