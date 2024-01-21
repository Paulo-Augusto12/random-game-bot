const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

function diceResultDescription(result) {
  if (result < 10) {
    return "This was a bad result 😢";
  }
  if (result >= 10 && result <= 15) {
    return "This was an average result 😌";
  }
  if (result >= 15) {
    return "This was an AWESOME result 😎";
  }
  if (result === 20) {
    return "THIS WAS AN SUPERB RESULT 💫💫";
  }
}

function getARandomSide(dice) {
  return Math.floor(Math.random() * dice - 1 + 1);
}
const embeds = (user, dice, result) => {
  return new EmbedBuilder()
    .setTitle(`${user.username} rolled a ${dice}`)
    .setThumbnail(
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    )
    .setDescription(`🎲 the dice result was ${result}`)
    .setColor("Purple")
    .setFooter({ text: diceResultDescription(result) });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll-dice")
    .setDescription("Will roll a dice")
    .addNumberOption((option) =>
      option
        .setName("default-dices")
        .setDescription("Choose a dice")
        .addChoices(
          { name: "D6", value: 6 },
          { name: "D12", value: 12 },
          { name: "D20", value: 20 }
        )
    )
    .addStringOption((option) =>
      option
        .setName("custom-value")
        .setRequired(false)
        .setDescription("Add a custom value")
    ),

  async execute(interaction) {
    const dice = interaction.options.getNumber("default-dices");
    const custom = interaction.options.getString("custom-value");

    const rollDice = () => {
      switch (dice) {
        case 6: {
          return getARandomSide(dice);
        }
        case 12: {
          return getARandomSide(dice);
        }
        case 20: {
          return getARandomSide(dice);
        }
      }
    };

    if (custom) {
      if (Number.isInteger(parseInt(custom))) {
        return await interaction.reply({
          embeds: [
            embeds(
              interaction.user,
              custom.toUpperCase(),
              Math.floor(Math.random() * custom - 1 + 1)
            ),
          ],
        });
      } else {
        return await interaction.reply("Please type a number");
      }
    }
    return await interaction.reply({
      embeds: [embeds(interaction.user, `D${dice}`, rollDice())],
    });
  },
};