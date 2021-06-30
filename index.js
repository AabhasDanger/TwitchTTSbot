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

let cooldown = []

const client = new twitch.Client(options);

client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if((cooldown.includes(tags.username)!=true||tags.mod==true||tags.badges.broadcaster=='1')&&message.split(' ')[0]==='!TTS'){
        let content = message.split(' ')
        content.shift();
        if(content.length>20){
            client.say(channel,`sorry ${tags.username} but the message is too long the limit is 20 words`)
            return;
        }
        content = content.join(' ')
        say.speak(content)
        cooldown.unshift(tags.username)
        if(tags.mod!=true&&tags.badges.broadcaster!='1'){
            setTimeout(()=>cooldown.pop(),600000)
            client.say(channel,`${tags.username} u r now on a cooldown for 10 minutes`)
        }
    }
});
