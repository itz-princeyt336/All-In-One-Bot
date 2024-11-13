const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "boostcount",
  description: "to know guild boost",
  category: "INFORMATION",
  command: {
    enabled: true,
    aliases: ["bc", "bcount"],
  },
  slashCommand: {
    enabled: true,
    options: [],
  },

  async messageRun(message, args, client) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setFooter({ text: "Requested by " + message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setAuthor({ name: "BoostCount Panel", iconURL: message.client.user.displayAvatarURL() })
      .addFields([{ name: "**BoostCount**", value: `**${message.guild.premiumSubscriptionCount || '0'}**` }]);

    return message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setFooter({ text: "Requested by " + interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setAuthor({ name: "BoostCount Panel", iconURL: interaction.client.user.displayAvatarURL() })
      .addFields([{ name: "**BoostCount**", value: `**${interaction.guild.premiumSubscriptionCount || '0'}**` }]);

    return interaction.followUp({ embeds: [embed] });
  },
};
