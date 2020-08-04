const { Client, Collection} = require('discord.js');
class Bot extends Client {
    constructor(options) {
        super(options);
        this.prefix = require("../config").prefix
        this.config = require("../config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.functions = require('../utils/functions.js'); // Load the functions file
    }
}
module.exports = Bot

