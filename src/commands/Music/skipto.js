const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skipto',
  aliases: ['jump'],
  category: 'Music',
  description: 'Musica anterior',
  args: true,
  usage: '<Number of song in queue>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica tocando.');
      return message.reply({ embeds: [thing] });
    }

    const position = Number(args[0]);

    if (!position || position < 0 || position > player.queue.length) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Use: ${message.client.prefix} Voltar para <Numero de musicas na lista>`);
      return message.reply({ embeds: [thing] });
    }
    if (args[0] == 1) player.player.stopTrack();
    player.queue.splice(0, position - 1);
    await player.player.stopTrack();

    const emojijump = client.emoji.jump;

    let thing = new MessageEmbed()
      .setDescription(`${emojijump} Voltei **${position}** Musicas`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] });
  },
};
