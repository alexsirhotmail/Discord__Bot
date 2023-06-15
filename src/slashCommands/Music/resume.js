const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resume musica atual',
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
    const song = player.current;

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar!');
      return interaction.editReply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojiresume} Sua musica já está tocando.`);
      return interaction.editReply({ embeds: [thing] });
    }

    await player.setPaused(false);

    let thing = new MessageEmbed()
      .setDescription(`${emojiresume} **Continuando**\n[${song.title}](${song.uri})`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] });
  },
};
