# 💚 Clínica Hope — Sistema Integrado de Gestão Clínica

<div align="center">

![Version](https://img.shields.io/badge/versão-2.0.0-green)
![License](https://img.shields.io/badge/licença-Privado-red)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Google%20Apps%20Script-blue)
![Status](https://img.shields.io/badge/status-Em%20Desenvolvimento-yellow)

**Site institucional + Painel administrativo + Integração Google Sheets & Drive**

[🌐 Ver Site](https://clinicahopebrasil.com.br) · [📊 Painel Admin](https://clinicahopebrasil.com.br/admin) · [📖 Documentação](./docs/)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Módulos do Sistema](#-módulos-do-sistema)
- [Tecnologias](#-tecnologias)
- [Como Rodar](#-como-rodar)
- [Deploy](#-deploy)
- [Integrações Google](#-integrações-google)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Equipe](#-equipe)

---

## 🏥 Sobre o Projeto

Sistema completo de gestão para a **Clínica Hope** (Hope Clínica Multidisciplinar LTDA — CNPJ 47.283.631/0001-29), localizada em Palhoça/SC.

O projeto é dividido em **3 camadas principais**:

| Camada | Descrição |
|--------|-----------|
| **Site Público** | Site institucional com agendamento online, equipe, convênios, sublocação e contato |
| **Painel Admin** | Dashboard de gestão com agenda, pacientes, guias, financeiro, salas, glosas e credenciamento |
| **Backend Google** | Google Apps Script + Sheets + Drive para armazenamento e processamento de dados |

### Fundadora

**Beatriz Santiago** — CEO & Psicóloga Clínica, idealizadora do projeto com foco em unir acolhimento humanizado e tecnologia de gestão.

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND (React)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  Site Público │  │ Painel Admin │  │   Login   │  │
│  │  (6 seções)  │  │ (14 módulos) │  │  Sistema  │  │
│  └──────┬───────┘  └──────┬───────┘  └─────┬─────┘  │
│         │                 │                │         │
│         └─────────┬───────┘────────────────┘         │
│                   │                                  │
│         ┌─────────▼─────────┐                        │
│         │  Camada de Dados  │                        │
│         │  (Estado React)   │                        │
│         └─────────┬─────────┘                        │
└───────────────────┼──────────────────────────────────┘
                    │ API Calls
┌───────────────────▼──────────────────────────────────┐
│              BACKEND (Google Apps Script)             │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │  Sheets    │  │   Drive    │  │  Triggers &    │  │
│  │  (Dados)   │  │ (Arquivos) │  │  Automações    │  │
│  └────────────┘  └────────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
clinica-hope/
│
├── 📄 README.md                    # Este arquivo
├── 📄 LICENSE                      # Licença do projeto
├── 📄 .gitignore                   # Arquivos ignorados
├── 📄 .env.example                 # Modelo de variáveis de ambiente
├── 📄 package.json                 # Dependências e scripts
│
├── 📂 public/                      # Arquivos estáticos
│   ├── index.html                  # HTML principal
│   ├── favicon.ico                 # Ícone
│   └── assets/                     # Imagens, fontes, etc.
│       ├── logo-hope.svg
│       ├── fundadora-beatriz.jpg
│       ├── salas/                   # Fotos das salas
│       │   ├── sala-1.jpg
│       │   ├── sala-2.jpg
│       │   ├── sala-infantil.jpg
│       │   ├── recepcao.jpg
│       │   └── sala-4.jpg
│       ├── equipe/                  # Fotos da equipe
│       │   ├── michelle.jpg
│       │   ├── lana.jpg
│       │   ├── gabriella.jpg
│       │   └── ...
│       └── convenios/               # Logos dos convênios
│           ├── unimed.svg
│           ├── bradesco-saude.svg
│           └── ...
│
├── 📂 src/                          # Código fonte
│   ├── 📄 App.jsx                   # Componente raiz (roteamento)
│   ├── 📄 index.js                  # Entry point
│   ├── 📄 constants.js              # Cores, fontes, config global
│   │
│   ├── 📂 site/                     # === SITE PÚBLICO ===
│   │   ├── 📄 Website.jsx           # Layout principal do site
│   │   ├── 📄 Navbar.jsx            # Navegação fixa
│   │   ├── 📄 HeroSection.jsx       # Hero + Beatriz Santiago
│   │   ├── 📄 QuemSomos.jsx         # Seção institucional
│   │   ├── 📄 Especialistas.jsx     # Cards da equipe
│   │   ├── 📄 AvaliacoesGoogle.jsx  # Carrossel 5 estrelas
│   │   ├── 📄 PlanosSaude.jsx       # Grade de convênios
│   │   ├── 📄 Sublocacao.jsx        # Salas + galeria + preços
│   │   ├── 📄 Contato.jsx           # Formulário + mapa
│   │   ├── 📄 Footer.jsx            # Rodapé com "Acesso Restrito"
│   │   ├── 📄 ModalAgendar.jsx      # Modal agendamento → WhatsApp
│   │   └── 📄 WhatsAppFloat.jsx     # Botão flutuante WhatsApp
│   │
│   ├── 📂 admin/                    # === PAINEL ADMIN ===
│   │   ├── 📄 AdminPanel.jsx        # Layout principal (sidebar + content)
│   │   ├── 📄 LoginScreen.jsx       # Tela de login
│   │   ├── 📄 Sidebar.jsx           # Menu lateral
│   │   ├── 📄 TopBar.jsx            # Barra superior
│   │   │
│   │   ├── 📂 modules/              # Módulos do admin
│   │   │   ├── 📄 Dashboard.jsx     # KPIs + alertas + resumo
│   │   │   ├── 📄 AgendaCentral.jsx # Agenda por dia/psicóloga
│   │   │   ├── 📄 Pacientes.jsx     # CRUD pacientes
│   │   │   ├── 📄 Especialistas.jsx # Gestão de profissionais
│   │   │   ├── 📄 Guias.jsx         # Controle semanal
│   │   │   ├── 📄 Salas.jsx         # Mapa de ocupação
│   │   │   ├── 📄 Financeiro.jsx    # Validação NF/RPA
│   │   │   ├── 📄 Glosas.jsx        # Análise XML TISS
│   │   │   ├── 📄 Sublocacao.jsx    # Gestão de sublocação
│   │   │   ├── 📄 Credenciamento.jsx# Formulário 4 etapas
│   │   │   ├── 📄 GoogleSheets.jsx  # Painel de planilhas
│   │   │   ├── 📄 GoogleDrive.jsx   # Gestão de pastas
│   │   │   ├── 📄 EditarSite.jsx    # CMS do site público
│   │   │   └── 📄 Config.jsx        # Integrações e dados
│   │   │
│   │   └── 📂 components/           # Componentes reutilizáveis admin
│   │       ├── 📄 KPICard.jsx
│   │       ├── 📄 DataTable.jsx
│   │       ├── 📄 Badge.jsx
│   │       └── 📄 Button.jsx
│   │
│   ├── 📂 shared/                   # === COMPONENTES COMPARTILHADOS ===
│   │   ├── 📄 Card.jsx
│   │   ├── 📄 Modal.jsx
│   │   └── 📄 LoadingSpinner.jsx
│   │
│   └── 📂 data/                     # === DADOS MOCK / CONFIG ===
│       ├── 📄 especialistas.js      # Array de profissionais
│       ├── 📄 planos.js             # Convênios aceitos
│       ├── 📄 avaliacoes.js         # Reviews do Google
│       ├── 📄 salas.js              # Config de salas
│       └── 📄 mockData.js           # Dados mock para desenvolvimento
│
├── 📂 scripts/                      # === GOOGLE APPS SCRIPT ===
│   ├── 📄 Codigo.gs                 # Funções principais do backend
│   ├── 📄 Credenciamento.gs         # Lógica de credenciamento
│   ├── 📄 ValidacaoFinanceira.gs    # Validação NF/RPA
│   ├── 📄 GestaoGuias.gs           # Controle de guias
│   ├── 📄 PainelCentral.gs         # Agenda central
│   ├── 📄 DashboardSalas.gs        # Ocupação de salas
│   ├── 📄 AdmGlosas.gs             # Processamento TISS
│   ├── 📄 Sublocacao.gs            # Lógica de sublocação
│   │
│   ├── 📂 html/                     # Templates HTML (Apps Script)
│   │   ├── 📄 credenciamento.html
│   │   ├── 📄 login.html
│   │   ├── 📄 painel-central.html
│   │   ├── 📄 gestao-guias.html
│   │   ├── 📄 dashboard-salas.html
│   │   ├── 📄 validacao-financeira.html
│   │   ├── 📄 sublocacao.html
│   │   └── 📄 adm-glosas.html
│   │
│   └── 📂 css/                      # Estilos (Apps Script)
│       └── 📄 style.css
│
└── 📂 docs/                         # === DOCUMENTAÇÃO ===
    ├── 📄 SETUP.md                  # Guia de instalação
    ├── 📄 DEPLOY.md                 # Guia de deploy
    ├── 📄 GOOGLE_INTEGRATION.md     # Setup Google Sheets/Drive
    ├── 📄 API.md                    # Referência de funções
    └── 📄 CHANGELOG.md             # Histórico de versões
```

---

## 🧩 Módulos do Sistema

### 🌐 Site Público (6 seções)

| # | Seção | Descrição |
|---|-------|-----------|
| 1 | **Home / Hero** | Slogan + card Beatriz Santiago + selo Google 5★ + CTAs |
| 2 | **Quem Somos** | Institucional: Acolhimento, Ciência, Vínculo |
| 3 | **Especialistas** | 9 cards: foto, abordagem, turnos, botão agendar → WhatsApp |
| 4 | **Avaliações Google** | Selo 5.0 dourado + carrossel de reviews |
| 5 | **Planos de Saúde** | Grade com logos dos convênios |
| 6 | **Sublocação** | Galeria boutique + tabela de preços + diferenciais |
| 7 | **Contato** | Formulário + dados + mapa Palhoça/SC |

### 🔐 Painel Admin (14 módulos)

| # | Módulo | Descrição | Google Sheet |
|---|--------|-----------|-------------|
| 1 | Dashboard | KPIs, alertas, resumo geral | Lê todas |
| 2 | Agenda Central | Grade por dia/psicóloga, filtros | `Planilha Mestre` |
| 3 | Pacientes | Cadastro, busca, WhatsApp | `Planilha Mestre` |
| 4 | Especialistas | Gestão de profissionais | `Planilha Mestre` |
| 5 | Guias | Controle semanal por status | `Agendas Individuais` |
| 6 | Salas | Mapa de ocupação 5 salas × 10 horários | `Planilha Mestre` |
| 7 | Financeiro | Validação NF/RPA por profissional | `Financeiro` |
| 8 | Glosas TISS | Upload XML, códigos, análise | `Glosas` |
| 9 | Sublocação | Valor/hora, pacotes, configuração | `Sublocação` |
| 10 | Credenciamento | Formulário 4 etapas + assinatura | `Credenciamento` |
| 11 | Google Sheets | Painel de planilhas + IMPORTRANGE | — |
| 12 | Google Drive | Pastas, upload, atividade recente | — |
| 13 | Editar Site | CMS para conteúdo do site público | — |
| 14 | Configurações | Integrações, dados da clínica | — |

---

## 🛠 Tecnologias

### Frontend
- **React 18** — Interface de usuário
- **Cormorant Garamond** — Tipografia serifada (títulos)
- **Outfit** — Tipografia sans-serif (corpo)
- **JetBrains Mono** — Tipografia monospace (dados)

### Backend
- **Google Apps Script** — Servidor e automações
- **Google Sheets** — Banco de dados
- **Google Drive** — Armazenamento de arquivos

### Integrações
- **WhatsApp Business API** — Agendamento direto
- **ViaCEP** — Busca automática de endereço
- **Google Meu Negócio** — Avaliações

### Paleta de Cores
```
Verde Sálvia:  #7c9a8b (principal)
Azul Suave:    #6b8fa3 (secundária)
Dourado:       #c4a35a (destaque)
Creme:         #faf8f5 (fundo)
Branco:        #ffffff (cards)
Texto:         #2d3436 (corpo)
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta Google (para integrações)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/clinicahope/clinica-hope.git

# 2. Entre na pasta
cd clinica-hope

# 3. Instale as dependências
npm install

# 4. Copie as variáveis de ambiente
cp .env.example .env

# 5. Rode o projeto
npm run dev
```

### Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run deploy     # Deploy automático
npm run lint       # Verificar código
```

---

## 🌍 Deploy

### Opção 1: GitHub Pages (Recomendado)
```bash
npm run build
# Configurar GitHub Pages para pasta dist/
# Em: Repository → Settings → Pages → Source: main / dist/
```

### Opção 2: Netlify
```bash
npm run build
# Upload da pasta dist/
```

### Domínio
- **Produção:** `clinicahopebrasil.com.br`
- **Staging:** `staging.clinicahopebrasil.com.br`

> ⚠️ Ao migrar, configure redirecionamentos 301 para preservar SEO.

---

## 🔗 Integrações Google

### Planilhas Conectadas

| Planilha | ID | Abas | Função |
|----------|----|------|--------|
| Planilha Mestre | `1abc...` | 12 | Dados gerais, agenda, pacientes |
| Agenda Individual (cada PSI) | `1def...` | 4 | Horários por psicóloga |
| Financeiro | `1jkl...` | 3 | NFs, RPAs, validação |
| Guias | `1mno...` | 6 | Controle semanal |
| Glosas | `1pqr...` | 2 | Análise TISS |

### Pastas no Drive

| Pasta | Conteúdo |
|-------|----------|
| `Credenciamento_Hope_Oficial` | Docs de credenciamento |
| `documento Hope` | Documentos gerais |
| `Glosa Hope` | XMLs e relatórios de glosa |
| `Notas Fiscais 2026` | NFs dos profissionais |
| `RPAs 2026` | RPAs mensais |
| `Relatórios Gerados` | PDFs automáticos |

### Configurar IMPORTRANGE
```
=IMPORTRANGE("ID_PLANILHA_MESTRE"; "ABA!A:Z")
```

---

## 🔐 Variáveis de Ambiente

```env
# .env.example

# Google
VITE_GOOGLE_SHEETS_API_KEY=sua_api_key
VITE_MASTER_SHEET_ID=id_planilha_mestre
VITE_DRIVE_FOLDER_ID=id_pasta_drive

# WhatsApp
VITE_WHATSAPP_NUMBER=5548999999999

# Site
VITE_SITE_URL=https://clinicahopebrasil.com.br
VITE_ADMIN_EMAIL=admin@clinicahopebrasil.com.br
```

---

## 👥 Equipe

| Pessoa | Papel |
|--------|-------|
| **Beatriz Santiago** | CEO & Fundadora, Psicóloga Clínica |
| **[Desenvolvedor]** | Desenvolvimento Full Stack |

---

## 📝 Licença

Projeto **privado** — © 2026 Hope Clínica Multidisciplinar LTDA. Todos os direitos reservados.

---

<div align="center">

Feito com 💚 para a **Clínica Hope** — Palhoça/SC

*"Onde o acolhimento encontra a ciência."*

</div>
