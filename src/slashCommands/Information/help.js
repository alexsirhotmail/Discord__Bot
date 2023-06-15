const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Return all commands',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const prefix = client.prefix;

    await interaction.deferReply({
      ephemeral: false,
    });

    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setDescription(
        ` Hello There!! **<@${interaction.user.id}>**, Eu sou o <@${client.user.id}>.  \n\nUm bot para Discord criado para ajudar a alcateia, \nSuporte para varios recursos \n\n\`🎵\`• Musica\n\`🗒️\`• Playlists\n\`ℹ️\`• Informações\n\`⚙️\`•Config\n\`🎙️\`•Filtros\n\n *Escolha uma categoria e veja os comandos* \n\n`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Solicitado por ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('helpop')
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder('Opções')
        .addOptions([
          {
            label: 'Musica',
            value: 'music',
            emoji: '🎼',
          },
          {
            label: ' Info',
            value: 'info',
            emoji: 'ℹ️',
          },
          {
            label: 'Config',
            value: 'settings',
            emoji: '⚙️',
          },
          {
            label: 'Playlist',
            value: 'playlist',
            emoji: '🗒️',
          },
          {
            label: 'Home',
            value: 'home',
            emoji: '🏠',
          },
        ]),
    );

    const m = await interaction.editReply({ embeds: [embed], components: [row] });

    const row2 = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('disable_h')
        .setDisabled(true)
        .setPlaceholder(`Timeout do ${prefix}help`)
        .addOptions([
          {
            label: 'Music',
            value: 'music',
            emoji: '🎼',
          },
          {
            label: ' Filter',
            value: 'filter',
            emoji: '🎙️',
          },
          {
            label: ' Info',
            value: 'info',
            emoji: 'ℹ️',
          },
          {
            label: 'Settings',
            value: 'settings',
            emoji: '⚙️',
          },
          {
            label: 'Playlist',
            value: 'playlist',
            emoji: '🗒️',
          },
          {
            label: 'Home',
            value: 'home',
            emoji: '🏠',
          },
        ]),
    );

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === interaction.user.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: 'SELECT_MENU',
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => {});
    });

    collector.on('collect', (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Comandos de Musica')
          .setFooter({ text: `Total de ${_commands.length} comandos de Musica.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Filter Commands')
          .setFooter({ text: `Total ${_commands.length} Filter commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Comandos de PlayList')
          .setFooter({ text: `Total de ${_commands.length} comandos de PlayList.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Comandos de Configuração')
          .setFooter({ text: `Total de ${_commands.length} comandos de Configuração.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Comandos de Informação')
          .setFooter({ text: `Total de ${_commands.length} comandos de Informação.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    });
  },
};
