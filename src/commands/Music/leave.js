const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Sair do canal de voz",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);

        const emojiLeave = message.client.emoji.leave;

        await player.destroy(message.guild.id);

        let thing = new MessageEmbed()
            .setColor(message.client.embedColor)
            .setDescription(`${emojiLeave} **Sai do canal de voz**`);
        return message.reply({ embeds: [thing] });
    },
};