import type { ReactNode } from 'react'
import styles from './QueryState.module.scss'

interface Props {
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  children: ReactNode
}

export function QueryState({ isLoading, isError, onRetry, children }: Props) {
  if (isLoading) return <p role="status" className={styles.state}>Carregando...</p>
  if (isError) {
    return (
      <div role="alert" className={styles.state}>
        <p>Não foi possível carregar os dados.</p>
        <button type="button" onClick={onRetry}>Tentar novamente</button>
      </div>
    )
  }
  return <>{children}</>
}
