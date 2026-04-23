import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Hoje');
  const [stats, setStats] = useState({ leads: 0, forms: 0, visitas: 0 });
  const [tableData, setTableData] = useState<Record<string, any[]>>({
    'Hoje': [],
    'Semana': [],
    'Mês': [],
    'Personalizado': []
  });

  useEffect(() => {
    // Carregar leads e gerar estatísticas
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    const savedStats = JSON.parse(localStorage.getItem('sistemadv_stats') || '{"forms": 0}');
    const savedVisits = parseInt(localStorage.getItem('sistemadv_visitas') || '0');
    
    setStats({
      leads: savedLeads.length,
      forms: savedStats.forms || 0,
      visitas: savedVisits
    });

    // Mapear leads reais para o formato da tabela
    const realLeads = savedLeads.map((l: any) => ({
      nome: l.nome,
      email: l.email,
      assunto: l.mensagem || 'Interesse em receber',
      data: l.data || 'Hoje',
      status: l.status || 'Novo',
      statusClass: 'pending'
    }));

    setTableData({
      'Hoje': realLeads.slice(0, 5),
      'Semana': realLeads.slice(0, 10),
      'Mês': realLeads,
      'Personalizado': realLeads
    });
  }, []);

  // Dados simulados para cada filtro
  const statsData: Record<string, { visitas: string; forms: string; conversao: string; trendV: string; trendF: string; trendC: string }> = {
    'Hoje': { 
      visitas: stats.visitas.toString(), 
      forms: stats.forms.toString(), 
      conversao: stats.visitas > 0 ? ((stats.forms / stats.visitas) * 100).toFixed(1) + '%' : '0%', 
      trendV: '+12% hoje', 
      trendF: `+${stats.forms} hoje`,
      trendC: '+0,5% vs. ontem'
    },
    'Semana': { 
      visitas: stats.visitas.toString(), 
      forms: stats.forms.toString(), 
      conversao: stats.visitas > 0 ? ((stats.forms / stats.visitas) * 100).toFixed(1) + '%' : '0%', 
      trendV: '+8% vs. sem. ant.', 
      trendF: `+${stats.forms} na semana`,
      trendC: '-0,2% vs. sem. ant.'
    },
    'Mês': { 
      visitas: stats.visitas.toString(), 
      forms: stats.forms.toString(), 
      conversao: stats.visitas > 0 ? ((stats.forms / stats.visitas) * 100).toFixed(1) + '%' : '0%', 
      trendV: '+15% vs. mês ant.', 
      trendF: `+${stats.forms} no mês`,
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

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const currentStats = statsData[activeFilter] || statsData['Hoje'];
  const currentTable = tableData[activeFilter] || [];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <h1>Dashboard Operacional</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
              
              {activeFilter === 'Personalizado' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', animation: 'fadeIn 0.3s ease-in' }}>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                  />
                  <span style={{ color: '#000000' }}>até</span>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem' }}
                  />
                </div>
              )}
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
            <p className="value">{activeFilter === 'Personalizado' && (!startDate || !endDate) ? '---' : currentStats.visitas}</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>{currentStats.trendV}</p>
          </div>
          <div className="stat-card">
            <h4>Formulários Preenchidos</h4>
            <p className="value">{activeFilter === 'Personalizado' && (!startDate || !endDate) ? '---' : currentStats.forms}</p>
            <p className="trend up" style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>{currentStats.trendF}</p>
          </div>
          <div className="stat-card">
            <h4>Taxa de Conversão</h4>
            <p className="value">{activeFilter === 'Personalizado' && (!startDate || !endDate) ? '---' : currentStats.conversao}</p>
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
