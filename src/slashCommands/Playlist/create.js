const { MessageEmbed, CommandInteraction, Client} = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'create',
  description: "pega a playlist do usuario.",
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

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({});

    const Name = interaction.options.getString('name');
    const data = await db.find({ UserId: interaction.member.user.id, PlaylistName: Name });

    if (Name.length > 10) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist não pode conter mais de 10 Charecteres`),
        ],
      });
    }
    if (data.length > 0) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Essa playlist já Exists! delete usando: \`${prefix}\`delete \`${Name}\``,
            ),
        ],
      });
    }
    let userData = db.find({
      UserId: interaction.user.id,
    });
    if (userData.length >= 10) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Voce nao pode criar 10 Playlists`),
        ],
      });
    }
    const newData = new db({
      UserName: interaction.user.tag,
      UserId: interaction.user.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    const embed = new MessageEmbed()
      .setDescription(`Playlist criado com sucesso:  **${Name}**`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [embed] });
  },
};
