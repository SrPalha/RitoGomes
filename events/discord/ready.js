const register = require('../../utils/slashsync');
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: '1'
  })), {
    debug: true
  });
  
  console.log(`[/] Comandos Slash Carregados ✅!`);
  
  let invite = `https://discord.com/api/oauth2/authorize?client_id=1148000326385930251&permissions=8&scope=applications.commands%20bot`;
  
  console.log(`[STATUS] ${client.user.tag} esta online!\n[INFO] Bot criado por Patrik https://www.github.com/SrPalha\n[Invite Link] ${invite}`);
  
  client.user.setPresence({
    activities: [{ name: `League of Legends`, type: ActivityType.Playing , application_asset_id: 'bg3.png' }],
    status: 'online',
  });
};
