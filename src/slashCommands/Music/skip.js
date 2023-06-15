const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'prox',
  description: 'proxima musica.',
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
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
    if (player.queue.length == 0) {
      let noskip = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`Não há mais musicas na lista para pular.`);
      return interaction.editReply({ embeds: [noskip] });
    }

    await player.player.stopTrack();

    const emojiskip = client.emoji.skip;

    let thing = new MessageEmbed()
      .setDescription(`${emojiskip} **Proxima**\n[${player.current.title}](${player.current.uri})`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] });
  },
};
