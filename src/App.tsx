import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Reunioes from './pages/Reunioes';
import Relatorios from './pages/Relatorios';
import Settings from './pages/Settings';
import Ficha from './pages/Ficha';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/painel" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/reunioes" element={<Reunioes />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Settings />} />
        <Route path="/ficha/:id" element={<Ficha />} />
      </Routes>
    </Router>
  );
}

export default App;
