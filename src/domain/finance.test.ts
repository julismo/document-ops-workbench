import { summarizeFinance } from './finance'

describe('summarizeFinance', () => {
  it('summarizes realized income, expense, and a positive balance', () => {
    const result = summarizeFinance([
      { direction: 'income', amount: 500, status: 'realized' },
      { direction: 'expense', amount: 175, status: 'realized' },
    ])

    expect(result).toMatchObject({
      realizedIncome: 500,
      realizedExpense: 175,
      realizedBalance: 325,
      pipelineAmount: 0,
      pendingActionCount: 0,
    })
    expect(result.trendInsights).toContain('Realized income exceeds realized expense.')
  })

  it('keeps pipeline amounts out of the realized balance', () => {
    const result = summarizeFinance([
      { direction: 'income', amount: 500, status: 'realized' },
      { direction: 'expense', amount: 175, status: 'realized' },
      { direction: 'income', amount: 900, status: 'pipeline' },
      { direction: 'expense', amount: 20, status: 'pending-action' },
    ])

    expect(result.realizedBalance).toBe(325)
    expect(result.pipelineAmount).toBe(900)
    expect(result.pendingActionCount).toBe(1)
    expect(result.trendInsights).toContain('Pipeline amounts are excluded from realized balance.')
  })
})
