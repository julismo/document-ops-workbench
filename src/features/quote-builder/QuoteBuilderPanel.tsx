import { useState } from 'react'
import { calculateQuote, type QuoteInput } from '../../domain/quotes'

interface QuoteBuilderPanelProps {
  scenario: QuoteInput
}

type QuoteFormValues = Record<'quantity' | 'unitRate' | 'distance' | 'distanceRate' | 'duration' | 'durationRate' | 'manualOverride', string>
type QuoteField = keyof QuoteFormValues
type QuoteErrors = Partial<Record<QuoteField, string>>

const numericFields = ['quantity', 'unitRate', 'distance', 'distanceRate', 'duration', 'durationRate'] as const
const fieldLabels: Record<QuoteField, string> = {
  quantity: 'Quantity',
  unitRate: 'Unit rate',
  distance: 'Distance',
  distanceRate: 'Distance rate',
  duration: 'Duration',
  durationRate: 'Duration rate',
  manualOverride: 'Manual total',
}

function toFormValues(scenario: QuoteInput): QuoteFormValues {
  return {
    quantity: String(scenario.quantity),
    unitRate: String(scenario.unitRate),
    distance: String(scenario.distance ?? 0),
    distanceRate: String(scenario.distanceRate ?? 0),
    duration: String(scenario.duration ?? 0),
    durationRate: String(scenario.durationRate ?? 0),
    manualOverride: '',
  }
}

function parseQuote(values: QuoteFormValues): { errors: QuoteErrors, input: QuoteInput | null } {
  const parsed = Object.fromEntries(numericFields.map((field) => [field, Number(values[field])])) as Record<typeof numericFields[number], number>
  const errors: QuoteErrors = {}

  for (const field of numericFields) {
    if (values[field].trim() === '' || !Number.isFinite(parsed[field]) || parsed[field] < 0) {
      errors[field] = `Enter zero or a positive number for ${fieldLabels[field]}.`
    }
  }

  const manualOverride = values.manualOverride.trim() === '' ? undefined : Number(values.manualOverride)
  if (manualOverride !== undefined && (!Number.isFinite(manualOverride) || manualOverride < 0)) {
    errors.manualOverride = `Enter zero or a positive number for ${fieldLabels.manualOverride}.`
  }

  return {
    errors,
    input: Object.keys(errors).length === 0 ? { ...parsed, manualOverride } : null,
  }
}

export function QuoteBuilderPanel({ scenario }: QuoteBuilderPanelProps) {
  const [values, setValues] = useState(() => toFormValues(scenario))
  const [quoteInput, setQuoteInput] = useState<QuoteInput>(scenario)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const quote = calculateQuote(quoteInput)

  function updateValue(field: keyof QuoteFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function applyQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = parseQuote(values)
    if (!result.input) {
      setErrors(result.errors)
      return
    }

    setQuoteInput(result.input)
    setErrors({})
  }

  return (
    <section className="panel" id="quote-builder" aria-labelledby="quote-builder-title">
      <div className="panel-heading">
        <p className="eyebrow">Synthetic scenario</p>
        <h2 id="quote-builder-title">Quote builder</h2>
        <p>Explore transparent rate calculations without sending data anywhere.</p>
      </div>

      <div className="panel-grid">
        <form className="quote-form" onSubmit={applyQuote} noValidate>
          <div className="field-grid">
            <div><label>Quantity<input type="number" min="0" step="any" value={values.quantity} onChange={(event) => updateValue('quantity', event.target.value)} aria-invalid={errors.quantity ? true : undefined} aria-describedby={errors.quantity ? 'quantity-error' : undefined} /></label>{errors.quantity && <span className="field-error" id="quantity-error" role="alert">{errors.quantity}</span>}</div>
            <div><label>Unit rate<input type="number" min="0" step="any" value={values.unitRate} onChange={(event) => updateValue('unitRate', event.target.value)} aria-invalid={errors.unitRate ? true : undefined} aria-describedby={errors.unitRate ? 'unit-rate-error' : undefined} /></label>{errors.unitRate && <span className="field-error" id="unit-rate-error" role="alert">{errors.unitRate}</span>}</div>
            <div><label>Distance<input type="number" min="0" step="any" value={values.distance} onChange={(event) => updateValue('distance', event.target.value)} aria-invalid={errors.distance ? true : undefined} aria-describedby={errors.distance ? 'distance-error' : undefined} /></label>{errors.distance && <span className="field-error" id="distance-error" role="alert">{errors.distance}</span>}</div>
            <div><label>Distance rate<input type="number" min="0" step="any" value={values.distanceRate} onChange={(event) => updateValue('distanceRate', event.target.value)} aria-invalid={errors.distanceRate ? true : undefined} aria-describedby={errors.distanceRate ? 'distance-rate-error' : undefined} /></label>{errors.distanceRate && <span className="field-error" id="distance-rate-error" role="alert">{errors.distanceRate}</span>}</div>
            <div><label>Duration<input type="number" min="0" step="any" value={values.duration} onChange={(event) => updateValue('duration', event.target.value)} aria-invalid={errors.duration ? true : undefined} aria-describedby={errors.duration ? 'duration-error' : undefined} /></label>{errors.duration && <span className="field-error" id="duration-error" role="alert">{errors.duration}</span>}</div>
            <div><label>Duration rate<input type="number" min="0" step="any" value={values.durationRate} onChange={(event) => updateValue('durationRate', event.target.value)} aria-invalid={errors.durationRate ? true : undefined} aria-describedby={errors.durationRate ? 'duration-rate-error' : undefined} /></label>{errors.durationRate && <span className="field-error" id="duration-rate-error" role="alert">{errors.durationRate}</span>}</div>
            <div><label>Manual total<input type="number" min="0" step="any" value={values.manualOverride} onChange={(event) => updateValue('manualOverride', event.target.value)} aria-invalid={errors.manualOverride ? true : undefined} aria-describedby={errors.manualOverride ? 'manual-total-error' : undefined} /></label>{errors.manualOverride && <span className="field-error" id="manual-total-error" role="alert">{errors.manualOverride}</span>}</div>
          </div>
          <p className="muted">Leave manual total blank to use the calculated total.</p>
          <button type="submit">Apply override</button>
        </form>

        <div className="action-card" aria-live="polite">
          <h3>Calculation</h3>
          <ul className="line-items">
            {quote.lineItems.map((item) => <li key={item.label}>{item.label}: {item.quantity} × {item.rate} = {item.total.toFixed(2)}</li>)}
          </ul>
          <p>Calculated total: {quote.calculatedTotal.toFixed(2)}</p>
          <p>Final total: {quote.finalTotal.amount.toFixed(2)} {quote.finalTotal.source === 'manual-override' ? '(manual override)' : '(calculated)'}</p>
        </div>
      </div>
    </section>
  )
}
