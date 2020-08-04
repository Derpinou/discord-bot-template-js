module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        let client = this.client
        this.client.appInfo = await this.client.fetchApplication();
        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);


        const status =  [
            {
                name: "status1",
                type: "PLAYING"
            },
            {
                name: "status2",
                type: "PLAYING"
            }
        ]

        let i = 0;
        setInterval(function(){
            client.user.setActivity(status[parseInt(i, 10)].name, {type: status[parseInt(i, 10)].type});
            if(status[parseInt(i+1, 10)]){
                i++;
            } else {
                i = 0;
            }
        }, 20000);
        console.log(`Loading a total of ${this.client.commands.size} command(s).`);
        console.log(`${this.client.user.tag}, ready to serve ${this.client.users.cache.size} users`);






    }
}