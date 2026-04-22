import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    setLeads(savedLeads);
  }, []);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo" style={{ marginBottom: '2.5rem' }}>
          <img src="/novo.png" alt="Logo" style={{ height: '80px', width: 'auto' }} />
        </div>
        <ul className="nav-menu" style={{ listStyle: 'none', flexGrow: 1 }}>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link to="/dashboard" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link to="/reunioes" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Reuniões
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link to="/leads" className="nav-link active">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Gestão de Leads
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link to="/relatorios" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Relatórios
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link to="/configuracoes" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Configurações
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/" className="nav-link">Sair</Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <h1>Gestão de Leads</h1>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="data-section">
          <div className="section-header">
            <h3>Todos os Leads</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Buscar lead..." 
                style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
              />
              <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>+ Novo Lead</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CONTATO</th>
                <th>ORIGEM</th>
                <th>DATA</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{lead.nome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>CPF: {lead.cpf}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{lead.telefone}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{lead.email}</div>
                  </td>
                  <td><span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: '#f1f5f9', borderRadius: '4px' }}>{lead.origem}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{lead.data}</td>
                  <td><span className="status-badge pending">{lead.status}</span></td>
                  <td>
                    <Link to={`/ficha/${lead.id}`} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', textDecoration: 'none' }}>Ver ficha</Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Nenhum lead capturado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
