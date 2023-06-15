const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'misturar',
  description: 'embaralhar lista',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar!.');
      return interaction.editReply({ embeds: [thing] });
    }
    const emojishuffle = client.emoji.shuffle;

    let thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Lista embaralhada`)
      .setColor(client.embedColor);
    await player.shuffle();
    return interaction
      .editReply({ embeds: [thing] })
      .catch((error) => client.logger.log(error, 'error'));
  },
};
