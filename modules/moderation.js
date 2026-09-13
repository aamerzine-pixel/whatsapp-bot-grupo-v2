// Módulo de Moderação
const moderation = {
    userWarnings: {}, // Armazena avisos dos usuários
    spamTracking: {}, // Rastreia spam

    async checkMessage(msg, chat, sender) {
        // Detectar spam (muitas mensagens rápidas)
        const userId = `${chat.id}_${sender}`;
        const now = Date.now();

        if (!this.spamTracking[userId]) {
            this.spamTracking[userId] = [];
        }

        // Adicionar timestamp atual
        this.spamTracking[userId].push(now);

        // Manter apenas últimas 10 mensagens
        this.spamTracking[userId] = this.spamTracking[userId].slice(-10);

        // Verificar se houve 5+ mensagens em menos de 5 segundos
        if (this.spamTracking[userId].length >= 5) {
            const timeDiff = this.spamTracking[userId][this.spamTracking[userId].length - 1] - 
                           this.spamTracking[userId][0];
            
            if (timeDiff < 5000) {
                await this.warnSpam(chat, sender, msg);
                return;
            }
        }

        // Detectar links suspeitos
        if (this.containsSuspiciousLinks(msg.body)) {
            await this.warnSuspiciousLinks(chat, sender, msg);
            return;
        }

        // Detectar conteúdo ofensivo
        if (this.containsOffensiveContent(msg.body)) {
            await this.warnOffensive(chat, sender, msg);
            return;
        }
    },

    async warnSpam(chat, sender, msg) {
        const warnKey = `${chat.id}_${sender}`;
        
        if (!this.userWarnings[warnKey]) {
            this.userWarnings[warnKey] = { spam: 0, offensive: 0, links: 0 };
        }

        this.userWarnings[warnKey].spam++;

        const warning = this.userWarnings[warnKey].spam;

        if (warning === 1) {
            const message = `⚠️ *Aviso de Spam* ⚠️\n\n${sender}, por favor, não envie muitas mensagens rapidamente.\nEste é seu 1º aviso! ⚠️`;
            await chat.sendMessage(message);
        } else if (warning === 2) {
            const message = `🚫 *2º Aviso - Última Chance* 🚫\n\n${sender}, você será removido se continuar com spam!`;
            await chat.sendMessage(message);
        } else if (warning >= 3) {
            const message = `❌ *${sender} foi removido do grupo por spam excessivo*`;
            await chat.sendMessage(message);
            console.log(`🚫 ${sender} removido por spam - ${chat.name}`);
        }
    },

    async warnOffensive(chat, sender, msg) {
        const warnKey = `${chat.id}_${sender}`;
        
        if (!this.userWarnings[warnKey]) {
            this.userWarnings[warnKey] = { spam: 0, offensive: 0, links: 0 };
        }

        this.userWarnings[warnKey].offensive++;

        const warning = this.userWarnings[warnKey].offensive;

        if (warning === 1) {
            const message = `⚠️ *Conteúdo Ofensivo* ⚠️\n\n${sender}, por favor, respeite as regras do grupo.\nEvite mensagens ofensivas! ⚠️`;
            await chat.sendMessage(message);
        } else if (warning >= 2) {
            const message = `❌ *${sender} foi removido por conteúdo ofensivo*`;
            await chat.sendMessage(message);
        }
    },

    async warnSuspiciousLinks(chat, sender, msg) {
        const message = `⚠️ *Link Suspeito* ⚠️\n\n${sender}, este link foi detectado como potencialmente perigoso.\nPor favor, não compartilhe links suspeitos no grupo! 🔗`;
        await chat.sendMessage(message);
    },

    containsSuspiciousLinks(text) {
        const suspiciousPatterns = [
            /bit\.ly/i,
            /short\.link/i,
            /goo\.gl/i,
            /tinyurl/i,
            /virustotal/i,
            /malware/i
        ];

        return suspiciousPatterns.some(pattern => pattern.test(text));
    },

    containsOffensiveContent(text) {
        const offensiveWords = [
            'puta', 'merda', 'caralho', 'desgraça', 'idiota',
            'burro', 'imbecil', 'seu demônio', 'acursado'
        ];

        const lowerText = text.toLowerCase();
        return offensiveWords.some(word => lowerText.includes(word));
    },

    async sayGoodbye(chat, user) {
        const farewellMessages = [
            `👋 Até logo ${user.name || user.number}! Foi um prazer! 😊`,
            `😢 Que pena ${user.name || user.number} saiu... Volta logo! 🤗`,
            `Adeus ${user.name || user.number}! Esperamos você de volta! 👋`,
            `💔 ${user.name || user.number} deixou o grupo... Sentirei sua falta! 🌟`
        ];

        const random = farewellMessages[Math.floor(Math.random() * farewellMessages.length)];
        
        try {
            await chat.sendMessage(random);
            console.log(`👋 Despedida enviada para ${chat.name}`);
        } catch (error) {
            console.error('Erro ao enviar despedida:', error);
        }
    }
};

module.exports = moderation;