module.exports = (client, interaction) => {
  // Verifique se a interação é um comando de barra
  if (interaction.isCommand()) {
    // Obtenha o comando da coleção de comandos de barra
    const command = client.interactions.get(interaction.commandName);

    // Se o comando não existir, retorne uma mensagem de erro
    if (!command) {
      return interaction.reply({
        content: "Algo deu errado | Talvez o comando não esteja registrado?",
        ephemeral: true
      });
    }

    // Execute o comando
    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply('Ocorreu um erro ao executar o comando.');
    }
  }
};
