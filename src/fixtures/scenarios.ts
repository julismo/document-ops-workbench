import type { ReviewDocumentInput } from '../domain/documents'
import type { FinanceEntry } from '../domain/finance'
import type { QuoteInput } from '../domain/quotes'

export interface DocumentScenario {
  document: ReviewDocumentInput
}

export const documentScenario: DocumentScenario = {
  document: {
    fields: {
      supplier: '  Sample Studio  ',
      reference: ' Q-104 ',
    },
    taxIdentifier: ' TX-204 ',
    directionSignals: ['income'],
  },
}

export const quoteScenario: QuoteInput = {
  quantity: 2,
  unitRate: 100,
  distance: 10,
  distanceRate: 2,
  duration: 1,
  durationRate: 50,
}

export const financeScenario: readonly FinanceEntry[] = [
  { direction: 'income', amount: 500, status: 'realized' },
  { direction: 'expense', amount: 175, status: 'realized' },
  { direction: 'income', amount: 900, status: 'pipeline' },
  { direction: 'expense', amount: 20, status: 'pending-action' },
]
