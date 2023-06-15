const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  aliases: ['l'],
  category: 'Music',
  description: 'Repeatir musica',
  args: true,
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
      let thing = new MessageEmbed().setColor('RED').setDescription('não tem musica tocando.');
      return message.reply({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (['q', 'queue'].includes(args[0])) {
      await player.setLoop('queue');
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop de busca está **Ativo**`);
      return message.reply({ embeds: [thing] });
    } else if (['track', 't'].includes(args[0])) {
      await player.setLoop('track');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop de musica está **Ativo**`);
      return message.reply({ embeds: [thing] });
    } else if (['off', 'c', 'clear'].includes(args[0])) {
      await player.setLoop('off');

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`${emojiloop} Loop está **desativado**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
