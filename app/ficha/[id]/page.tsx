'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FichaLead() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    const foundLead = savedLeads.find((l: any) => l.id.toString() === params.id);
    
    if (foundLead) {
      setLead({
        // Inicializar novos campos para evitar erros de componente não controlado
        especialista: '',
        nome: '', cpf: '', rg: '', orgaoEmissor: '', cidadeEmissao: '', estadoCivil: '',
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
  }, [params.id]);

  const handleSave = () => {
    setIsSaving(true);
    const savedLeads = JSON.parse(localStorage.getItem('sistemadv_leads') || '[]');
    const index = savedLeads.findIndex((l: any) => l.id.toString() === params.id);
    
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

  if (!lead) return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando ficha...</div>;

  return (
    <div className="ficha-master" style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', background: '#fff', color: '#1e293b' }}>
      
      {/* CABEÇALHO */}
      <header style={{ borderBottom: '3px solid #4f46e5', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <img src="/novo.png" alt="Logo" style={{ height: '60px', marginBottom: '1rem' }} />
          <div style={inputGroupStyle}>
            <label style={labelStyle}>ESPECIALISTA EM INDENIZAÇÃO</label>
            <input type="text" value={lead.especialista} onChange={e => setLead({...lead, especialista: e.target.value})} style={inputStyle} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: 0, color: '#000000' }}>FICHA DE ATENDIMENTO</h1>
          <p style={{ color: '#000000' }}>Nº DOCUMENTO: {lead.id.toString().slice(-8)}</p>
        </div>
      </header>

      <div className="ficha-content" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* SEÇÃO 1: QUALIFICAÇÃO DO CLIENTE */}
        <section className="ficha-section">
          <h2 style={sectionTitleStyle}>1. Identificação e Qualificação</h2>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>NOME COMPLETO</label>
            <input type="text" value={lead.nome} onChange={e => setLead({...lead, nome: e.target.value})} style={{...inputStyle, fontSize: '1.1rem', fontWeight: 'bold'}} />
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>CPF</label>
              <input type="text" value={lead.cpf} onChange={e => setLead({...lead, cpf: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>RG</label>
              <input type="text" value={lead.rg} onChange={e => setLead({...lead, rg: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ÓRGÃO EMISSOR</label>
              <input type="text" value={lead.orgaoEmissor} onChange={e => setLead({...lead, orgaoEmissor: e.target.value})} style={inputStyle} /></div>
          </div>
          <div className="grid-3-print" style={grid3Style}>
            <div style={inputGroupStyle}><label style={labelStyle}>CIDADE EMISSÃO</label>
              <input type="text" value={lead.cidadeEmissao} onChange={e => setLead({...lead, cidadeEmissao: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>ESTADO CIVIL</label>
              <input type="text" value={lead.estadoCivil} onChange={e => setLead({...lead, estadoCivil: e.target.value})} style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>NOME DA MÃE</label>
              <input type="text" value={lead.nomeMae} onChange={e => setLead({...lead, nomeMae: e.target.value})} style={inputStyle} /></div>
          </div>
        </section>

        {/* SEÇÃO 2: CONTATOS E LOCALIZAÇÃO */}
        <section className="ficha-section">
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
        <section className="ficha-section">
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
        <section className="ficha-section">
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
        <section className="ficha-section">
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
        <section className="ficha-section">
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

        {/* SEÇÃO 7: FINALIZAÇÃO */}
        <section className="ficha-section">
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

        <footer style={{ marginTop: '2rem', padding: '2rem 0', borderTop: '2px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={() => router.back()} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>Voltar</button>
          <button onClick={handleSave} className="btn-ficha" style={{ padding: '0.8rem 2.5rem', background: isSaving ? '#94a3b8' : '#111234', color: 'white' }} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button onClick={() => window.print()} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>Gerar PDF/Imprimir</button>
        </footer>
      </div>

      <style jsx>{`
        @media print {
          @page {
            margin: 0.5cm !important;
            size: A4;
          }
          
          footer, .btn-secondary, .btn-ficha { display: none !important; }
          
          .ficha-master { 
            zoom: 0.82;
            padding: 0 !important; 
            margin: 0 !important;
            width: 100% !important;
            color: black !important;
          }

          .ficha-content {
            display: block !important;
            column-count: 2 !important;
            column-gap: 1cm !important;
            width: 100% !important;
          }

          header {
            margin-bottom: 0.3cm !important;
            padding-bottom: 0.2cm !important;
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-bottom: 2px solid #000 !important;
          }

          header img { height: 80px !important; }
          header h1 { font-size: 1.1rem !important; margin: 0 !important; }
          header p { font-size: 0.65rem !important; margin: 0 !important; }

          .ficha-section {
            break-inside: avoid-column;
            display: block;
            margin-bottom: 0.4cm !important;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.1cm !important;
          }

          h2 { 
            font-size: 0.75rem !important; 
            margin: 0 0 0.15cm 0 !important; 
            padding: 2px 0 !important;
            color: black !important;
            background: transparent !important;
            border: none !important;
            border-bottom: 2px solid black !important;
            text-decoration: none !important;
            text-transform: uppercase;
          }

          div[style*="display: grid"] { 
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.15cm !important;
            margin-bottom: 0 !important;
          }

          .grid-3-print {
             grid-template-columns: 1fr 1fr 1fr !important;
          }

          label { 
            font-size: 0.55rem !important; 
            margin-bottom: 0 !important;
            font-weight: bold !important;
            color: #000 !important;
          }

          input, textarea { 
            font-size: 0.8rem !important;
            padding: 1px 0 !important;
            margin: 0 !important;
            border: none !important;
            border-bottom: 0.5px solid #000 !important;
            background: transparent !important;
            font-weight: 500 !important;
          }

          textarea {
            max-height: 50px !important;
            min-height: auto !important;
            line-height: 1.1 !important;
          }
        }
      `}</style>
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
