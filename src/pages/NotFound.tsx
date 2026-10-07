import { Link } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import styles from './Page.module.scss'

export default function NotFound() {
  usePageTitle('Página não encontrada')
  return (
    <>
      <header className={styles.head}>
        <h1>Página não encontrada</h1>
      </header>
      <section className={styles.panel}>
        <p>O endereço que você acessou não existe ou foi movido.</p>
        <Link to="/">Voltar para a visão geral</Link>
      </section>
    </>
  )
}
