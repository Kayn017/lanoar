const { prefix } = require('../config/config.json');

module.exports = 
{
    name: 'help',
    args: true,
    description: 'L\'aide de Lanoar',
    usage: `${prefix}help [<nom de la commmande>]`,
    execute(message, args)
    {
        const Discord = require('discord.js');

        let desc = "";

        if(!args[0])  
        {      
            for(const cmd of message.client.commands.array())
            {
                desc += cmd.name + " : " + cmd.description + "\n";
            }
        }
        else
        {
            for(const cmd of message.client.commands.array())
            {
                if(cmd.name == args[0])
                {
                    desc += cmd.name + " : " + cmd.description + "\n";
                    desc += "Synthaxe " + cmd.usage + "\n";
                }
                
            }
        }


        const embed = new Discord.MessageEmbed()
            .setTitle("L'aide de votre Lanoar préféré")
            .setColor(0x1e80d6)
            .setDescription(desc);

        message.channel.send(embed); 
	},
};