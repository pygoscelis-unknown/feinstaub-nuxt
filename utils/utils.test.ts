import { describe, expect, it } from 'vitest'
import { getCountOfDaysOfMonth } from './utils'

describe('getCountOfDaysOfMonth', () => {
  it('returns 31 for January', () => {
    expect(getCountOfDaysOfMonth(1, 2023)).toBe(31)
  })

  it('returns 28 for February in a non-leap year', () => {
    expect(getCountOfDaysOfMonth(2, 2023)).toBe(28)
  })

  it('returns 29 for February in a leap year', () => {
    expect(getCountOfDaysOfMonth(2, 2024)).toBe(29)
  })

  it('returns 30 for April', () => {
    expect(getCountOfDaysOfMonth(4, 2023)).toBe(30)
  })

  it('returns 31 for December', () => {
    expect(getCountOfDaysOfMonth(12, 2023)).toBe(31)
  })

  it('returns 31 for July', () => {
    expect(getCountOfDaysOfMonth(7, 2023)).toBe(31)
  })

  it('returns 30 for September', () => {
    expect(getCountOfDaysOfMonth(9, 2023)).toBe(30)
  })
})
