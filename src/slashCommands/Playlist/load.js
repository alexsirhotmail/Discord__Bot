const {
  MessageEmbed,
  CommandInteraction,
  Client,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'load',
  description: 'Tocar Playlist salva.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'name',
      description: 'Tocar Playlist salva',
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
    const player = await client.manager.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      deaf: true,
    });

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Não achei sua Playlist. tente digitar novamente o nome da playlist\n\nou use ${prefix}list para ver suas Playlist`,
            ),
        ],
      });
    }
    if (!player) return;

    let count = 0;
    const m = await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`Add ${length} musica da sua playlist **${Name}** para a fila.`),
      ],
    });
    for (const track of data.Playlist) {
      let s = await player.search(track.uri ? track.uri : track.title, interaction.user);
      if (s.type === 'PLAYLIST') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      } else if (s.type === 'TRACK') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      } else if (s.type === 'SEARCH') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      }
    }
    if (player && !player.current) player.destroy(interaction.guild.id);
    if (count <= 0 && m)
      return await m.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Não consequi add a musica da sua playlist **${name}** na fila.`),
        ],
      });
    if (m)
      return await m.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Add ${count} musica da sua playlist **${name}** na fila.`),
        ],
      });
  },
};
