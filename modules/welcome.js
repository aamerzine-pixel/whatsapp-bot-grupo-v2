// Módulo de Boas-vindas
const welcome = {
    async sendWelcome(chat, user, client) {
        const welcomeMessage = `
╔════════════════════════════════════╗
║    👋 BEM-VINDO(A) AO GRUPO! 👋   ║
╚════════════════════════════════════╝

Olá ${user.name || user.number}! 🎉

Seja bem-vindo(a) ao nosso grupo! 
Ficamos felizes em tê-lo(a) aqui! 

Para conhecer as regras do grupo, digite:
📜 *!regras*

Para ver os jogos disponíveis:
🎮 *!jogos*

Para ver todos os comandos:
❓ *!ajuda*

Divirta-se! 🎊
        `;

        try {
            await chat.sendMessage(welcomeMessage);
        } catch (error) {
            console.error('Erro ao enviar mensagem de boas-vindas:', error);
        }
    }
};

module.exports = welcome;