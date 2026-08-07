export type FinancialDirection = 'income' | 'expense' | 'unknown'

export interface ReviewDocumentInput {
  fields: Record<string, string | null | undefined>
  reviewedFields?: Record<string, string | null | undefined>
  taxIdentifier?: string | null
  directionSignals?: readonly Exclude<FinancialDirection, 'unknown'>[]
}

export interface ChangedField {
  field: string
  original: string
  reviewed: string
}

export interface DocumentReviewResult {
  normalizedFields: Record<string, string>
  financialDirection: FinancialDirection
  confidence: number
  rationale: string[]
  changedFields: ChangedField[]
}

const normalizeText = (value: string | null | undefined): string =>
  (value ?? '').trim().replace(/\s+/g, ' ')

export function reviewDocument(input: ReviewDocumentInput): DocumentReviewResult {
  const reviewedFields = input.reviewedFields ?? {}
  const fieldNames = new Set([...Object.keys(input.fields), ...Object.keys(reviewedFields)])
  const normalizedFields: Record<string, string> = {}
  const changedFields: ChangedField[] = []

  for (const field of fieldNames) {
    const original = normalizeText(input.fields[field])
    const reviewed = Object.hasOwn(reviewedFields, field)
      ? normalizeText(reviewedFields[field])
      : original

    normalizedFields[field] = reviewed
    if (original !== reviewed) {
      changedFields.push({ field, original, reviewed })
    }
  }

  const signals = new Set(input.directionSignals ?? [])
  const financialDirection: FinancialDirection = signals.size === 1
    ? [...signals][0]
    : 'unknown'
  const rationale: string[] = []
  let confidence = 100 - Math.min(changedFields.length * 5, 20)

  if (normalizeText(input.taxIdentifier) === '') {
    confidence -= 30
    rationale.push('Tax identifier is missing and requires human review.')
  }

  if (financialDirection === 'unknown') {
    confidence -= 35
    rationale.push('Financial direction is ambiguous and requires human review.')
  } else {
    rationale.push(
      `${financialDirection === 'income' ? 'Income' : 'Expense'} direction is supported by the supplied direction signal.`,
    )
  }

  if (changedFields.length > 0) {
    rationale.push('Reviewed fields differ from the normalized source values.')
  }

  return {
    normalizedFields,
    financialDirection,
    confidence: Math.max(0, confidence),
    rationale,
    changedFields,
  }
}
