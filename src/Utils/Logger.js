const chalk = require("chalk")
module.exports = class Logger {
    static log (content, type = "log") {
        switch (type) {
            case "log": {
                return console.log(`${chalk.bgBlue(type.toUpperCase())} ${content} `);
            }
            case "shard": {
                return console.log(`${chalk.bgBlue(type.toUpperCase())} ${content} `);
            }
            case "warn": {
                return console.log(`${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            }
            case "error": {
                return console.log(`${chalk.bgRed(type.toUpperCase())} ${content} `);
            }
            case "debug": {
                return console.log(`${chalk.green(type.toUpperCase())} ${content} `);
            }
            case "cmd": {
                return console.log(`${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            }
            case "ready": {
                return console.log(`${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            }
            default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
        }
    }
    static error (content) {
        return this.log(content, "error");
    }
    static warn (content) {
        return this.log(content, "warn");
    }
    static debug (content) {
        return this.log(content, "debug");
    }
    static cmd (content) {
        return this.log(content, "cmd");
    }
}