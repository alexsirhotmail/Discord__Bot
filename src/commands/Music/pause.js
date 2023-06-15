const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause na musica atual",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);

        if (!player.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há musica para tocar.");
            return message.reply({ embeds: [thing] });
        }

        const emojipause = client.emoji.pause;

        if (player.player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} O player já está pausado.`);
            return message.reply({ embeds: [thing] });
        }

        await player.setPaused(true);

        const song = player.current;

        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojipause} **Pausado**\n[${song.title}](${song.uri})`);
        return message.reply({ embeds: [thing] });
    },
};
