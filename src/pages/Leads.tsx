import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function LeadsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
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
    navigate(`/ficha/${lead.id}`);
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

    navigate(`/reunioes?leadName=${encodeURIComponent(lead.nome)}&leadId=${lead.id}`);
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
       lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       lead.cpf?.includes(searchTerm));
    const matchesStatus = activeStatus === 'Todos' || 
                         lead.status === activeStatus || 
                         (activeStatus === 'Sem contato' && lead.status === 'Novo');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-layout">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar isOpen={isSidebarOpen} onItemClick={() => setIsSidebarOpen(false)} />

      {/* Detalhes do Lead (Modal) */}
      {selectedLead && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes do Lead</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">NOME</span>
                  <div className="detail-value">{selectedLead.nome}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CPF</span>
                  <div className="detail-value">{selectedLead.cpf || 'Não informado'}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">E-MAIL</span>
                  <div className="detail-value">{selectedLead.email}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">TELEFONE</span>
                  <div className="detail-value">{selectedLead.telefone}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ORIGEM</span>
                  <div className="detail-value">{selectedLead.origem || 'Landing Page'}</div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">DATA DE CAPTURA</span>
                  <div className="detail-value">{selectedLead.data}</div>
                </div>
              </div>
              
              <div className="detail-section">
                <span className="detail-label">MENSAGEM</span>
                <div className="message-box">
                  {selectedLead.mensagem || 'Nenhuma mensagem enviada.'}
                </div>
              </div>

              <div className="detail-section">
                <span className="detail-label">STATUS ATUAL</span>
                <span className={`status-badge ${selectedLead.status === 'Sem contato' ? 'pending' : ''}`}>
                  {selectedLead.status}
                </span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Fechar</button>
              {(selectedLead.status === 'Sem contato' || selectedLead.status === 'Novo') && (
                <a 
                  href={`https://wa.me/55${selectedLead.telefone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Falar no WhatsApp
                </a>
              )}
              <button className="btn-primary" onClick={() => handleOpenFicha(selectedLead)}>
                Abrir Ficha do Cliente
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <h1>Gestão de Leads</h1>
            </div>
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
                placeholder="Buscar lead por nome, e-mail ou CPF..." 
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
            <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>+ Novo Lead</button>
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
              {filteredLeads.map((lead) => (
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
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleGoBack(lead)} 
                        style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', padding: '2px 5px', fontSize: '0.8rem', color: '#64748b' }}
                        title="Voltar etapa"
                      >
                        ←
                      </button>
                      <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => openModal(lead)}>Ver informações</button>
                      
                      {lead.status === 'Ficha aberta' && (
                        <button 
                          onClick={() => handleAgendarReuniao(lead)} 
                          className="btn-primary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', background: '#111234' }}
                        >
                          Agendar reunião
                        </button>
                      ) || (
                        <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => handleOpenFicha(lead)}>Abrir ficha</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>Nenhum lead encontrado para este filtro.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
