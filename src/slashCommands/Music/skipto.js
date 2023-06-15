const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skipto',
  description: 'Pular para musica na posição',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'number',
      description: 'select a song number',
      required: true,
      type: 'NUMBER',
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const args = interaction.options.getNumber('number');
    const player = client.manager.players.get(interaction.guildId);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar!.');
      return await interaction.editReply({ embeds: [thing] });
    }

    const position = Number(args);

    if (!position || position < 0 || position > player.queue.size) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Uso: ${prefix}volume <Numero de musicas na lista>`);
      return await interaction.editReply({ embeds: [thing] });
    }
    if (args[0] == 1) player.player.stopTrack();
    player.queue.splice(0, position - 1);
    await player.player.stopTrack();

    const emojijump = client.emoji.jump;

    let thing = new MessageEmbed()
      .setDescription(`${emojijump} Avanço para **${position}** Musicas`)
      .setColor(client.embedColor);
    return await interaction.editReply({ embeds: [thing] });
  },
};
