import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <header className="top-bar">
          <div className="title-group">
            <h1>Configurações do Sistema</h1>
          </div>
          <div className="user-profile">
            <span>Olá, Diogo</span>
            <div className="avatar">D</div>
          </div>
        </header>

        <section className="data-section" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h3>Configurações de Rastreamento</h3>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 500, color: '#334155' }}>Pixel Facebook</label>
                <input 
                  type="text" 
                  placeholder="ID do Pixel (ex: 123456789...)"
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 500, color: '#334155' }}>Pixel TikTok</label>
                <input 
                  type="text" 
                  placeholder="ID do Pixel TikTok..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 500, color: '#334155' }}>Google Analytics (GA4)</label>
                <input 
                  type="text" 
                  placeholder="G-XXXXXX..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 500, color: '#334155' }}>Google Tag Manager</label>
                <input 
                  type="text" 
                  placeholder="GTM-XXXXXX..."
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>
            </div>

            <button 
              type="button"
              className="btn-primary" 
              style={{ width: 'fit-content', padding: '1rem 3rem', alignSelf: 'flex-start' }}
              onClick={() => alert('Configurações salvas com sucesso!')}
            >
              Salvar Configurações
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
