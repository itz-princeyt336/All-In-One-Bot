const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'unhide',
  description: 'Unhides a channel',
  category: 'ADMIN',
  userPermissions: ['ManageChannels'],

  command: {
    enabled: true,
    usage: '<channel>',
    minArgsCount: 1,
  },

  slashCommand: {
    enabled: false,
    ephemeral: true,
    options: [
      {
        name: 'channel',
        description: 'Channel to unhide',
        type: ApplicationCommandOptionType.Channel,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) return message.channel.send('Please enter a channel to unhide');

    await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      'ViewChannel': null,
    });

    const embed = new EmbedBuilder()
      .setTitle('✅ **Channel Unhidden**')
      .setDescription(`${channel} is now visible to everyone.`)
      .setColor('#e74c3c');

    channel.send({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const channel = interaction.options.getChannel('channel');
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      'ViewChannel': null,
    });

    const embed = new EmbedBuilder()
      .setTitle('✅ **Channel Unhidden**')
      .setDescription(`${channel} is now visible to everyone.`)
      .setColor('#e74c3c');

    interaction.followUp({ embeds: [embed] });
  },
};