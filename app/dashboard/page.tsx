import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo" style={{ marginBottom: '2.5rem', fontSize: '1.4rem' }}>DIOGO<span>.</span></div>
        <ul className="nav-menu" style={{ listStyle: 'none', flexGrow: 1 }}>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/dashboard" className="nav-link active">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link href="/" className="nav-link">Sair</Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1>Dashboard Operacional</h1>
          <div className="user-profile">
            <span>Olá, <strong>Diogo</strong></span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h4>Visitas à Página</h4>
            <p className="value">1,284</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>+12% hoje</p>
          </div>
          <div className="stat-card">
            <h4>Total de Visitas</h4>
            <p className="value">45,692</p>
            <p className="trend" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Acumulado total</p>
          </div>
          <div className="stat-card">
            <h4>Formulários Preenchidos</h4>
            <p className="value">42</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>+5 novos hoje</p>
          </div>
        </section>

        <section className="data-section">
          <div className="section-header">
            <h3>Últimos Formulários</h3>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Exportar CSV</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>NOME DO LEAD</th>
                <th>E-MAIL</th>
                <th>ASSUNTO</th>
                <th>DATA</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carlos Eduardo</td>
                <td>carlos@email.com</td>
                <td>Consultoria de Licitação</td>
                <td>Hoje, 14:20</td>
                <td><span className="status-badge pending">Novo</span></td>
              </tr>
              <tr>
                <td>Ana Beatriz</td>
                <td>ana.b@empresa.com.br</td>
                <td>Dúvida Trabalhista</td>
                <td>Hoje, 10:45</td>
                <td><span className="status-badge active">Lido</span></td>
              </tr>
              <tr>
                <td>Roberto Mendes</td>
                <td>roberto@mendes.adv</td>
                <td>Assessoria Mensal</td>
                <td>Ontem</td>
                <td><span className="status-badge active">Lido</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
