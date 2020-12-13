const { prefix } = require('../config/config.json');

module.exports = 
{
    name: 'nickname',
    args: true,
    usage: `${prefix}nickname <Nouveau surnom>`,
	description: 'Crée un nouveau surnom pour Lanoar',
    execute(message, args)
    {
        //on vérifie si le bot a les permissions pour changer de pseudo
        if (!message.guild.members.cache.get(message.client.user.id).hasPermission("MANAGE_NICKNAMES") || !message.guild.members.cache.get(message.client.user.id).hasPermission("CHANGE_NICKNAME"))
        {
            return console.log("Pas les perms pour changer de pseudo");
        } 
        else if(!args[0]) //s'il n'y a aucun argument, on redonne au bot son pseudo de base
        {
            message.channel.send("Je reprend mon pseudo normal...");
            return message.guild.members.cache.get(message.client.user.id).setNickname('');
        } 
        else //sinon on le renomme comme il faut 
        {
			const newNickname = args.join(' ');
            message.channel.send(`Je m'appelle maintenant ${newNickname}`);
            return message.guild.members.cache.get(message.client.user.id).setNickname(newNickname);
        }
            
	},
};