const { prefix } = require('../config.json');
const wi = require('../library/writeInfo.js');

let { arme, armure, objets } = require('../inventaire.json');

module.exports = 
{
    name: 'equipement',
    args: true,
    usage: `${prefix}equipement <action sur l'equipement> <type de l'item> <item> \nType d'item existant : arme, armure\nActions possibles : equip, unequip`,
	description: 'Gère l\'équipement du bot',
    execute(message, args)
    {
        //s'il manque des arguments
        if(!args[1])
        {
            return message.channel.send("Usage : " + this.usage);
        }
        else
        { 
            //si le type d'item est invalide
            if(!args[1] == 'arme' || !args[1] == 'armure')
            {
                return message.channel.send("Type d'item existant : arme, armure");
            }

            //on récupère le nom de l'item en entier (espace compris)
            let item = "";

            for(let i = 2; i < args.length; i++)
                item += args[i] + " ";

            //si on veut equiper
            if(args[0] == 'equip')
            {
                //si l'objet est pas dans l'inventaire
                if(objets.indexOf(item) == -1)
                {
                    return message.channel.send("Je n'ai pas ça dans mon inventaire :c");
                }
                
                if(args[1] == "arme")
                {
                    //si lanoar avait deja une arme
                    if(arme != "rien")
                    {
                        objets.push(arme);
                    }

                    arme = item;
                    message.channel.send("Arme équipée :sunglasses:");
                }


                if(args[1] == "armure")
                {
                    //si lanoar avait deja une armure
                    if(armure != "rien")
                    {
                        objets.push(armure);
                    }

                    armure = item;
                    message.channel.send("Armure équipée :sunglasses:");
                }

                objets.splice(objets.indexOf(item), 1);
                this.majInv();

                
            }
            else if(args[0] == 'unequip')
            {
                //on check si lanoar est équipé de l'item qu'on veut déséquiper
                if((arme == "rien" && args[1] == "arme") || (armure == "rien" && args[1] == "armure"))
                {
                    return message.channel.send("Je n'ai rien d'équipé...");
                }

                if(args[1] == "arme")
                {
                    objets.push(arme);
                    arme = "rien";
                    message.channel.send("Arme deséquipée :o");
                    message.delete();
                }
                else if(args[1] == "armure")
                {
                    objets.push(armure);
                    armure = "rien";
                    message.channel.send("Armure deséquipée :o");
                    message.delete();
                }
                this.majInv();
            }
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
    }
};