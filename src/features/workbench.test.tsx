import { fireEvent, render, screen } from '@testing-library/react'
import { App } from '../app/App'

describe('operations workbench interactions', () => {
  it('updates the document correction diff after a reviewer corrects a field', () => {
    render(<App />)

    const referenceInput = screen.getByRole('textbox', { name: 'Reference' })
    fireEvent.change(referenceInput, { target: { value: 'Q-105' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply correction' }))

    expect(screen.getByText('Reference: Q-104 → Q-105')).toBeInTheDocument()
  })

  it('retains the calculated quote total when a manual override is applied', () => {
    render(<App />)

    fireEvent.change(screen.getByRole('spinbutton', { name: 'Manual total' }), {
      target: { value: '240' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Apply override' }))

    expect(screen.getByText('Calculated total: 270.00')).toBeInTheDocument()
    expect(screen.getByText('Final total: 240.00 (manual override)')).toBeInTheDocument()
  })

  it('identifies an invalid quantity without marking manual total and clears the error after recovery', () => {
    render(<App />)

    const quantity = screen.getByRole('spinbutton', { name: 'Quantity' })
    const manualTotal = screen.getByRole('spinbutton', { name: 'Manual total' })
    fireEvent.change(quantity, { target: { value: '-1' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply override' }))

    expect(quantity).toHaveAttribute('aria-invalid', 'true')
    expect(quantity).toHaveAccessibleDescription('Enter zero or a positive number for Quantity.')
    expect(manualTotal).not.toHaveAttribute('aria-invalid')

    fireEvent.change(quantity, { target: { value: '2' } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply override' }))

    expect(quantity).not.toHaveAttribute('aria-invalid')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps pipeline amounts outside the realized balance', () => {
    render(<App />)

    expect(screen.getByText('Realized balance: 325.00')).toBeInTheDocument()
    expect(screen.getByText('Pipeline amount: 900.00')).toBeInTheDocument()
    expect(screen.getByText('Pipeline amounts are excluded from realized balance.')).toBeInTheDocument()
  })
})
