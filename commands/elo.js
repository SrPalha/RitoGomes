const axios = require('axios');
const { ApplicationCommandOptionType } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'elo',
    description: 'Busca informações de um invocador no League of Legends',
    options: [
        {
            name: 'invocador',
            description: 'Nome de invocador',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    async execute(interaction) {
        const summonerName = interaction.options.getString('invocador');

        try {
            // Faz uma solicitação para obter informações do invocador
            const summonerResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
                headers: {
                    'X-Riot-Token': config.riotapi,
                },
            });

            // ID do invocador
            const summonerId = summonerResponse.data.id;

            // Faz uma solicitação para obter informações sobre as classificações do jogador
            const rankedResponse = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
                headers: {
                    'X-Riot-Token': config.riotapi,
                },
            });

            // Informações sobre as classificações do jogador
            const rankedInfo = rankedResponse.data;

            // Envia uma resposta com as informações do jogador
            // inside a command, event listener, etc.
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Nome de Invocador')
                .setAuthor({ name: 'RITO GOMES', iconURL: 'https://i.imgur.com/lmIumW4.png'})
                .setDescription(`${summonerName}`)
                .setThumbnail('https://i.imgur.com/lmIumW4.png')
                .addFields(
                    { name: '\u200B', value: ' ' },
                    { name: '__RANQUEADA SOLO/DUO__', value: `${rankedInfo[0].tier} ${rankedInfo[0].rank}`, inline: true },
                    { name: '__VITÓRIAS__', value: `${rankedInfo[0].wins}`, inline: true },
                )
                .addFields({ name: 'PDL', value: `${rankedInfo[0].leaguePoints}`, inline: true })
                .setImage('https://i.imgur.com/CMcOG1B.jpg')
                .setTimestamp()
                .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/lmIumW4.png' });

            interaction.reply({ embeds: [exampleEmbed] });

        } catch (error) {
            console.error(error);
            interaction.reply('Ocorreu um erro ao buscar informações do invocador.');
        }
    },
};
