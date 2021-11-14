module.exports = class Event {
    constructor(client) {
        this.client = client;
    }
    async run() {
        console.log("ready")
    }
}