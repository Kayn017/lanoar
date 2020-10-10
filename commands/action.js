const { prefix } = require('../config.json');

module.exports = 
{
    name: 'action',
    args: true,
    description: 'Lanoar effectue une action',
    usage: `${prefix}action [<type d'action>]`,
    execute(message, args)
    {
        const rnd = require("../library/getRandomInt.js");

        //déclaration des actions
        const { actionCombat, actionSocial, actionAgilite, actionFouille} = require('../action.json');
        const action = actionCombat.concat(actionSocial).concat(actionAgilite).concat(actionFouille);



        //acte : ce que Lanoar fait
        //valeurAction : index de l'action dans le tableau des actions

        let acte;
        let valeurAction;




        if(!args.length || args[0] == 'random')
        {
            valeurAction = rnd.execute(action.length);
            acte = action[valeurAction];

        }
        else if(args[0] == 'combat')
        {
            valeurAction = rnd.execute(actionCombat.length);
            acte = actionCombat[valeurAction];
        }
        else if(args[0] == 'agilité')
        {
            valeurAction = rnd.execute(actionAgilite.length);
            acte = actionAgilite[valeurAction];
        }
        else if(args[0] == 'social')
        {
            valeurAction = rnd.execute(actionSocial.length);
            acte = actionSocial[valeurAction];
        }
        else if(args[0] === 'fouille')
        {
            valeurAction = rnd.execute(actionFouille.length);
            acte = actionFouille[valeurAction];
        }


        console.log(acte);
        message.channel.send(acte);
        message.delete();
        return;

	},
};