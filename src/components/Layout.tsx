import { NavLink, Outlet } from 'react-router-dom'
import { useTheme } from '@/store/theme'
import styles from './Layout.module.scss'

export function Layout() {
  const { theme, toggle } = useTheme()
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <h2>📊 Analytics</h2>
        <nav>
          <NavLink to="/" end>Visão geral</NavLink>
          <NavLink to="/pedidos">Pedidos</NavLink>
        </nav>
        <button onClick={toggle}>{theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}</button>
      </aside>
      <main className={styles.main}><Outlet /></main>
    </div>
  )
}
