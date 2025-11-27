# 🚗 ConsultaCar

## 👨‍💻 Autor

**Lucas Zeni Strapasson**

---

## 📌 Descrição do Projeto

O **ConsultaCar** é uma aplicação web desenvolvida para facilitar a busca e consulta de veículos, baseada em informações de uma API da Tabela FIPE.  
O sistema permite que o usuário se cadastre na plataforma e adicione seus veículos, desde motos, carros até caminhões, tendo a possibilidade de consultar o preço atualizado da Tabela FIPE de cada um deles. O usuário pode cadastrar novos veículos, editar veículos existentes e excluí-los, também pode acessar a página de relatório se o mesmo quiser uma visão geral de todos os veículos pertencentes, tudo isso navegando em uma interface moderna, intuitiva e responsiva.

---

## 🎨 Prototipação no Figma

[🔗 Link para o protótipo no Figma](https://www.figma.com/design/WlsmbCIjGh5ClupMxbRhWG/ConsultaCar?node-id=4-32&t=urjtQK8fb4Xp764d-1)

---

## 🖌️ Design System

[🔗 Link para o documento do Design System](https://www.figma.com/design/WlsmbCIjGh5ClupMxbRhWG/ConsultaCar?node-id=26-63&p=f&t=lnyffIK2SJVawS0i-0)

---

## 🎯 Framework CSS

**Bootstrap 5**
**SaSS**

---

## 📦 Dependências

- [jQuery](https://jquery.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [SaSS](https://sass-lang.com/)
- [Prettier](https://prettier.io/)

---

## 🌐 Site em Produção

[🔗 ConsultaCar no GitHub Pages](https://lucaszstrr.github.io/consulta-car/)

---

## ✅ Checklist de Funcionalidades

- [x] **RA1** - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.
- [x] **ID 01** - Prototipa interfaces adaptáveis para no mínimo os tamanhos de tela mobile e desktop.
- [x] **ID 02** - Implementa layout responsivo com Framework CSS.
- [x] **ID 03** - Implementa layout responsivo com CSS puro.
- [x] **ID 04** - Utiliza componentes prontos do Framework CSS (cards, botões, modais).
- [x] **ID 05** - Cria layout fluido usando unidades relativas.
- [x] **ID 06** - Aplica um Design System consistente.
- [x] **ID 07** - Utiliza pré-processadores CSS (Sass/SCSS).
- [x] **ID 08** - Aplica tipografia responsiva ou fluida.
- [x] **ID 09** - Aplica técnicas de responsividade de imagens.
- [x] **ID 10** - Otimiza imagens com formatos modernos (WebP).

- [x] **RA2** - Realizar tratamento de formulários e aplicar validações customizadas no lado cliente.
- [x] **ID 11** - Implementa validação HTML nativa.
- [x] **ID 12** - Aplica expressões regulares (REGEX).
- [x] **ID 13** - Utiliza elementos de seleção em formulários (checkbox, radio, select).
- [x] **ID 14** - Implementa leitura e escrita no Web Storage.

- [x] **RA3** - Aplicar ferramentas para otimização do processo de desenvolvimento web.
- [x] **ID 15** - Configura ambiente com Node.js e NPM.
- [x] **ID 16** - Utiliza boas práticas de versionamento no Git/GitHub.
- [x] **ID 17** - Mantém um README.md padronizado.
- [x] **ID 18** - Organiza arquivos do projeto de forma modular.
- [x] **ID 19** - Configura linters e formatadores (ESLint, Prettier).

- [x] **RA4** - Aplicar bibliotecas de funções e componentes em JavaScript.
- [x] **ID 20** - Utiliza jQuery para manipulação do DOM.
- [x] **ID 21** - Integra e configura um plugin jQuery (Mask Plugin).

- [] **RA5** - Efetuar requisições assíncronas para uma API fake e APIs públicas.
- [] **ID 22** - Realiza requisições para API fake (JSON Server).
- [] **ID 23** - Exibe dados de API fake na página.
- [x] **ID 24** - Consome APIs públicas (ex.: ViaCEP).

---

## 🚀 Como rodar:
1. Execute `npm install` no terminal
2. Execute `npm run dev` no terminal (abre automaticamente no navegador)

## 📱 **O QUE FAZER NO CONSULTACAR**
1. **Página Inicial** (`index.html`)
    - Clique em **[Cadastrar]** para criar conta
    - Ou **[Entrar]** se já tem conta
2.  **Cadastro de Usuário** (`cadastro.html`)
    - Preencha: Nome, Email, Senha, CEP
    - O CEP é validado automaticamente via API ViaCEP
    - Clique: [CADASTRAR]
3. **Login** (`login.html`)
    - Digite: Email e Senha
    - Clique: [ENTRAR]
4. **Meus Veículos** (`meusveiculos.html`) - **PÁGINA PROTEGIDA**
    - Veja lista de veículos cadastrados
    - Clique: [+ CADASTRAR VEÍCULO] ou botão na navbar
    - Botões: [Editar] / [Excluir] em cada veículo
5. **Cadastro de Veículo** (`cadastroveiculo.html`)
    - Selecione: TIPO (Carro/Moto/Caminhão)
    - API FIPE carrega: Marcas → Modelos → Anos → Valor FIPE
    - Digite: Placa (com máscara automática)(opcional)
    - Clique: [CADASTRAR VEÍCULO]
6. **Relatório** (`relatorioveiculos.html`) - **Dashboard**
    - Total de: Veículos, Carros, Motos, Caminhões
    - Valor total estimado (soma FIPE)