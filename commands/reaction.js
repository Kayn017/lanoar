const { prefix } = require('../config/config.json');

module.exports = 
{
    name: 'reaction',
    args: true,
    description: 'Lanoar réagit a un évenement',
    usage: `\`${prefix}reaction <type de la reaction>\`\nType de reaction : angry, happy, rip`,
    execute(message, args)
    {
        const fs = require('fs');

        //si y'a pas d'argument : osef
        if(!args[0]) return message.channel.send("Tu veux que je réagisse comment ? :thinking:");

        //on import le randomizer
        const rnd = require('../library/getRandomInt.js');

        //on cherche le nombre de gifs correspondant a la reaction correspondantes
        const nbGifs = fs.readdirSync('./gif').filter(file => file.startsWith(args[0])).length;

        //si y'en a pas, on quitte
        if(nbGifs <= 0)
        {
            console.log("Reaction " + args[0] + " inconnue");
            return message.channel.send("Je ne connais pas ce que tu me baragouine");
        }
        else    //sinon on envoie le message
        {
            console.log("Reaction " + args[0] + " envoyé !");
            message.channel.send({files : ['.\\gif\\'+ args[0] + rnd.execute(nbGifs) + '.gif']});
            message.delete();
            return;
        }
        

	},
};