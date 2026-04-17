'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LeadsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('Todos');
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    setLeads(savedLeads);
  }, []);

  const openModal = (lead: any) => {
    setSelectedLead(lead);
  };

  const closeModal = () => {
    setSelectedLead(null);
  };

  const handleOpenFicha = (lead: any) => {
    // Se o status for "Sem contato" ou "Novo", move para "Abrir ficha"
    if (lead.status === 'Sem contato' || lead.status === 'Novo') {
      const updatedLeads = leads.map(l => {
        if (l.id === lead.id) {
          return { ...l, status: 'Abrir ficha' };
        }
        return l;
      });
      localStorage.setItem('sistemadv_leads', JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    }
    router.push(`/ficha/${lead.id}`);
  };

  const handleAgendarReuniao = (lead: any) => {
    const updatedLeads = leads.map(l => {
      if (l.id === lead.id) {
        return { ...l, status: 'Reunião com jurídico' };
      }
      return l;
    });
    localStorage.setItem('sistemadv_leads', JSON.stringify(updatedLeads));
    setLeads(updatedLeads);

    // Salvar também no calendário (sistemadv_reunioes)
    const savedMeetings = JSON.parse(localStorage.getItem('sistemadv_reunioes') || '{}');
    const today = new Date().getDate();
    if (!savedMeetings[today]) savedMeetings[today] = [];
    savedMeetings[today].push({ 
      time: 'Pendente', 
      title: `Reunião: ${lead.nome}`, 
      type: 'client',
      leadId: lead.id
    });
    localStorage.setItem('sistemadv_reunioes', JSON.stringify(savedMeetings));

    router.push(`/reunioes?leadName=${encodeURIComponent(lead.nome)}&leadId=${lead.id}`);
  };

  const handleGoBack = (lead: any) => {
    const statusSequence = ['Sem contato', 'Abrir ficha', 'Ficha aberta', 'Reunião com jurídico', 'Pericia agendada', 'Aguardando resultado'];
    const currentIndex = statusSequence.indexOf(lead.status);
    
    if (currentIndex > 0) {
      const prevStatus = statusSequence[currentIndex - 1];
      const updatedLeads = leads.map(l => {
        if (l.id === lead.id) {
          return { ...l, status: prevStatus };
        }
        return l;
      });
      localStorage.setItem('sistemadv_leads', JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    }
  };

  const statusOptions = ['Todos', 'Sem contato', 'Abrir ficha', 'Ficha aberta', 'Reunião com jurídico', 'Pericia agendada', 'Aguardando resultado'];

  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch = 
      (lead.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       lead.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = activeStatus === 'Todos' || 
                         lead.status === activeStatus || 
                         (activeStatus === 'Sem contato' && lead.status === 'Novo');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-layout">
      {/* Detalhes do Lead (Modal) */}
      {selectedLead && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes do Lead</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <span className="detail-label">NOME COMPLETO</span>
                <p className="detail-value">{selectedLead.nome}</p>
              </div>
              <div className="detail-grid">
                <div className="detail-section">
                  <span className="detail-label">CPF</span>
                  <p className="detail-value">{selectedLead.cpf}</p>
                </div>
                <div className="detail-section">
                  <span className="detail-label">DATA</span>
                  <p className="detail-value">{selectedLead.data}</p>
                </div>
              </div>
              <div className="detail-grid">
                <div className="detail-section">
                  <span className="detail-label">E-MAIL</span>
                  <p className="detail-value">{selectedLead.email}</p>
                </div>
                <div className="detail-section">
                  <span className="detail-label">TELEFONE</span>
                  <p className="detail-value">{selectedLead.telefone}</p>
                </div>
              </div>
              <div className="detail-section">
                <span className="detail-label">SOBRE O ACIDENTE</span>
                <p className="detail-value message-box">{selectedLead.mensagem}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Fechar</button>
              <button onClick={() => handleOpenFicha(selectedLead)} className="btn-ficha">
                Abrir ficha
              </button>
              <a 
                href={`https://wa.me/55${selectedLead.telefone.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                Abrir no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div className="logo" style={{ marginBottom: '2.5rem' }}>
          <img src="/novo.png" alt="Logo" style={{ height: '80px', width: 'auto' }} />
        </div>
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
                <th>TELEFONE</th>
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
                  <td>{lead.telefone}</td>
                  <td>{lead.data}</td>
                  <td>
                    <span className="status-badge" style={{ 
                      background: lead.status === 'Sem contato' ? '#fef2f2' : 
                                  lead.status === 'Abrir ficha' ? '#f0fdf4' : 
                                  lead.status === 'Ficha aberta' ? '#fffbeb' : 
                                  lead.status === 'Reunião com jurídico' ? '#f5f3ff' : 
                                  lead.status === 'Pericia agendada' ? '#e0f2fe' : 
                                  lead.status === 'Aguardando resultado' ? '#ecfdf5' : 
                                  '#f8fafc',
                      color: lead.status === 'Sem contato' ? '#ef4444' : 
                             lead.status === 'Abrir ficha' ? '#16a34a' : 
                             lead.status === 'Ficha aberta' ? '#f59e0b' : 
                             lead.status === 'Reunião com jurídico' ? '#8b5cf6' : 
                             lead.status === 'Pericia agendada' ? '#0ea5e9' : 
                             lead.status === 'Aguardando resultado' ? '#10b981' : 
                             '#64748b'
                    }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleGoBack(lead)} 
                      style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', padding: '2px 5px', fontSize: '0.8rem', color: '#64748b' }}
                      title="Voltar etapa"
                    >
                      ←
                    </button>
                    <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => openModal(lead)}>Ver informações</button>
                    {(lead.status === 'Sem contato' || lead.status === 'Novo') && (
                      <a 
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', textDecoration: 'none' }}
                      >
                        WhatsApp
                      </a>
                    )}
                    {lead.status === 'Ficha aberta' && (
                      <button 
                        onClick={() => handleAgendarReuniao(lead)} 
                        className="btn-primary" 
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: '#111234' }}
                      >
                        Agendar reunião
                      </button>
                    )}
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
