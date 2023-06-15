const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'loop',
  description: 'loop de musica',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'input',
      description: 'looping (musica).',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'Musica',
          value: 'track',
        },
        {
          name: 'Lista',
          value: 'queue',
        },
        {
          name: 'Desativar',
          value: 'off',
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    if (!interaction.replied) await interaction.deferReply().catch(() => {});
    
    const input = interaction.options.getString('input');

    let player = client.manager.players.get(interaction.guildId);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('Não há musica para tocar.');
      return message.channel.send({ embeds: [thing] });
    }
    const emojiloop = client.emoji.loop;

    if (input === 'track') {
      await player.setLoop('track');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop de musica **Ativado**`),
        ],
      });
    } else if (input === 'queue') {
      await player.setLoop('queue');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop de lista **Ativado**`),
        ],
      });
    } else if (input === 'off') {
      await player.setLoop('off');
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiloop} Loop está **Desativado**`),
        ],
      });
    }
  },
};
