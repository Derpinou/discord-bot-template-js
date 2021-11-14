const {
    Client,
    Collection
} = require('discord.js');
const { readdir } = require('fs');
const { join } = require('path');

class Bot extends Client {
    constructor(options) {
        super(options);
        this.config = require('../../config');
        this.logger = require('../Utils/Logger');
        //Collection<CommandName><class Command>
        this.commands = new Collection();
        //Collection<EventName><class Event>
        this.events = new Collection();
        this.init().then(r => null);
    }
    async init() {
        //Load events
        this.eventLoader();
        //Load commands
        this.commandLoader();
        //Create connection to the discord api gateway
        this.connect();
        //Process Event handler
        this.processEvent();
    }
    processEvent() {
        process.on("unhandledRejection", err => {
            console.error("Uncaught Promise Error: ", err);
        });
    }
    connect() {
        return super.login(this.config.token)
    }
    commandLoader() {
        readdir("./src/commands/", (err, content) => {
            if (err) console.log(err);
            if (content.length < 1) return console.log('Please create folder in "commands" folder.');
            let groups = [];
            content.forEach(element => {
                if (!element.includes('.')) groups.push(element); // If it's a folder
            });
            groups.forEach(folder => {
                readdir("./src/commands/" + folder, (e, files) => {
                    let js_files = files.filter(f => f.split(".").pop() === "js");
                    if (js_files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                    if (e) console.log(e);
                    js_files.forEach(element => {
                        const response = this.cmdLoad('../commands/' + folder, `${element}`);
                        if (response) this.logger.error(response);
                    });
                });
            });
        });
    }
    cmdLoad(commandPath, commandName) {
        try {
            const props = new (require(join(commandPath, commandName)))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
            props.conf.location = commandPath;
            if (props.init) {
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }
    eventLoader() {
        readdir("./src/events", (err, files) => {
            if (!files) return;
            if (err) this.emit("error", err);
            for (const dir of files) {
                readdir(`./src/events/${dir}`, (err, file) => {
                    if (!file) return;
                    if (err) this.emit("error", err);
                    for (const evt of file) {
                        try {
                            if (!evt) return;
                            const event = new (require(`../events/${dir}/${evt}`))(this);
                            this.logger.log(`${evt} chargé`);
                            this.events.set(evt.split(".")[0], event);
                            super.on(evt.split(".")[0], (...args) => event.run(...args));
                        } catch (e) {
                            this.emit("error", `${evt} n'a pas chargé ${e.stack}`)
                        }
                    }
                })
            }
        });
        return this
    }
}
module.exports = {Bot}