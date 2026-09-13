# 🤖 WhatsApp Bot para Grupos

Um bot inteligente para WhatsApp que oferece boas-vindas automáticas, regras de grupo, jogos interativos e moderação em tempo real!

## ✨ Funcionalidades Principais

✅ **Boas-vindas Automáticas** - Mensagem personalizada quando novos membros entram
✅ **Despedidas** - Mensagem de despedida quando membros saem
📜 **Regras do Grupo** - Envio automático de regras para novos membros
🎮 **Jogos Divertidos** - 7 tipos de jogos interativos
🚫 **Moderação Automática** - Detecção de spam, links suspeitos e conteúdo ofensivo
⚠️ **Sistema de Avisos** - Avisos progressivos antes de remoção

## 🎮 Jogos Disponíveis

1. **Adivinhe o Número** - Adivinhe um número de 1 a 100
2. **Perguntas Trivia** - Perguntas de conhecimento geral
3. **Pedra, Papel e Tesoura** - Jogue contra o bot
4. **Charadas** - Resolva charadas divertidas
5. **Verdadeiro ou Falso** - Teste seu conhecimento
6. **Piadas** - Ouça piadas engraçadas
7. **Quiz de Personalidade** - Descubra fatos sobre você

## 📱 Instalação em Celular (Android/iOS)

### Opção 1: Usando Termux (Android)

1. **Instale o Termux** (disponível no Google Play)
2. **Abra o Termux** e execute os comandos:

```bash
# Atualizar pacotes
pkg update && pkg upgrade -y

# Instalar Node.js
pkg install nodejs -y

# Instalar Git
pkg install git -y

# Clonar o repositório
git clone https://github.com/aamerzine-pixel/whatsapp-bot-grupo-v2.git

# Entrar na pasta
cd whatsapp-bot-grupo-v2

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env

# Iniciar o bot
npm start
```

3. **Escaneie o QR Code** com seu WhatsApp quando solicitado
4. **Pronto!** Seu bot estará online

### Opção 2: Usando Replit (Online - Recomendado)

1. Acesse [Replit.com](https://replit.com)
2. Clique em "Create Repl" → "Import from GitHub"
3. Cole a URL: `https://github.com/aamerzine-pixel/whatsapp-bot-grupo-v2`
4. Clique em "Import Repl"
5. No terminal, execute:

```bash
npm install
npm start
```

6. Escaneie o QR Code com seu WhatsApp
7. **Pronto!** Seu bot estará online

### Opção 3: Usando Ubuntu/Linux no Celular (Difícil)

Use aplicativos como **Linux Deploy** ou **AnLinux** para instalar um ambiente Linux no seu celular Android.

## 💻 Instalação em Computador (Windows/Mac/Linux)

1. **Instale o Node.js** (versão 14+ recomendada)
   - Baixe em: https://nodejs.org

2. **Clone o repositório:**

```bash
git clone https://github.com/aamerzine-pixel/whatsapp-bot-grupo-v2.git
cd whatsapp-bot-grupo-v2
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Configure o .env:**

```bash
cp .env.example .env
```

5. **Inicie o bot:**

```bash
npm start
```

6. **Escaneie o QR Code** com seu WhatsApp

## 📋 Comandos do Bot

| Comando | Descrição |
|---------|-----------|
| `!regras` | Mostra as regras do grupo |
| `!jogos` | Lista todos os jogos |
| `!jogo adivinha` | Jogo de adivinhar número |
| `!jogo trivia` | Pergunta trivia |
| `!jogo pedrapapeltesoura` | Pedra, Papel e Tesoura |
| `!jogo charada` | Charada |
| `!jogo verdadeirofalso` | Verdadeiro ou Falso |
| `!jogo piada` | Piada aleatória |
| `!jogo quiz` | Quiz de personalidade |
| `!ajuda` | Mostra todos os comandos |

## 🛡️ Sistema de Moderação

**Tipos de Detecção:**
- 🔴 Spam (5+ mensagens em menos de 5 segundos)
- 🔴 Links suspeitos (encurtadores maliciosos)
- 🔴 Conteúdo ofensivo (palavras proibidas)

**Avisos Progressivos:**
1. ⚠️ 1º Aviso - Mensagem de alerta
2. ⚠️ 2º Aviso - Última chance
3. 🚫 3º Aviso - Remoção automática do grupo

## 🔧 Configuração Avançada

Edite o arquivo `.env` para customizar:

```env
BOT_NAME=GrupoBot          # Nome do bot
BOT_PREFIX=!               # Prefixo dos comandos
ENABLE_MODERATION=true     # Ativar moderação
DEBUG=true                 # Modo debug
```

## 📝 Regras Padrão do Grupo

1. ✅ Respeito acima de tudo
2. ✅ Sem spam
3. ✅ Conteúdo apropriado
4. ✅ Respeite a privacidade
5. ✅ Horários de atividade
6. ✅ Use os comandos corretamente

## 🐛 Resolução de Problemas

### Bot não conecta
- Verifique sua conexão com internet
- Tente escanear o QR Code novamente
- Reinicie o bot

### Comandos não funcionam
- Certifique-se de usar `!` antes do comando
- Verifique se o bot está em um grupo
- Reinicie o bot

### Mensagens não enviam
- Verifique as permissões do bot no grupo
- Certifique-se de que o bot é admin (opcional)

## 📦 Dependências

- `whatsapp-web.js` - Biblioteca WhatsApp
- `qrcode-terminal` - Gerador de QR Code
- `dotenv` - Gerenciador de variáveis de ambiente

## 🚀 Deploy Permanente

Para manter o bot online 24/7:

### Opção 1: Usar Replit (Grátis)
- Deploy automático e gratuito
- Bot fica online 24/7

### Opção 2: Usar Railway/Heroku
- Serviços em nuvem pagos
- Mais confiável

### Opção 3: Usar VPS
- Servidor dedicado
- Mais controle

## 📞 Suporte

Se encontrar problemas:
1. Verifique a seção de Resolução de Problemas
2. Abra uma issue no GitHub
3. Consulte a documentação do [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## ⭐ Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou pull request.

---

**Desenvolvido com ❤️ para grupos do WhatsApp**

Versão: 1.0.0
Última atualização: Setembro 2026
