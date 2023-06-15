const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Help',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setDescription(
        ` Hello There!! **<@${message.author.id}>**, Eu sou o <@${client.user.id}>. \n\nA Bot para discord, pronto para ajudar a Alcateia, \n\n🎵 • Musicas \n🗒️ • Playlists\nℹ️ • Informações\n⚙️ • Configurações\n🎙️ • Filtros\n\n *Escolha uma categoria e veja os comandos* \n\n`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Solicitado por ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Wave Music Help')
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '<:aromaxmusic:989038491247706113>',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:aromaxsearch:989038119825326090>',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<:aromaxadd:989038385287024660>',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<:aromaxtdot:989038605970341988>',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '<:aromaxqueue:989037049971621979>',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '<:aromaxspotify:989026884635471892>',
            }
          ])
      )

    const m = await message.reply({ embeds: [embed], components: [row] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help`)
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '<:aromaxmusic:989038491247706113>',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '<:aromaxsearch:989038119825326090>',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: '<:aromaxadd:989038385287024660>',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '<:aromaxtdot:989038605970341988>',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '<:aromaxqueue:989037049971621979>',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '<:aromaxspotify:989026884635471892>',
            }
          ])
      )


    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
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
    }
    )

  },
};