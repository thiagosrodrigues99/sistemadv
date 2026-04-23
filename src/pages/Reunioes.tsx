import { useState, useEffect, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function MeetingsContent() {
  const [searchParams] = useSearchParams();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetings, setMeetings] = useState<Record<number, any[]>>({});
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [allLeads, setAllLeads] = useState<any[]>([]);

  useEffect(() => {
    // Carregar leads para busca de ID
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    setAllLeads(savedLeads);

    // Carregar reuniões
    const savedMeetings = JSON.parse(localStorage.getItem(`sistemadv_meetings_${currentMonth}_2026`) || '{}');
    setMeetings(savedMeetings);

    // Abrir modal se houver dia no parâmetro
    const dayParam = searchParams.get('day');
    if (dayParam) {
      setSelectedDay(parseInt(dayParam));
      setIsModalOpen(true);
    }
  }, [currentMonth, searchParams]);

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  // Feriados (Simulado para SP 2026)
  const holidays: Record<number, Record<number, string>> = {
    0: { 1: "Confraternização Universal", 25: "Aniversário de SP" },
    1: { 17: "Carnaval" },
    3: { 3: "Sexta-feira Santa", 21: "Tiradentes" },
    4: { 1: "Dia do Trabalho" },
    5: { 4: "Corpus Christi" },
    6: { 9: "Revolução Constitucionalista" },
    8: { 7: "Independência do Brasil" },
    9: { 12: "Nsa. Sra. Aparecida" },
    10: { 2: "Finados", 15: "Proclamação da República", 20: "Consciência Negra" },
    11: { 25: "Natal" }
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const saveMeeting = (day: number, time: string, title: string) => {
    const updatedMeetings = { ...meetings };
    if (!updatedMeetings[day]) updatedMeetings[day] = [];
    
    // Tenta encontrar o leadId
    const lead = allLeads.find(l => l.nome.toLowerCase().trim() === title.toLowerCase().trim());

    updatedMeetings[day].push({ 
      time, 
      title, 
      type: 'meeting',
      leadId: lead?.id || null 
    });
    
    setMeetings(updatedMeetings);
    localStorage.setItem(`sistemadv_meetings_${currentMonth}_2026`, JSON.stringify(updatedMeetings));
  };

  const getStatusColor = (type: string) => {
    switch(type) {
      case 'meeting': return '#dcfce7';
      case 'call': return '#fef9c3';
      case 'deadline': return '#fee2e2';
      default: return '#f1f5f9';
    }
  };

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

  const shortenName = (name: string) => {
    const cleanName = name.split(' (')[0];
    const parts = cleanName.trim().split(' ');
    if (parts.length <= 1) return cleanName;
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

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

        <section className="calendar-container" style={{ padding: '2rem', background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div className="calendar-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
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

          <div className="calendar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#f1f5f9', border: '1px solid #f1f5f9', borderRadius: '12px', overflow: 'hidden' }}>
            {weekDays.map(day => (
              <div key={day} className="calendar-day-head" style={{ background: '#f8fafc', padding: '1rem', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>{day}</div>
            ))}
            
            {blanks.map(b => (
              <div key={`blank-${b}`} className="calendar-day empty" style={{ background: '#f8fafc', minHeight: '120px' }}></div>
            ))}

            {days.map(day => {
              const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth();
              const dayMeetings = meetings[day] || [];
              return (
                <div 
                  key={day} 
                  className={`calendar-day ${isToday ? 'today' : ''}`}
                  onClick={() => handleDayClick(day)}
                  style={{ 
                    background: holidays[currentMonth]?.[day] ? '#fff1f2' : (isToday ? '#f0f9ff' : 'white'),
                    minHeight: '120px',
                    padding: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  <div className="day-number" style={{ 
                    color: holidays[currentMonth]?.[day] ? '#e11d48' : (isToday ? '#0ea5e9' : '#334155'), 
                    fontWeight: holidays[currentMonth]?.[day] || isToday ? '700' : '500',
                    fontSize: '1rem',
                    marginBottom: '0.5rem'
                  }}>{day}</div>
                  {holidays[currentMonth]?.[day] && (
                    <div style={{ fontSize: '0.6rem', color: '#e11d48', fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>
                      {holidays[currentMonth][day]}
                    </div>
                  )}
                  {dayMeetings.map((m, i) => (
                    <div key={i} className="event-tag" style={{ 
                      background: getStatusColor(m.type), 
                      fontSize: '0.65rem', 
                      padding: '2px 6px', 
                      borderRadius: '4px', 
                      marginBottom: '2px', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      borderLeft: '2px solid rgba(0,0,0,0.1)'
                    }}>
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
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
          }}>
            <div style={{
              background: 'white', padding: '2.5rem', borderRadius: '24px',
              width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              maxHeight: '90vh', overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--primary)' }}>Agenda: {selectedDay} de {months[currentMonth]}</h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#64748b', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>Reuniões do Dia</h3>
                {(meetings[selectedDay || 0] || []).length > 0 ? (
                  meetings[selectedDay || 0].map((m, i) => (
                    <div key={i} style={{ 
                      display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', 
                      background: '#f8fafc', borderRadius: '12px', marginBottom: '0.8rem',
                      borderLeft: `4px solid ${getStatusColor(m.type)}`
                    }}>
                      <span style={{ fontWeight: 600, color: 'var(--primary)', minWidth: '50px' }}>{m.time}</span>
                      <span style={{ color: '#111827', fontWeight: 500, flexGrow: 1 }}>{m.title}</span>
                      {(() => {
                        const id = m.leadId || allLeads.find(l => 
                          l.nome?.toLowerCase().trim() === m.title.toLowerCase().trim()
                        )?.id;

                        if (id) {
                          return (
                            <Link to={`/ficha/${id}`} style={{ 
                              fontSize: '0.75rem', padding: '0.4rem 0.8rem', 
                              background: '#111234', color: 'white', borderRadius: '6px', textDecoration: 'none' 
                            }}>
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
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                  {timeSlots.map(time => {
                    const isBusy = (meetings[selectedDay || 0] || []).some(m => m.time === time);
                    return (
                      <button 
                        key={time} disabled={isBusy}
                        style={{ 
                          padding: '0.8rem', border: '1px solid #e2e8f0', borderRadius: '10px',
                          textAlign: 'center', background: isBusy ? '#f1f5f9' : 'white',
                          color: isBusy ? '#cbd5e1' : 'inherit', fontSize: '0.85rem',
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

              <button onClick={() => setIsModalOpen(false)} className="btn-primary" style={{ width: '100%', marginTop: '2.5rem', padding: '1.2rem', borderRadius: '15px' }}>
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
