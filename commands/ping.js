const { prefix } = require('../config.json');

module.exports = 
{
    name: 'ping',
    args: false,
    usage: `${prefix}ping`,
	description: 'Ping?',
    execute(message, args)
    {
        console.log("Pong.")
		return message.channel.send('Pong.');
	},
};