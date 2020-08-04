const FrancoBot = require('./Base/Client');

const client = new FrancoBot({fetchAllMembers: true});
function loadCommand(commandPath, commandName) {
    try {
        const props = new (require(`${commandPath}${path.sep}${commandName}`))(client);
        console.log(`Loading Command: ${props.help.name}. 👌`);
        props.config.location = commandPath;
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        return false;
    } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
    }
}

let config = require("./config");

const {promisify} = require("util"),
    fs = require('fs'),
    readdir = promisify(require("fs").readdir),
    path = require('path');
const init = async () => {

    // Search for all commands
    fs.readdir("./commands/", (err, content) => {
        if (err) console.log(err);
        if (content.length < 1) return console.log('Please create folder in "commands" folder.');
        let groups = [];
        content.forEach(element => {
            if (!element.includes('.')) groups.push(element); // If it's a folder
        });
        groups.forEach(folder => {
            fs.readdir("./commands/" + folder, (e, files) => {
                let js_files = files.filter(f => f.split(".").pop() === "js");
                if (js_files.length < 1) return console.log('Please create files in "' + folder + '" folder.');
                if (e) console.log(e);
                js_files.forEach(element => {
                    const response = loadCommand('./commands/' + folder, `${element}`);
                    if (response) console.log(response);
                });
            });
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loading Event: ${eventName}`);
        const event = new (require(`./events/${file}`))(client);
        // This line is awesome by the way. Just sayin'.
        client.on(eventName, (...args) => event.run(...args).catch(err => console.log(err)));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    await client.login(config.token); // Log to the discord api

};
init();

// if there are errors, log them
client.on("disconnect", () => console.log("Bot is disconnecting..."))
    .on("reconnecting", () => console.log("Bot reconnecting..."))
    .on("error", e => console.log(e))
    .on("warn", info => console.log(info));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});
module.exports = client;