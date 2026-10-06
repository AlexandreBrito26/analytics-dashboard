import { create } from 'zustand'

type Theme = 'light' | 'dark'
interface ThemeState { theme: Theme; toggle: () => void }

const apply = (t: Theme) => document.documentElement.setAttribute('data-theme', t)
const initial: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
apply(initial)

export const useTheme = create<ThemeState>((set, get) => ({
  theme: initial,
  toggle: () => {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light'
    apply(next)
    set({ theme: next })
  },
}))
