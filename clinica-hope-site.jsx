import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// CLÍNICA HOPE — SISTEMA COMPLETO
// Site Institucional + Painel Admin + Google Sheets/Drive
// clinicahopebrasil.com.br
// ═══════════════════════════════════════════════════════════════

const P = {
  sage: "#7c9a8b", sageLt: "#e8f0ec", sageDk: "#4a6b5c",
  blue: "#6b8fa3", blueLt: "#edf3f7", blueDk: "#3d6478",
  cream: "#faf8f5", white: "#ffffff", warmWhite: "#f9f7f4",
  gold: "#c4a35a", goldLt: "#f8f3e8", goldSoft: "#dcc88e",
  text: "#2d3436", textSoft: "#636e72", textMuted: "#95a5a6",
  border: "#e8e4df", borderLt: "#f0ede8",
  accent: "#b8d4c8", accentDk: "#5c8a74",
  red: "#c0392b", redLt: "#fdecea",
  ok: "#27ae60", okLt: "#eafaf1",
  warn: "#e67e22", warnLt: "#fef6ee",
  deepGreen: "#1a3a2a", adminBg: "#f5f7f6",
};

const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";
const SANS = "'Outfit', 'DM Sans', 'Segoe UI', sans-serif";
const MONO = "'JetBrains Mono', monospace";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const ESPECIALISTAS = [
  { nome: "Dra. Michelle Rodrigues", crp: "12/34567", abordagem: "TCC — Terapia Cognitivo-Comportamental", desc: "Especialista em ansiedade, depressão e transtornos do humor. Atendimento focado em resultados com técnicas baseadas em evidências científicas.", turnos: ["Manhã", "Tarde"], cor: "#7c9a8b", foto: "M" },
  { nome: "Dra. Lana Baeta", crp: "12/34568", abordagem: "Neuropsicologia", desc: "Avaliação e reabilitação neuropsicológica. Especialista em TDAH, dificuldades de aprendizagem e comprometimento cognitivo.", turnos: ["Manhã"], cor: "#6b8fa3", foto: "L" },
  { nome: "Dra. Gabriella Santos", crp: "12/34569", abordagem: "Psicologia Infantil — Ludoterapia", desc: "Atendimento acolhedor para crianças e adolescentes com técnicas lúdicas adaptadas a cada faixa etária.", turnos: ["Manhã", "Tarde"], cor: "#b48a78", foto: "G" },
  { nome: "Dra. Andressa Lima", crp: "12/34570", abordagem: "Psicologia Organizacional", desc: "Orientação vocacional, coaching de carreira e saúde mental no ambiente corporativo.", turnos: ["Tarde"], cor: "#8b7ca3", foto: "A" },
  { nome: "Dra. Andréia Costa", crp: "12/34571", abordagem: "Terapia de Casal e Família", desc: "Mediação de conflitos, fortalecimento de vínculos e terapia sistêmica para casais e famílias.", turnos: ["Manhã", "Tarde"], cor: "#a38b6b", foto: "A" },
  { nome: "Dra. Suellen Oliveira", crp: "12/34572", abordagem: "Fenomenologia Existencial", desc: "Abordagem centrada na experiência vivida, autoconhecimento profundo e busca de sentido de vida.", turnos: ["Tarde"], cor: "#6ba3a0", foto: "S" },
  { nome: "Dra. Graziela Ferreira", crp: "12/34573", abordagem: "Psicanálise", desc: "Escuta analítica para questões inconscientes, traumas e padrões repetitivos de comportamento.", turnos: ["Manhã"], cor: "#a36b7c", foto: "G" },
  { nome: "Dra. Flavia Mendes", crp: "12/34574", abordagem: "Psicologia Escolar", desc: "Apoio psicológico para crianças em idade escolar, orientação para pais e acompanhamento pedagógico.", turnos: ["Manhã", "Tarde"], cor: "#6b9a7c", foto: "F" },
  { nome: "Dra. Celejane Almeida", crp: "12/34575", abordagem: "TCC — Terapia Cognitiva", desc: "Tratamento de fobias, TOC e transtornos de ansiedade com protocolos cognitivo-comportamentais.", turnos: ["Manhã", "Tarde"], cor: "#9a8b6b", foto: "C" },
];

const PLANOS = [
  { nome: "Unimed", cat: "Nacional" }, { nome: "Bradesco Saúde", cat: "Nacional" },
  { nome: "SulAmérica", cat: "Nacional" }, { nome: "Cassi", cat: "Nacional" },
  { nome: "Geap", cat: "Servidor Público" }, { nome: "PASA/VALE", cat: "Corporativo" },
  { nome: "Particular", cat: "Particular" },
];

const AVALIACOES = [
  { nome: "Juliana R.", texto: "Atendimento excepcional. Me senti acolhida desde o primeiro momento. A Dra. Michelle mudou minha vida.", estrelas: 5 },
  { nome: "Carlos M.", texto: "Ambiente lindo e tranquilo. A equipe toda é muito profissional e atenciosa.", estrelas: 5 },
  { nome: "Ana Paula S.", texto: "Minha filha ama ir nas consultas com a Dra. Gabriella. O espaço infantil é maravilhoso.", estrelas: 5 },
  { nome: "Roberto F.", texto: "Recomendo de olhos fechados. Profissionalismo e empatia em cada detalhe.", estrelas: 5 },
  { nome: "Mariana L.", texto: "O processo de agendamento é super fácil e o espaço transmite muita paz.", estrelas: 5 },
];

const SALAS_FOTOS = [
  { titulo: "Sala de Atendimento 1", desc: "Decoração acolhedora com iluminação natural" },
  { titulo: "Sala de Atendimento 2", desc: "Ambiente silencioso com isolamento acústico" },
  { titulo: "Sala Infantil", desc: "Espaço lúdico e colorido para crianças" },
  { titulo: "Recepção", desc: "Área de espera confortável com café e Wi-Fi" },
  { titulo: "Sala de Atendimento 4", desc: "Design minimalista e relaxante" },
];

// Admin data
const ADMIN_MENU = [
  { id:"dash", label:"Dashboard", icon:"📊" },
  { id:"agenda", label:"Agenda Central", icon:"📅" },
  { id:"pacientes", label:"Pacientes", icon:"👥" },
  { id:"especialistas", label:"Especialistas", icon:"🩺" },
  { id:"guias", label:"Guias", icon:"📋" },
  { id:"salas", label:"Salas", icon:"🏥" },
  { id:"financeiro", label:"Financeiro", icon:"💰" },
  { id:"glosas", label:"Glosas TISS", icon:"⚠️" },
  { id:"sublocacao", label:"Sublocação", icon:"🔑" },
  { id:"credenciamento", label:"Credenciamento", icon:"📝" },
  { id:"sheets", label:"Google Sheets", icon:"📊" },
  { id:"drive", label:"Google Drive", icon:"☁️" },
  { id:"site", label:"Editar Site", icon:"🌐" },
  { id:"config", label:"Configurações", icon:"⚙️" },
];

const DIAS = ["Segunda","Terça","Quarta","Quinta","Sexta"];
const HORARIOS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00"];

const AGENDA = [
  { dia:"Segunda", hr:"08:00", pac:"Maria Silva", plano:"Unimed", psi:"Dra. Michelle Rodrigues", sala:"Sala 1", st:"confirmado" },
  { dia:"Segunda", hr:"09:00", pac:"LIVRE", plano:"", psi:"Dra. Michelle Rodrigues", sala:"Sala 1", st:"livre" },
  { dia:"Segunda", hr:"10:00", pac:"João Santos", plano:"Bradesco Saúde", psi:"Dra. Michelle Rodrigues", sala:"Sala 1", st:"confirmado" },
  { dia:"Segunda", hr:"11:00", pac:"Ana Costa", plano:"Unimed", psi:"Dra. Gabriella Santos", sala:"Sala 2", st:"confirmado" },
  { dia:"Segunda", hr:"14:00", pac:"LIVRE", plano:"", psi:"Dra. Gabriella Santos", sala:"Sala 2", st:"livre" },
  { dia:"Terça", hr:"08:00", pac:"Carlos Oliveira", plano:"Geap", psi:"Dra. Andressa Lima", sala:"Sala 3", st:"confirmado" },
  { dia:"Terça", hr:"09:00", pac:"RESERVA", plano:"", psi:"Dra. Andressa Lima", sala:"Sala 3", st:"reserva" },
  { dia:"Terça", hr:"10:00", pac:"LIVRE", plano:"", psi:"Dra. Suellen Oliveira", sala:"Sala 4", st:"livre" },
  { dia:"Quarta", hr:"08:00", pac:"Fernanda Lima", plano:"Particular", psi:"Dra. Andréia Costa", sala:"Sala 1", st:"confirmado" },
  { dia:"Quarta", hr:"09:00", pac:"Roberto Alves", plano:"Unimed", psi:"Dra. Graziela Ferreira", sala:"Sala 2", st:"confirmado" },
  { dia:"Quinta", hr:"08:00", pac:"Patricia Souza", plano:"Unimed", psi:"Dra. Celejane Almeida", sala:"Sala 3", st:"confirmado" },
  { dia:"Quinta", hr:"14:00", pac:"Lucas Mendes", plano:"Bradesco Saúde", psi:"Dra. Michelle Rodrigues", sala:"Sala 1", st:"confirmado" },
  { dia:"Sexta", hr:"08:00", pac:"LIVRE", plano:"", psi:"Dra. Gabriella Santos", sala:"Sala 2", st:"livre" },
  { dia:"Sexta", hr:"09:00", pac:"Camila Ferreira", plano:"Particular", psi:"Dra. Suellen Oliveira", sala:"Sala 4", st:"confirmado" },
];

const GUIAS = [
  { pac:"Maria Silva", plano:"Unimed", s1:"654321", s2:"654322", s3:"", s4:"", st:"REGISTRADA", psi:"Dra. Michelle Rodrigues" },
  { pac:"João Santos", plano:"Bradesco Saúde", s1:"789012", s2:"789013", s3:"789014", s4:"", st:"FATURADA", psi:"Dra. Michelle Rodrigues" },
  { pac:"Ana Costa", plano:"Unimed", s1:"345678", s2:"", s3:"", s4:"", st:"GLOSA", psi:"Dra. Gabriella Santos" },
  { pac:"Carlos Oliveira", plano:"Geap", s1:"901234", s2:"901235", s3:"901236", s4:"901237", st:"FATURADA", psi:"Dra. Andressa Lima" },
];

const FINANCEIRO = [
  { psi:"Dra. Michelle Rodrigues", nf:true, rpa:true, valor:"R$ 4.200" },
  { psi:"Dra. Gabriella Santos", nf:true, rpa:false, valor:"R$ 3.800" },
  { psi:"Dra. Andressa Lima", nf:false, rpa:false, valor:"R$ 2.900" },
  { psi:"Dra. Suellen Oliveira", nf:true, rpa:true, valor:"R$ 3.100" },
  { psi:"Dra. Andréia Costa", nf:false, rpa:true, valor:"R$ 2.700" },
  { psi:"Dra. Lana Baeta", nf:true, rpa:true, valor:"R$ 3.500" },
  { psi:"Dra. Graziela Ferreira", nf:true, rpa:false, valor:"R$ 2.400" },
  { psi:"Dra. Flavia Mendes", nf:false, rpa:false, valor:"R$ 1.800" },
  { psi:"Dra. Celejane Almeida", nf:true, rpa:true, valor:"R$ 3.600" },
];

const PACIENTES = [
  { nome:"Maria Silva", cpf:"123.456.789-00", nasc:"15/03/1990", tel:"(48) 99988-7766", plano:"Unimed", psi:"Dra. Michelle Rodrigues" },
  { nome:"João Santos", cpf:"234.567.890-11", nasc:"22/07/1985", tel:"(48) 99877-6655", plano:"Bradesco Saúde", psi:"Dra. Michelle Rodrigues" },
  { nome:"Ana Costa", cpf:"345.678.901-22", nasc:"10/11/1995", tel:"(48) 99766-5544", plano:"Unimed", psi:"Dra. Gabriella Santos" },
  { nome:"Carlos Oliveira", cpf:"456.789.012-33", nasc:"05/01/1980", tel:"(48) 99655-4433", plano:"Geap", psi:"Dra. Andressa Lima" },
  { nome:"Fernanda Lima", cpf:"567.890.123-44", nasc:"18/09/1992", tel:"(48) 99544-3322", plano:"Particular", psi:"Dra. Andréia Costa" },
  { nome:"Roberto Alves", cpf:"678.901.234-55", nasc:"30/04/1988", tel:"(48) 99433-2211", plano:"Unimed", psi:"Dra. Graziela Ferreira" },
];

// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("site");
  const [loggedIn, setLoggedIn] = useState(false);

  if (view === "site") return <Website onAdmin={() => setView("login")} />;
  if (view === "login" && !loggedIn) return <LoginScreen onLogin={() => { setLoggedIn(true); setView("admin"); }} onBack={() => setView("site")} />;
  return <AdminPanel onLogout={() => { setLoggedIn(false); setView("site"); }} />;
}

// ═══════════════════════════════════════════════════════════════
// ██ WEBSITE PÚBLICO ██
// ═══════════════════════════════════════════════════════════════
function Website({ onAdmin }) {
  const [activeSection, setActiveSection] = useState("home");
  const [agendarOpen, setAgendarOpen] = useState(false);
  const [agendarPsi, setAgendarPsi] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [reviewIdx, setReviewIdx] = useState(0);

  const openAgendar = (psiNome = "") => { setAgendarPsi(psiNome); setAgendarOpen(true); };

  useEffect(() => {
    const t = setInterval(() => setReviewIdx(i => (i + 1) % AVALIACOES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ fontFamily: SANS, color: P.text, background: P.white }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)", borderBottom: `1px solid ${P.borderLt}`, padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `linear-gradient(135deg, ${P.sage} 0%, ${P.blue} 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: SERIF, fontWeight: 700, fontSize: 22,
            }}>H</div>
            <div>
              <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 20, color: P.sageDk, letterSpacing: "-0.01em" }}>Clínica Hope</div>
              <div style={{ fontSize: 9, color: P.textMuted, letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}>Saúde Mental & Bem-Estar</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["home","Home"],["quem-somos","Quem Somos"],["especialistas","Especialistas"],["sublocacao","Sublocação"],["contato","Contato"]].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
                style={{
                  fontSize: 13, fontWeight: 500, color: activeSection === id ? P.sageDk : P.textSoft,
                  textDecoration: "none", paddingBottom: 4, transition: "all 0.3s",
                  borderBottom: activeSection === id ? `2px solid ${P.sage}` : "2px solid transparent",
                }}>
                {label}
              </a>
            ))}
            <button onClick={() => openAgendar()} style={{
              padding: "10px 24px", borderRadius: 50, border: "none", cursor: "pointer",
              background: P.sageDk, color: "#fff", fontWeight: 600, fontSize: 13,
              fontFamily: SANS, letterSpacing: "0.02em",
              boxShadow: `0 4px 16px ${P.sage}40`,
            }}>Agendar Consulta</button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="home" style={{
        padding: "100px 32px 80px", position: "relative", overflow: "hidden",
        background: `linear-gradient(160deg, ${P.warmWhite} 0%, ${P.sageLt} 50%, ${P.blueLt} 100%)`,
      }}>
        {/* decorative elements */}
        <div style={{ position: "absolute", top: 40, right: "10%", width: 300, height: 300, borderRadius: "50%", border: `1px solid ${P.sage}20`, opacity: 0.4 }} />
        <div style={{ position: "absolute", bottom: -40, left: "5%", width: 200, height: 200, borderRadius: "50%", background: `${P.blue}08` }} />
        <div style={{ position: "absolute", top: 120, right: "5%", width: 6, height: 6, borderRadius: "50%", background: P.gold }} />
        <div style={{ position: "absolute", top: 200, right: "15%", width: 4, height: 4, borderRadius: "50%", background: P.sage }} />
        <div style={{ position: "absolute", bottom: 80, left: "20%", width: 5, height: 5, borderRadius: "50%", background: P.gold }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 50, background: `${P.gold}18`, marginBottom: 24 }}>
              <span style={{ color: P.gold, fontSize: 12 }}>★</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: P.gold, letterSpacing: "0.06em" }}>5 ESTRELAS NO GOOGLE</span>
            </div>
            <h1 style={{
              fontFamily: SERIF, fontSize: 52, fontWeight: 400, lineHeight: 1.15,
              color: P.text, marginBottom: 24, letterSpacing: "-0.01em",
            }}>
              Onde o <em style={{ fontStyle: "italic", color: P.sageDk }}>acolhimento</em><br />
              encontra a <em style={{ fontStyle: "italic", color: P.blueDk }}>ciência</em>.
            </h1>
            <p style={{ fontSize: 17, color: P.textSoft, lineHeight: 1.8, marginBottom: 36, maxWidth: 460 }}>
              Cuidado psicológico humanizado com equipe especializada. Aceitamos os principais convênios e oferecemos um ambiente projetado para o seu bem-estar mental.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => openAgendar()} style={{
                padding: "16px 36px", borderRadius: 50, border: "none", cursor: "pointer",
                background: `linear-gradient(135deg, ${P.sageDk}, ${P.sage})`, color: "#fff",
                fontWeight: 600, fontSize: 15, fontFamily: SANS,
                boxShadow: `0 8px 24px ${P.sage}35`,
              }}>Agendar Consulta</button>
              <a href="https://wa.me/5548999999999" target="_blank" style={{
                padding: "16px 36px", borderRadius: 50, textDecoration: "none",
                border: `2px solid ${P.sage}40`, color: P.sageDk,
                fontWeight: 600, fontSize: 15, fontFamily: SANS,
                display: "flex", alignItems: "center", gap: 8,
              }}>📱 WhatsApp</a>
            </div>
          </div>

          {/* Right — Founder Card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              background: P.white, borderRadius: 24, padding: "40px 36px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.06)", maxWidth: 380,
              border: `1px solid ${P.border}`, position: "relative",
            }}>
              <div style={{ position: "absolute", top: -1, left: 40, right: 40, height: 3, background: `linear-gradient(90deg, ${P.sage}, ${P.gold}, ${P.blue})`, borderRadius: "0 0 4px 4px" }} />
              <div style={{
                width: 100, height: 100, borderRadius: "50%", margin: "0 auto 20px",
                background: `linear-gradient(135deg, ${P.sage}, ${P.blue})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: SERIF, fontSize: 42, fontWeight: 300,
                boxShadow: `0 8px 24px ${P.sage}30`,
              }}>B</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: P.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>Sócia Fundadora & CEO</div>
                <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: P.text, marginBottom: 4 }}>Beatriz Santiago</h3>
                <div style={{ fontSize: 12, color: P.sage, fontWeight: 600, marginBottom: 16 }}>Psicóloga Clínica — CRP 12/XXXXX</div>
                <p style={{ fontSize: 14, color: P.textSoft, lineHeight: 1.7 }}>
                  Idealizadora da Clínica Hope, Beatriz é especialista em Terapia Cognitivo-Comportamental com mais de 10 anos de atuação clínica. Sua visão: criar um espaço onde ciência e empatia caminham juntas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          maxWidth: 1200, margin: "64px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          background: P.white, borderRadius: 16, padding: "28px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          border: `1px solid ${P.border}`, position: "relative", zIndex: 1,
        }}>
          {[["9+","Profissionais","🩺"],["1.000+","Vidas transformadas","💚"],["5","Salas equipadas","🏥"],["5.0","Avaliação Google","⭐"]].map(([num, label, icon], i) => (
            <div key={i} style={{ textAlign: "center", borderRight: i < 3 ? `1px solid ${P.borderLt}` : "none" }}>
              <div style={{ fontSize: 32, fontFamily: SERIF, fontWeight: 600, color: P.sageDk }}>{num}</div>
              <div style={{ fontSize: 12, color: P.textMuted, fontWeight: 500, marginTop: 2 }}>{icon} {label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ QUEM SOMOS ═══ */}
      <section id="quem-somos" style={{ padding: "100px 32px", background: P.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.gold, marginBottom: 12 }}>SOBRE A CLÍNICA</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: P.text, lineHeight: 1.2, marginBottom: 20 }}>
              Projetada para o seu <em style={{ fontStyle: "italic", color: P.sageDk }}>bem-estar mental</em>
            </h2>
            <p style={{ fontSize: 16, color: P.textSoft, lineHeight: 1.8 }}>
              A Clínica Hope nasceu do sonho de criar um espaço onde cada pessoa pudesse encontrar acolhimento genuíno aliado à ciência da psicologia. Nosso ambiente foi cuidadosamente projetado para transmitir calma e segurança — desde a iluminação suave até a acústica de cada sala.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              ["🌿", "Acolhimento", "Cada paciente é único. Nosso atendimento é personalizado e livre de julgamentos, com escuta ativa e empática."],
              ["🔬", "Ciência", "Todas as abordagens terapêuticas utilizadas são baseadas em evidências científicas, garantindo eficácia e segurança."],
              ["🤝", "Vínculo", "Acreditamos que a relação terapêutica é o alicerce da mudança. Construímos vínculos de confiança duradouros."],
            ].map(([icon, title, desc], i) => (
              <div key={i} style={{
                padding: "36px 28px", borderRadius: 20, background: P.warmWhite,
                border: `1px solid ${P.border}`, position: "relative",
              }}>
                <div style={{ position: "absolute", top: 0, left: 28, width: 48, height: 3, background: [P.sage, P.blue, P.gold][i], borderRadius: "0 0 4px 4px" }} />
                <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>{icon}</span>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: P.text, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: P.textSoft, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ESPECIALISTAS ═══ */}
      <section id="especialistas" style={{ padding: "100px 32px", background: P.warmWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.gold, marginBottom: 12 }}>NOSSA EQUIPE</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: P.text }}>
              Especialistas que <em style={{ fontStyle: "italic", color: P.sageDk }}>cuidam de verdade</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {ESPECIALISTAS.map((esp, i) => (
              <div key={i} style={{
                background: P.white, borderRadius: 20, overflow: "hidden",
                border: `1px solid ${P.border}`, transition: "transform 0.3s, box-shadow 0.3s",
              }}>
                {/* Top accent */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${esp.cor}, ${esp.cor}60)` }} />
                <div style={{ padding: "28px 24px" }}>
                  {/* Avatar + info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, ${esp.cor}, ${esp.cor}88)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontFamily: SERIF, fontSize: 24, fontWeight: 400,
                    }}>{esp.foto}</div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: P.text, marginBottom: 2 }}>{esp.nome}</h3>
                      <div style={{ fontSize: 11, color: esp.cor, fontWeight: 600 }}>CRP {esp.crp}</div>
                    </div>
                  </div>

                  {/* Abordagem */}
                  <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 50, background: `${esp.cor}12`, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: esp.cor }}>{esp.abordagem}</span>
                  </div>

                  {/* Descrição */}
                  <p style={{ fontSize: 13, color: P.textSoft, lineHeight: 1.65, marginBottom: 16, minHeight: 60 }}>{esp.desc}</p>

                  {/* Turnos */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                    {esp.turnos.map(t => (
                      <span key={t} style={{
                        padding: "4px 12px", borderRadius: 50, fontSize: 11, fontWeight: 500,
                        background: P.sageLt, color: P.sageDk, border: `1px solid ${P.sage}30`,
                      }}>🕐 {t}</span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button onClick={() => openAgendar(esp.nome)} style={{
                    width: "100%", padding: "12px", borderRadius: 12, border: "none",
                    background: `linear-gradient(135deg, ${esp.cor}, ${esp.cor}cc)`,
                    color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer",
                    fontFamily: SANS, letterSpacing: "0.02em",
                  }}>Agendar com {esp.nome.split(" ")[1]}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AVALIAÇÕES GOOGLE ═══ */}
      <section style={{
        padding: "80px 32px", position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${P.deepGreen} 0%, #1e4434 100%)`,
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: `${P.gold}08` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 60, alignItems: "center" }}>
            {/* Left — Big rating */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 140, height: 140, borderRadius: "50%", margin: "0 auto 20px",
                background: `linear-gradient(135deg, ${P.gold}, ${P.goldSoft})`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                boxShadow: `0 12px 40px ${P.gold}40`,
              }}>
                <div style={{ fontSize: 40, fontFamily: SERIF, fontWeight: 700, color: "#fff" }}>5.0</div>
                <div style={{ fontSize: 18, color: "#fff", letterSpacing: 2 }}>★★★★★</div>
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", fontWeight: 400, marginBottom: 4 }}>Nota Máxima</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Google Meu Negócio</div>
            </div>

            {/* Right — Review carousel */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.goldSoft, marginBottom: 12 }}>O QUE NOSSOS PACIENTES DIZEM</div>
              <div style={{ position: "relative", minHeight: 140 }}>
                {AVALIACOES.map((av, i) => (
                  <div key={i} style={{
                    position: i === reviewIdx ? "relative" : "absolute",
                    top: 0, left: 0, right: 0,
                    opacity: i === reviewIdx ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    pointerEvents: i === reviewIdx ? "auto" : "none",
                  }}>
                    <div style={{ fontSize: 16, color: P.goldSoft, marginBottom: 12 }}>★★★★★</div>
                    <p style={{ fontFamily: SERIF, fontSize: 24, color: "#fff", fontWeight: 300, lineHeight: 1.5, fontStyle: "italic", marginBottom: 16 }}>
                      "{av.texto}"
                    </p>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>— {av.nome}</div>
                  </div>
                ))}
              </div>
              {/* Dots */}
              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                {AVALIACOES.map((_, i) => (
                  <button key={i} onClick={() => setReviewIdx(i)} style={{
                    width: i === reviewIdx ? 24 : 8, height: 8, borderRadius: 4, border: "none",
                    background: i === reviewIdx ? P.gold : "rgba(255,255,255,0.2)",
                    cursor: "pointer", transition: "all 0.3s",
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PLANOS DE SAÚDE ═══ */}
      <section style={{ padding: "80px 32px", background: P.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.gold, marginBottom: 12 }}>CONVÊNIOS ACEITOS</div>
          <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: P.text, marginBottom: 12 }}>Planos de Saúde</h2>
          <p style={{ fontSize: 15, color: P.textMuted, marginBottom: 40 }}>Aceitamos os principais planos para facilitar o seu acesso</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {PLANOS.map((p, i) => (
              <div key={i} style={{
                padding: "20px 32px", borderRadius: 16, background: P.warmWhite,
                border: `1px solid ${P.border}`, minWidth: 150, transition: "all 0.3s",
              }}>
                <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: P.sageDk, marginBottom: 4 }}>{p.nome}</div>
                <div style={{ fontSize: 11, color: P.textMuted, fontWeight: 500 }}>{p.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUBLOCAÇÃO DE SALAS ═══ */}
      <section id="sublocacao" style={{ padding: "100px 32px", background: P.warmWhite }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            {/* Left — Info */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.gold, marginBottom: 12 }}>PARA PROFISSIONAIS</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 400, color: P.text, lineHeight: 1.2, marginBottom: 20 }}>
                Sublocação de <em style={{ fontStyle: "italic", color: P.sageDk }}>Salas</em>
              </h2>
              <p style={{ fontSize: 16, color: P.textSoft, lineHeight: 1.8, marginBottom: 32 }}>
                Espaços boutique para profissionais da saúde mental. Salas decoradas, climatizadas e equipadas com todo o conforto que você e seu paciente merecem.
              </p>

              {/* Pricing */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                <div style={{ padding: "20px 24px", borderRadius: 16, background: P.white, border: `1px solid ${P.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: P.text }}>Valor Avulso</div>
                      <div style={{ fontSize: 12, color: P.textMuted }}>Por hora de atendimento</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: P.sageDk }}>R$ 35<span style={{ fontSize: 16, color: P.textMuted }}>/h</span></div>
                  </div>
                </div>
                <div style={{
                  padding: "20px 24px", borderRadius: 16, background: P.white,
                  border: `2px solid ${P.gold}40`, position: "relative",
                }}>
                  <div style={{ position: "absolute", top: -10, right: 20, padding: "2px 12px", borderRadius: 50, background: P.gold, color: "#fff", fontSize: 10, fontWeight: 700 }}>MELHOR CUSTO</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: P.text }}>Pacote Mensal</div>
                      <div style={{ fontSize: 12, color: P.textMuted }}>Turno fixo (manhã ou tarde)</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, color: P.gold }}>R$ 800<span style={{ fontSize: 16, color: P.textMuted }}>/mês</span></div>
                  </div>
                </div>
              </div>

              {/* Diferenciais */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {["📶 Wi-Fi de alta velocidade","☕ Recepção com café","❄️ Ar-condicionado","🔇 Isolamento acústico","📍 Palhoça/SC","🚗 Estacionamento"].map((d, i) => (
                  <div key={i} style={{ padding: "10px 14px", borderRadius: 10, background: P.white, border: `1px solid ${P.border}`, fontSize: 13, fontWeight: 500, color: P.textSoft }}>
                    {d}
                  </div>
                ))}
              </div>

              <button style={{
                marginTop: 24, padding: "16px 36px", borderRadius: 50, border: "none", cursor: "pointer",
                background: P.sageDk, color: "#fff", fontWeight: 600, fontSize: 15, fontFamily: SANS,
              }}>Agendar Visita</button>
            </div>

            {/* Right — Gallery */}
            <div>
              <div style={{
                borderRadius: 24, overflow: "hidden", position: "relative",
                background: `linear-gradient(135deg, ${P.sage}20, ${P.blue}20)`,
                height: 380, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 60, marginBottom: 12 }}>🏥</div>
                  <div style={{ fontFamily: SERIF, fontSize: 24, color: P.sageDk, fontWeight: 600 }}>{SALAS_FOTOS[carouselIdx].titulo}</div>
                  <div style={{ fontSize: 14, color: P.textSoft, marginTop: 8 }}>{SALAS_FOTOS[carouselIdx].desc}</div>
                </div>
                {/* Arrows */}
                <button onClick={() => setCarouselIdx(i => (i - 1 + SALAS_FOTOS.length) % SALAS_FOTOS.length)} style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)",
                  border: "none", cursor: "pointer", fontSize: 18,
                }}>←</button>
                <button onClick={() => setCarouselIdx(i => (i + 1) % SALAS_FOTOS.length)} style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)",
                  border: "none", cursor: "pointer", fontSize: 18,
                }}>→</button>
              </div>
              {/* Thumbnails */}
              <div style={{ display: "flex", gap: 8 }}>
                {SALAS_FOTOS.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)} style={{
                    flex: 1, height: 60, borderRadius: 12, border: i === carouselIdx ? `2px solid ${P.sage}` : `1px solid ${P.border}`,
                    background: i === carouselIdx ? P.sageLt : P.warmWhite,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 600, color: i === carouselIdx ? P.sageDk : P.textMuted,
                  }}>{SALAS_FOTOS[i].titulo.replace("Sala de ", "").slice(0, 10)}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTATO ═══ */}
      <section id="contato" style={{ padding: "80px 32px", background: P.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.gold, marginBottom: 12 }}>CONTATO</div>
              <h2 style={{ fontFamily: SERIF, fontSize: 36, fontWeight: 400, color: P.text, marginBottom: 28 }}>
                Fale <em style={{ fontStyle: "italic", color: P.sageDk }}>conosco</em>
              </h2>
              {[
                ["📍","Endereço","Palhoça, Santa Catarina — SC"],
                ["📞","Telefone","(48) 3333-4444"],
                ["📱","WhatsApp","(48) 99999-9999"],
                ["📧","E-mail","contato@clinicahopebrasil.com.br"],
                ["🕐","Horário","Segunda a Sexta, 8h às 19h"],
              ].map(([icon, label, value], i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
                  <span style={{ fontSize: 20, marginTop: 2 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: P.text }}>{label}</div>
                    <div style={{ fontSize: 15, color: P.textSoft }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: P.warmWhite, borderRadius: 20, padding: 36, border: `1px solid ${P.border}` }}>
              <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: P.text, marginBottom: 20 }}>Envie uma mensagem</h3>
              {["Nome completo","E-mail","Telefone"].map((ph, i) => (
                <input key={i} placeholder={ph} style={{
                  width: "100%", padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`,
                  fontSize: 14, marginBottom: 12, outline: "none", background: P.white,
                  fontFamily: SANS, boxSizing: "border-box",
                }} />
              ))}
              <textarea placeholder="Sua mensagem..." rows={4} style={{
                width: "100%", padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`,
                fontSize: 14, marginBottom: 16, resize: "vertical", outline: "none", background: P.white,
                fontFamily: SANS, boxSizing: "border-box",
              }} />
              <button style={{
                width: "100%", padding: "16px", borderRadius: 12, background: P.sageDk,
                color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer",
                fontFamily: SANS,
              }}>Enviar Mensagem</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: P.deepGreen, padding: "48px 32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 22, color: "#fff", fontWeight: 600, marginBottom: 8 }}>Clínica Hope</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                Hope Clínica Multidisciplinar LTDA<br />
                CNPJ 47.283.631/0001-29<br />
                Palhoça — Santa Catarina
              </p>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14, textTransform: "uppercase" }}>Menu</div>
              {["Home","Quem Somos","Especialistas","Sublocação","Contato"].map(l => (
                <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14, textTransform: "uppercase" }}>Contato</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>📞 (48) 3333-4444</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>📱 (48) 99999-9999</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>📧 contato@clinicahopebrasil.com.br</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: 14, textTransform: "uppercase" }}>Redes</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, cursor: "pointer" }}>📸 Instagram</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, cursor: "pointer" }}>📘 Facebook</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, cursor: "pointer" }}>🗺️ Google Maps</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Clínica Hope. Todos os direitos reservados.</div>
            <button onClick={onAdmin} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "rgba(255,255,255,0.3)",
              fontSize: 12, fontWeight: 600, fontFamily: SANS,
            }}>🔐 Acesso Restrito</button>
          </div>
        </div>
      </footer>

      {/* ═══ MODAL AGENDAR ═══ */}
      {agendarOpen && <ModalAgendar onClose={() => setAgendarOpen(false)} psiInicial={agendarPsi} />}

      {/* ═══ WHATSAPP FLOAT ═══ */}
      <a href="https://wa.me/5548999999999" target="_blank" style={{
        position: "fixed", bottom: 24, right: 24, width: 60, height: 60, borderRadius: "50%",
        background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: 28, textDecoration: "none", zIndex: 90,
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
      }}>💬</a>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODAL AGENDAMENTO
// ═══════════════════════════════════════════════════════════════
function ModalAgendar({ onClose, psiInicial }) {
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ nome:"", tel:"", email:"", plano:"", psi: psiInicial, dia:"", hr:"" });
  const upd = (k, v) => setD({ ...d, [k]: v });

  const waLink = `https://wa.me/5548999999999?text=${encodeURIComponent(
    `Olá! Gostaria de agendar uma consulta.\n👤 Nome: ${d.nome}\n📞 Tel: ${d.tel}\n🩺 Profissional: ${d.psi || "A definir"}\n📅 Preferência: ${d.dia} ${d.hr}\n💳 Convênio: ${d.plano || "Particular"}`
  )}`;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ background: P.white, borderRadius: 24, width: "92%", maxWidth: 520, maxHeight: "92vh", overflow: "auto", position: "relative", zIndex: 1 }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${P.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, color: P.text, margin: 0 }}>Agendar Consulta</h2>
            <p style={{ fontSize: 12, color: P.textMuted, margin: 0 }}>Etapa {step} de 3</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: P.textMuted }}>✕</button>
        </div>

        <div style={{ display: "flex", gap: 4, padding: "16px 28px 0" }}>
          {["Seus dados","Profissional","Confirmar"].map((l,i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 3, borderRadius: 2, background: i < step ? P.sage : P.border, transition: "0.3s" }} />
              <div style={{ fontSize: 10, fontWeight: 600, color: i < step ? P.sageDk : P.textMuted, marginTop: 4, textAlign: "center" }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 28px 28px" }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["nome","Nome completo"],["tel","Telefone / WhatsApp"],["email","E-mail"]].map(([k,ph]) => (
                <input key={k} placeholder={ph} value={d[k]} onChange={e => upd(k, e.target.value)} style={{
                  padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`,
                  fontSize: 14, outline: "none", fontFamily: SANS,
                }} />
              ))}
              <select value={d.plano} onChange={e => upd("plano", e.target.value)} style={{ padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`, fontSize: 14, fontFamily: SANS }}>
                <option value="">Selecione o convênio</option>
                {PLANOS.map(p => <option key={p.nome}>{p.nome}</option>)}
              </select>
            </div>
          )}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <select value={d.psi} onChange={e => upd("psi", e.target.value)} style={{ padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`, fontSize: 14, fontFamily: SANS }}>
                <option value="">Selecione a profissional</option>
                {ESPECIALISTAS.map(p => <option key={p.nome} value={p.nome}>{p.nome} — {p.abordagem.split("—")[0]}</option>)}
              </select>
              <select value={d.dia} onChange={e => upd("dia", e.target.value)} style={{ padding: "14px 18px", borderRadius: 12, border: `1px solid ${P.border}`, fontSize: 14, fontFamily: SANS }}>
                <option value="">Dia preferido</option>
                {DIAS.map(dd => <option key={dd}>{dd}</option>)}
              </select>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                {HORARIOS.map(h => (
                  <button key={h} onClick={() => upd("hr", h)} style={{
                    padding: "10px", borderRadius: 10, fontWeight: 600, fontSize: 12, cursor: "pointer",
                    fontFamily: MONO,
                    background: d.hr === h ? P.sageDk : P.warmWhite,
                    color: d.hr === h ? "#fff" : P.text,
                    border: d.hr === h ? "none" : `1px solid ${P.border}`,
                  }}>{h}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div style={{ background: P.sageLt, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, textAlign: "center", marginBottom: 12 }}>✅</div>
              <h3 style={{ textAlign: "center", fontFamily: SERIF, fontSize: 22, color: P.sageDk, marginBottom: 16 }}>Confirme seu agendamento</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["Paciente",d.nome||"—"],["Convênio",d.plano||"Particular"],["Profissional",d.psi||"A definir"],["Horário",`${d.dia||"—"} ${d.hr||""}`]].map(([k,v],i) => (
                  <div key={i} style={{ padding: "10px 14px", background: P.white, borderRadius: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: P.textMuted, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: P.text }}>{v}</div>
                  </div>
                ))}
              </div>
              <a href={waLink} target="_blank" style={{
                display: "block", textAlign: "center", marginTop: 16, padding: "14px",
                borderRadius: 12, background: "#25D366", color: "#fff", fontWeight: 700,
                fontSize: 15, textDecoration: "none",
              }}>📱 Confirmar via WhatsApp</a>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {step > 1 ? <button onClick={() => setStep(step-1)} style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${P.border}`, background: "none", cursor: "pointer", fontWeight: 600, color: P.textSoft, fontSize: 13, fontFamily: SANS }}>← Voltar</button> : <div/>}
            {step < 3 && <button onClick={() => setStep(step+1)} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: P.sageDk, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: SANS }}>Próximo →</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ██ LOGIN SCREEN ██
// ═══════════════════════════════════════════════════════════════
function LoginScreen({ onLogin, onBack }) {
  return (
    <div style={{ fontFamily: SANS, minHeight: "100vh", display: "flex", background: `linear-gradient(160deg, ${P.deepGreen} 0%, #1e4434 60%, ${P.sageDk} 100%)` }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", color: P.goldSoft, marginBottom: 16 }}>PAINEL ADMINISTRATIVO</div>
        <h1 style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 400, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          Gerencie sua clínica<br />de forma <em style={{ fontStyle: "italic", color: P.goldSoft }}>integrada</em>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 420 }}>Agenda, guias, financeiro, salas e documentos — tudo conectado ao Google Sheets e Drive.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
          {[["📊","Google Sheets"],["☁️","Google Drive"],["📱","WhatsApp"]].map(([i,l],k) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{i}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: P.white, borderRadius: 24, padding: 40, width: 340, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${P.sage}, ${P.blue})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontFamily: SERIF, fontSize: 24, color: "#fff", fontWeight: 600 }}>H</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 24, color: P.text }}>Acesso Restrito</h2>
            <p style={{ fontSize: 13, color: P.textMuted }}>Entre com suas credenciais</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: P.textMuted, letterSpacing: "0.06em" }}>USUÁRIO</label>
              <input placeholder="admin@clinicahopebrasil.com.br" style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${P.border}`, fontSize: 14, marginTop: 6, outline: "none", fontFamily: SANS, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: P.textMuted, letterSpacing: "0.06em" }}>SENHA</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${P.border}`, fontSize: 14, marginTop: 6, outline: "none", fontFamily: SANS, boxSizing: "border-box" }} />
            </div>
            <button onClick={onLogin} style={{ width: "100%", padding: "14px", borderRadius: 12, background: P.sageDk, color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer", fontFamily: SANS, marginTop: 4 }}>Entrar</button>
            <button onClick={onBack} style={{ width: "100%", padding: "12px", borderRadius: 12, background: "transparent", color: P.textMuted, fontWeight: 600, fontSize: 13, border: `1.5px solid ${P.border}`, cursor: "pointer", fontFamily: SANS }}>← Voltar ao Site</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ██ ADMIN PANEL ██
// ═══════════════════════════════════════════════════════════════
function AdminPanel({ onLogout }) {
  const [mod, setMod] = useState("dash");
  const [collapsed, setCollapsed] = useState(false);
  const w = collapsed ? 64 : 240;

  return (
    <div style={{ display: "flex", height: "100vh", background: P.adminBg, fontFamily: SANS, overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <aside style={{ width: w, background: `linear-gradient(180deg, ${P.deepGreen} 0%, #12332a 100%)`, display: "flex", flexDirection: "column", transition: "width 0.3s", flexShrink: 0 }}>
        <div style={{ padding: "14px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${P.sage}, ${P.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: SERIF, fontWeight: 600, fontSize: 16, flexShrink: 0 }}>H</div>
          {!collapsed && <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>CLÍNICA HOPE</div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 9, letterSpacing: "0.1em", fontWeight: 500 }}>ADMIN</div>
          </div>}
        </div>
        <nav style={{ flex: 1, padding: "6px 5px", overflowY: "auto" }}>
          {ADMIN_MENU.map(m => {
            const act = mod === m.id;
            return (
              <button key={m.id} onClick={() => setMod(m.id)} title={m.label} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: collapsed ? "8px 0" : "8px 11px", justifyContent: collapsed ? "center" : "flex-start",
                background: act ? "rgba(255,255,255,0.09)" : "transparent",
                border: "none", borderRadius: 8, cursor: "pointer",
                color: act ? "#fff" : "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: act ? 600 : 500,
                borderLeft: act ? `3px solid ${P.gold}` : "3px solid transparent", transition: "all 0.2s", marginBottom: 1,
              }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>{m.icon}</span>
                {!collapsed && <span>{m.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={onLogout} style={{ width: "100%", padding: "8px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8 }}>
            <span>🚪</span>{!collapsed && "Sair / Ver Site"}
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{ background: P.white, borderBottom: `1px solid ${P.border}`, padding: "11px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, color: P.textMuted }}>☰</button>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: P.text, margin: 0 }}>{ADMIN_MENU.find(m => m.id === mod)?.icon} {ADMIN_MENU.find(m => m.id === mod)?.label}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: P.textMuted }}>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</span>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${P.sage}, ${P.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>B</div>
          </div>
        </header>
        <div style={{ flex: 1, overflow: "auto", padding: 18 }}>
          {mod === "dash" && <ADash />}
          {mod === "agenda" && <AAgenda />}
          {mod === "pacientes" && <APacientes />}
          {mod === "especialistas" && <AEspecialistas />}
          {mod === "guias" && <AGuias />}
          {mod === "salas" && <ASalas />}
          {mod === "financeiro" && <AFinanceiro />}
          {mod === "glosas" && <AGlosas />}
          {mod === "sublocacao" && <ASublocacao />}
          {mod === "credenciamento" && <ACredenciamento />}
          {mod === "sheets" && <ASheets />}
          {mod === "drive" && <ADrive />}
          {mod === "site" && <ASite />}
          {mod === "config" && <AConfig />}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ADMIN SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function ACard({ children, title, accent, action, style: s = {} }) {
  return (
    <div style={{ background: P.white, borderRadius: 12, border: `1px solid ${P.border}`, overflow: "hidden", ...s }}>
      {title && (
        <div style={{ padding: "11px 16px", borderBottom: `1px solid ${P.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: accent ? `3px solid ${accent}` : "none" }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: P.text, margin: 0 }}>{title}</h3>
          {action}
        </div>
      )}
      <div style={{ padding: "12px 16px" }}>{children}</div>
    </div>
  );
}

function AKPI({ icon, label, value, trend, color = P.sage }) {
  return (
    <div style={{ background: P.white, borderRadius: 12, padding: 16, border: `1px solid ${P.border}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -10, right: -10, width: 50, height: 50, borderRadius: "50%", background: `${color}10` }} />
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: P.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: P.text, fontFamily: MONO }}>{value}</div>
      {trend && <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 3 }}>{trend}</div>}
    </div>
  );
}

function ABadge({ children, color = P.sage }) {
  return <span style={{ display: "inline-flex", padding: "2px 9px", borderRadius: 20, fontSize: 10, fontWeight: 700, color, background: `${color}15` }}>{children}</span>;
}

function ABtn({ children, onClick, c = P.sageDk, v = "solid", sz = "sm" }) {
  return (
    <button onClick={onClick} style={{
      padding: sz === "sm" ? "5px 11px" : "9px 18px", borderRadius: 8,
      border: v === "solid" ? "none" : `1.5px solid ${c}`,
      background: v === "solid" ? c : "transparent", color: v === "solid" ? "#fff" : c,
      fontWeight: 600, fontSize: 11, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
    }}>{children}</button>
  );
}

function ATh({ children }) {
  return <th style={{ padding: "8px 10px", textAlign: "left", fontSize: 10, fontWeight: 700, color: P.textMuted, borderBottom: `2px solid ${P.border}`, textTransform: "uppercase", letterSpacing: "0.04em" }}>{children}</th>;
}
function ATd({ children, mono, bold, color }) {
  return <td style={{ padding: "9px 10px", fontSize: 12, fontWeight: bold ? 700 : 400, color: color || P.text, fontFamily: mono ? MONO : SANS }}>{children}</td>;
}

// ═══════════════════════════════════════════════════════════════
// ADMIN MODULES
// ═══════════════════════════════════════════════════════════════
function ADash() {
  const conf = AGENDA.filter(a => a.st === "confirmado").length;
  const livres = AGENDA.filter(a => a.st === "livre").length;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
        <AKPI icon="👥" label="Agendados" value={conf} trend="↗ +12% vs sem. ant." color={P.ok} />
        <AKPI icon="💚" label="Livres" value={livres} trend={`${livres} slots`} />
        <AKPI icon="🏥" label="Salas" value="5/5" trend="100% operacional" color={P.blue} />
        <AKPI icon="💰" label="Faturamento" value="R$ 28k" trend="↗ +8% mês ant." color={P.gold} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 12 }}>
        <ACard title="📅 Próximos Atendimentos" accent={P.sage}>
          {AGENDA.filter(a => a.st === "confirmado").slice(0, 6).map((a, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: P.sageLt, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: P.sageDk, fontFamily: MONO }}>{a.hr}</div>
                <div><div style={{ fontWeight: 600, fontSize: 12 }}>{a.pac}</div><div style={{ fontSize: 10, color: P.textMuted }}>{a.psi} · {a.dia}</div></div>
              </div>
              <ABadge>{a.plano}</ABadge>
            </div>
          ))}
        </ACard>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ACard title="📊 NF/RPA" accent={P.gold}>
            {FINANCEIRO.slice(0, 4).map((f, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : "none" }}>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{f.psi.split(" ").slice(1, 3).join(" ")}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <ABadge color={f.nf ? P.ok : P.red}>{f.nf ? "✓NF" : "✗NF"}</ABadge>
                  <ABadge color={f.rpa ? P.ok : P.red}>{f.rpa ? "✓RPA" : "✗RPA"}</ABadge>
                </div>
              </div>
            ))}
          </ACard>
          <ACard title="⚠️ Alertas" accent={P.red}>
            {[["3 guias pendentes","warn"],["2 profissionais sem NF/RPA","red"],["Alvará vence em 15 dias","warn"]].map(([msg,t],i) => (
              <div key={i} style={{ padding: "6px 9px", borderRadius: 6, fontSize: 11, fontWeight: 500, marginBottom: 3, background: t==="red"?P.redLt:P.warnLt, color: t==="red"?P.red:"#92400e", borderLeft: `3px solid ${t==="red"?P.red:P.warn}` }}>{msg}</div>
            ))}
          </ACard>
        </div>
      </div>
    </div>
  );
}

function AAgenda() {
  const [psiF, setPsi] = useState(""); const [dayF, setDay] = useState("todos");
  const fil = AGENDA.filter(a => (!psiF || a.psi === psiF) && (dayF === "todos" || a.dia === dayF));
  const grp = DIAS.reduce((a, d) => { a[d] = fil.filter(x => x.dia === d); return a; }, {});
  return (
    <div>
      <ACard style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <select value={psiF} onChange={e => setPsi(e.target.value)} style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${P.border}`, fontSize: 12, fontWeight: 600 }}>
            <option value="">Todas</option>{ESPECIALISTAS.map(p => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
          </select>
          <div style={{ display: "flex", background: "#f0f2f1", borderRadius: 8, padding: 2 }}>
            {["todos",...DIAS].map(d => <button key={d} onClick={() => setDay(d)} style={{ padding: "4px 10px", borderRadius: 6, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer", background: dayF===d?"#fff":"transparent", color: dayF===d?P.sageDk:P.textMuted }}>{d==="todos"?"Todos":d.slice(0,3)}</button>)}
          </div>
          <ABtn>+ Novo Agendamento</ABtn>
        </div>
      </ACard>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 10 }}>
        {DIAS.filter(d => dayF==="todos"||d===dayF).map(dia => {
          const items = grp[dia]||[]; if (!items.length) return null;
          return (
            <div key={dia} style={{ minWidth: 240, background: P.white, borderRadius: 12, border: `1px solid ${P.border}`, flexShrink: 0, overflow: "hidden" }}>
              <div style={{ padding: "9px 12px", borderBottom: `1px solid ${P.border}`, background: P.warmWhite, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 12 }}>{dia}</span><ABadge>{items.length}</ABadge>
              </div>
              <div style={{ padding: 6, display: "flex", flexDirection: "column", gap: 5 }}>
                {items.map((a, i) => {
                  const cl = a.st==="livre"?{bg:"#eefbf3",bd:"#a7f3d0",tx:"#059669"}:a.st==="reserva"?{bg:"#fef9ee",bd:"#fcd34d",tx:"#b45309"}:{bg:P.white,bd:P.border,tx:P.text};
                  return (
                    <div key={i} style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: `1px solid ${cl.bd}`, background: cl.bg }}>
                      <div style={{ width: 46, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, fontFamily: MONO, background: `${cl.bd}40`, color: cl.tx }}>{a.hr}</div>
                      <div style={{ padding: "6px 8px", flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 11, color: cl.tx, textTransform: "uppercase" }}>{a.pac}</div>
                        {a.plano && <div style={{ fontSize: 9, color: P.textMuted }}>{a.plano} · {a.sala}</div>}
                        <div style={{ fontSize: 9, color: P.textSoft }}>{a.psi}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function APacientes() {
  const [s, setS] = useState("");
  const fil = PACIENTES.filter(p => p.nome.toLowerCase().includes(s.toLowerCase()));
  return (
    <div>
      <ACard style={{ marginBottom: 12 }}><div style={{ display: "flex", gap: 8 }}>
        <input value={s} onChange={e => setS(e.target.value)} placeholder="Buscar..." style={{ flex: 1, padding: "7px 12px", borderRadius: 8, border: `1px solid ${P.border}`, fontSize: 12 }} />
        <ABtn>+ Paciente</ABtn><ABtn c={P.blue} v="outline">📱 WhatsApp</ABtn>
      </div></ACard>
      <ACard title="👥 Pacientes" accent={P.sage}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Nome","CPF","Nasc.","Telefone","Plano","Psicóloga"].map(h => <ATh key={h}>{h}</ATh>)}</tr></thead>
            <tbody>{fil.map((p,i) => (<tr key={i} style={{ borderBottom: `1px solid ${P.border}` }}><ATd bold>{p.nome}</ATd><ATd mono>{p.cpf}</ATd><ATd>{p.nasc}</ATd><ATd mono>{p.tel}</ATd><td style={{padding:"9px 10px"}}><ABadge>{p.plano}</ABadge></td><ATd>{p.psi}</ATd></tr>))}</tbody>
          </table>
        </div>
      </ACard>
    </div>
  );
}

function AEspecialistas() {
  return (
    <ACard title="🩺 Gestão de Especialistas" accent={P.sage} action={<ABtn>+ Nova Profissional</ABtn>}>
      {ESPECIALISTAS.map((e, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < ESPECIALISTAS.length-1 ? `1px solid ${P.border}` : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${e.cor}, ${e.cor}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: SERIF, fontSize: 18 }}>{e.foto}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{e.nome}</div>
              <div style={{ fontSize: 11, color: P.textMuted }}>CRP {e.crp} · {e.abordagem.split("—")[0]}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {e.turnos.map(t => <ABadge key={t} color={P.sage}>{t}</ABadge>)}
            <ABtn v="outline">Editar</ABtn>
          </div>
        </div>
      ))}
    </ACard>
  );
}

function AGuias() {
  return (
    <div>
      <ACard style={{ marginBottom: 12 }}><div style={{ display: "flex", gap: 8 }}>
        <select style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${P.border}`, fontSize: 12, fontWeight: 600 }}><option>Todas</option>{ESPECIALISTAS.map(p => <option key={p.nome}>{p.nome}</option>)}</select>
        <ABtn>🔍 Buscar</ABtn><ABtn c={P.red}>📄 PDF</ABtn>
      </div></ACard>
      <ACard title="📋 Controle de Guias" accent={P.sage}>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Paciente","Plano","Psi","Sem1","Sem2","Sem3","Sem4","Status"].map(h => <ATh key={h}>{h}</ATh>)}</tr></thead>
          <tbody>{GUIAS.map((g,i) => (<tr key={i} style={{ borderBottom: `1px solid ${P.border}` }}>
            <ATd bold>{g.pac}</ATd><td style={{padding:"9px 10px"}}><ABadge>{g.plano}</ABadge></td><ATd>{g.psi.split(" ").slice(1,3).join(" ")}</ATd>
            {[g.s1,g.s2,g.s3,g.s4].map((s,j) => <td key={j} style={{padding:"9px 10px"}}>{s?<span style={{fontFamily:MONO,fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:4,background:g.st==="FATURADA"?P.okLt:g.st==="GLOSA"?P.blueLt:P.goldLt,color:g.st==="FATURADA"?P.ok:g.st==="GLOSA"?P.blue:P.gold}}>{s}</span>:<span style={{color:P.textMuted}}>—</span>}</td>)}
            <td style={{padding:"9px 10px"}}><ABadge color={g.st==="FATURADA"?P.ok:g.st==="GLOSA"?P.blue:P.gold}>{g.st}</ABadge></td>
          </tr>))}</tbody>
        </table></div>
      </ACard>
    </div>
  );
}

function ASalas() {
  const SALAS_LIST = ["Sala 1","Sala 2","Sala 3","Sala 4","Sala 5"];
  const getI = (s,d,h) => { const m = AGENDA.find(a => a.sala===s&&a.dia===d&&a.hr===h); if(!m||m.st==="livre") return {st:"livre",l:"LIVRE"}; return {st:"ocu",l:m.psi.split(" ")[1]}; };
  return (
    <div>
      <ACard style={{ marginBottom: 12 }}><div style={{ display: "flex", gap: 8 }}><ABtn>🔄 Sincronizar</ABtn><ABtn c={P.red}>📄 PDF</ABtn></div></ACard>
      <ACard title="🏥 Ocupação — Segunda" accent={P.sage}>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 3 }}>
          <thead><tr><ATh>Hr</ATh>{SALAS_LIST.map(s => <th key={s} style={{padding:6,fontSize:10,fontWeight:700,color:P.textMuted,textAlign:"center"}}>{s}</th>)}</tr></thead>
          <tbody>{HORARIOS.slice(0,8).map(h => (<tr key={h}><td style={{padding:6,fontWeight:700,fontSize:11,fontFamily:MONO}}>{h}</td>
            {SALAS_LIST.map(s => { const info = getI(s,"Segunda",h); return <td key={s} style={{padding:"6px 4px",textAlign:"center",borderRadius:6,fontSize:10,fontWeight:600,background:info.st==="livre"?"#d1fae5":"#fff",color:info.st==="livre"?"#059669":P.text,border:`1px solid ${info.st==="livre"?"#a7f3d0":P.border}`}}>{info.l}</td>; })}
          </tr>))}</tbody>
        </table></div>
      </ACard>
    </div>
  );
}

function AFinanceiro() {
  const nfOk = FINANCEIRO.filter(f=>f.nf).length; const rpaOk = FINANCEIRO.filter(f=>f.rpa).length; const t = FINANCEIRO.length;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
        <AKPI icon="📄" label="NFs" value={`${nfOk}/${t}`} trend={`${Math.round(nfOk/t*100)}%`} color={P.ok} />
        <AKPI icon="📋" label="RPAs" value={`${rpaOk}/${t}`} trend={`${Math.round(rpaOk/t*100)}%`} color={P.gold} />
        <AKPI icon="✅" label="Completos" value={FINANCEIRO.filter(f=>f.nf&&f.rpa).length} color={P.sage} />
        <AKPI icon="💰" label="Total" value={`R$ ${FINANCEIRO.reduce((s,f) => s+parseInt(f.valor.replace(/\D/g,"")),0).toLocaleString("pt-BR")}`} color={P.gold} />
      </div>
      <ACard title="💰 Validação Financeira" accent={P.gold} action={<ABtn c={P.red}>📄 PDF</ABtn>}>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Profissional","Valor","NF","RPA","Status"].map(h => <ATh key={h}>{h}</ATh>)}</tr></thead>
          <tbody>{FINANCEIRO.map((f,i) => (<tr key={i} style={{ borderBottom: `1px solid ${P.border}` }}>
            <ATd bold>{f.psi}</ATd><ATd mono bold color={P.sageDk}>{f.valor}</ATd>
            <td style={{padding:"9px 10px"}}><ABadge color={f.nf?P.ok:P.red}>{f.nf?"✅ OK":"❌ Falta"}</ABadge></td>
            <td style={{padding:"9px 10px"}}><ABadge color={f.rpa?P.ok:P.red}>{f.rpa?"✅ OK":"❌ Falta"}</ABadge></td>
            <td style={{padding:"9px 10px"}}><ABadge color={f.nf&&f.rpa?P.ok:P.warn}>{f.nf&&f.rpa?"✅":"⏳"}</ABadge></td>
          </tr>))}</tbody>
        </table></div>
      </ACard>
    </div>
  );
}

function AGlosas() {
  const data = [
    {guia:"654321",pac:"Maria Silva",cod:"1319",mot:"Guia sem assinatura",val:45},{guia:"345678",pac:"Ana Costa",cod:"1701",mot:"Cobrança fora do prazo",val:31.9},
    {guia:"345678",pac:"Ana Costa",cod:"1702",mot:"Duplicidade",val:45},{guia:"789012",pac:"João Santos",cod:"5005",mot:"Outros",val:45},
  ];
  const tot = data.reduce((s,g) => s+g.val, 0);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
        <AKPI icon="💵" label="Cobrado" value="R$ 8.200" color={P.blue} />
        <AKPI icon="✅" label="Pago" value={`R$ ${(8200-tot).toFixed(0)}`} color={P.ok} />
        <AKPI icon="⚠️" label="Glosado" value={`R$ ${tot.toFixed(2)}`} trend={`${(tot/8200*100).toFixed(1)}%`} color={P.red} />
      </div>
      <ACard style={{ marginBottom: 12 }}><div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, padding: 16, border: `2px dashed ${P.border}`, borderRadius: 8, textAlign: "center", background: P.warmWhite, cursor: "pointer" }}>
          <div style={{ fontSize: 20 }}>📎</div><div style={{ fontSize: 11, fontWeight: 600, color: P.textMuted }}>XML TISS</div>
        </div>
        <ABtn c={P.red} sz="md">📊 Processar</ABtn>
      </div></ACard>
      <ACard title="⚠️ Glosas" accent={P.red}>
        <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Guia","Paciente","Cód","Motivo","Valor"].map(h => <ATh key={h}>{h}</ATh>)}</tr></thead>
          <tbody>{data.map((g,i) => (<tr key={i} style={{ borderBottom: `1px solid ${P.border}` }}><ATd mono bold>{g.guia}</ATd><ATd bold>{g.pac}</ATd><td style={{padding:"9px 10px"}}><ABadge color={P.red}>{g.cod}</ABadge></td><ATd>{g.mot}</ATd><ATd mono bold color={P.red}>R$ {g.val.toFixed(2)}</ATd></tr>))}</tbody>
        </table></div>
      </ACard>
    </div>
  );
}

function ASublocacao() {
  const data = [{pac:"Maria Silva",psi:"Dra. Michelle",val:"R$ 31,90/h",tipo:"Próprio",ok:true},{pac:"Roberto Alves",psi:"Dra. Graziela",val:"R$ 50,00",tipo:"Captação Hope",ok:true},{pac:"João Santos",psi:"Dra. Michelle",val:"—",tipo:"—",ok:false}];
  return (
    <ACard title="🔑 Sublocação" accent={P.blue}>
      <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>{["Status","Paciente","Psi","Valor","Tipo","Ações"].map(h => <ATh key={h}>{h}</ATh>)}</tr></thead>
        <tbody>{data.map((d,i) => (<tr key={i} style={{ borderBottom: `1px solid ${P.border}` }}>
          <td style={{padding:"9px 10px"}}><ABadge color={d.ok?P.ok:P.warn}>{d.ok?"✅":"⏳"}</ABadge></td>
          <ATd bold>{d.pac}</ATd><ATd>{d.psi}</ATd><ATd mono bold color={P.ok}>{d.val}</ATd>
          <td style={{padding:"9px 10px"}}><ABadge>{d.tipo}</ABadge></td>
          <td style={{padding:"9px 10px"}}><ABtn v="outline">{d.ok?"Editar":"Config"}</ABtn></td>
        </tr>))}</tbody>
      </table></div>
    </ACard>
  );
}

function ACredenciamento() {
  const [step, setStep] = useState(1);
  return (
    <ACard title="📝 Credenciamento" accent={P.sage}>
      <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
        {["Dados","Endereço","RPA","Docs"].map((l,i) => (<div key={i} style={{ flex: 1 }}><div style={{ height: 3, borderRadius: 2, background: i<step?P.sage:P.border }} /><div style={{ fontSize: 9, fontWeight: 600, color: i<step?P.sageDk:P.textMuted, marginTop: 3, textAlign: "center" }}>{l}</div></div>))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {["Nome Completo","E-mail","CPF","RG","Telefone","Nacionalidade"].map((l,i) => (
          <div key={i}><label style={{ fontSize: 10, fontWeight: 600, color: P.textMuted }}>{l}</label><input placeholder={l} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${P.border}`, fontSize: 12, marginTop: 3, boxSizing: "border-box" }} /></div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <ABtn c={P.textMuted} v="outline" onClick={() => setStep(Math.max(1,step-1))}>← Voltar</ABtn>
        <ABtn c={step===4?P.ok:P.sageDk} onClick={() => setStep(Math.min(4,step+1))}>{step===4?"✅ Salvar":"Próximo →"}</ABtn>
      </div>
    </ACard>
  );
}

function ASheets() {
  const sheets = [
    {nome:"Planilha Mestre",abas:12,sync:"5 min",ok:true},{nome:"Agenda Michelle",abas:4,sync:"10 min",ok:true},
    {nome:"Financeiro",abas:3,sync:"2 min",ok:true},{nome:"Guias",abas:6,sync:"8 min",ok:false},
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
        <AKPI icon="📊" label="Planilhas" value="6" color={P.ok} />
        <AKPI icon="🔄" label="IMPORTRANGE" value="24" trend="Auto-sync" color={P.sage} />
        <AKPI icon="📝" label="Abas" value="34" color={P.blue} />
      </div>
      <ACard title="📊 Google Sheets" accent={P.ok} action={<ABtn>🔄 Sincronizar</ABtn>}>
        {sheets.map((s,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i<sheets.length-1?`1px solid ${P.border}`:"none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>📊</span>
              <div><div style={{ fontWeight: 600, fontSize: 12 }}>{s.nome}</div><div style={{ fontSize: 10, color: P.textMuted }}>{s.abas} abas · Sync: {s.sync}</div></div>
            </div>
            <ABadge color={s.ok?P.ok:P.warn}>{s.ok?"✅ OK":"⏳"}</ABadge>
          </div>
        ))}
      </ACard>
    </div>
  );
}

function ADrive() {
  const folders = [{n:"Credenciamento",f:34,s:"128 MB"},{n:"Documentos Hope",f:87,s:"256 MB"},{n:"Glosas",f:23,s:"45 MB"},{n:"Notas Fiscais",f:56,s:"89 MB"},{n:"RPAs",f:42,s:"67 MB"},{n:"Relatórios",f:15,s:"34 MB"}];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
        <AKPI icon="☁️" label="Storage" value="619 MB" trend="de 15 GB" color={P.blue} />
        <AKPI icon="📄" label="Arquivos" value="257" color={P.ok} />
        <AKPI icon="📁" label="Pastas" value="6" color={P.sage} />
      </div>
      <ACard title="☁️ Google Drive" accent={P.blue} action={<ABtn>📤 Upload</ABtn>}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {folders.map((f,i) => (
            <div key={i} style={{ padding: 14, borderRadius: 10, border: `1px solid ${P.border}`, background: P.warmWhite, cursor: "pointer" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>{f.n}</div>
              <div style={{ fontSize: 10, color: P.textMuted }}>{f.f} arquivos · {f.s}</div>
            </div>
          ))}
        </div>
      </ACard>
    </div>
  );
}

function ASite() {
  return (
    <ACard title="🌐 Editar Conteúdo do Site" accent={P.sage}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[["Título Hero","Onde o acolhimento encontra a ciência."],["Subtítulo","Cuidado psicológico humanizado com equipe especializada."],["Telefone","(48) 3333-4444"],["WhatsApp","(48) 99999-9999"],["Endereço","Palhoça, Santa Catarina — SC"]].map(([l,v],i) => (
          <div key={i}>
            <label style={{ fontSize: 10, fontWeight: 600, color: P.textMuted }}>{l}</label>
            <input defaultValue={v} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${P.border}`, fontSize: 12, marginTop: 3, boxSizing: "border-box" }} />
          </div>
        ))}
        <ABtn c={P.sageDk} sz="md">💾 Salvar Alterações</ABtn>
      </div>
    </ACard>
  );
}

function AConfig() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <ACard title="⚙️ Integrações" accent={P.sage}>
        {[["📊","Google Sheets","Conectado"],["☁️","Google Drive","Conectado"],["📱","WhatsApp","Ativo"],["📍","ViaCEP","Ativo"],["🔐","Apps Script","Ativo"]].map(([i,n,s],k) => (
          <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", borderRadius: 8, border: `1px solid ${P.border}`, marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{fontSize:18}}>{i}</span><span style={{fontWeight:600,fontSize:12}}>{n}</span></div>
            <ABadge color={P.ok}>{s}</ABadge>
          </div>
        ))}
      </ACard>
      <ACard title="🏢 Dados da Clínica" accent={P.gold}>
        {[["Razão Social","Hope Clínica Multidisciplinar LTDA"],["CNPJ","47.283.631/0001-29"],["Domínio","clinicahopebrasil.com.br"],["Resp. Técnica","Beatriz Santiago"],["Telefone","(48) 3333-4444"]].map(([l,v],i) => (
          <div key={i} style={{ padding: "8px 10px", borderRadius: 6, background: P.warmWhite, marginBottom: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: P.textMuted, textTransform: "uppercase" }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
          </div>
        ))}
      </ACard>
    </div>
  );
}
