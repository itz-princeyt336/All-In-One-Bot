const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const UserNoPrefix = require("../../database/schemas/NoPrefix");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "noprefix",
  description: "Manage no-prefix settings for a user",
  cooldown: 0,
  category: "OWNER",
  botPermissions: ["EmbedLinks"],
  userPermissions: [],
  command: {
    enabled: true,
    aliases: [],
    usage: "<user_id> <enable | disable>",
    minArgsCount: 2,
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "user",
        description: "The user id to manage no prefix settings for",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "action",
        description: "Enable or disable no-prefix commands",
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
          { name: "Enable", value: "enable" },
          { name: "Disable", value: "disable" },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    const userId = args.shift();
    const action = args.shift()?.toLowerCase();
    const response = await manageNoPrefix(userId, action, message.client);

    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const userId = interaction.options.getString("user");
    const action = interaction.options.getString("action");
    const response = await manageNoPrefix(userId, action, interaction.client);

    await interaction.followUp(response);
  },
};

async function manageNoPrefix(userId, action, client) {
  const user = await client.users.fetch(userId);

  if (!user) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setDescription("User not found.");
    return { embeds: [embed] };
  }

  const userNoPrefix = await UserNoPrefix.findOne({ userId });

  if (action === "enable" && userNoPrefix?.noPrefixEnabled) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setDescription(`${user.tag} already has no prefix access.`);
    return { embeds: [embed] };
  }

  if (action === "disable" && !userNoPrefix?.noPrefixEnabled) {
    const embed = new EmbedBuilder()
      .setColor(EMBED_COLORS.BOT_EMBED)
      .setDescription(`${user.tag} does not have no prefix access.`);
    return { embeds: [embed] };
  }

  await UserNoPrefix.findOneAndUpdate(
    { userId },
    { noPrefixEnabled: action === "enable" },
    { new: true, upsert: true }
  );

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setTitle(`No Prefix ${action === "enable" ? "Enabled" : "Disabled"}`)
    .setDescription(`No prefix has been ${action === "enable" ? "enabled" : "disabled"} for ${user.tag}.`)
    .setTimestamp();

  return { embeds: [embed] };
}