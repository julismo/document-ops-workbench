export interface QuoteInput {
  quantity: number
  unitRate: number
  distance?: number
  distanceRate?: number
  duration?: number
  durationRate?: number
  manualOverride?: number
}

export interface QuoteLineItem {
  label: 'Quantity' | 'Distance' | 'Duration'
  quantity: number
  rate: number
  total: number
}

export interface QuoteTotal {
  amount: number
  source: 'calculated' | 'manual-override'
}

export interface QuoteCalculation {
  lineItems: QuoteLineItem[]
  calculatedTotal: number
  manualOverride?: number
  finalTotal: QuoteTotal
}

export function calculateQuote(input: QuoteInput): QuoteCalculation {
  const lineItems: QuoteLineItem[] = [
    { label: 'Quantity', quantity: input.quantity, rate: input.unitRate, total: input.quantity * input.unitRate },
  ]

  if (input.distance !== undefined && input.distanceRate !== undefined) {
    lineItems.push({
      label: 'Distance',
      quantity: input.distance,
      rate: input.distanceRate,
      total: input.distance * input.distanceRate,
    })
  }

  if (input.duration !== undefined && input.durationRate !== undefined) {
    lineItems.push({
      label: 'Duration',
      quantity: input.duration,
      rate: input.durationRate,
      total: input.duration * input.durationRate,
    })
  }

  const calculatedTotal = lineItems.reduce((total, item) => total + item.total, 0)

  if (input.manualOverride !== undefined) {
    return {
      lineItems,
      calculatedTotal,
      manualOverride: input.manualOverride,
      finalTotal: { amount: input.manualOverride, source: 'manual-override' },
    }
  }

  return {
    lineItems,
    calculatedTotal,
    finalTotal: { amount: calculatedTotal, source: 'calculated' },
  }
}
