const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  partials: [
    Partials.Message, // para mensagens
    Partials.Channel, // para canais de texto
    Partials.GuildMember, // para membros do servidor
    Partials.Reaction, // para reações a mensagens
  ],
  intents: [
    GatewayIntentBits.Guilds, // para ações relacionadas ao servidor
    GatewayIntentBits.GuildInvites, // para gerenciar convites do servidor
    GatewayIntentBits.GuildMessages, // para mensagens do servidor
    GatewayIntentBits.GuildMessageReactions, // para reações a mensagens
    GatewayIntentBits.MessageContent, // ative se você precisar de informações de conteúdo de mensagem
  ],
});
const fs = require("fs");
const config = require("./config.json");
client.config = config;

/* Carregar todos os eventos (baseados no Discord) */

fs.readdir("./events/discord", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Evento]   ✅  Carregado: ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});

// Permitir que comandos sejam uma nova coleção (comandos de mensagens)
client.commands = new Discord.Collection();
/* Carregar todos os comandos */
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`[Comando] ✅  Carregado: ${commandName}`);
  });
});

// Permitir que interações sejam uma nova coleção (comandos de barra)
client.interactions = new Discord.Collection();
// Criar um array vazio para registrar comandos de barra
client.register_arr = [];
/* Carregar todos os comandos de barra */
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props);
  });
});

// Fazer login através do cliente
client.login(config.token);
