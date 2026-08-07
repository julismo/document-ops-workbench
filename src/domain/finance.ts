export type FinanceDirection = 'income' | 'expense'
export type FinanceStatus = 'realized' | 'pipeline' | 'pending-action'

export interface FinanceEntry {
  direction: FinanceDirection
  amount: number
  status: FinanceStatus
}

export interface FinanceSummary {
  realizedIncome: number
  realizedExpense: number
  realizedBalance: number
  pipelineAmount: number
  pendingActionCount: number
  trendInsights: string[]
}

export function summarizeFinance(entries: readonly FinanceEntry[]): FinanceSummary {
  let realizedIncome = 0
  let realizedExpense = 0
  let pipelineAmount = 0
  let pendingActionCount = 0

  for (const entry of entries) {
    if (entry.status === 'realized') {
      if (entry.direction === 'income') {
        realizedIncome += entry.amount
      } else {
        realizedExpense += entry.amount
      }
    }

    if (entry.status === 'pipeline') {
      pipelineAmount += entry.amount
    }

    if (entry.status === 'pending-action') {
      pendingActionCount += 1
    }
  }

  const realizedBalance = realizedIncome - realizedExpense
  const trendInsights = [
    realizedBalance > 0
      ? 'Realized income exceeds realized expense.'
      : realizedBalance < 0
        ? 'Realized expense exceeds realized income.'
        : 'Realized income and expense are balanced.',
    'Pipeline amounts are excluded from realized balance.',
  ]

  if (pendingActionCount > 0) {
    trendInsights.push(`${pendingActionCount} entries require a pending action.`)
  }

  return {
    realizedIncome,
    realizedExpense,
    realizedBalance,
    pipelineAmount,
    pendingActionCount,
    trendInsights,
  }
}
