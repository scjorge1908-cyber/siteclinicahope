# 🚀 GitHub — Guia Rápido de Comandos

## Comandos do Dia a Dia

```bash
# ═══════════════════════════════════════
# 1. PRIMEIRA VEZ (só uma vez)
# ═══════════════════════════════════════

# Clonar o projeto
git clone https://github.com/SEU_USUARIO/clinica-hope.git
cd clinica-hope
npm install

# ═══════════════════════════════════════
# 2. TODO DIA (antes de começar)
# ═══════════════════════════════════════

# Pegar as últimas atualizações
git pull origin main

# ═══════════════════════════════════════
# 3. DEPOIS DE EDITAR ALGO
# ═══════════════════════════════════════

# Ver o que mudou
git status

# Adicionar tudo
git add .

# Salvar com mensagem
git commit -m "descreva o que fez"

# Enviar pro GitHub
git push origin main

# ═══════════════════════════════════════
# 4. CRIAR UM BRANCH (para features)
# ═══════════════════════════════════════

# Criar e ir pro branch
git checkout -b feat/nome-da-feature

# Voltar pro main
git checkout main

# ═══════════════════════════════════════
# 5. EMERGÊNCIA
# ═══════════════════════════════════════

# Desfazer últimas mudanças (não commitadas)
git checkout .

# Desfazer último commit (mantém arquivos)
git reset --soft HEAD~1
```

## Fluxo Visual

```
Você edita    →    git add .    →    git commit    →    git push
  arquivos         (prepara)       (salva local)      (envia GitHub)
```

## Mensagens de Commit — Exemplos

```bash
git commit -m "adiciona seção de especialistas no site"
git commit -m "corrige bug na agenda central"
git commit -m "atualiza dados dos planos de saúde"
git commit -m "melhora design do card da Beatriz"
git commit -m "adiciona módulo de glosas no admin"
```

## Link Útil

📖 **Documentação oficial:** https://docs.github.com/pt
