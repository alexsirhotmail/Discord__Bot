const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'limpar',
  description: 'limpar fila de musicas',
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
      let thing = new MessageEmbed().setColor('RED').setDescription('Sem musica para tocar');
      return interaction.editReply({ embeds: [thing] });
    }
    if (!player.queue[0]) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('Não há nada na lista');
      return interaction.editReply({ embeds: [thing] });
    }
    var size = player.queue[0];
    player.queue = [];

    await player.queue.push(size);

    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Fila limpa com sucesso`);
    await interaction.editReply({ embeds: [embed] });
  },
};
