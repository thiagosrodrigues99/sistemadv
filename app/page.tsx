import Link from 'next/link';

export default function LandingPage() {
  return (
    <div id="app">
      <header>
        <nav>
          <div className="logo">DIOGO<span>.</span></div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="inicio" className="hero">
          <div className="hero-content">
            <span className="badge">Licitações na Prática</span>
            <h1>Assessoria jurídica com <br /><span className="gradient-text">visão estratégica</span>.</h1>
            <p>Atuação técnica aliada à lógica de negócio para transformar seus resultados jurídicos e empresariais.</p>
            <div className="hero-actions">
              <a href="#contato" className="btn-main">Falar com Especialista</a>
              <a href="#areas" className="btn-secondary">Nossas Áreas</a>
            </div>
          </div>
        </section>

        {/* AREAS SECTION */}
        <section id="areas" className="section">
          <div className="container">
            <h2 className="section-title">Nossas Especialidades</h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 7V6a6 6 0 0112 0v1M3 7h18l-1 13H4L3 7z" /></svg>
                </div>
                <h3>Trabalhista</h3>
                <p>Defesa preventiva e contenciosa focada em mitigar riscos empresariais.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3>Previdenciário</h3>
                <p>Análise técnica para garantir os melhores benefícios e direitos acumulados.</p>
              </div>
              <div className="card">
                <div className="card-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3>Civil</h3>
                <p>Soluções contratuais e responsabilidade civil com foco em proteção patrimonial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT IMAGE SECTION */}
        <section className="section-image">
          <div className="container">
            <div className="image-wrapper animate-float">
              <img src="/assets/legal_justice.png" alt="Justiça Premium" id="main-asset" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* LAWYERS SECTION */}
        <section id="quem" className="section">
          <div className="container">
            <h2 className="section-title">Nossa Liderança</h2>
            <div className="advogados-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="adv-card">
                <h3>Diogo</h3>
                <p className="adv-bio">Atuação estratégica voltada a empresas, com foco em licitações e estruturação jurídica sob medida.</p>
                <span className="oab">OAB/SP XXXXX</span>
              </div>
              <div className="adv-card">
                <h3>Parceiro Estratégico</h3>
                <p className="adv-bio">Atuação técnica qualificada nas áreas trabalhista, civil e previdenciária com foco em resultados.</p>
                <span className="oab">OAB/SP XXXXX</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contato" className="cta-section">
          <div className="cta-box">
            <h2>Pronto para elevar seu jurídico?</h2>
            <p>Agende uma conversa direta pelo WhatsApp.</p>
            <a href="https://wa.me/seunumeroaqui" className="btn-main large">Falar agora no WhatsApp</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="footer-logo">DIOGO<span>.</span></div>
            <p>&copy; 2026 Diogo | Licitações na Prática. <Link href="/painel" style={{ color: 'inherit', opacity: 0.5, textDecoration: 'none', marginLeft: '10px' }}>Admin Login</Link></p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/seunumeroaqui" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: '35px', height: '35px' }}><path d="M12.031 6.172c-2.203 0-4.007 1.796-4.007 3.991 0 .44.077.864.218 1.259l-.242.883.905-.238c.381.127.787.195 1.206.195 2.203 0 4.006-1.796 4.006-3.991 0-2.195-1.803-3.991-4.006-3.991zm2.38 5.437l-.544-.271c-.131-.065-.24-.09-.34-.09-.16 0-.3.07-.4.18l-.205.24c-.055.065-.13.095-.21.095-.04 0-.085-.01-.125-.03-.13-.06-.55-.225-1.045-.665-.385-.34-.645-.76-.72-.89-.045-.075-.035-.115.01-.16l.165-.19c.045-.05.06-.09.06-.15 0-.06-.03-.12-.06-.18l-.27-.645c-.06-.15-.12-.185-.225-.185h-.18c-.1 0-.27.04-.41.19-.135.15-.525.51-.525 1.245 0 .735.535 1.44 1.155 2.2 1.415 1.735 2.955 2.115 3.515 2.115.425 0 .81-.19 1.05-.51l.24-.315c.08-.105.11-.18.11-.27 0-.09-.03-.14-.06-.19s-.27-.27-.51-.39z" /></svg>
      </a>
    </div>
  );
}
