const workspaceLinks = ['Document review', 'Quote builder', 'Finance lens']

export function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Local portfolio workspace</p>
        <h1>Document Ops Workbench</h1>
        <p className="local-notice">Runs locally in your browser. Your work is not uploaded or stored.</p>
      </header>

      <nav aria-label="Workspace areas">
        <ul className="workspace-links">
          {workspaceLinks.map((label) => (
            <li key={label}>
              <a href={`#${label.toLowerCase().replace(' ', '-')}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <p>Select a workspace area to explore the prototype.</p>
      </main>
    </div>
  )
}
