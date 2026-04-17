'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('Todos');

  const statusOptions = ['Todos', 'Sem contato', 'Reunião agendada', 'Aguardando documentação', 'Pericia marcada', 'Em processo'];

  const leads = [
    { id: 1, nome: 'Carlos Eduardo', email: 'carlos@email.com', assunto: 'Consultoria de Licitação', data: '16/04/2026', status: 'Sem contato' },
    { id: 2, nome: 'Ana Beatriz', email: 'ana.b@empresa.com.br', assunto: 'Dúvida Trabalhista', data: '16/04/2026', status: 'Reunião agendada' },
    { id: 3, nome: 'Roberto Mendes', email: 'roberto@mendes.adv', assunto: 'Assessoria Mensal', data: '15/04/2026', status: 'Em processo' },
    { id: 4, nome: 'Mariana Costa', email: 'mari@costa.com', assunto: 'Licitação Previdenciária', data: '14/04/2026', status: 'Pericia marcada' },
    { id: 5, nome: 'João Silva', email: 'joao@silva.com', assunto: 'Contrato Civil', data: '13/04/2026', status: 'Aguardando documentação' },
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeStatus === 'Todos' || lead.status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo" style={{ marginBottom: '2.5rem', fontSize: '1.4rem' }}>DIOGO<span>.</span></div>
        <ul className="nav-menu" style={{ listStyle: 'none', flexGrow: 1 }}>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/dashboard" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/reunioes" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Reuniões
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/leads" className="nav-link active">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Gestão de Leads
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/relatorios" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Relatórios
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/configuracoes" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Configurações
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link href="/" className="nav-link">Sair</Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <h1>Gestão de Leads</h1>
            <div className="filter-group" style={{ marginTop: '1rem' }}>
              {statusOptions.map((status) => (
                <button 
                  key={status}
                  className={`filter-btn ${activeStatus === status ? 'active' : ''}`}
                  onClick={() => setActiveStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="data-section">
          <div className="section-header">
            <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
              <input 
                type="text" 
                placeholder="Buscar lead por nome ou e-mail..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '0.6rem 1rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <table style={{ marginTop: '1.5rem' }}>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>ASSUNTO</th>
                <th>DATA</th>
                <th>STATUS</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.nome}</td>
                  <td>{lead.email}</td>
                  <td>{lead.assunto}</td>
                  <td>{lead.data}</td>
                  <td>
                    <span className="status-badge" style={{ 
                      background: lead.status === 'Sem contato' ? '#fffbeb' : 
                                  lead.status === 'Reunião agendada' ? '#ecfdf5' : 
                                  lead.status === 'Aguardando documentação' ? '#fef2f2' : 
                                  lead.status === 'Pericia marcada' ? '#e0f2fe' : 
                                  '#f5f3ff',
                      color: lead.status === 'Sem contato' ? '#f59e0b' : 
                             lead.status === 'Reunião agendada' ? '#10b981' : 
                             lead.status === 'Aguardando documentação' ? '#ef4444' : 
                             lead.status === 'Pericia marcada' ? '#0ea5e9' : 
                             '#8b5cf6'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>Ver informações</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Nenhum lead encontrado para este filtro.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
