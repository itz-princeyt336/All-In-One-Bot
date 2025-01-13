const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'hide',
  description: 'Hides a channel',
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
        description: 'Channel to hide',
        type: ApplicationCommandOptionType.Channel,
        required: true,
      },
    ],
  },

  async messageRun(message, args) {
    const channel = message.mentions.channels.first();
    if (!channel) return message.channel.send('Please enter a channel to hide');

    await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      'ViewChannel': false,
    });

    const embed = new EmbedBuilder()
      .setTitle('✅ **Channel Hidden**')
      .setDescription(`${channel} is now hidden from everyone.`)
      .setColor('#e74c3c');

    channel.send({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const channel = interaction.options.getChannel('channel');
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      'ViewChannel': false,
    });

    const embed = new EmbedBuilder()
      .setTitle('✅ **Channel Hidden**')
      .setDescription(`${channel} is now hidden from everyone.`)
      .setColor('#e74c3c');

    interaction.followUp({ embeds: [embed] });
  },
};