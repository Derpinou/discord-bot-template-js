module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        // Si quelqu'un envoi un message au bot
        if (message.channel.type === 'dm') {
            message.author.send(':x:')
        }
        let prefix = this.client.prefix
        if (message.content.indexOf(prefix) !== 0) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = this.client.commands.get(command)
        if (!cmd) return;
        // checks if the command can be launched
        if (cmd.config.permission) {
            if (!message.member.hasPermission(cmd.config.permission)) return message.channel.send(`Vous n'avez pas la permission suivante: \`\`\`${cmd.config.permission}\`\`\``);
        }
        if (cmd.config.owner && !message.author.id.includes(this.client.config.owner)) return message.channel.send("Cette commande est réservée aux propriétaires");
        console.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
        await cmd.run(message, args);

    }
};
