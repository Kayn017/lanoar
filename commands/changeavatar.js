const { prefix } = require('../config/config.json');
const urlcheck = require('../library/isValidURL.js');

module.exports = 
{
    name: 'changeavatar',
    args: true,
    usage: `${prefix}changeavatar <Lien vers un avatar>`,
	description: 'Change l\'avatar du bot',
    execute(message, args)
    {
        //on vérifie s'il y a bien un lien dans le message
        if(!args[0])
            return message.channel.send('Il me faut un lien pour pouvoir faire ca');
        
        //on remet la pdp par défaut
        if(args[0] === "defaut")
            return message.client.user.setAvatar("./config/pdp_Lanoar.png")
            .then(user => {
                message.channel.send('Avatar modifié');
            })
            .catch(console.error);

        //on vérifie si ce lien est valide et que c'est bien un lien vers une image
        if(!urlcheck.isValidURL(args[0]) || (!args[0].includes('.png') && !args[0].includes('.jpg')))
            return message.channel.send('Il me faut un lien valide pour faire ca');
        
        //On change alors l'avatar du bot
        return message.client.user.setAvatar(args[0])
            .then(user => {
                message.channel.send('Avatar modifié');
            })
            .catch(console.error);

        
        
	},
};