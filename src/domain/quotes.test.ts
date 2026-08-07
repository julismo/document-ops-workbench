import { calculateQuote } from './quotes'

describe('calculateQuote', () => {
  it('returns transparent line items and a calculated final total', () => {
    const result = calculateQuote({
      quantity: 2,
      unitRate: 100,
      distance: 10,
      distanceRate: 2,
      duration: 1,
      durationRate: 50,
    })

    expect(result.lineItems).toEqual([
      { label: 'Quantity', quantity: 2, rate: 100, total: 200 },
      { label: 'Distance', quantity: 10, rate: 2, total: 20 },
      { label: 'Duration', quantity: 1, rate: 50, total: 50 },
    ])
    expect(result.calculatedTotal).toBe(270)
    expect(result.manualOverride).toBeUndefined()
    expect(result.finalTotal).toEqual({ amount: 270, source: 'calculated' })
  })

  it('preserves the calculated total when a manual override is supplied', () => {
    const result = calculateQuote({ quantity: 2, unitRate: 100, manualOverride: 175 })

    expect(result.calculatedTotal).toBe(200)
    expect(result.manualOverride).toBe(175)
    expect(result.finalTotal).toEqual({ amount: 175, source: 'manual-override' })
  })
})
