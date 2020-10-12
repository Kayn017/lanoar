const { prefix } = require('../config.json');
const wi = require('../library/writeInfo.js');

let { arme, armure, objets } = require('../inventaire.json');

module.exports = 
{
    name: 'inv',
    args: true,
    usage: `${prefix}inv <action sur l'inventaire> [<item>] \nActions possibles : show, add, remove, clear`,
	description: 'Tout ce qui concerne l\'inventaire de Lanoar',
    execute(message, args)
    {
        // on rafraichit l'inventaire pour que les variables du script et les données du json reste synchro
        this.refreshInv();

        // s'il n'a pas d'arguments 
        if(!args[0])
        {
            return message.channel.send("Usage : " + this.usage);
        }


        if(args[0] == 'show')
        {
            let msgtxt = `Je suis armé d'un(e) ` + arme + `, j'ai un(e) ` + armure + ` et dans mon sac, j'ai : `;
            
            //on liste les items
            for(const item of objets)
            {
                msgtxt += '\n - un(e) ' + item;
            }

            message.channel.send(msgtxt);
            message.delete();
            return;
        }        
        else if(args[0] == 'add')
        {
            //si on ne précise pas quoi ajouter a l'inventaire
            if(!args[1])
            {
                return message.channel.send("Je n'ai rien a ajouter a mon sac !");
            }
            else
            {
                let item = "";
                //pour éviter que les espaces foutent la merde
                for(let i = 1; i < args.length; i++)
                    item += args[i] + " ";
                
                objets.push(item);
                
                //on met a jour l'inventaire
                this.majInv();

                message.channel.send(item + "ajouté dans mon sac :eyes:");
                message.delete();
                return;
            }
        }
        else if(args[0] == 'remove')
        {
            // si on a pas précisé quel objet enlever
            if(!args[1])
            {
                return message.channel.send("Je ne sais pas quoi retirer de mon sac...");
            }
            else 
            {
                let itemARm = "";

                for(let i = 1; i < args.length; i++)
                    itemARm += args[i] + " ";

                //on recherche l'index de l'item qu'on veut suppr
                let index = objets.indexOf(itemARm);

                //s'il le trouve
                if(index > -1)
                {
                    objets.splice(index, 1);
                    this.majInv();
                    message.channel.send(itemARm + "viré de mon sac :eyes:");
                    message.delete();
                    return;
                }
                else
                {
                    return message.channel.send("Je n'ai pas " + itemARm + "dans mon inventaire :thinking:");
                }
            }
        }
        else if(args[0] == 'clear')
        {
            arme = "rien";
            armure = "rien";
            objets = [];
            this.majInv();
        }

    },
    majInv()
    {
        // on prends toutes les infos qu'on va mettre dans un json       
        let infos = {
            "arme" : arme,
            "armure" : armure,
            "objets" : objets
        }

        //on écrit les infos dans le json de l'inv
        wi.write(infos, './inventaire.json');
    },
    refreshInv()
    {
        const fs = require('fs');

        //on lit le fichier et on le convertit en objet json
        let fichier = fs.readFileSync("./inventaire.json");
        let inv = JSON.parse(fichier)

        //on actualise les inventaires
        arme = inv.arme;
        armure = inv.armure;
        
    }
};