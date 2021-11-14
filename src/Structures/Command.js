const { sep } = require('path')
class BaseCommand {
    constructor(client, {
        dirname = false,
        filename = false,

        enabled = true,

        //Permissions
        botPermissions = [],
        permission = [],

        //Bot perm Level
        owner = false,
    }) {

        this.client = client;
        this.config = this.client.config

        let name = filename ? filename.split(sep)[filename.split(sep).length - 1].replace('.js', "").toLowerCase() : 'Unkown',
            category = dirname ? dirname.split(sep)[dirname.split(sep).length - 1].toLowerCase() : 'Other',
            cmd = this.config.commands.find(command => command.name === name.toLowerCase()),
            description = cmd.description

        this.conf = {
            enabled,
            botPermissions,
            permission,
            owner,
        };

        this.help = {
            name,
            category,
            description
        };
    }
    getNow = () => {
        return {
            time: new Date().toLocaleString("en-GB", {
                timeZone: "Europe/Paris",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }),
        };
    }
}

module.exports = {BaseCommand}