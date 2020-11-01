const { prefix } = require('../config.json');

module.exports = 
{
    name: 'nickname',
    args: true,
    usage: `${prefix}nickname <Nouveau surnom>`,
	description: 'Crée un nouveau surnom pour Lanoar',
    execute(message, args)
    {
        if (!message.guild.members.cache.get(message.client.user.id).hasPermission("MANAGE_NICKNAMES") || !message.guild.members.cache.get(message.client.user.id).hasPermission("CHANGE_NICKNAME"))
        {
            return console.log("Pas les perms pour changer de pseudo");
        }
        else if(!args[0])
        {
            message.channel.send("Je reprend mon pseudo normal...");
            return message.guild.members.cache.get(message.client.user.id).setNickname('');
        }
        else 
        {
            message.channel.send(`Je m'appelle maintenant ${args[0]}`);
            return message.guild.members.cache.get(message.client.user.id).setNickname(args[0]);
        }
            
	},
};