const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "guildDelete",
  run: async (client, guild) => {
    const channel = client.channels.cache.get(client.config.logs);
    let own = await guild?.fetchOwner()
    let text;
    guild.channels.cache.forEach(c => {
      if (c.type === "GUILD_TEXT" && !text) text = c;
    });
    const invite = await text.createInvite({ reason: `For ${client.user.tag} Developer(s)`, maxAge: 0 });
    const embed = new MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`📤 Saiu da Guilda !!`)
      .addField('Nome', `\`${guild.name}\``)
      .addField('ID', `\`${guild.id}\``)
      .addField('Dono', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"}\` ${own.id}\``)
      .addField('Quantidade de Membros', `\`${guild.memberCount}\` Members`)
      .addField('Data de criação', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
      .addField('Convite da Guilda', `[Aqui está ${guild.name} convite ](https://discord.gg/${invite.code})`)
      .addField(`${client.user.username}'s Quantidade de servers`, `\`${client.guilds.cache.size}\` Severs`)
      .setColor(client.embedColor)
      .setTimestamp()
    channel.send({ embeds: [embed] });
  }
};