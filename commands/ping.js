module.exports = 
{
    name: 'ping',
    args: false,
	description: 'Ping!',
    execute(message, args)
    {
        console.log("Pong.")
		return message.channel.send('Pong.');
	},
};