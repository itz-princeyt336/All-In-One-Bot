const { 
  EmbedBuilder, 
  ApplicationCommandOptionType , 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const axios = require("axios");
const { TicTacToe, RockPaperScissors, FastType, Snake, WouldYouRather, Hangman, FindEmoji, GuessThePokemon, Wordle, Flood, Connect4, TwoZeroFourEight, Minesweeper, MatchPairs } = require("discord-gamecord");

/**
 * @type {import("@structures/Command")}
 */

module.exports = {
  name: "fun",
  description: "play some cool fun games",
  cooldown: 0,
  category: "FUN",
  botPermissions: ["EmbedLinks"],
  userPermissions: [],
  command: {
    enabled: true,
    aliases: [],
    usage: "[COMMAND]",
    minArgsCount: 0,
  },
  slashCommand: {
    // ephemeral: true,
    enabled: true,
    options: [
        {
            name: "tictactoe",
            description: "Plays TicTacToe Game",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "opponent",
                    description: "The opponent with whom you wanna play",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        },
        {
            name: "rps",
            description: "Starts a Rock Paper Scissor Game",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "opponent",
                    description: "The opponent you want to play",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        },
        {
            name: "fasttype",
            description: "Starts a Fast Type Game",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "snake",
            description: "Starts a game of Snake.",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "wouldyourather",
            description: "Play Would You Rather Game",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "hangman",
            description: "Play a game of Hangman",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "findemoji",
            description: "Play a game of Find Emoji",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "guessthepokemon",
            description: "Play Guess the Pokemon Game",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "wordle",
            description: "Play a game of Wordle",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "flood",
            description: "Play a game of Flood",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "connect4",
            description: "Play a game of Connect4",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "opponent",
                    description: "The user you want to play this game against.",
                    type: ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        },
        {
            name: "2048",
            description: "Play a game of 2048",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "minesweeper",
            description: "Play a game of minesweeper",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "matchpairs",
            description: "Play a game of matchpairs",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "truthdare",
            description: "Play a game of Truth or Dare",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
  },
  
  async messageRun(message, args, data) {
    const subcommand = args[0];
  
  // Handle each subcommand
  if (subcommand === "tictactoe") {
    const opponentUser = message.mentions.users.first();
    if (!opponentUser) {
      await message.safeReply("Please mention the opponent you want to play against.");
      return;
    }
    if (opponentUser.id === message.author.id) {
      await message.safeReply("You can't add yourself as an opponent.");
      return;
    }
    if (opponentUser.bot) {
      await message.safeReply("You can't add bots to opponent")
      return;
    }
    const Game = new TicTacToe({
      message: message,
      isSlashGame: false,
      opponent: opponentUser,
      embed: {
        title: 'Tic Tac Toe',
        color: '#5865F2',
        statusTitle: 'Status',
        overTitle: 'Game Over'
      },
      emojis: {
        xButton: '❌',
        oButton: '🔵',
        blankButton: '➖'
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: 'DANGER',
      oButtonStyle: 'PRIMARY',
      turnMessage: '{emoji} | Its turn of player **{player}**.',
      winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
      tieMessage: 'The Game tied! No one won the Game!',
      timeoutMessage: 'The Game went unfinished! No one won the Game!',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
    });
    
    Game.startGame();
  } else if (subcommand === "rps") {
    const opponentUser = message.mentions.users.first();
    if (!opponentUser) {
      await message.safeReply("Please mention the opponent you want to play against.");
      return;
    }
    if (opponentUser.id === message.author.id) {
      await message.safeReply("You can't add yourself as an opponent.");
      return;
    }
    if (opponentUser.bot) {
      await message.safeReply("You can't add bots to opponent")
      return;
    }
    const Game = new RockPaperScissors({
      message: message,
      isSlashGame: false,
      opponent: opponentUser,
      embed: {
        title: 'Rock Paper Scissors',
        color: '#5865F2',
        description: 'Press a button below to make a choice.'
      },
      buttons: {
        rock: 'Rock',
        paper: 'Paper',
        scissors: 'Scissors'
      },
      emojis: {
        rock: '🌑',
        paper: '📰',
        scissors: '✂️'
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      pickMessage: 'You choose {emoji}.',
      winMessage: '**{player}** won the Game! Congratulations!',
      tieMessage: 'The Game tied! No one won the Game!',
      timeoutMessage: 'The Game went unfinished! No one won the Game!',
      playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
    });
    
    Game.startGame();
  } else if (subcommand === "fasttype") {
    const Game = new FastType({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Fast Type',
        color: '#5865F2',
        description: 'You have {time} seconds to type the sentence below.',
      },
      timeoutTime: 60000,
      sentence: "UltimateBot on Top.",
      winMessage:
        "You won! You finished the type race in {time} seconds with wpm of {wpm}.",
      loseMessage: "You lost! You didn't type the correct sentence in time.",
    });

    Game.startGame();
  } else if (subcommand === "snake") {
    const Game = new Snake({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Snake Game',
        overTitle: 'Game Over',
        color: '#5865F2'
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      stopButton: 'Stop',
      timeoutTime: 60000,
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
  } else if (subcommand === "wouldyourather") {
    const game = new WouldYouRather({
      message: message,
      isSlashGame: false,
      embed: {
        title: "Would You Rather",
        color: "#5865F2",
      },
      buttons: {
        option1: "Option 1",
        option2: "Option 2",
      },
      timeoutTime: 60000,
      errMessage: "Unable to fetch question data! Please try again.",
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    game.startGame();
  } else if (subcommand === "hangman") {
        // Hangman game logic
        const Game = new Hangman({
          message: message,
          isSlashGame: false,
          embed: {
            title: 'Hangman',
            color: '#5865F2'
          },
          hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
          customWord: undefined,
          timeoutTime: 60000,
          theme: 'nature',
          winMessage: 'You won! The word was **{word}**.',
          loseMessage: 'You lost! The word was **{word}**.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
  } else if (subcommand === "findemoji") {
        // Find Emoji game logic
        const Game = new FindEmoji({
          message: message,
          isSlashGame: false,
          embed: {
            title: 'Find Emoji',
            color: '#5865F2',
            description: 'Remember the emojis from the board below.',
            findDescription: 'Find the {emoji} emoji before the time runs out.'
          },
          timeoutTime: 60000,
          hideEmojiTime: 5000,
          buttonStyle: 'PRIMARY',
          emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
          winMessage: 'You won! You selected the correct emoji. {emoji}',
          loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
          timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
  } else if (subcommand === "guessthepokemon") {
        const Game = new GuessThePokemon({
          message: message,
          isSlashGame: false,
          embed: {
            title: 'Who\'s The Pokemon',
            color: '#5865F2'
          },
          timeoutTime: 60000,
          winMessage: 'You guessed it right! It was a {pokemon}.',
          loseMessage: 'Better luck next time! It was a {pokemon}.',
          errMessage: 'Unable to fetch pokemon data! Please try again.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
  } else if (subcommand === "wordle") {
        const Game = new Wordle({
          message: message,
          isSlashGame: false,
          embed: {
            title: 'Wordle',
            color: '#5865F2',
          },
          customWord: null,
          timeoutTime: 60000,
          winMessage: 'You won! The word was **{word}**.',
          loseMessage: 'You lost! The word was **{word}**.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
  } else if (subcommand === "flood") {
        const Game = new Flood({
          message: message,
          isSlashGame: false,
          embed: {
            title: 'Flood',
            color: '#5865F2',
          },
          difficulty: 13,
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
          winMessage: 'You won! You took **{turns}** turns.',
          loseMessage: 'You lost! You took **{turns}** turns.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
  } else if (subcommand === "connect4") {
    const opponentUser = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!opponentUser) {
      await message.safeReply("Please mention the opponent you want to play against.");
      return;
    }
    if (opponentUser.id === message.author.id) {
      await message.safeReply("You can't add yourself as an opponent.");
      return;
    }
    if (opponentUser.bot) {
      await message.safeReply("You can't add bots to opponent")
      return;
    }
        const Game = new Connect4({
          message: message,
          isSlashGame: false,
          opponent: message.mentions.users.first(),
          embed: {
            title: 'Connect4 Game',
            statusTitle: 'Status',
            color: '#5865F2'
          },
          emojis: {
            board: '⚪',
            player1: '🔴',
            player2: '🟡'
          },
          mentionUser: true,
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          turnMessage: '{emoji} | Its turn of player **{player}**.',
          winMessage: '{emoji} | **{player}** won the Connect4 Game.',
          tieMessage: 'The Game tied! No one won the Game!',
          timeoutMessage: 'The Game went unfinished! No one won the Game!',
          playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });
          
        Game.startGame();
  } else if (subcommand === "2048") {
        const Game = new TwoZeroFourEight({
          message: message,
          isSlashGame: false,
          embed: {
            title: '2048',
            color: '#5865F2'
          },
          emojis: {
            up: '⬆️',
            down: '⬇️',
            left: '⬅️',
            right: '➡️',
          },
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
  } else if (subcommand === "minesweeper") {
    const Game = new Minesweeper({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Minesweeper',
        color: '#5865F2',
        description: 'Click on the buttons to reveal the blocks except mines.'
      },
      emojis: { flag: '🚩', mine: '💣' },
      mines: 5,
      timeoutTime: 60000,
      winMessage: 'You won the game! You successfully avoided all the mines.',
      loseMessage: 'You lost the game! Be aware of the mines next time.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    Game.startGame();
  } else if (subcommand === "matchpairs") {
    const Game = new MatchPairs({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Match Pairs',
        color: '#5865F2',
        description: '**Click on the buttons to match emojis with their pairs.**'
      },
      timeoutTime: 60000,
      emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🍌', '🍍', '🥕', '🥔'],
      winMessage: '**You won the Game! You turned a total of `{tilesTurned}` tiles.**',
      loseMessage: '**You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
      Game.startGame();
  } else if (subcommand === "truthdare") {
      const truthDareEmbed = new EmbedBuilder()
        .setTitle("Truth or Dare")
        .setDescription("Click a button to choose either Truth or Dare!")
        .setColor("#e74c3c");

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('truth')
            .setLabel('Truth')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('dare')
            .setLabel('Dare')
            .setStyle(ButtonStyle.Danger)
        );

      const sentMessage = await message.safeReply({ embeds: [truthDareEmbed], components: [row] });

      const filter = i => ['truth', 'dare'].includes(i.customId) && i.user.id === message.author.id;
      const collector = sentMessage.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 60000 });

      collector.on('collect', async i => {
        let content;
        let title;
        if (i.customId === 'truth') {
          const truth = await getTruthOrDare('truth');
          content = `${truth}`;
          title = "Truth Result";
        } else if (i.customId === 'dare') {
          const dare = await getTruthOrDare('dare');
          content = `${dare}`;
          title = "Dare Result";
        }

        const resultEmbed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(content)
          .setColor("#e74c3c");

        await i.reply({ embeds: [resultEmbed], ephemeral: false });

        const updatedRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('truth')
              .setLabel('Truth')
              .setStyle(ButtonStyle.Primary)
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId('dare')
              .setLabel('Dare')
              .setStyle(ButtonStyle.Danger)
              .setDisabled(true)
          );

        await sentMessage.edit({ components: [updatedRow] });
      });

      collector.on('end', collected => {
        if (!collected.size) {
          const noChoiceEmbed = new EmbedBuilder()
            .setDescription('No choice was made in time!')
            .setColor("#e74c3c");
          sentMessage.edit({ embeds: [noChoiceEmbed], components: [] });
        }
      });
    } else {
      // Handle unknown subcommands
      message.channel.send("Unknown subcommand.");
    }
  },

  async interactionRun(interaction, data) {
    const subgroup = interaction.options.getSubcommandGroup()
    const sub = interaction.options.getSubcommand()
    if (sub === "tictactoe") {
      const opponentUser = interaction.options.getMember("opponent")
      if (opponentUser.id === interaction.member.id) {
        await interaction.followUp("You can't add yourself to opponent")
        return;
      }
      if (opponentUser.user.bot) {
        await interaction.followUp("You can't add bots to opponent")
        return;
      }
      if (opponentUser.user.bot) {
      await interaction.followUp("You can't add bots to opponent")
      return;
      }
      const Game = new TicTacToe({
        message: interaction,
        isSlashGame: true,
        opponent: opponentUser.user,
        embed: {
          title: 'Tic Tac Toe',
          color: '#5865F2',
          statusTitle: 'Status',
          overTitle: 'Game Over'
        },
        emojis: {
          xButton: '❌',
          oButton: '🔵',
          blankButton: '➖'
        },
        mentionUser: true,
        timeoutTime: 60000,
        xButtonStyle: 'DANGER',
        oButtonStyle: 'PRIMARY',
        turnMessage: '{emoji} | Its turn of player **{player}**.',
        winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
        tieMessage: 'The Game tied! No one won the Game!',
        timeoutMessage: 'The Game went unfinished! No one won the Game!',
        playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
      });
      
      Game.startGame();
    } else if (sub === "rps") {
      const opponentUser = interaction.options.getMember("opponent")
      if (opponentUser.id === interaction.member.id) {
        await interaction.followUp("You can't add yourself to opponent")
        return;
      }
      if (opponentUser.user.bot) {
        await interaction.followUp("You can't add bots to opponent")
        return;
      }
      if (opponentUser.user.bot) {
      await interaction.followUp("You can't add bots to opponent")
      return;
      }
      const Game = new RockPaperScissors({
        message: interaction,
        isSlashGame: true,
        opponent: opponentUser.user,
        embed: {
          title: 'Rock Paper Scissors',
          color: '#5865F2',
          description: 'Press a button below to make a choice.'
        },
        buttons: {
          rock: 'Rock',
          paper: 'Paper',
          scissors: 'Scissors'
        },
        emojis: {
          rock: '🌑',
          paper: '📰',
          scissors: '✂️'
        },
        mentionUser: true,
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        pickMessage: 'You choose {emoji}.',
        winMessage: '**{player}** won the Game! Congratulations!',
        tieMessage: 'The Game tied! No one won the Game!',
        timeoutMessage: 'The Game went unfinished! No one won the Game!',
        playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
      });
      
      Game.startGame();
    } else if (sub === "fasttype") {
      const Game = new FastType({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Fast Type',
          color: '#5865F2',
          description: 'You have {time} seconds to type the sentence below.',
        },
        timeoutTime: 60000,
        sentence: "UltimateBot on top.",
        winMessage:
          "You won! You finished the type race in {time} seconds with wpm of {wpm}.",
        loseMessage: "You lost! You didn't type the correct sentence in time.",
      });

      Game.startGame();
    } else if (sub === "snake") {
      const Game = new Snake({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Snake Game',
        overTitle: 'Game Over',
        color: '#5865F2'
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      stopButton: 'Stop',
      timeoutTime: 60000,
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
    Game.startGame();
    } else if (sub === "wouldyourather") {
      const game = new WouldYouRather({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "Would You Rather",
        color: "#5865F2",
      },
      buttons: {
        option1: "Option 1",
        option2: "Option 2",
      },
      timeoutTime: 60000,
      errMessage: "Unable to fetch question data! Please try again.",
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    game.startGame();
    } else if (sub === "hangman") {
        // Hangman game logic for interactions
        const Game = new Hangman({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Hangman',
            color: '#5865F2'
          },
          hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
          customWord: undefined,
          timeoutTime: 60000,
          theme: 'nature',
          winMessage: 'You won! The word was **{word}**.',
          loseMessage: 'You lost! The word was **{word}**.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
    } else if (sub === "findemoji") {
        // Find Emoji game logic for interactions
        const Game = new FindEmoji({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Find Emoji',
            color: '#5865F2',
            description: 'Remember the emojis from the board below.',
            findDescription: 'Find the {emoji} emoji before the time runs out.'
          },
          timeoutTime: 60000,
          hideEmojiTime: 5000,
          buttonStyle: 'PRIMARY',
          emojis: ['🍉', '🍇', '🍊', '🍋', '🥭', '🍎', '🍏', '🥝'],
          winMessage: 'You won! You selected the correct emoji. {emoji}',
          loseMessage: 'You lost! You selected the wrong emoji. {emoji}',
          timeoutMessage: 'You lost! You ran out of time. The emoji is {emoji}',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
    } else if (sub === "guessthepokemon") {
        const Game = new GuessThePokemon({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Who\'s The Pokemon',
            color: '#5865F2'
          },
          timeoutTime: 60000,
          winMessage: 'You guessed it right! It was a {pokemon}.',
          loseMessage: 'Better luck next time! It was a {pokemon}.',
          errMessage: 'Unable to fetch pokemon data! Please try again.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
        
        Game.startGame();
    } else if (sub === "wordle") {
        const Game = new Wordle({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Wordle',
            color: '#5865F2',
          },
          customWord: null,
          timeoutTime: 60000,
          winMessage: 'You won! The word was **{word}**.',
          loseMessage: 'You lost! The word was **{word}**.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
    } else if (sub === "flood") {
        const Game = new Flood({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: 'Flood',
            color: '#5865F2',
          },
          difficulty: 13,
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          emojis: ['🟥', '🟦', '🟧', '🟪', '🟩'],
          winMessage: 'You won! You took **{turns}** turns.',
          loseMessage: 'You lost! You took **{turns}** turns.',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
    } else if (sub === "connect4") {
      const opponentUser = interaction.options.getMember("opponent")
      if (opponentUser.id === interaction.member.id) {
        await interaction.followUp("You can't add yourself to opponent")
        return;
      }
      if (opponentUser.user.bot) {
        await interaction.followUp("You can't add bots to opponent")
        return;
      }
      if (opponentUser.user.bot) {
      await interaction.followUp("You can't add bots to opponent")
      return;
      }
        const Game = new Connect4({
          message: interaction,
          isSlashGame: true,
          opponent: interaction.options.getUser('opponent'),
          embed: {
            title: 'Connect4 Game',
            statusTitle: 'Status',
            color: '#5865F2'
          },
          emojis: {
            board: '⚪',
            player1: '🔴',
            player2: '🟡'
          },
          mentionUser: true,
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          turnMessage: '{emoji} | Its turn of player **{player}**.',
          winMessage: '{emoji} | **{player}** won the Connect4 Game.',
          tieMessage: 'The Game tied! No one won the Game!',
          timeoutMessage: 'The Game went unfinished! No one won the Game!',
          playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
        });
          
        Game.startGame();
    } else if (sub === "2048") {
        const Game = new TwoZeroFourEight({
          message: interaction,
          isSlashGame: true,
          embed: {
            title: '2048',
            color: '#5865F2'
          },
          emojis: {
            up: '⬆️',
            down: '⬇️',
            left: '⬅️',
            right: '➡️',
          },
          timeoutTime: 60000,
          buttonStyle: 'PRIMARY',
          playerOnlyMessage: 'Only {player} can use these buttons.'
        });
          
        Game.startGame();
    } else if (sub === "minesweeper") {
      const Game = new Minesweeper({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Minesweeper',
        color: '#5865F2',
        description: 'Click on the buttons to reveal the blocks except mines.'
      },
      emojis: { flag: '🚩', mine: '💣' },
      mines: 5,
      timeoutTime: 60000,
      winMessage: 'You won the game! You successfully avoided all the mines.',
      loseMessage: 'You lost the game! Be aware of the mines next time.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    Game.startGame();
    } else if (sub === "matchpairs") {
      const Game = new MatchPairs({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: 'Match Pairs',
        color: '#5865F2',
        description: '**Click on the buttons to match emojis with their pairs.**'
      },
      timeoutTime: 60000,
      emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🍌', '🍍', '🥕', '🥔'],
      winMessage: '**You won the Game! You turned a total of `{tilesTurned}` tiles.**',
      loseMessage: '**You lost the Game! You turned a total of `{tilesTurned}` tiles.**',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });
      
      Game.startGame();
    } else if (sub === "truthdare") {
      const truthDareEmbed = new EmbedBuilder()
        .setTitle("Truth or Dare")
        .setDescription("Click a button to choose either Truth or Dare!")
        .setColor("#e74c3c");

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('truth')
            .setLabel('Truth')
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId('dare')
            .setLabel('Dare')
            .setStyle(ButtonStyle.Danger)
        );

      const sentMessage = await interaction.followUp({ embeds: [truthDareEmbed], components: [row], ephemeral: true });

      const filter = i => ['truth', 'dare'].includes(i.customId) && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 60000 });

      collector.on('collect', async i => {
        let content;
        let title;
        if (i.customId === 'truth') {
          const truth = await getTruthOrDare('truth');
          content = `${truth}`;
          title = "Truth Result";
        } else if (i.customId === 'dare') {
          const dare = await getTruthOrDare('dare');
          content = `${dare}`;
          title = "Dare Result";
        }

        const resultEmbed = new EmbedBuilder()
          .setTitle(title)
          .setDescription(content)
          .setColor("#e74c3c");

        await i.reply({ embeds: [resultEmbed], ephemeral: false });

        const updatedRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('truth')
              .setLabel('Truth')
              .setStyle(ButtonStyle.Primary)
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId('dare')
              .setLabel('Dare')
              .setStyle(ButtonStyle.Danger)
              .setDisabled(true)
          );

        await sentMessage.edit({ components: [updatedRow] });
      });

      collector.on('end', collected => {
        if (!collected.size) {
          const noChoiceEmbed = new EmbedBuilder()
            .setTitle("Timeout")
            .setDescription('No choice was made in time!')
            .setColor("#e74c3c");
          interaction.editReply({ embeds: [noChoiceEmbed], components: [] });
        }
      });
    } else {
      // Handle unknown subcommands
      await interaction.followUp("Unknown subcommand.");
    }
  },
};

async function getTruthOrDare(type) {
  try {
    const response = await axios.get(`https://api.truthordarebot.xyz/api/${type}`);
    return response.data.question;
  } catch (error) {
    console.error(error);
    return 'Sorry, something went wrong. Please try again!';
  }
}