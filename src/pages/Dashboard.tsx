import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { supabase } from '../lib/supabase';

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
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
    const loadData = () => {
      const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
      const savedStats = JSON.parse(localStorage.getItem('sistemadv_stats') || '{"forms": 0}');
      const savedVisits = parseInt(localStorage.getItem('sistemadv_visitas') || '0');
      
      setStats({
        leads: savedLeads.length,
        forms: savedStats.forms || 0,
        visitas: savedVisits
      });

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
    };

    loadData();

    // Inscrição em tempo real para novos leads
    const subscription = supabase
      .channel('leads-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, (payload) => {
        console.log('NOVO LEAD RECEBIDO EM TEMPO REAL:', payload);
        
        // Disparar notificação visual
        if (Notification.permission === 'granted') {
          try {
            new Notification("🚨 Novo Lead Recebido!", {
              body: `Nome: ${payload.new.nome}\nTelefone: ${payload.new.telefone}`,
              icon: "/logo.png",
              tag: 'new-lead'
            });
          } catch (e) {
            console.error('Erro ao disparar notificação:', e);
          }
        } else {
          console.warn('Permissão de notificação não concedida.');
        }

        // Tocar som de alerta
        try {
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
          audio.volume = 0.5;
          audio.play().catch(e => console.warn('Navegador bloqueou o som automático:', e));
        } catch (e) {
          console.error('Erro ao tocar áudio:', e);
        }

        // Atualizar localStorage para manter sincronia
        const existingLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
        const updatedLeads = [{ 
          ...payload.new, 
          id: Date.now(), 
          data: new Date().toLocaleDateString('pt-BR') 
        }, ...existingLeads];
        localStorage.setItem('sistemadv_leads', JSON.stringify(updatedLeads));
        
        const stats = JSON.parse(localStorage.getItem('sistemadv_stats') || '{"forms": 0}');
        stats.forms = (stats.forms || 0) + 1;
        localStorage.setItem('sistemadv_stats', JSON.stringify(stats));

        // Recarregar dados na tela
        loadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
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

  const handleRequestPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
      new Notification("Notificações Ativadas!", {
        body: "Você receberá alertas do sistema aqui.",
        icon: "/logo.png"
      });
    }
  };

  const currentStats = statsData[activeFilter] || statsData['Hoje'];
  const currentTable = tableData[activeFilter] || [];

  return (
    <div className="dashboard-layout dashboard-page">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar isOpen={isSidebarOpen} onItemClick={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <h1>Dashboard Operacional</h1>
            </div>
            {notificationPermission !== 'granted' && (
              <button 
                onClick={handleRequestPermission}
                className="mobile-only-btn"
                style={{ 
                  background: '#2563eb', 
                  color: 'white', 
                  border: 'none', 
                  padding: '0.4rem 0.8rem', 
                  borderRadius: '8px', 
                  fontSize: '0.75rem', 
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginLeft: 'auto'
                }}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                Ativar Notificação
              </button>
            )}
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
