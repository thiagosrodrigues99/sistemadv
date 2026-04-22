import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

// Placeholders para outras rotas
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: '2rem' }}>
    <h1>{title}</h1>
    <p>Página em construção para a nova versão Vite.</p>
    <a href="/dashboard">Voltar para Dashboard</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/painel" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Outras rotas */}
        <Route path="/reunioes" element={<Placeholder title="Reuniões" />} />
        <Route path="/leads" element={<Placeholder title="Gestão de Leads" />} />
        <Route path="/relatorios" element={<Placeholder title="Relatórios" />} />
        <Route path="/configuracoes" element={<Placeholder title="Configurações" />} />
      </Routes>
    </Router>
  );
}

export default App;
