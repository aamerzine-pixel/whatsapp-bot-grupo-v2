require('dotenv').config();
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Importar módulos
const welcomeModule = require('./modules/welcome');
const rulesModule = require('./modules/rules');
const gamesModule = require('./modules/games');
const moderationModule = require('./modules/moderation');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Evento: QR Code gerado
client.on('qr', qr => {
    console.log('QR Code recebido, escaneie com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Evento: Cliente pronto
client.on('ready', () => {
    console.log('✅ Bot conectado e pronto!');
});

// Evento: Mensagem recebida
client.on('message', async msg => {
    try {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        
        // Ignorar mensagens do próprio bot
        if (msg.fromMe) return;

        // Apenas processar mensagens em grupos
        if (!chat.isGroup) return;

        const messageText = msg.body.toLowerCase().trim();
        const sender = contact.name || contact.number;

        console.log(`📨 [${chat.name}] ${sender}: ${msg.body}`);

        // Comandos do bot
        if (messageText === '!regras') {
            await rulesModule.sendRules(msg, chat);
        }

        if (messageText === '!jogos') {
            await gamesModule.showGames(msg, chat);
        }

        if (messageText.startsWith('!jogo ')) {
            const gameType = messageText.replace('!jogo ', '');
            await gamesModule.playGame(msg, chat, gameType, sender);
        }

        if (messageText === '!ajuda') {
            await sendHelp(msg, chat);
        }

        // Moderação: detectar spam, links suspeitos, etc
        await moderationModule.checkMessage(msg, chat, sender);

    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
    }
});

// Evento: Membros entram no grupo
client.on('group_join', async notification => {
    try {
        const chat = await notification.getChat();
        const users = notification.recipients;

        for (const user of users) {
            console.log(`👋 ${user.name || user.number} entrou no grupo ${chat.name}`);
            await welcomeModule.sendWelcome(chat, user, client);
        }

        // Enviar regras após 5 segundos
        setTimeout(async () => {
            await rulesModule.sendRules(null, chat);
        }, 5000);

    } catch (error) {
        console.error('Erro ao processar entrada:', error);
    }
});

// Evento: Membros saem do grupo
client.on('group_leave', async notification => {
    try {
        const chat = await notification.getChat();
        const users = notification.participants;

        for (const user of users) {
            console.log(`👋 ${user.name || user.number} saiu do grupo ${chat.name}`);
            await moderationModule.sayGoodbye(chat, user);
        }

    } catch (error) {
        console.error('Erro ao processar saída:', error);
    }
});

// Função: Enviar mensagem de ajuda
async function sendHelp(msg, chat) {
    const helpMessage = `
╔════════════════════════════════════╗
║        📋 COMANDOS DO BOT 📋      ║
╚════════════════════════════════════╝

🤖 *Comandos Disponíveis:*

📜 *!regras* - Mostra as regras do grupo
🎮 *!jogos* - Lista dos jogos disponíveis
🎯 *!jogo <tipo>* - Jogar um jogo
   Exemplos: !jogo adivinha, !jogo pergunta, !jogo trivia
❓ *!ajuda* - Mostra esta mensagem

🚫 *Moderação Automática:*
- Detecção de spam
- Bloqueio de links suspeitos
- Aviso para mensagens ofensivas

Divirta-se! 🎉
    `;

    await chat.sendMessage(helpMessage);
}

// Iniciar cliente
client.initialize();

module.exports = client;