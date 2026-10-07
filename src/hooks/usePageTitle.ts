import { useEffect } from 'react'

const APP_NAME = 'Analytics Dashboard'

/** Atualiza o título da aba (e o que leitores de tela anunciam) ao trocar de página. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · ${APP_NAME}`
  }, [title])
}
