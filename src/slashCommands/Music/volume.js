const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Volume em porcentagem.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'number',
      description: 'give your volume number ',
      required: true,
      type: 'NUMBER',
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const emojivolume = client.emoji.volumehigh;

    const vol = interaction.options.getNumber('number');

    const player = client.manager.players.get(interaction.guildId);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar!.');
      return interaction.editReply({ embeds: [thing] });
    }
    const volume = Number(vol);
    if (!volume || volume < 0 || volume > 100)
      return await interaction
        .editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(`Usage: ${client.prefix}volume <Number of volume between 0 - 100>`),
          ],
        })
        .catch(() => {});
    await player.setVolume(volume / 1);
    if (volume > player.volume)
      return await interaction
        .editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(`${emojivolume} Volume mudou para: **${volume}%**`),
          ],
        })
        .catch(() => {});
    else if (volume < player.volume)
      return await interaction
        .editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(`${emojivolume} Volume mudou para: **${volume}%**`),
          ],
        })
        .catch(() => {});
    else
      await interaction
        .editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(`${emojivolume} Volume mudou para: **${volume}%**`),
          ],
        })
        .catch(() => {});
  },
};
