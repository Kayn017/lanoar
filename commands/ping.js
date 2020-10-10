module.exports = 
{
	name: 'ping',
	description: 'Ping!',
    execute(message, args)
    {
        console.log("Pong.")
		return message.channel.send('Pong.');
	},
};