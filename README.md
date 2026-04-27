# AI Development Protocol - Portfolio Project

Este documento serve como guia mestre para todos os agentes de IA que atuarem neste repositório. Siga estas instruções rigorosamente para cada tarefa solicitada.

## 🎯 Objetivo
Desenvolver um site de portfólio moderno e interativo, utilizando agentes de IA com skills personalizadas para a execução técnica e estética.

## 🛠 Stack Tecnológica
- **Linguagens:** HTML5, CSS3 e JavaScript (ES6+).
- **Framework:** Bootstrap (utilizar a versão estável mais recente via CDN ou NPM).
- **Diretriz:** Priorizar código limpo, semântico e performático.

## 📁 Arquitetura e Padrão de Código
- **Hierarquia de Pastas:** Respeitar a estrutura de diretórios:
  - `/assets` (imagens, ícones e fontes)
  - `/css` (arquivos de estilo)
  - `/js` (arquivos de script)
- **Separação de Preocupações:** - Proibido o uso de CSS inline ou blocos `<style>` no HTML.
  - Proibido o uso de JS inline ou blocos `<script>` no HTML.
  - Toda a lógica deve estar em `main.js` e a estilização em `style.css`.
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