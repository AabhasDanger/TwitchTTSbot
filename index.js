const say = require('say')
const twitch = require('tmi.js')
const {NAME , TOKEN , CHANNEL} = require('./constants')

let options = {
    options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: NAME,
		password: TOKEN
	},
	channels: [ CHANNEL ]
}

const client = new twitch.Client(options);

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if((tags.mod!=true||tags.badges.admin!='1'||tags.badges.broadcaster!='1')&&message.split(' ')[0]==='!TTS'){
        let content = message.split(' ')
        content.shift();
        content = content.join(' ')
        say.speak(content)
    }
});
