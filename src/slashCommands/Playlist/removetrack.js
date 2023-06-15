const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'removetrack',
  description: 'Remove musica da sua playlist.',
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
    {
      name: 'number',
      description: 'Posição da Musica',
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
    const Options = interaction.options.getString('number');
    if (!Options || isNaN(Options)) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Você não digitou o número da faixa (a faixa que deseja remover)\nVeja todas as suas faixas: ${prefix}info ${Name}`,
            ),
        ],
      });
    }
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `O número da faixa fornecida está fora do intervalo (\`0\` - ${
                tracks.length - 1
              })\nVeja todas as musicas: \`${prefix}info\` showdetails ${Name}`,
            ),
        ],
      });
    }
    await db.updateOne(
      {
        UserId: interaction.user.id,
        PlaylistName: Name,
      },
      {
        $pull: {
          Playlist: data.Playlist[Options],
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Removida **${tracks[Options].title}** de \`${Name}\``);
    return interaction.editReply({ embeds: [embed] });
  },
};