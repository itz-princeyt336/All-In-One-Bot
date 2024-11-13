const { commandHandler, automodHandler, statsHandler } = require("@src/handlers");
const { PREFIX_COMMANDS, EMBED_COLORS } = require("@root/config");
const { getSettings } = require("@schemas/Guild");
const { EmbedBuilder } = require("discord.js");
const UserNoPrefix = require("@schemas/NoPrefix");

/**
 * @param {import('@src/structures').BotClient} client
 * @param {import('discord.js').Message} message
 */
module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const settings = await getSettings(message.guild);

  // AFK System Start
  if (client.afkUsers && client.afkUsers.has(message.author.id)) {
    client.afkUsers.delete(message.author.id);
    
    // Remove AFK from nickname
    try {
      const newNick = message.member.displayName.replace(/^\[AFK\] /, '');
      await message.member.setNickname(newNick);
    } catch (err) {
      // Ignore nickname errors
    }

    await message.reply({
      content: `Welcome back! I've removed your AFK status.`,
      ephemeral: false
    });
  }

  // Check for mentions of AFK users
  if (message.mentions.users.size > 0 && client.afkUsers) {
    message.mentions.users.forEach(async (mentionedUser) => {
      if (client.afkUsers.has(mentionedUser.id)) {
        const afkData = client.afkUsers.get(mentionedUser.id);
        const timePassed = Math.floor((Date.now() - afkData.timestamp) / 1000 / 60); // in minutes
        
        await message.reply({
          content: `${mentionedUser.username} is AFK: ${afkData.reason} (${timePassed} minutes ago)`,
          ephemeral: false
        });
      }
    });
  }
  // AFK System End

  // Enhanced Bot Mention Response
  if (message.content.startsWith(client.user.toString())) {
    const messageContent = message.content.replace(/<@(!)?\d+>/, "").trim();
    if (!messageContent) {
      const embed = new EmbedBuilder()
        .setTitle("Hey, What's up?")
        .setThumbnail(client.user.displayAvatarURL({ size: 2048, dynamic: true }))
        .setDescription(
          `Hello, ${message.author}! It seems like you summoned me. My prefix is \`${settings.prefix}\`. Invoke \`${settings.prefix}help\` to see my all commands!`
        )
        .setColor(EMBED_COLORS.BOT_EMBED)
        .setTimestamp();

      message.safeReply({ embeds: [embed] });
      return;
    }
  }

  // Command Handler with No-Prefix Support
  let isCommand = false;
  
  if (PREFIX_COMMANDS.ENABLED && message.content.startsWith(settings.prefix)) {
    const invoke = message.content.replace(`${settings.prefix}`, "").split(/\s+/)[0];
    const cmd = client.getCommand(invoke);
    if (cmd) {
      isCommand = true;
      commandHandler.handlePrefixCommand(message, cmd, settings);
    }
  } else {
    const userNoPrefix = await UserNoPrefix.findOne({ userId: message.author.id });
    if (userNoPrefix && userNoPrefix.noPrefixEnabled) {
      const invoke = message.content.split(/\s+/)[0].toLowerCase();
      const cmd = client.getCommand(invoke);
      if (cmd) {
        isCommand = true;
        commandHandler.handlePrefixCommand(message, cmd, settings);
      }
    }
  }

  // Stats and Automod Handler
  if (settings.stats.enabled) await statsHandler.trackMessageStats(message, isCommand, settings);
  if (!isCommand && !settings.chatbotId) await automodHandler.performAutomod(message, settings);
};
