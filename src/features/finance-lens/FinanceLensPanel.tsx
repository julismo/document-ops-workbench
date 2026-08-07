import { summarizeFinance, type FinanceEntry } from '../../domain/finance'

interface FinanceLensPanelProps {
  entries: readonly FinanceEntry[]
}

export function FinanceLensPanel({ entries }: FinanceLensPanelProps) {
  const summary = summarizeFinance(entries)

  return (
    <section className="panel" id="finance-lens" aria-labelledby="finance-lens-title">
      <div className="panel-heading">
        <p className="eyebrow">Synthetic scenario</p>
        <h2 id="finance-lens-title">Finance lens</h2>
        <p>Separate realized cash flow from future pipeline and actions that need attention.</p>
      </div>

      <div className="metrics-grid">
        <article><h3>Realized income</h3><p>{summary.realizedIncome.toFixed(2)}</p></article>
        <article><h3>Realized expense</h3><p>{summary.realizedExpense.toFixed(2)}</p></article>
        <article><h3>Realized balance</h3><p>Realized balance: {summary.realizedBalance.toFixed(2)}</p></article>
        <article><h3>Pipeline amount</h3><p>Pipeline amount: {summary.pipelineAmount.toFixed(2)}</p></article>
        <article><h3>Pending actions</h3><p>{summary.pendingActionCount}</p></article>
      </div>

      <div className="insight-card">
        <h3>Insights</h3>
        <ul className="insight-list">
          {summary.trendInsights.map((insight) => <li key={insight}>{insight}</li>)}
        </ul>
      </div>
    </section>
  )
}
