'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Hoje');

  // Dados simulados para cada filtro
  const statsData: Record<string, { visitas: string; forms: string; conversao: string; trendV: string; trendF: string; trendC: string }> = {
    'Hoje': { 
      visitas: '1.284', 
      forms: '42', 
      conversao: '3,2%', 
      trendV: '+12% hoje', 
      trendF: '+5 novos hoje',
      trendC: '+0,5% vs. ontem'
    },
    'Semana': { 
      visitas: '8.432', 
      forms: '215', 
      conversao: '2,5%', 
      trendV: '+8% vs. semana ant.', 
      trendF: '+24 novos na semana',
      trendC: '-0,2% vs. semana ant.'
    },
    'Mês': { 
      visitas: '35.120', 
      forms: '890', 
      conversao: '2,5%', 
      trendV: '+15% vs. mês ant.', 
      trendF: '+112 novos no mês',
      trendC: '+0,1% vs. mês ant.'
    },
    'Personalizado': { 
      visitas: '0', 
      forms: '0', 
      conversao: '0%', 
      trendV: 'Selecione período', 
      trendF: 'Selecione período',
      trendC: 'N/A'
    }
  };

  // Dados simulados para a tabela em cada filtro
  const tableData: Record<string, Array<{ nome: string; email: string; assunto: string; data: string; status: string; statusClass: string }>> = {
    'Hoje': [
      { nome: 'Carlos Eduardo', email: 'carlos@email.com', assunto: 'Consultoria de Licitação', data: 'Hoje, 14:20', status: 'Novo', statusClass: 'pending' },
      { nome: 'Ana Beatriz', email: 'ana.b@empresa.com.br', assunto: 'Dúvida Trabalhista', data: 'Hoje, 10:45', status: 'Lido', statusClass: 'active' }
    ],
    'Semana': [
      { nome: 'Carlos Eduardo', email: 'carlos@email.com', assunto: 'Consultoria de Licitação', data: 'Hoje, 14:20', status: 'Novo', statusClass: 'pending' },
      { nome: 'Ana Beatriz', email: 'ana.b@empresa.com.br', assunto: 'Dúvida Trabalhista', data: 'Hoje, 10:45', status: 'Lido', statusClass: 'active' },
      { nome: 'Roberto Mendes', email: 'roberto@mendes.adv', assunto: 'Assessoria Mensal', data: 'Ontem', status: 'Lido', statusClass: 'active' },
      { nome: 'Mariana Costa', email: 'mari@costa.com', assunto: 'Licitação Previdenciária', data: '14/04/2026', status: 'Lido', statusClass: 'active' }
    ],
    'Mês': [
      { nome: 'Carlos Eduardo', email: 'carlos@email.com', assunto: 'Consultoria de Licitação', data: 'Hoje, 14:20', status: 'Novo', statusClass: 'pending' },
      { nome: 'Ana Beatriz', email: 'ana.b@empresa.com.br', assunto: 'Dúvida Trabalhista', data: 'Hoje, 10:45', status: 'Lido', statusClass: 'active' },
      { nome: 'Roberto Mendes', email: 'roberto@mendes.adv', assunto: 'Assessoria Mensal', data: 'Ontem', status: 'Lido', statusClass: 'active' },
      { nome: 'Mariana Costa', email: 'mari@costa.com', assunto: 'Licitação Previdenciária', data: '14/04/2026', status: 'Lido', statusClass: 'active' },
      { nome: 'João Silva', email: 'joao@silva.com', assunto: 'Contrato Civil', data: '13/04/2026', status: 'Lido', statusClass: 'active' },
      { nome: 'Fernanda Lima', email: 'fer@lima.adv', assunto: 'Divórcio Consensual', data: '10/04/2026', status: 'Lido', statusClass: 'active' }
    ],
    'Personalizado': []
  };

  const currentStats = statsData[activeFilter] || statsData['Hoje'];
  const currentTable = tableData[activeFilter] || [];

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
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/reunioes" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Reuniões
            </Link>
          </li>
          <li className="nav-item" style={{ marginBottom: '0.5rem' }}>
            <Link href="/leads" className="nav-link">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Gestão de Leads
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
            <h1>Dashboard Operacional</h1>
            <div className="filter-group">
              {['Hoje', 'Semana', 'Mês', 'Personalizado'].map((filter) => (
                <button 
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <h4>Visitas na Página</h4>
            <p className="value">{currentStats.visitas}</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>{currentStats.trendV}</p>
          </div>
          <div className="stat-card">
            <h4>Formulários Preenchidos</h4>
            <p className="value">{currentStats.forms}</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>{currentStats.trendF}</p>
          </div>
          <div className="stat-card">
            <h4>Taxa de Conversão</h4>
            <p className="value">{currentStats.conversao}</p>
            <p className="trend" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{currentStats.trendC}</p>
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
              {currentTable.map((row, index) => (
                <tr key={index}>
                  <td>{row.nome}</td>
                  <td>{row.email}</td>
                  <td>{row.assunto}</td>
                  <td>{row.data}</td>
                  <td><span className={`status-badge ${row.statusClass}`}>{row.status}</span></td>
                </tr>
              ))}
              {currentTable.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    Nenhum dado encontrado para o período selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
