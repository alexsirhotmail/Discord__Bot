const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'delete',
  description: 'Delete sua playlist.',
  usage: '<Nome da Playlist>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  options: [
    {
      name: 'name',
      description: 'Nome da Playlist',
      required: true,
      type: 'STRING',
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({});

    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Você não tem uma playlist com o nome:  **${Name}** name`),
        ],
      });
    }

    if (data.length == 0) {
      return interaction.editReply({
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
      .setDescription(`Playlist ${Name} deletada com sucesso`);
    return interaction.editReply({ embeds: [embed] });
  },
};
