import { create } from 'zustand'

type Theme = 'light' | 'dark'
interface ThemeState { theme: Theme; toggle: () => void }

const STORAGE_KEY = 'theme'
const media = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-color-scheme: dark)') : null

const apply = (t: Theme) => document.documentElement.setAttribute('data-theme', t)

const readStored = (): Theme | null => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

const save = (t: Theme) => {
  try { localStorage.setItem(STORAGE_KEY, t) } catch { /* storage indisponível: ignora */ }
}

const initial: Theme = readStored() ?? (media?.matches ? 'dark' : 'light')
apply(initial)

export const useTheme = create<ThemeState>((set, get) => ({
  theme: initial,
  toggle: () => {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light'
    apply(next)
    save(next)
    set({ theme: next })
  },
}))

// Sem escolha manual salva, acompanha a preferência do sistema em tempo real.
media?.addEventListener('change', (e) => {
  if (readStored() !== null) return
  const next: Theme = e.matches ? 'dark' : 'light'
  apply(next)
  useTheme.setState({ theme: next })
})
