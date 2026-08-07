import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the product title and workspace navigation', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Document Ops Workbench' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Document review' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Quote builder' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Finance lens' })).toBeInTheDocument()
  })
})
