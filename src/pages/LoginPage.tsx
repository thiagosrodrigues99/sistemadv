import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ajuste para permitir login sem precisar digitar o @
    const email = username.includes('@') ? username : `${username}@adv.com.br`;

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError('Usuário ou senha incorretos.');
      setLoading(false);
    }
  };

  return (
    <div className="login-split">
      <div className="login-visual" style={{
        background: "linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.8)), url('/assets/legal_justice.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>Sistema de <br /><span style={{ color: '#c7d2fe' }}>gestão de processos</span></h1>
      </div>
      <div className="login-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="login-inner" style={{ width: '100%', maxWidth: '400px' }}>
          <div className="login-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <div className="mobile-only-logo" style={{ marginBottom: '2rem', display: 'none' }}>
              <img src="/novo.png" alt="Logo" style={{ height: '80px', width: 'auto' }} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bem-vindo</h2>
            <p style={{ color: 'var(--text-muted)' }}>Por favor, insira seus dados para entrar.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div style={{
                padding: '0.8rem',
                borderRadius: '8px',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                fontSize: '0.85rem',
                marginBottom: '1.5rem'
              }}>
                {error}
              </div>
            )}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Usuário</label>
              <input
                type="text"
                id="username"
                placeholder="Digite seu usuário"
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Entrar na Conta'}
            </button>
          </form>

          <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Voltar para a Landing Page</Link>
        </div>
      </div>
    </div>
  );
}
