module.exports = class Event {
    constructor(client) {
        this.client = client;
    }
    async run(interaction) {
        if (interaction.isCommand()) {
            if (interaction.applicationId !== this.client.user.id) return undefined;
            const cmd = this.client.commands.get(interaction.commandName);
            if (!cmd) return undefined;
            if (!cmd.conf.enabled) return interaction.reply({
                content: ":x: Cette commande est désactivée"
            })

            //Bot permissions
            if (cmd.conf.botPermissions.length) {
                const botPermissions = interaction.guild.me.permissionsIn(interaction.channelId);
                //console.log(botPermissions)
                const neededPerms = [];
                cmd.conf.botPermissions.forEach(permission => {
                    if (!botPermissions.has(permission)) neededPerms.push(permission)
                })
                if (neededPerms.length) return interaction.reply({
                    content: `:x: | J'ai besoin des permissions suivantes pour effectuer cette commande : (\`${neededPerms.map(p => p).join(', ')}\`)`,
                    ephemeral: true
                })
            }

            //Bot owners bypass all conditions
            if (!this.client.config.owners.includes(interaction.member.id)) {
                //Author Permissions
                if (cmd.conf.permission.length) {
                    const memberPermissions = interaction.member.permissionsIn(interaction.channelId)
                    const neededPerms = [];
                    cmd.conf.permission.forEach(permission => {
                        if (!memberPermissions.has(permission)) neededPerms.push(permission)
                    })
                    if (neededPerms.length) return interaction.reply({
                        content: `:x: | Vous n'avez pas les permissions nécessaires pour effectuer cette commande : (\`${neededPerms.map(p => p).join(', ')}\`)`,
                        ephemeral: true
                    })
                }
            }
            cmd.run(interaction, );
            this.client.logger.log(`${interaction.member.user.tag} ran "${cmd.help.name}" in "${interaction.guild.id}"`, "cmd");
        }
    }
}