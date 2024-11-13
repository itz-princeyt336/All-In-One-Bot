const { ApplicationCommandOptionType } = require("discord.js");

/**
 * @type {import("@structures/Command")}
 */
module.exports = {
    name: "afk",
    description: "Set your AFK status",
    category: "UTILITY",
    command: {
        enabled: true,
        usage: "[reason]",
    },
    slashCommand: {
        enabled: true,
        options: [
            {
                name: "reason",
                description: "reason for going AFK",
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ],
    },

    async messageRun(message, args) {
        const reason = args.join(" ") || "No reason provided";
        const response = await setupAFK(message.member, reason);
        await message.safeReply(response);
    },

    async interactionRun(interaction) {
        const reason = interaction.options.getString("reason") || "No reason provided";
        const response = await setupAFK(interaction.member, reason);
        await interaction.followUp(response);
    },
};

async function setupAFK(member, reason) {
    // Store AFK data in memory
    member.client.afkUsers = member.client.afkUsers || new Map();
    member.client.afkUsers.set(member.id, {
        timestamp: Date.now(),
        reason: reason,
        username: member.displayName
    });

    // Set nickname to show AFK status
    try {
        const oldNick = member.displayName;
        await member.setNickname(`[AFK] ${oldNick}`);
    } catch (err) {
        // Ignore nickname setting errors
    }

    return `I've set your AFK status: ${reason}`;
} 