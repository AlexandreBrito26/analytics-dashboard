export const RANGES = [7, 14, 30] as const
export type Range = (typeof RANGES)[number]
export const DEFAULT_RANGE: Range = 7

/** Lê o período da URL (?range=14). Valores ausentes ou inválidos caem no padrão. */
export function parseRange(value: string | null): Range {
  const n = Number(value)
  return (RANGES as readonly number[]).includes(n) ? (n as Range) : DEFAULT_RANGE
}
