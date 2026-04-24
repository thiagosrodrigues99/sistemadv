import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LandingPage() {
  useEffect(() => {
    // Incrementar contador de visitas no Supabase
    const trackVisit = async () => {
      try {
        await supabase.from('visits').insert([{ page: 'landing_page' }]);
      } catch (err) {
        console.error('Erro ao registrar visita:', err);
      }
    };
    trackVisit();

    // Incrementar contador de visitas local (cache)
    const visits = parseInt(localStorage.getItem('sistemadv_visitas') || '0');
    localStorage.setItem('sistemadv_visitas', (visits + 1).toString());

    // Animação de revelação ao scroll
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Bloquear prompt de instalação do PWA na Landing Page
    const preventInstall = (e: any) => {
      e.preventDefault();
    };
    window.addEventListener('beforeinstallprompt', preventInstall);

    return () => {
      observer.disconnect();
      window.removeEventListener('beforeinstallprompt', preventInstall);
    };
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cpf: '',
    mensagem: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLead = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      cpf: formData.cpf,
      mensagem: formData.mensagem,
      status: 'Sem contato',
      origem: 'Landing Page'
    };

    try {
      // Salvar no Supabase
      const { error } = await supabase.from('leads').insert([newLead]);
      if (error) throw error;

      // Manter no localStorage para compatibilidade imediata (opcional, mas mantendo o que já tinha)
      const existingLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
      const updatedLeads = [{ id: Date.now(), ...newLead, data: new Date().toLocaleDateString('pt-BR') }, ...existingLeads];
      localStorage.setItem('sistemadv_leads', JSON.stringify(updatedLeads));
      
      // Atualizar métrica de formulários
      const stats = JSON.parse(localStorage.getItem('sistemadv_stats') || '{"forms": 0}');
      stats.forms = (stats.forms || 0) + 1;
      localStorage.setItem('sistemadv_stats', JSON.stringify(stats));

      alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
      setFormData({ nome: '', telefone: '', email: '', cpf: '', mensagem: '' });
    } catch (err) {
      console.error('Erro ao salvar lead:', err);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <div id="app">
      <header className="main-header">
        <nav>
          <div className="logo">
            <img src="/novo.png" alt="Logo" className="logo-img" />
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="inicio" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <h1>VAMOS JUNTOS GARANTIR O DIREITO AO SEU BENEFÍCIO</h1>
              <p>Sem custos iniciais, não cobramos nenhum valor de forma antecipada.</p>
            </div>

            <div className="hero-form-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: '700' }}>SOLICITAR ANÁLISE INICIAL</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div>
                  <label htmlFor="nome" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>NOME COMPLETO</label>
                  <input 
                    id="nome"
                    type="text" 
                    placeholder="Seu nome aqui" 
                    className="form-input" 
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="telefone" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>TELEFONE</label>
                  <input 
                    id="telefone"
                    type="tel" 
                    placeholder="(00) 00000-0000" 
                    className="form-input" 
                    required
                    value={formData.telefone}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 11) {
                        val = val.replace(/^(\d{2})(\d)/g, '($1) $2');
                        val = val.replace(/(\d{5})(\d)/, '$1-$2');
                      }
                      setFormData({...formData, telefone: val});
                    }}
                    maxLength={15}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>E-MAIL</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="seu@email.com" 
                    className="form-input" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="cpf" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>CPF</label>
                  <input 
                    id="cpf"
                    type="text" 
                    placeholder="000.000.000-00" 
                    className="form-input" 
                    required
                    value={formData.cpf}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 11) {
                        val = val.replace(/(\d{3})(\d)/, '$1.$2');
                        val = val.replace(/(\d{3})(\d)/, '$1.$2');
                        val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                      }
                      setFormData({...formData, cpf: val});
                    }}
                    maxLength={14}
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>CONTE UM POUCO SOBRE O ACIDENTE</label>
                  <textarea 
                    id="mensagem"
                    placeholder="Descreva brevemente o ocorrido..." 
                    className="form-input" 
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    required
                    value={formData.mensagem}
                    onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  ></textarea>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', margin: '0', lineHeight: '1.2' }}>
                    Você só paga quando o dinheiro estiver na sua conta.
                  </p>
                  <button type="submit" className="btn-main" style={{ width: '100%', padding: '1.2rem', fontWeight: '700', fontSize: '1rem' }}>QUERO SABER QUANTO TENHO PARA RECEBER</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="trust-section reveal">
          <div className="container">
            <div className="trust-wrapper">
              <div className="trust-badge-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div className="trust-content-text">
                <h2>GARANTIMOS SEUS DIREITOS COM ATUAÇÃO TÉCNICA E FOCO EM RESULTADO.</h2>
                <p>Estamos ao seu lado para orientar e conduzir cada etapa com segurança.</p>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED SERVICES SECTION */}
        <section id="servicos" className="section reveal" style={{ background: 'var(--primary)' }}>
          <div className="container">
            <h2 className="section-title" style={{ color: 'white' }}>SOMOS ESPECIALISTAS EM:</h2>
            <div className="cards-grid">
              {/* CARD 1: LOAS */}
              <div className="card service-card">
                <img src="/loas1.png" alt="LOAS (BPC)" className="card-image" style={{ height: 'auto', objectFit: 'cover' }} />
                <h3>LOAS (BPC)</h3>
                <ul className="card-checklist">
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Idoso ou pessoa com deficiência em situação de baixa renda</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Pessoa com deficiência, Não consegue trabalhar ou se sustentar sozinho</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Benefício negado pelo INSS</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Mora com a família e teve o pedido recusado, mesmo com renda na casa, ainda passa dificuldade</span>
                  </li>
                </ul>
                <a href="#inicio" className="btn-card">Consultar meu caso</a>
              </div>

              {/* CARD 2: AUXÍLIO-ACIDENTE */}
              <div className="card service-card">
                <img src="/acidente.jpg" alt="Auxílio-Acidente" className="card-image" />
                <h3>Auxílio-Acidente</h3>
                <ul className="card-checklist">
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Redução da capacidade / Sequela permanente ou parcial</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Recebeu auxílio-doença e ele foi cortado</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>INSS negou o auxílio</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Sofreu acidente e não recebeu nada</span>
                  </li>
                </ul>
                <a href="#inicio" className="btn-card">Consultar meu caso</a>
              </div>

              {/* CARD 3: APOSENTADORIA */}
              <div className="card service-card">
                <img src="/aposentadoria.png" alt="Aposentadoria" className="card-image" />
                <h3>Aposentadoria</h3>
                <ul className="card-checklist">
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Tempo de contribuição</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Aposentadoria especial</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Revisão de benefício</span>
                  </li>
                  <li>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span>Já tem idade, mas não consegue se aposentar</span>
                  </li>
                </ul>
                <a href="#inicio" className="btn-card">Consultar meu caso</a>
              </div>
            </div>
          </div>
        </section>

        {/* AREAS SECTION */}
        <section id="areas" className="section reveal">
          <div className="container">
            <h2 className="section-title">ÁREAS DE ATUAÇÃO:</h2>
            <div className="cards-grid">
              <div className="card">
                <img src="/card trabalhista.jfif" alt="Direito Trabalhista" className="card-image" />
                <h3>Direito Trabalhista</h3>
                <p>Atuação em questões envolvendo relações de trabalho, verbas rescisórias, direitos do trabalhador e conflitos trabalhistas em geral.</p>
              </div>
              <div className="card">
                <img src="/processo civil.jfif" alt="Direito Civil" className="card-image" />
                <h3>Direito Civil</h3>
                <p>Atuação em demandas diversas do dia a dia, com foco em orientação, prevenção e resolução de conflitos.</p>
              </div>
              <div className="card">
                <img src="/direito previdenciario.jpg" alt="Direito Previdenciário" className="card-image" />
                <h3>Direito Previdenciário</h3>
                <p>Atuação em benefícios do INSS, aposentadorias, auxílios e demais demandas relacionadas à seguridade social.</p>
              </div>
            </div>
          </div>
        </section>


        {/* BIO SECTION */}
        <section id="advogado" className="section bio-section reveal">
          <div className="container">
            <div className="bio-grid">
              <div className="bio-header">
                <h2 className="bio-title">Profissional Responsável</h2>
                <h3>Dr. Jaime S.S</h3>
                <span className="bio-oab">OAB/SP 353.322</span>
              </div>
              
              <div className="bio-image-wrapper">
                <img src="/jaime.png" alt="Dr. Jaime S.S" className="bio-photo" />
              </div>

              <div className="bio-content">
                <div className="bio-text">
                  <p className="highlight">Desde 2016 a Atuação do Dr. Jaime de Souza Silva é construída com base em um propósito claro: oferecer orientação jurídica acessível, com atenção real às necessidades de cada cliente.</p>
                  <p>Com experiência nas áreas previdenciária, trabalhista e civil, seu trabalho é voltado para conduzir cada caso com organização, clareza e responsabilidade.</p>
                  <p>Mais do que tratar processos, o atendimento é feito de forma próxima, acompanhando cada etapa com transparência e compromisso, do início ao fim.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="section faq-section reveal" style={{ background: '#f8fafc' }}>
          <div className="container">
            <h2 className="section-title">Perguntas Frequentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Preciso pagar algo para dar entrada no pedido?</h3>
                <p>Não. A análise inicial é feita sem custo, e os honorários são alinhados de forma transparente antes de qualquer avanço.</p>
              </div>
              <div className="faq-item">
                <h3>Quando vou ter custos no processo?</h3>
                <p>Os custos são definidos conforme o caso, sendo cobrados de forma clara e, em muitos casos, apenas ao final do processo, em caso de êxito.</p>
              </div>
              <div className="faq-item">
                <h3>Quais tipos de casos vocês atendem?</h3>
                <p>Atuamos nas áreas previdenciária, trabalhista e civil, atendendo desde benefícios do INSS até demandas do dia a dia que exigem orientação jurídica.</p>
              </div>
              <div className="faq-item">
                <h3>Tenho direito ao benefício ou ação?</h3>
                <p>Cada situação precisa ser analisada individualmente. Por isso, realizamos uma avaliação completa antes de orientar o melhor caminho.</p>
              </div>
              <div className="faq-item">
                <h3>Quanto tempo demora um processo?</h3>
                <p>O tempo pode variar conforme o tipo de caso e o andamento do órgão responsável, mas acompanhamos todas as etapas para dar o máximo de agilidade possível.</p>
              </div>
              <div className="faq-item">
                <h3>Vocês atendem na minha cidade?</h3>
                <p>Sim. O atendimento pode ser feito de forma digital, permitindo acompanhar seu caso de qualquer lugar com praticidade.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer style={{ padding: '4rem 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div className="footer-logo">
            <img src="/novo.png" alt="Logo" style={{ height: '80px', width: 'auto', opacity: 0.9 }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>&copy; 2026 JSS Advocacia. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
