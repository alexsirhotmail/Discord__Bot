const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Parar a musica',
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
      let thing = new MessageEmbed().setColor('RED').setDescription('Não tem musica tocando.');
      return message.reply({ embeds: [thing] });
    }
    player.queue.length = 0;
    player.repeat = 'off';
    player.data.delete("autoplay")
    player.stopped = true;
    await player.player.stopTrack();
    Wait(500);
    const emojistop = client.emoji.stop;
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojistop} Pausada`);
    message.reply({ embeds: [thing] });
  },
};
