//Importation de Client et Collection de discord.js
const { Client, Collection} = require('discord.js');
//Extend du Client
class Bot extends Client {
    constructor(options) {
        super(options);
        this.prefix = require("../config").prefix //Charger le prefix dans le constructeur pour pouvoir utiliser client.prefix
        this.config = require("../config.js"); // Chargement du fichier de configuration
        this.commands = new Collection(); // Déclaration de la nouvelle Collection commands
        this.functions = require('../utils/functions.js'); // Chargement du fichier de fonctions
    }
}
//Exportation de la class Bot
module.exports = Bot

