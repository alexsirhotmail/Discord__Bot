const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'delete',
  aliases: ['pldelete'],
  category: 'Playlist',
  description: 'Delete your saved playlist.',
  args: false,
  usage: '<Nome da Playlist>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Você não tem uma playlist com o nome:  **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Você não tem uma playlist com o nome:  **${Name}** name`),
        ],
      });
    }
    await data.delete();
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Successfully deleted ${Name} playlist`);
    return message.channel.send({ embeds: [embed] });
  },
};
