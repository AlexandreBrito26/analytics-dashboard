import { motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './StatCard.module.scss'
import type { Metric } from '@/services/analytics'

export function StatCard({ label, value, delta, prefix = '' }: Metric) {
  return (
    <motion.div className={styles.card} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{prefix}{value.toLocaleString('pt-BR')}</strong>
      <span className={clsx(styles.delta, delta >= 0 ? styles.up : styles.down)}>
        {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
      </span>
    </motion.div>
  )
}
