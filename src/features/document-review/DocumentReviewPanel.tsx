import { useState } from 'react'
import { reviewDocument, type ReviewDocumentInput } from '../../domain/documents'

interface DocumentReviewPanelProps {
  scenario: ReviewDocumentInput
}

export function DocumentReviewPanel({ scenario }: DocumentReviewPanelProps) {
  const sourceReference = scenario.fields.reference ?? ''
  const [reference, setReference] = useState(sourceReference.trim())
  const [reviewedFields, setReviewedFields] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const review = reviewDocument({ ...scenario, reviewedFields })

  function applyCorrection() {
    if (reference.trim() === '') {
      setError('Reference cannot be empty. Enter a value to apply a correction.')
      return
    }

    setReviewedFields({ reference })
    setError('')
  }

  return (
    <section className="panel" id="document-review" aria-labelledby="document-review-title">
      <div className="panel-heading">
        <p className="eyebrow">Synthetic scenario</p>
        <h2 id="document-review-title">Document review</h2>
        <p>Normalize a sample document and record a human correction.</p>
      </div>

      <div className="panel-grid">
        <div>
          <h3>Normalized values</h3>
          <dl className="data-list">
            {Object.entries(review.normalizedFields).map(([field, value]) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>{value || 'Not provided'}</dd>
              </div>
            ))}
            <div>
              <dt>Financial direction</dt>
              <dd>{review.financialDirection}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{review.confidence}%</dd>
            </div>
          </dl>

          <h3>Review rationale</h3>
          <ul className="insight-list">
            {review.rationale.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </div>

        <div className="action-card">
          <h3>Human correction</h3>
          <label htmlFor="reference">Reference</label>
          <input
            id="reference"
            name="reference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'reference-error' : undefined}
          />
          {error && <p className="field-error" id="reference-error" role="alert">{error}</p>}
          <button type="button" onClick={applyCorrection}>Apply correction</button>

          <h4>Correction diff</h4>
          {review.changedFields.length === 0 ? (
            <p className="muted">No corrections applied.</p>
          ) : (
            <ul className="diff-list" aria-live="polite">
              {review.changedFields.map((change) => (
                <li key={change.field}>{change.field[0].toUpperCase() + change.field.slice(1)}: {change.original} → {change.reviewed}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
