'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MeetingsContent() {
  const searchParams = useSearchParams();
  const leadName = searchParams.get('leadName') || '';
  const leadId = searchParams.get('leadId') || '';

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');

  useEffect(() => {
    if (leadName) {
      setNewMeetingTitle(leadName);
    }
  }, [leadName]);
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth(currentMonth, currentYear) }, (_, i) => i);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const [meetings, setMeetings] = useState<Record<number, Array<{ time: string; title: string; type: 'client' | 'court' | 'internal'; leadId?: any }>>>({});
  const [allLeads, setAllLeads] = useState<any[]>([]);

  useEffect(() => {
    const savedMeetings = JSON.parse(localStorage.getItem('sistemadv_reunioes') || '{}');
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    setAllLeads(savedLeads);

    if (Object.keys(savedMeetings).length === 0) {
      const initialMeetings = {
        16: [{ time: '14:00', title: 'Consultoria Cliente X', type: 'client' }],
        18: [{ time: '10:30', title: 'Audiência Tribunal', type: 'court' }],
        20: [{ time: '09:00', title: 'Reunião de Equipe', type: 'internal' }]
      };
      localStorage.setItem('sistemadv_reunioes', JSON.stringify(initialMeetings));
      setMeetings(initialMeetings);
    } else {
      setMeetings(savedMeetings);
    }
  }, []);

  const saveMeeting = (day: number, time: string, title: string) => {
    const updatedMeetings = { ...meetings };
    if (!updatedMeetings[day]) updatedMeetings[day] = [];
    
    // Comparação insensível a maiúsculas/minúsculas para vincular o ID
    const isMainLead = leadName && title.toLowerCase().trim() === leadName.toLowerCase().trim();
    const associatedLeadId = isMainLead ? leadId : null;
    
    updatedMeetings[day].push({ 
      time, 
      title, 
      type: 'client', 
      leadId: associatedLeadId 
    });
    
    localStorage.setItem('sistemadv_reunioes', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
    alert('Reunião agendada com sucesso!');
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const getStatusColor = (type: string) => {
    if (type === 'court') return '#ef4444'; 
    if (type === 'client') return 'var(--primary)'; 
    return '#10b981'; 
  };

  const holidays: Record<number, Record<number, string>> = {
    0: { 1: "Confraternização Universal" },
    1: { 16: "Carnaval", 17: "Carnaval", 18: "Cinzas" },
    3: { 3: "Sexta-feira Santa", 5: "Páscoa", 21: "Tiradentes" },
    4: { 1: "Dia do Trabalho" },
    5: { 4: "Corpus Christi" },
    6: { 9: "Revolução Constitucionalista (SP)" },
    8: { 7: "Independência do Brasil" },
    9: { 12: "Nossa Senhora Aparecida" },
    10: { 2: "Finados", 15: "Proclamação da República", 20: "Dia da Consciência Negra" },
    11: { 25: "Natal" }
  };

  const shortenName = (name: string) => {
    if (!name) return '';
    const cleanName = name.replace('Reunião: ', '');
    const parts = cleanName.split(' ');
    if (parts.length <= 1) return cleanName;
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  };

  return (
    <div className="dashboard-layout">
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
            <Link href="/reunioes" className="nav-link active">
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
            <h1>Agenda de Reuniões</h1>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="calendar-container">
          <div className="calendar-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <select 
                value={currentMonth} 
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                style={{ 
                  padding: '0.6rem 1rem', 
                  borderRadius: '10px', 
                  border: '1px solid #cbd5e1',
                  fontSize: '1.1rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {months.map((m, index) => (
                  <option key={m} value={index}>{m} {currentYear}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Anterior</button>
              <button onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>Próximo</button>
              <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Agendar Reunião</button>
            </div>
          </div>

          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="calendar-day-head">{day}</div>
            ))}
            
            {blanks.map(b => (
              <div key={`blank-${b}`} className="calendar-day empty"></div>
            ))}

            {days.map(day => {
              const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth();
              const dayMeetings = meetings[day] || [];
              return (
                <div 
                  key={day} 
                  className={`calendar-day ${isToday ? 'today' : ''}`}
                  onClick={() => handleDayClick(day)}
                  style={{ background: holidays[currentMonth]?.[day] ? '#fff1f2' : undefined }}
                >
                  <div className="day-number" style={{ color: holidays[currentMonth]?.[day] ? '#e11d48' : undefined, fontWeight: holidays[currentMonth]?.[day] ? '700' : undefined }}>{day}</div>
                  {holidays[currentMonth]?.[day] && (
                    <div style={{ fontSize: '0.6rem', color: '#e11d48', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>
                      {holidays[currentMonth][day]}
                    </div>
                  )}
                  {dayMeetings.map((m, i) => (
                    <div key={i} className="event-tag" style={{ background: getStatusColor(m.type), fontSize: '0.65rem', padding: '2px 4px', borderRadius: '4px', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.time} - {shortenName(m.title)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </section>

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '500px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              animation: 'fadeIn 0.3s ease-out',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>Agenda: {selectedDay} de {months[currentMonth]}</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
                >
                  &times;
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>Reuniões do Dia</h3>
                {(meetings[selectedDay || 0] || []).length > 0 ? (
                  meetings[selectedDay || 0].map((m, i) => (
                    <div key={i} style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      alignItems: 'center', 
                      padding: '1rem', 
                      background: '#f8fafc', 
                      borderRadius: '12px', 
                      marginBottom: '0.8rem',
                      borderLeft: `4px solid ${getStatusColor(m.type)}`
                    }}>
                      <span style={{ fontWeight: 600, color: 'var(--primary)', minWidth: '50px' }}>{m.time}</span>
                      <span style={{ color: '#111827', fontWeight: 500, flexGrow: 1 }}>{m.title}</span>
                      {(() => {
                        // Tenta usar o leadId salvo ou busca pelo nome como fallback
                        const id = m.leadId || allLeads.find(l => 
                          l.nome?.toLowerCase().trim() === m.title.toLowerCase().trim() ||
                          m.title.toLowerCase().includes(l.nome?.toLowerCase().trim())
                        )?.id;

                        if (id) {
                          return (
                            <Link 
                              href={`/ficha/${id}`} 
                              style={{ 
                                fontSize: '0.75rem', 
                                padding: '0.4rem 0.8rem', 
                                background: '#111234', 
                                color: 'white', 
                                borderRadius: '6px', 
                                textDecoration: 'none' 
                              }}
                            >
                              Ver ficha
                            </Link>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic' }}>Nenhuma reunião agendada para este dia.</p>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>Agendar Novo Horário</h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: '#475569' }}>NOME DO LEAD / TÍTULO</label>
                  <input 
                    type="text" 
                    value={newMeetingTitle}
                    onChange={(e) => setNewMeetingTitle(e.target.value)}
                    placeholder="Ex: Thiago de Souza"
                    style={{ 
                      width: '100%', 
                      padding: '0.8rem', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {timeSlots.map(time => {
                    const isBusy = (meetings[selectedDay || 0] || []).some(m => m.time === time);
                    return (
                      <button 
                        key={time}
                        disabled={isBusy}
                        className="filter-btn"
                        style={{ 
                          padding: '0.8rem', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '10px',
                          textAlign: 'center',
                          background: isBusy ? '#f1f5f9' : 'white',
                          color: isBusy ? '#cbd5e1' : 'inherit',
                          fontSize: '0.85rem',
                          cursor: isBusy ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => {
                          if (!newMeetingTitle) return alert('Por favor, digite o nome do lead.');
                          saveMeeting(selectedDay || 0, time, newMeetingTitle);
                          setNewMeetingTitle('');
                          setIsModalOpen(false);
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '2.5rem', padding: '1.2rem', borderRadius: '15px' }}
              >
                Voltar ao Calendário
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MeetingsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Carregando agenda...</div>}>
      <MeetingsContent />
    </Suspense>
  );
}
