'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        router.push('/dashboard');
      } else {
        alert('Usuário ou senha incorretos! (Tente admin/admin)');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="login-split">
      <div className="login-visual" style={{ 
        background: "linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(124, 58, 237, 0.8)), url('/assets/legal_justice.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="logo" style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'white' }}>DIOGO<span>.</span></div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'white' }}>A sua gestão <br /><span style={{ color: '#c7d2fe' }}>simplificada</span>.</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, color: 'white' }}>Entre na plataforma para gerenciar seus processos e clientes com máxima eficiência.</p>
      </div>
      <div className="login-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="login-inner" style={{ width: '100%', maxWidth: '400px' }}>
          <div className="login-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bem-vindo</h2>
            <p style={{ color: 'var(--text-muted)' }}>Por favor, insira seus dados para entrar.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Usuário</label>
              <input 
                type="text" 
                id="username" 
                placeholder="nome_usuario" 
                required 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Senha</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-login" 
              style={{ marginTop: '2rem', height: '55px', fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Entrar na Conta'}
            </button>
          </form>

          <a href="/" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'none' }}>← Voltar para a Landing Page</a>
        </div>
      </div>
    </div>
  );
}
