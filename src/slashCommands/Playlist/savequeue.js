const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'savequeue',
  description: 'Salvar Fila na playlist',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
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

    const player = client.manager.players.get(interaction.guildId);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription(`There is no music playing.`);
      return interaction.editReply({ embeds: [thing] });
    }

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist nao encontrada, digite o nome correto da playlist.`),
        ],
      });
    }
    if (data.length == 0) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist nao encontrada, digite o nome correto da playlist.`),
        ],
      });
    }

    const song = player.current;
    const tracks = player.queue;

    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    const newSong = [];
    if (player.current) {
      newSong.push({
        title: song.title,
        uri: song.uri,
        author: song.author,
        duration: song.length,
      });
    }
    for (const track of tracks)
      newSong.push({
        title: track.title,
        uri: track.uri,
        author: track.author,
        duration: track.length,
      });
    const playlist = oldSong.concat(newSong);
    await db.updateOne(
      {
        UserId: interaction.user.id,
        PlaylistName: Name,
      },
      {
        $set: {
          Playlist: playlist,
        },
      },
    );
    const embed = new MessageEmbed()
      .setDescription(`**Add** \`${playlist.length - oldSong.length}\`musica em \`${Name}\``)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [embed] });
  },
};

