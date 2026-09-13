// Módulo de Jogos
const games = {
    gameStates: {}, // Armazena estados dos jogos

    async showGames(msg, chat) {
        const gamesMessage = `
╔════════════════════════════════════╗
║        🎮 JOGOS DISPONÍVEIS 🎮    ║
╚════════════════════════════════════╝

1️⃣ *Adivinhe o Número*
   Comando: !jogo adivinha
   Adivinhe um número de 1-100

2️⃣ *Perguntas Trivia*
   Comando: !jogo trivia
   Responda perguntas de conhecimento geral

3️⃣ *Pedra, Papel e Tesoura*
   Comando: !jogo pedrapapeltesoura
   Jogue contra o bot!

4️⃣ *Charadas*
   Comando: !jogo charada
   Resolva charadas divertidas

5️⃣ *Verdadeiro ou Falso*
   Comando: !jogo verdadeirofalso
   Teste seu conhecimento

6️⃣ *Piadas*
   Comando: !jogo piada
   Ouça piadas engraçadas

7️⃣ *Quiz de Personalidade*
   Comando: !jogo quiz
   Descubra fatos sobre você

🏆 Desafie seus amigos! 
Digite: !jogo <tipo>

Boa diversão! 🎉
        `;

        try {
            await chat.sendMessage(gamesMessage);
        } catch (error) {
            console.error('Erro ao listar jogos:', error);
        }
    },

    async playGame(msg, chat, gameType, sender) {
        const gameType_lower = gameType.toLowerCase().trim();

        try {
            switch(gameType_lower) {
                case 'adivinha':
                case 'adivinhacao':
                case 'número':
                    await this.guessNumber(msg, chat, sender);
                    break;
                
                case 'trivia':
                case 'pergunta':
                    await this.triviaGame(msg, chat, sender);
                    break;
                
                case 'pedrapapeltesoura':
                case 'jokenpo':
                    await this.rockPaperScissors(msg, chat, sender);
                    break;
                
                case 'charada':
                    await this.riddle(msg, chat, sender);
                    break;
                
                case 'verdadeirofalso':
                case 'v_ou_f':
                    await this.trueOrFalse(msg, chat, sender);
                    break;
                
                case 'piada':
                case 'joke':
                    await this.joke(msg, chat, sender);
                    break;
                
                case 'quiz':
                    await this.personalityQuiz(msg, chat, sender);
                    break;
                
                default:
                    await chat.sendMessage(`❌ Jogo "${gameType}" não encontrado!\nDigite *!jogos* para ver os jogos disponíveis`);
            }
        } catch (error) {
            console.error('Erro ao jogar:', error);
            await chat.sendMessage('❌ Erro ao iniciar o jogo. Tente novamente!');
        }
    },

    async guessNumber(msg, chat, sender) {
        const number = Math.floor(Math.random() * 100) + 1;
        const gameId = `${chat.id}_${sender}`;
        
        this.gameStates[gameId] = { number, attempts: 0, maxAttempts: 7 };

        const message = `
🎮 *Adivinhe o Número* 🎮
${sender}, pensei em um número entre 1 e 100!
Você tem 7 tentativas! 🎯

Digite o número que acha que é!
        `;

        await chat.sendMessage(message);
    },

    async triviaGame(msg, chat, sender) {
        const triviaQuestions = [
            { q: 'Qual é a capital do Brasil?', a: 'brasília' },
            { q: 'Quantos continentes existem?', a: '7' },
            { q: 'Qual é o planeta mais próximo do Sol?', a: 'mercúrio' },
            { q: 'Em que ano o Brasil foi descoberto?', a: '1500' },
            { q: 'Qual é o maior oceano?', a: 'pacífico' }
        ];

        const random = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        
        this.gameStates[`${chat.id}_${sender}_trivia`] = { answer: random.a };

        const message = `
❓ *Pergunta Trivia* ❓
${random.q}

Responda aqui! ✍️
        `;

        await chat.sendMessage(message);
    },

    async rockPaperScissors(msg, chat, sender) {
        const options = ['🪨 Pedra', '📄 Papel', '✂️ Tesoura'];
        const botChoice = Math.floor(Math.random() * 3);

        const message = `
🎮 *Pedra, Papel e Tesoura* 🎮

Digite sua escolha:
🪨 pedra
📄 papel
✂️ tesoura

Vamos jogar ${sender}!
        `;

        this.gameStates[`${chat.id}_${sender}_rps`] = { botChoice };
        await chat.sendMessage(message);
    },

    async riddle(msg, chat, sender) {
        const riddles = [
            { q: 'Tenho cidades, mas não tenho casas. Tenho montanhas, mas não tenho árvores. O que sou?', a: 'mapa' },
            { q: 'Quanto mais você tira, mais você deixa. O que sou?', a: 'pegadas' },
            { q: 'Sou redonda, tenho cor vermelha, e as pessoas comem. O que sou?', a: 'maçã' },
            { q: 'Tenho folhas, mas não sou árvore. O que sou?', a: 'livro' },
            { q: 'Posso viajar pelo mundo sem sair do canto. O que sou?', a: 'selo' }
        ];

        const random = riddles[Math.floor(Math.random() * riddles.length)];
        this.gameStates[`${chat.id}_${sender}_riddle`] = { answer: random.a };

        const message = `
🧩 *Charada* 🧩

${random.q}

Qual é a resposta ${sender}? 🤔
        `;

        await chat.sendMessage(message);
    },

    async trueOrFalse(msg, chat, sender) {
        const questions = [
            { q: 'A Terra é plana?', a: 'falso' },
            { q: 'Os dinossauros ainda vivem?', a: 'falso' },
            { q: 'A água ferve a 100°C ao nível do mar?', a: 'verdadeiro' },
            { q: 'A Lua é feita de queijo?', a: 'falso' },
            { q: 'Existem 365 dias em um ano?', a: 'verdadeiro' }
        ];

        const random = questions[Math.floor(Math.random() * questions.length)];
        this.gameStates[`${chat.id}_${sender}_tf`] = { answer: random.a };

        const message = `
✅ *Verdadeiro ou Falso* ❌

${random.q}

Digite: verdadeiro ou falso
        `;

        await chat.sendMessage(message);
    },

    async joke(msg, chat, sender) {
        const jokes = [
            '😄 Por que o livro de matemática se suicidou?\nPorque tinha muitos problemas!',
            '😄 Qual é o cúmulo para um eletricista?\nApanhar choque!',
            '😄 Por que a melancia caiu do caminhão?\nPorque era melancia mesmo!',
            '😄 O que um peixe disse para o outro peixe?\nNada!',
            '😄 Por que o tomate ficou vermelho?\nPorque viu o molho! 🍅',
            '😄 Como se chama um boomerang que não volta?\nPau!'
        ];

        const random = jokes[Math.floor(Math.random() * jokes.length)];
        await chat.sendMessage(random);
    },

    async personalityQuiz(msg, chat, sender) {
        const message = `
🎭 *Quiz de Personalidade* 🎭

Pergunta: Qual é seu super poder?
A) 💪 Força
B) 🧠 Inteligência
C) 💨 Velocidade
D) 👁️ Visão

Digite sua resposta (A, B, C ou D)
        `;

        this.gameStates[`${chat.id}_${sender}_quiz`] = { started: true };
        await chat.sendMessage(message);
    }
};

module.exports = games;