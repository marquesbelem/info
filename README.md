# AI Development Protocol - Portfolio Project

Este documento serve como guia mestre para todos os agentes de IA que atuarem neste repositório. Siga estas instruções rigorosamente para cada tarefa solicitada.

## 🎯 Objetivo
Desenvolver um site de portfólio moderno e interativo, utilizando agentes de IA com skills personalizadas para a execução técnica e estética.

## 🛠 Stack Tecnológica
- **Framework:** Next.js (App Router, SSG) com TypeScript em modo `strict`.
- **Estilização:** Tailwind CSS (modo claro/escuro) e ícones `lucide-react`.
- **SEO:** Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD e canonical em todas as páginas.
- **Diretriz:** Priorizar código limpo, semântico e performático.

## 📁 Arquitetura e Padrão de Código
- **Hierarquia de Pastas:**
  - `/src/app` (rotas: `(pt)` em `/` e `(en)/en`, `sitemap.ts`, `robots.ts`, `globals.css`)
  - `/src/components` (componentes de UI)
  - `/src/lib` (dados, metadados e constantes do site)
  - `/src/data` (conteúdo em JSON, `pt` e `en`)
  - `/public/assets` (imagens)
- **Comandos:** `npm run dev`, `npm run build`, `npm run lint`.
- **Variável opcional:** `NEXT_PUBLIC_SITE_URL` define a URL canônica.
- **Gestão de Arquivos:** - **Solicite permissão** antes de criar novos arquivos.
  - **Não delete** nenhum arquivo existente sem autorização explícita.

## 🎨 Estética e Design (System UI)
- **Estilo Visual:** Minimalista, tecnológico ("Tech"), com referências da cultura Gamer.
- **Interatividade:** Focar em elementos interativos e transições suaves.
- **Bordas:** Utilizar bordas arredondadas (`border-radius`) em todos os elementos que possuam contornos ou containers.
- **Responsividade:** Uso obrigatório das classes do Bootstrap para garantir compatibilidade com dispositivos móveis.
- **Cores:** - Utilizar variáveis CSS para toda a paleta de cores.
  - **Não** utilize cores hardcoded (ex: `#FFFFFF`) diretamente nas propriedades; use sempre `var(--nome-da-cor)`.

## ✍️ Regras de Conteúdo
- **Integridade de Texto:** Não modifique, resuma ou altere o conteúdo textual (copy) fornecido nos arquivos, a menos que seja solicitado especificamente.

## 🧩 Agent Skills
- **Frontend Design:** Sempre que houver solicitações de modificação de layout, UI ou UX, utilize obrigatoriamente a skill `frontend-design` (em: .agents/skills/frontend-design/SKILL.md) para garantir a qualidade estética.
- **Gerar Favicon:** Sempre que houver solicitações criação de Favicon, utilize obrigatoriamente a skill `favicon-gen` (em: .agents/skills/favicon-gen/SKILL.md) para garantir a qualidade estética.
- **SEO Audit:** Sempre que houver solicitações de auditoria de SEO, utilize obrigatoriamente a skill `seo-audit` (em: .agents/skills/seo-audit/SKILL.md) para garantir a qualidade de SEO do site.
- **Caveman:** Utilize obrigatoriamente a skill caveman (em: .agents/skills/caveman/SKILL.md) para otimização nos tokens e performance nas solicitações para os modelos. Seja conciso e objetivo nas suas respostas.
