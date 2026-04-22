import { useParams, Link } from 'react-router-dom';

export default function FichaPage() {
  const { id } = useParams();

  return (
    <div className="dashboard-layout">
      <main className="main-content" style={{ padding: '2rem' }}>
        <Link to="/leads" style={{ color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', display: 'block' }}>← Voltar para Leads</Link>
        <div className="data-section">
          <h2>Ficha do Lead #{id}</h2>
          <p>Detalhes do cliente e do caso jurídico.</p>
          <div style={{ padding: '3rem', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', marginTop: '2rem' }}>
            Página de dossiê jurídico em migração.
          </div>
        </div>
      </main>
    </div>
  );
}
