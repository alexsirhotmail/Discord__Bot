const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'now',
  description: 'tocando agora',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
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
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar.');
      return interaction.editReply({ embeds: [thing] });
    }

    const emojimusic = client.emoji.music;
    var total = song.length;
    var current = player.player.position;

    let embed = new MessageEmbed()
      .addField(`${emojimusic} **Tocando agora**`, `[${song.title}](${song.uri})`)
      .addFields([
        {
          name: 'Duração',
          value: `\`[ ${convertTime(total)} ]\``,
          inline: true,
        },
        {
          name: 'Autor',
          value: `${player.current.author}`,
          inline: true,
        },
        {
          name: 'Pedida por',
          value: `[ ${song.requester} ]`,
          inline: true,
        },
        {
          name: '**Progresso**',
          value: `**[ ${progressbar(player)}** ] \n\`${convertTime(current)}  ${convertTime(
            total,
          )}\``,
          inline: true,
        },
      ])

      .setThumbnail(
        `${
          player.current.thumbnail
            ? player.current.thumbnail
            : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
        }`,
      )
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [embed] });
  },
};
