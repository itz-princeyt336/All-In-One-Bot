const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "steal",
  description: "Steal emojis or stickers from other servers",
  category: "ADMIN",
  command: {
    enabled: true,
    usage: "COMMAND",
    minArgsCount: 2,
    subcommands: [
      {
        trigger: "emoji <emoji> <name>",
        description: "Steal an emoji from another server",
      },
      {
        trigger: "sticker <url> <name>",
        description: "Steal a sticker from another server",
      },
    ],
  },
  slashCommand: {
    enabled: true,
    options: [
      {
        name: "emoji",
        description: "Steal an emoji from another server",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "emoji",
            description: "The emoji to steal",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: "name",
            description: "Name for the new emoji",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
        ],
      },
      {
        name: "sticker",
        description: "Steal a sticker from another server",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "url",
            description: "URL of the sticker to steal",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
          {
            name: "name",
            description: "Name for the new sticker",
            type: ApplicationCommandOptionType.String,
            required: true,
          },
        ],
      },
    ],
  },

  async messageRun(message, args) {
    const subcommand = args.shift();
    const response = await handleSteal(subcommand, args, message.guild);
    await message.safeReply(response);
  },

  async interactionRun(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const response = await handleSteal(subcommand, interaction.options, interaction.guild);
    await interaction.followUp(response);
  },
};

async function handleSteal(subcommand, options, guild) {
  let embed;

  if (subcommand === "emoji") {
    const emoji = options.getString ? options.getString("emoji") : options.shift();
    const name = options.getString ? options.getString("name") : options.join(" ");
    const emojiId = emoji.match(/\d+/)[0];
    const emojiURL = `https://cdn.discordapp.com/emojis/${emojiId}.png`;

    try {
      await guild.emojis.create({ attachment: emojiURL, name });
      embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Emoji **${name}** has been added successfully!`);
    } catch {
      embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("Unable to add emoji. Please check if the emoji source is valid.");
    }
  } else if (subcommand === "sticker") {
    const url = options.getString ? options.getString("url") : options.shift();
    const name = options.getString ? options.getString("name") : options.join(" ");

    try {
      await guild.stickers.create({ file: url, name });
      embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Sticker **${name}** has been added successfully!`);
    } catch {
      embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("Unable to add sticker. Please verify that the URL is correct.");
    }
  }

  return { embeds: [embed] };
}