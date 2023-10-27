const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: '🏓 Verificar meu ping!',
    run: async (client, interaction) => {
        let pembed = new EmbedBuilder()
            .setColor('#2F3136')
            .setTitle('Ping do Cliente')
            .addFields({ name: '**Latência**',
                value: `\`${Date.now() - interaction.createdTimestamp}ms\``
            })
            .addFields({ name: '**Latência da API**',
                value: `\`${Math.round(client.ws.ping)}ms\``
            })
            .setTimestamp()
            .setImage("https://i.imgur.com/Szqaevm.png")
            .setThumbnail('https://i.imgur.com/0mCSFkI.png')
            .setFooter({
              text: `©️ ShadowHeart`, 
              iconURL: ('https://i.imgur.com/0mCSFkI.png')
          });
        interaction.reply({
            embeds: [pembed]
        });
    },
};
