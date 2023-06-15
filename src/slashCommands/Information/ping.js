const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'retorna o ping do usuario',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    await interaction.editReply({ content: 'Pingando...' }).then(async () => {
      const ping = Date.now() - interaction.createdAt;
      const api_ping = client.ws.ping;

      await interaction.editReply({
        content: ' ',
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `\`\`\`ini\n[ Bot Latencia ] :: ${ping}ms \n[ API Latencia ] :: ${api_ping}ms \`\`\``,
            ),
        ],
      });
    });
  },
};
