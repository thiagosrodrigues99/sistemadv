import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function FichaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    const foundLead = savedLeads.find((l: any) => l.id.toString() === id);
    
    if (foundLead) {
      setLead({
        // Inicializar campos para evitar erros de componente não controlado
        especialista: '',
        nome: '', cpf: '', rg: '', orgaoEmissor: '', cidadeEmissao: '', estadoCivil: '', nomeMae: '',
        telefone: '', telefoneRecado: '', email: '', endereco: '',
        empregadoRegistroAtual: '', desempregadoUltimoRegistro: '',
        inssStatus: '', senhaInss: '',
        dataAcidente: '', comoFoiAcidente: '', envolvimentoVeiculo: '', parteCorpoAfetada: '', lesao: '',
        fezCirurgia: '', colocouMaterial: '', qualMaterial: '', sequela: '', impactoTrabalho: '',
        detalhesAcidente: '',
        afastouInss: '', tempoAfastado: '', periodoGraça: '', acessoAppInss: '',
        profissaoEpoca: '', clt: '', afastadoInssOuAtestado: '', tempoAtestado: '', empresaAmparou: '', voltouTrabalhar: '',
        catEmitida: '', catEmMaos: '', motivoSemCat: '', temDocMedicos: '', temBO: '',
        hospitalNome: '', hospitalEndereco: '', hospitalTelefone: '',
        consultaMelhorDia: '', processosEnquadra: '', observacoes: '',
        ...foundLead
      });
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    const index = savedLeads.findIndex((l: any) => l.id.toString() === id);
    
    if (index !== -1) {
      const updatedLead = { ...lead, status: 'Ficha aberta' };
      savedLeads[index] = updatedLead;
      setLead(updatedLead);
      localStorage.setItem('sistemadv_leads', JSON.stringify(savedLeads));
      setTimeout(() => {
        setIsSaving(false);
        alert('Ficha jurídica atualizada com sucesso!');
      }, 500);
    }
  };

  const handleBack = () => {
    navigate('/leads');
  };

  if (!lead) return <div style={{ padding: '2rem' }}>Carregando dados do dossiê...</div>;

  return (
    <div className="ficha-master" style={{ background: '#f1f5f9', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="ficha-container" style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '2px solid #111234', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '120px' }} onError={(e) => e.currentTarget.src='/novo.png'} />
            <div>
              <h1 style={{ fontSize: '1.5rem', color: '#111234', margin: 0, fontWeight: 'bold' }}>FICHA DO CLIENTE</h1>
            </div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => window.print()} 
              className="btn-primary" 
              style={{ 
                padding: '0.8rem 1.5rem', 
                background: '#111234', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Imprimir Ficha
            </button>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Responsável: Dr. Jaime Silva</p>
          </div>
        </header>

        {/* SEÇÃO 1: DADOS PESSOAIS */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>1. Identificação do Cliente</h2>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>NOME COMPLETO</label>
              <input type="text" value={lead.nome} onChange={e => setLead({...lead, nome: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ESPECIALISTA RESPONSÁVEL</label>
              <input type="text" value={lead.especialista} onChange={e => setLead({...lead, especialista: e.target.value})} style={inputStyle} placeholder="Nome do advogado/estagiário" /></div>
          </div>
          <div style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>CPF</label>
              <input type="text" value={lead.cpf} onChange={e => setLead({...lead, cpf: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>RG</label>
              <input type="text" value={lead.rg} onChange={e => setLead({...lead, rg: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ORGÃO EMISSOR</label>
              <input type="text" value={lead.orgaoEmissor} onChange={e => setLead({...lead, orgaoEmissor: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>CIDADE EMISSÃO</label>
              <input type="text" value={lead.cidadeEmissao} onChange={e => setLead({...lead, cidadeEmissao: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ESTADO CIVIL</label>
              <input type="text" value={lead.estadoCivil} onChange={e => setLead({...lead, estadoCivil: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>NOME DA MÃE</label>
              <input type="text" value={lead.nomeMae} onChange={e => setLead({...lead, nomeMae: e.target.value})} style={inputStyle} /></div>
          </div>
        </section>

        {/* SEÇÃO 7: FINALIZAÇÃO (Movida para a página 1) */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>7. Enquadramento e Observações</h2>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>MELHOR DIA PARA CONSULTA MÉDICA</label>
              <input type="text" value={lead.consultaMelhorDia} onChange={e => setLead({...lead, consultaMelhorDia: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>QUAIS PROCESSOS SE ENQUADRA?</label>
              <input type="text" value={lead.processosEnquadra} onChange={e => setLead({...lead, processosEnquadra: e.target.value})} style={inputStyle} placeholder="Ex: Auxilio-Acidente" /></div>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>OBSERVAÇÕES GERAIS</label>
            <textarea value={lead.observacoes} onChange={e => setLead({...lead, observacoes: e.target.value})} style={{...inputStyle, background: '#f8fafc'}} />
          </div>
        </section>

        {/* SEÇÃO 2: CONTATOS E LOCALIZAÇÃO */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>2. Contato e Endereço</h2>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>TELEFONE (PRINCIPAL)</label>
              <input type="text" value={lead.telefone} onChange={e => setLead({...lead, telefone: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TELEFONE (RECADO)</label>
              <input type="text" value={lead.telefoneRecado} onChange={e => setLead({...lead, telefoneRecado: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>E-MAIL</label>
              <input type="text" value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>ENDEREÇO COMPLETO</label>
            <input type="text" value={lead.endereco} onChange={e => setLead({...lead, endereco: e.target.value})} style={inputStyle} />
          </div>
        </section>

        {/* SEÇÃO 3: VIDA LABORAL E INSS */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>3. Vida Laboral e INSS</h2>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>EMPREGADO (REGISTRO ATUAL)</label>
              <input type="text" value={lead.empregadoRegistroAtual} onChange={e => setLead({...lead, empregadoRegistroAtual: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>DESEMPREGADO (ÚLTIMO REGISTRO)</label>
              <input type="text" value={lead.desempregadoUltimoRegistro} onChange={e => setLead({...lead, desempregadoUltimoRegistro: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>STATUS INSS</label>
              <input type="text" value={lead.inssStatus} onChange={e => setLead({...lead, inssStatus: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>SENHA DO INSS (OPCIONAL)</label>
              <input type="text" value={lead.senhaInss} onChange={e => setLead({...lead, senhaInss: e.target.value})} style={inputStyle} /></div>
          </div>
        </section>

        {/* SEÇÃO 4: DETALHES DO ACIDENTE E LESÃO */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>4. Informação Detalhada sobre o Acidente</h2>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>DATA DO ACIDENTE</label>
              <input type="text" value={lead.dataAcidente} onChange={e => setLead({...lead, dataAcidente: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>COMO FOI O ACIDENTE</label>
              <input type="text" value={lead.comoFoiAcidente} onChange={e => setLead({...lead, comoFoiAcidente: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ENVOLVEU VEÍCULO</label>
              <input type="text" value={lead.envolvimentoVeiculo} onChange={e => setLead({...lead, envolvimentoVeiculo: e.target.value})} style={inputStyle} /></div>
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>PARTE DO CORPO AFETADA</label>
              <input type="text" value={lead.parteCorpoAfetada} onChange={e => setLead({...lead, parteCorpoAfetada: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>LESÃO</label>
              <input type="text" value={lead.lesao} onChange={e => setLead({...lead, lesao: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>FEZ CIRURGIA?</label>
              <input type="text" value={lead.fezCirurgia} onChange={e => setLead({...lead, fezCirurgia: e.target.value})} style={inputStyle} /></div>
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>COLOCOU MATERIAL (PLACA/PARAFUSO)?</label>
              <input type="text" value={lead.colocouMaterial} onChange={e => setLead({...lead, colocouMaterial: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>QUAL MATERIAL?</label>
              <input type="text" value={lead.qualMaterial} onChange={e => setLead({...lead, qualMaterial: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>IMPACTO NO TRABALHO?</label>
              <input type="text" value={lead.impactoTrabalho} onChange={e => setLead({...lead, impactoTrabalho: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>SEQUELAS (LIMITAÇÃO, FORÇA, DOR)</label>
            <input type="text" value={lead.sequela} onChange={e => setLead({...lead, sequela: e.target.value})} style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>DESCRIÇÃO DETALHADA DO INCIDENTE</label>
            <textarea value={lead.detalhesAcidente} onChange={e => setLead({...lead, detalhesAcidente: e.target.value})} style={{...inputStyle, minHeight: '120px'}} />
          </div>
        </section>

        {/* SEÇÃO 5: SITUAÇÃO LABORAL E CAT */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>5. INSS e Empresa</h2>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>AFASTOU PELO INSS?</label>
              <input type="text" value={lead.afastouInss} onChange={e => setLead({...lead, afastouInss: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TEMPO DE AFASTAMENTO</label>
              <input type="text" value={lead.tempoAfastado} onChange={e => setLead({...lead, tempoAfastado: e.target.value})} style={inputStyle} /></div>
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>PERÍODO DE GRAÇA?</label>
              <input type="text" value={lead.periodoGraça} onChange={e => setLead({...lead, periodoGraça: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ACESSO APP MEU INSS?</label>
              <input type="text" value={lead.acessoAppInss} onChange={e => setLead({...lead, acessoAppInss: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TINHA CARTEIRA ASSINADA (CLT)?</label>
              <input type="text" value={lead.clt} onChange={e => setLead({...lead, clt: e.target.value})} style={inputStyle} /></div>
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>CAT FOI EMITIDA?</label>
              <input type="text" value={lead.catEmitida} onChange={e => setLead({...lead, catEmitida: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TEM CAT EM MÃOS?</label>
              <input type="text" value={lead.catEmMaos} onChange={e => setLead({...lead, catEmMaos: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>VOLTOU A TRABALHAR?</label>
              <input type="text" value={lead.voltouTrabalhar} onChange={e => setLead({...lead, voltouTrabalhar: e.target.value})} style={inputStyle} /></div>
          </div>
        </section>

        {/* SEÇÃO 6: HOSPITAL E DOCUMENTAÇÃO */}
        <section className="ficha-section" style={{ marginBottom: '2.5rem' }}>
          <h2 style={sectionTitleStyle}>6. Hospital e Documentação Médica</h2>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>NOME DO HOSPITAL</label>
              <input type="text" value={lead.hospitalNome} onChange={e => setLead({...lead, hospitalNome: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TELEFONE HOSPITAL</label>
              <input type="text" value={lead.hospitalTelefone} onChange={e => setLead({...lead, hospitalTelefone: e.target.value})} style={inputStyle} /></div>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>ENDEREÇO DO HOSPITAL</label>
            <input type="text" value={lead.hospitalEndereco} onChange={e => setLead({...lead, hospitalEndereco: e.target.value})} style={inputStyle} />
          </div>
          <div style={grid2Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>TEM DOCUMENTOS MÉDICOS?</label>
              <input type="text" value={lead.temDocMedicos} onChange={e => setLead({...lead, temDocMedicos: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>TEM B.O. (BOLETIM DE OCORRÊNCIA)?</label>
              <input type="text" value={lead.temBO} onChange={e => setLead({...lead, temBO: e.target.value})} style={inputStyle} /></div>
          </div>
        </section>

        </section>

        <footer style={{ marginTop: '2rem', padding: '2rem 0', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={handleBack} className="btn-secondary" style={{ padding: '0.8rem 2rem', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', background: 'white', color: '#1e293b', fontWeight: '500' }}>Voltar</button>
          <button onClick={handleSave} className="btn-ficha" style={{ padding: '0.8rem 2.5rem', background: isSaving ? '#94a3b8' : '#111234', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button 
            onClick={() => window.print()} 
            className="btn-primary" 
            style={{ 
              padding: '0.8rem 2rem', 
              background: '#475569', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Imprimir Ficha
          </button>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            margin: 1cm !important;
            size: A4;
          }
          
          /* Esconder elementos da web */
          footer, .btn-secondary, .btn-ficha, aside, .sidebar, .top-bar { display: none !important; }
          
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .ficha-master { 
            zoom: 0.82;
            background: white !important;
            padding: 0 !important; 
            margin: 0 !important;
            width: 100% !important;
            color: black !important;
          }

          .ficha-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            display: block !important;
            column-count: 2 !important;
            column-gap: 0.5cm !important;
          }

          header {
            column-span: all;
            margin-bottom: 0.5cm !important;
            padding-bottom: 0.3cm !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-bottom: 2px solid #111234 !important;
          }

          header img { height: 110px !important; }
          header h1 { font-size: 1.2rem !important; margin: 0 !important; color: #111234 !important; }
          header p { font-size: 0.7rem !important; margin: 0 !important; color: #333 !important; }

          .ficha-section {
            break-inside: avoid;
            margin-bottom: 0.6cm !important;
            padding-bottom: 0.3cm !important;
            border-bottom: 1px solid #eee;
          }

          h2 { 
            font-size: 0.85rem !important; 
            margin: 0 0 0.2cm 0 !important; 
            padding: 3px 6px !important;
            color: white !important;
            background: #111234 !important;
            -webkit-print-color-adjust: exact;
            border: none !important;
            text-transform: uppercase;
            font-weight: bold !important;
          }

          .grid-3-print, .detail-grid, div[style*="display: grid"] { 
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 0.3cm !important;
          }

          /* Ajuste para grids de 2 colunas no print */
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }

          label { 
            font-size: 0.6rem !important; 
            margin-bottom: 2px !important;
            font-weight: bold !important;
            color: #555 !important;
            text-transform: uppercase;
          }

          input, textarea { 
            font-size: 0.85rem !important;
            padding: 4px 0 !important;
            margin: 0 !important;
            border: none !important;
            border-bottom: 1px solid #ccc !important;
            background: transparent !important;
            font-weight: 500 !important;
            color: black !important;
            width: 100% !important;
            min-height: auto !important;
          }

          textarea {
            border: 1px solid #eee !important;
            padding: 5px !important;
            margin-top: 5px !important;
          }
        }
      ` }} />
    </div>
  );
}

// Estilos Auxiliares
const sectionTitleStyle = {
  fontSize: '0.9rem', color: '#000000', fontWeight: 'bold', textTransform: 'uppercase' as any,
  letterSpacing: '0.1em', marginBottom: '1.5rem', borderBottom: '1px solid #000000', paddingBottom: '0.5rem'
};
const grid3Style = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem' };
const grid2Style = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column' as any, marginBottom: '0.8rem' };
const labelStyle = { fontSize: '0.65rem', fontWeight: '800', color: '#000000', marginBottom: '0.3rem' };
const inputStyle = { padding: '0.6rem', border: '1px solid #333333', borderRadius: '6px', fontSize: '0.9rem', outline: 'none', color: '#000000' };
