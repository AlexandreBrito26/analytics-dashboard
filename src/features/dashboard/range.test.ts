import { describe, expect, it } from 'vitest'
import { DEFAULT_RANGE, parseRange } from './range'

describe('parseRange', () => {
  it.each(['7', '14', '30'])('aceita %s', (v) => {
    expect(parseRange(v)).toBe(Number(v))
  })
  it.each([null, '', '0', '8', '-7', 'abc', '99'])('usa o padrão para %s', (v) => {
    expect(parseRange(v)).toBe(DEFAULT_RANGE)
  })
})
