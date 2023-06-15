const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'leave',
  description: 'Sair do canal de voz',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: false,
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

    const emojiLeave = interaction.client.emoji.leave;

    await player.destroy(interaction.guild.id);

    let thing = new MessageEmbed()
      .setColor(interaction.client.embedColor)
      .setDescription(`${emojiLeave} **Sai do canal de voz**`);
    return interaction.editReply({ embeds: [thing] });
  },
};
