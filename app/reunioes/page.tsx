'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MeetingsPage() {
  const [currentMonth, setCurrentMonth] = useState(3); // 3 = Abril (0-indexado)
  const [currentYear] = useState(2026);
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth(currentMonth, currentYear) }, (_, i) => i);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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
                  border: '1px solid var(--glass-border)',
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
              const isToday = day === 16 && currentMonth === 3; // 16 de Abril
              return (
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                  <div className="day-number">{day}</div>
                  {day === 16 && currentMonth === 3 && <div className="event-tag">14:00 - Cliente X</div>}
                  {day === 18 && currentMonth === 3 && <div className="event-tag" style={{ background: '#f59e0b' }}>10:30 - Tribunal</div>}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
