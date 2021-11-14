const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = require('../config').commands

const rest = new REST({ version: "9" }).setToken(require('../config').token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands("DISCORD_BOT_ID"),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();