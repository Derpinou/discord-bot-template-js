const {Bot} = require('./src/Structures/Client');
const client = new Bot({
    allowedMentions: {
        users: [],
        roles: []
    },
    intents: 32767
});

