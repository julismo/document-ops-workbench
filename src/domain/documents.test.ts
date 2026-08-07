import { reviewDocument } from './documents'

describe('reviewDocument', () => {
  it('normalizes reviewed fields and explains an income decision', () => {
    const result = reviewDocument({
      fields: { supplier: '  North   Studio ', reference: ' Q-104 ' },
      reviewedFields: { reference: 'Q-105' },
      taxIdentifier: ' TX-204 ',
      directionSignals: ['income'],
    })

    expect(result.normalizedFields).toEqual({ supplier: 'North Studio', reference: 'Q-105' })
    expect(result.financialDirection).toBe('income')
    expect(result.confidence).toBe(95)
    expect(result.rationale).toContain('Income direction is supported by the supplied direction signal.')
    expect(result.changedFields).toEqual([
      { field: 'reference', original: 'Q-104', reviewed: 'Q-105' },
    ])
  })

  it('lowers confidence and records a rationale when a tax identifier is missing', () => {
    const result = reviewDocument({
      fields: { supplier: 'North Studio' },
      directionSignals: ['expense'],
    })

    expect(result.confidence).toBe(70)
    expect(result.rationale).toContain('Tax identifier is missing and requires human review.')
  })

  it('marks conflicting direction signals as unknown', () => {
    const result = reviewDocument({
      fields: { supplier: 'North Studio' },
      taxIdentifier: 'TX-204',
      directionSignals: ['income', 'expense'],
    })

    expect(result.financialDirection).toBe('unknown')
    expect(result.confidence).toBe(65)
    expect(result.rationale).toContain('Financial direction is ambiguous and requires human review.')
  })
})
