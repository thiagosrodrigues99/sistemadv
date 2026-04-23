import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    setLeads(savedLeads);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

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
