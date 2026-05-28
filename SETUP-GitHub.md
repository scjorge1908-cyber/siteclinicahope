# 🚀 Guia de Setup — Clínica Hope

## Passo a Passo: Do Zero ao GitHub

### 1️⃣ Criar o Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão verde **"New"** (ou acesse github.com/new)
3. Preencha:
   - **Repository name:** `clinica-hope`
   - **Description:** `Sistema integrado de gestão — Clínica Hope (Palhoça/SC)`
   - **Visibility:** `Private` ⚠️ (projeto contém dados sensíveis)
   - **Initialize:** ✅ Add a README file
   - **.gitignore template:** Node
   - **License:** None (projeto privado)
4. Clique **"Create repository"**

### 2️⃣ Clonar no Computador

```bash
# No terminal / cmd / PowerShell:
git clone https://github.com/SEU_USUARIO/clinica-hope.git
cd clinica-hope
```

### 3️⃣ Instalar Dependências

```bash
# Instalar Node.js primeiro (https://nodejs.org)
# Depois rode:
npm install
```

### 4️⃣ Configurar Variáveis de Ambiente

```bash
# Copiar o modelo
cp .env.example .env

# Editar com seus dados reais
# (Google API keys, IDs das planilhas, etc.)
```

### 5️⃣ Rodar em Desenvolvimento

```bash
npm run dev

# Acesse: http://localhost:5173
```

### 6️⃣ Fazer o Primeiro Commit

```bash
# Adicionar todos os arquivos
git add .

# Criar o commit
git commit -m "🎉 feat: setup inicial do projeto Clínica Hope"

# Enviar para o GitHub
git push origin main
```

---

## 📂 Organização dos Branches

```
main              ← Produção (site no ar)
├── develop       ← Desenvolvimento (testes)
├── feat/home     ← Nova feature: Home
├── feat/admin    ← Nova feature: Admin
├── fix/agenda    ← Correção: Agenda
└── ...
```

### Criar um Branch

```bash
# Criar e mudar para o branch
git checkout -b feat/home

# Trabalhar nos arquivos...
# Depois:
git add .
git commit -m "✨ feat(home): adiciona seção hero com Beatriz Santiago"
git push origin feat/home

# No GitHub: abrir Pull Request para 'develop'
```

### Padrão de Commits

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| `feat` | Nova funcionalidade | `feat(agenda): filtro por psicóloga` |
| `fix` | Correção de bug | `fix(guias): status não atualizava` |
| `style` | Visual/CSS | `style(home): ajusta cores do hero` |
| `docs` | Documentação | `docs: atualiza README` |
| `refactor` | Reorganização | `refactor: separa componentes admin` |
| `chore` | Manutenção | `chore: atualiza dependências` |

---

## 🔑 Configurar Google APIs

### Google Sheets API

1. Acesse [console.cloud.google.com](https://console.cloud.google.com)
2. Crie um projeto: "Clinica Hope"
3. Ative a **Google Sheets API**
4. Crie credenciais → API Key
5. Copie a key para `.env` → `VITE_GOOGLE_SHEETS_API_KEY`

### Google Drive API

1. No mesmo projeto, ative a **Google Drive API**
2. Crie credenciais → OAuth 2.0
3. Configure redirect URIs
4. Copie o Folder ID para `.env`

### Google Apps Script

1. Abra a planilha mestre no Google Sheets
2. Menu → Extensões → Apps Script
3. Cole os arquivos da pasta `scripts/`
4. Deploy → Web App → URL pública
5. Copie a URL para `.env` → `VITE_GAS_WEBAPP_URL`

---

## 🌍 Deploy em Produção

### GitHub Pages (Recomendado)

```bash
# Build do projeto
npm run build

# Fazer commit e push
git add .
git commit -m "feat: build para produção"
git push origin main
```

### Configurar GitHub Pages

1. No GitHub, acesse **Settings** do repositório
2. Vá para **Pages** (no menu esquerdo)
3. Em "Source", selecione: **main** / **dist/**
4. Clique em **Save**
5. O site estará disponível em `https://yourusername.github.io/clinica-hope`

### Configurar Domínio Personalizado (Registro.br)

1. Acesse registro.br com seu domínio
2. DNS → Adicionar registros:

```
Tipo    Nome    Valor
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     yourusername.github.io
```

3. No GitHub Pages, configure o domínio customizado: `clinicahopebrasil.com.br`
4. Ative HTTPS (GitHub faz automaticamente)
5. Espere propagação (até 48h)

---

## ✅ Checklist de Setup

- [ ] Repositório criado no GitHub
- [ ] Projeto clonado localmente
- [ ] `npm install` rodou sem erros
- [ ] `.env` configurado com dados reais
- [ ] `npm run dev` funciona
- [ ] Google Sheets API ativada
- [ ] Google Drive API ativada
- [ ] Apps Script configurado
- [ ] Deploy no GitHub Pages
- [ ] Domínio DNS configurado
- [ ] SSL (HTTPS) ativo
- [ ] Primeiro commit no `main`

---

## 🆘 Problemas Comuns

### "npm: command not found"
→ Instale o Node.js: https://nodejs.org

### "git: command not found"
→ Instale o Git: https://git-scm.com

### "Permission denied" no git push
→ Configure SSH key: https://docs.github.com/en/authentication

### Erro CORS no Google Sheets
→ Verifique se a API Key tem permissão para o domínio

### Build falha localmente
→ Verifique se as variáveis de ambiente estão configuradas no arquivo `.env`
→ Certifique-se de que `npm install` foi executado sem erros
