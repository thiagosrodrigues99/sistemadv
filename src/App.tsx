import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Reunioes from './pages/Reunioes';
import Relatorios from './pages/Relatorios';
import Settings from './pages/Settings';
import Ficha from './pages/Ficha';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/painel" element={<LoginPage />} />
        
        {/* Rotas Protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
        <Route path="/reunioes" element={<ProtectedRoute><Reunioes /></ProtectedRoute>} />
        <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
        <Route path="/configuracoes" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/ficha/:id" element={<ProtectedRoute><Ficha /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
