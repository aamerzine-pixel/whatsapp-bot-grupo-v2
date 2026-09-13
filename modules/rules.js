// Módulo de Regras
const rules = {
    async sendRules(msg, chat) {
        const rulesMessage = `
╔════════════════════════════════════╗
║       📜 REGRAS DO GRUPO 📜       ║
╚════════════════════════════════════╝

1️⃣ *Respeito Acima de Tudo*
   - Trate todos com educação e respeito
   - Sem preconceito, discriminação ou bullying
   - Sem ofensas pessoais

2️⃣ *Sem Spam*
   - Não envie mensagens repetidas
   - Sem promoção excessiva
   - Sem links suspeitos

3️⃣ *Conteúdo Apropriado*
   - Sem conteúdo adulto explícito
   - Sem fake news ou desinformação
   - Sem mensagens de ódio

4️⃣ *Respeite a Privacidade*
   - Não compartilhe dados pessoais de outros
   - Sem áudios ou vídeos sem consentimento
   - Respeite o sigilo do grupo

5️⃣ *Horários de Atividade*
   - Evite mensagens em horários inconvenientes
   - Seja considerado com o silêncio noturno

6️⃣ *Use os Comandos*
   - !regras - Ver regras
   - !jogos - Ver jogos
   - !ajuda - Ver comandos

⚠️ *CONSEQUÊNCIAS:*
   ⚫ 1º aviso - Mensagem de alerta
   ⚫ 2º aviso - Remoção do grupo
   ⚫ Comportamento grave - Remoção imediata

Obrigado por fazer parte do nosso grupo! 💚
        `;

        try {
            await chat.sendMessage(rulesMessage);
            console.log('📜 Regras enviadas para', chat.name);
        } catch (error) {
            console.error('Erro ao enviar regras:', error);
        }
    }
};

module.exports = rules;