import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from '@/store/theme'
import styles from './Layout.module.scss'

export function Layout() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const close = () => setOpen(false)

  // Menu aberto (só existe no celular): foca o primeiro link e fecha com Esc devolvendo o foco ao botão.
  useEffect(() => {
    if (!open) return
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      menuButton.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const isLight = theme === 'light'

  return (
    <div className={styles.shell}>
      <a href="#conteudo" className={styles.skip}>
        Ir para o conteúdo
      </a>

      <header className={styles.topbar}>
        <button
          ref={menuButton}
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <span className={styles.brand}>
          <span aria-hidden="true">📊</span> Analytics
        </span>
      </header>

      {open && <div className={styles.overlay} onClick={close} aria-hidden="true" />}

      <aside id="sidebar" className={clsx(styles.sidebar, open && styles.open)}>
        <p className={styles.brand}>
          <span aria-hidden="true">📊</span> Analytics
        </p>
        <nav aria-label="Principal">
          <NavLink ref={firstLink} to="/" end onClick={close}>
            Visão geral
          </NavLink>
          <NavLink to="/pedidos" onClick={close}>
            Pedidos
          </NavLink>
        </nav>
        <button type="button" onClick={toggle} aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}>
          <span aria-hidden="true">{isLight ? '🌙' : '☀️'}</span> {isLight ? 'Escuro' : 'Claro'}
        </button>
      </aside>

      <main id="conteudo" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
