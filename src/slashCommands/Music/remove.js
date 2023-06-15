const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'remover',
  description: 'Remove musica da lista',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'number',
      description: 'Number of song in queue',
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
    const player = client.manager.players.get(interaction.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar.');
      return interaction.editReply({ embeds: [thing] });
    }

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Sem musica na posição ${number}.\nTotal Songs: ${player.queue.length}`);
      return interaction.editReply({ embeds: [thing] });
    }

    const song = player.queue[position];

    await player.queue.splice(position);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojieject} Removida\n[${song.title}](${song.uri})`);
    return interaction.editReply({ embeds: [thing] });
  },
};
