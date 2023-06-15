const { MessageEmbed } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  description: 'mostre musica tocando',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    const song = player.current;
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não tem musica tocando.');
      return message.channel.send(thing);
    }

    const emojimusic = client.emoji.music;
    var total = song.length;
    var current = player.player.position;

    let embed = new MessageEmbed()
      .addField(`${emojimusic} **Tocando agora: **`, `[${song.title}](${song.uri})`)
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
    return message.channel.send({ embeds: [embed] });
  },
};
