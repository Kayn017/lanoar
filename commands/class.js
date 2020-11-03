const { prefix } = require('../config/config.json');
const fs = require('fs');
const wi = require('../library/writeInfo.js');
const { Collection } = require('discord.js');

module.exports = 
{
    name: 'class',
    args: true,
    usage: `${prefix}class <add/remove/see/delete> [<utilisateur>] [<nom de la classe>]`,
	description: 'Affiche la classe de l\'utilisateur donné',
    execute(message, args)
    {
        //on importe le json de classe 
        let { classeName, classeID } = require('../config/class.json');

        //si la commande n'a pas suffisamment d'arguments
        if(!args[1])
            return message.channel.send("Usage : " + this.usage);

        //on check si l'action est la bonne 
        if(args[0] != "add" && args[0] != "remove" && args[0] != "see" && args[0] != "delete")
            return message.channel.send("Usage : " + this.usage);
        
        
        
        //si on ajoute un role
        if(args[0] === "add")
        {
            //on vérifie la synthaxe
            if(!args[2])
                return message.channel.send("Usage : " + this.usage);

            //on vérifie qu'un utilisateur a bien été mentionné dans la commande
            if(!message.guild.members.cache.has(message.mentions.users.first().id))
                return message.channel.send("Je ne sais pas à qui ajouter une classe !");

            const nomClasse = args[2];

            //on vérifie si la classe existe deja ou non
            if(classeName.indexOf(nomClasse) === -1)
            {
                //on crée donc un role avec le nom de la classe voulu
                message.guild.roles.create({
                    data: 
                    {
                        name: nomClasse
                    }
                }).then(newRole => {        
                    //on ajoute ce role a la liste des classes 
                    classeName.push(nomClasse)
                    classeID.push(newRole.id);
                }).then( () => {
                    const insert = {        //on entre la liste des classes dans class.json
                        "classeName":classeName,
                        "classeID":classeID
                    }
                    wi.write(insert, './config/class.json');
                }).then( () => {        //et enfin on l'ajoute à l'utilisateur
                    message.guild.members.cache.get(message.mentions.users.first().id).roles.add(message.guild.roles.cache.get(classeID[classeName.indexOf(nomClasse)]));
                }).catch(console.error);
                

                
            }
            else
            {   //on ajoute la classe à l'utilisateur
                message.guild.members.cache.get(message.mentions.users.first().id).roles.add(message.guild.roles.cache.get(classeID[classeName.indexOf(nomClasse)]));
                
            }

            return message.channel.send("Classe ajoutée !");
        }

        //si on souhaite enlever une classe a l'utilisateur
        else if(args[0] === "remove")
        {
            //on vérifie qu'un utilisateur a bien été mentionné dans la commande
            if(!message.guild.members.cache.has(message.mentions.users.first().id))
                return message.channel.send("Je ne sais pas à qui retirer une classe !");
            
            //on vérifie si le role existe
            if(classeName.indexOf(args[2]) === -1)
            {
                return message.channel.send("Ce role n'existe pas");
            }
            else
            {   //on retire le role a l'utilisateur pingé s'il l'a
                if(message.guild.members.cache.get(message.mentions.users.first().id).roles.cache.has(classeID[classeName.indexOf(args[2])]))
                {
                    message.guild.members.cache.get(message.mentions.users.first().id).roles.remove(message.guild.roles.cache.get(classeID[classeName.indexOf(args[2])]));
                    return message.channel.send("Classe retirée !");
                }
                    
                else
                    return message.channel.send("Je ne peux pas lui retirer une classe qu'il n'a pas ! ");

                
            }

            
        }
        //on souhaite voir toutes les classes du joueur pingé
        else if(args[0] === "see")
        {   
            //on vérifie qu'un utilisateur a bien été mentionné dans la commande
            if(!message.guild.members.cache.has(message.mentions.users.first().id))
                return message.channel.send("Je ne sais pas quel joueur je dois inspecter !");

            
            let rep = "Classe(s) de l'utilisateur : \n";
            let fund = false;

            const roles = message.guild.members.cache.get(message.mentions.users.first().id).roles.cache;

            //on parcours tout les roles de l'utilisateur et on vérifie si ce role est bien une classe
            for(let i = 0; i < classeID.length; i++)
            {
                if(roles.has(classeID[i]))
                {
                    rep += classeName[i] + "\n";
                    fund = true;
                }
            }

            //si la commande ne trouve aucun role 
            if(!fund)
                rep += "Rien...";

            return message.channel.send(rep);
        }
        //Si on souhaite supprimer une classe
        else if(args[0] === "delete")
        {
            //on vérifie l'existence de cette classe
            if(classeName.indexOf(args[1]) === -1)
            {
                return message.channel.send("Ce role n'existe pas");
            }
            
            //on enleve ce role de chaque membre sur le serveur
            message.guild.members.cache.forEach(membre => {
                if(membre.roles.cache.has(classeID[classeName.indexOf(args[1])]))
                {
                    membre.roles.remove(message.guild.roles.cache.get(classeID[classeName.indexOf(args[1])]));
                }
            });
            
            //on supprime le role coté serveur
            const id = message.guild.roles.cache.get(classeID[classeName.indexOf(args[1])]).id;
            message.guild.roles.cache.get(classeID[classeName.indexOf(args[1])]).delete();

            //on supprime la classe coté bot
            classeID.splice(classeName.indexOf(args[1]),1);
            classeName.splice(args[1],1);

            //on inscrit les changements dans le class.json
            const insert = {
                "classeName":classeName,
                "classeID":classeID
            }
            wi.write(insert, './config/class.json');

            return message.channel.send("Classe supprimé");

        }

	},
};