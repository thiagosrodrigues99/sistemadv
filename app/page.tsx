import Link from 'next/link';
import Script from 'next/script';

export default function LandingPage() {
  return (
    <div id="app">
      {/* Tracking Pixels */}
      
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}
      </Script>

      {/* Google Analytics (ga4) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_FB_PIXEL_ID');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* TikTok Pixel */}
      <Script id="tiktok-pixel" strategy="afterInteractive">
        {`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","detach","setAndVerify","eventProperty","identifyProperty"],ttq.setAndVerify=function(t,n){ttq._verify=ttq._verify||{},ttq._verify[t]=n},ttq.className="ttq-instance",ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('YOUR_TIKTOK_PIXEL_ID');
            ttq.page();
          }(window, document, 'ttq');
        `}
      </Script>

      <header className="main-header">
        <nav>
          <div className="logo">
            <img src="/novo.png" alt="Logo" style={{ height: '100px', width: 'auto', display: 'block' }} />
          </div>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="inicio" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="badge">Licitações na Prática</span>
              <h1>Assessoria jurídica com <br /><span className="gradient-text">visão estratégica</span>.</h1>
              <p>Atuação técnica aliada à lógica de negócio para transformar seus resultados jurídicos e empresariais.</p>
              <div className="hero-actions">
                <a href="#areas" className="btn-secondary">Nossas Áreas</a>
              </div>
            </div>

            <div className="hero-form-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--primary)', fontWeight: '700' }}>SOLICITAR ANÁLISE INICIAL</h3>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Nome completo</label>
                  <input type="text" placeholder="Seu nome aqui" className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Telefone</label>
                  <input type="tel" placeholder="(00) 00000-0000" className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>E-mail</label>
                  <input type="email" placeholder="seu@email.com" className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>CPF</label>
                  <input type="text" placeholder="000.000.000-00" className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Conte um pouco sobre o acidente</label>
                  <textarea placeholder="Descreva brevemente o ocorrido..." className="form-input" style={{ minHeight: '120px', resize: 'vertical' }}></textarea>
                </div>
                <button type="button" className="btn-main" style={{ width: '100%', marginTop: '0.5rem', padding: '1.2rem', fontWeight: '700', fontSize: '1rem' }}>QUERO SABER QUANTO TENHO PARA RECEBER</button>
              </form>
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
            <div className="footer-logo">
              <img src="/novo.png" alt="Logo" style={{ height: '70px', width: 'auto', opacity: 0.8 }} />
            </div>
            <p>&copy; 2026 | Sistema de Gestão de Processos. <Link href="/painel" style={{ color: 'inherit', opacity: 0.5, textDecoration: 'none', marginLeft: '10px' }}>Admin Login</Link></p>
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
