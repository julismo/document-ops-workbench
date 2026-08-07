import { useState } from 'react'
import { calculateQuote, type QuoteInput } from '../../domain/quotes'

interface QuoteBuilderPanelProps {
  scenario: QuoteInput
}

type QuoteFormValues = Record<'quantity' | 'unitRate' | 'distance' | 'distanceRate' | 'duration' | 'durationRate' | 'manualOverride', string>

const numericFields = ['quantity', 'unitRate', 'distance', 'distanceRate', 'duration', 'durationRate'] as const

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

function parseQuote(values: QuoteFormValues): QuoteInput | null {
  const parsed = Object.fromEntries(numericFields.map((field) => [field, Number(values[field])])) as Record<typeof numericFields[number], number>
  if (numericFields.some((field) => values[field].trim() === '' || !Number.isFinite(parsed[field]) || parsed[field] < 0)) {
    return null
  }

  const manualOverride = values.manualOverride.trim() === '' ? undefined : Number(values.manualOverride)
  if (manualOverride !== undefined && (!Number.isFinite(manualOverride) || manualOverride < 0)) {
    return null
  }

  return { ...parsed, manualOverride }
}

export function QuoteBuilderPanel({ scenario }: QuoteBuilderPanelProps) {
  const [values, setValues] = useState(() => toFormValues(scenario))
  const [quoteInput, setQuoteInput] = useState<QuoteInput>(scenario)
  const [error, setError] = useState('')
  const quote = calculateQuote(quoteInput)

  function updateValue(field: keyof QuoteFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  function applyQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextInput = parseQuote(values)
    if (!nextInput) {
      setError('Enter zero or a positive number for every quote value before applying the override.')
      return
    }

    setQuoteInput(nextInput)
    setError('')
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
            <label>Quantity<input type="number" min="0" step="any" value={values.quantity} onChange={(event) => updateValue('quantity', event.target.value)} /></label>
            <label>Unit rate<input type="number" min="0" step="any" value={values.unitRate} onChange={(event) => updateValue('unitRate', event.target.value)} /></label>
            <label>Distance<input type="number" min="0" step="any" value={values.distance} onChange={(event) => updateValue('distance', event.target.value)} /></label>
            <label>Distance rate<input type="number" min="0" step="any" value={values.distanceRate} onChange={(event) => updateValue('distanceRate', event.target.value)} /></label>
            <label>Duration<input type="number" min="0" step="any" value={values.duration} onChange={(event) => updateValue('duration', event.target.value)} /></label>
            <label>Duration rate<input type="number" min="0" step="any" value={values.durationRate} onChange={(event) => updateValue('durationRate', event.target.value)} /></label>
            <label>Manual total<input type="number" min="0" step="any" value={values.manualOverride} onChange={(event) => updateValue('manualOverride', event.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? 'quote-error' : undefined} /></label>
          </div>
          <p className="muted">Leave manual total blank to use the calculated total.</p>
          {error && <p className="field-error" id="quote-error" role="alert">{error}</p>}
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
