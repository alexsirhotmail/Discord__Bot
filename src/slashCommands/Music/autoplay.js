const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: "autoplay",
    description: "AutoPlay de musicas",
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: true,
    dj: true,
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
        const player = client.manager.players.get(interaction.guild.id);
        const emojireplay = client.emoji.autoplay;
        player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", interaction.user);
        let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
            .setDescription(`${emojireplay} Autoplay ativo ${player.data.get("autoplay") ? "**Ativo**" : "**desativado**"}.`)
        return interaction.editReply({ embeds: [thing] });
    }
}