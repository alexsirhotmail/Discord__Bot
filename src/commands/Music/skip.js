const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'Proxima musica.',
  args: false,
  usage: '',
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
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar.');
      return message.reply({ embeds: [thing] });
    }
    if (player.queue.length == 0) {
      let noskip = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`Não existe musicas na lista.`);
      return message.reply({ embeds: [noskip] });
    }

    await player.player.stopTrack();

    const emojiskip = client.emoji.skip;

    let thing = new MessageEmbed()
      .setDescription(`${emojiskip} **Proxima**\n[${player.current.title}](${player.current.uri})`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  },
};
