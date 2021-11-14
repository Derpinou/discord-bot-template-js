const {BaseCommand} = require("../../Structures/Command.js");
module.exports = class Ping extends BaseCommand {
    constructor(client) {
        super(client, {
            dirname: __dirname,
            filename: __filename,
        });
    }
    async run(interaction) {
        interaction.reply({
            content: "pong !"
        })
    }
}