import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function RelatoriosPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <h1>Relatórios Detalhados</h1>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="data-section">
          <div style={{ padding: '5rem', textAlign: 'center', color: '#94a3b8' }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '48px', height: '48px', margin: '0 auto 1.5rem', opacity: 0.5 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <p style={{ fontSize: '1.1rem' }}>Página de Relatórios em desenvolvimento.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
