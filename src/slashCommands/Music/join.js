const { MessageEmbed, CommandInteraction, Client, Permissions } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Entrar no canal de voz',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const { channel } = interaction.member.voice;
    const player = client.manager.players.get(interaction.guild.id);
    if (player) {
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Já estou conectado no <#${player.voice}>!`),
        ],
      });
    } else {
      if (
        !interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `Voce não tem permissão \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      if (
        !interaction.guild.me
          .permissionsIn(channel)
          .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `Voce não tem permissão \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

      const emojiJoin = interaction.client.emoji.join;

      await client.manager.createPlayer({
        guildId: interaction.guild.id,
        voiceId: interaction.member.voice.channel.id,
        textId: interaction.channel.id,
        deaf: true,
      });

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(
          `${emojiJoin} **Entrei no canal de voz **\nPinguei <#${channel.id}>  <#${interaction.channel.id}>`,
        );
      return interaction.editReply({ embeds: [thing] });
    }
  },
};
