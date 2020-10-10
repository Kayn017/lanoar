//lien d'invitation du bot https://discordapp.com/oauth2/authorize?client_id=693219056630890556&scope=bot&permissions=1024

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


//déclaration des actions
const { actionCombat, actionSocial, actionAgilite, actionFouille} = require('./action.json');
const action = actionCombat.concat(actionSocial).concat(actionAgilite).concat(actionFouille);


//inventaire
let { arme, armure, objets } = require('./inventaire.json');




//on créé un nouveau client
const client = new Discord.Client();

//on ajoute les commandes au bot
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
    //pour chaque fichier js trouvé, on créé une nouvelle commande
    const cmd = require(`./commands/${file}`);
    client.commands.set(cmd.name, cmd);
}



//EventListener pour la connexion du bot
client.once('ready', () => {
    console.log('Ready!');
});

//connexion a discord
client.login(token);

//Quand le bot reçoit un message
client.on('message', message => 
{

    if(!message.content.startsWith(prefix) || message.author.bot) return; //si le message n'est pas adressé au bot, osef

    //on chope les arguments
    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase(); //on extrait la commande

    

    affLog(message.author.username, message.content); //debug : affichage sur la console

    if(!client.commands.has(commandName)) return; //si la commande n'existe pas, osef

    const command = client.commands.get(commandName);

    try
    {
        command.execute(message, args);
    }
    catch(erreur)
    {
        console.error(erreur);
        message.reply("Problème dans la commande");
    }
    
    
    
    
    /*if(command === 'ping') //commande ping
    {
        client.commands.get('ping').execute(message, args);
    }

    if(command === 'action')
    {
        if(args[0] === 'random' || args.length == 0)
        {
            let valeur = getRandomInt(action.length);
            message.channel.send(action[valeur]);
            message.delete();
        }

        if(args[0] === 'combat')
        {
            let valeur = getRandomInt(actionCombat.length);
            message.channel.send(actionCombat[valeur]);
            message.delete();
        }

        if(args[0] === 'agilité')
        {
            let valeur = getRandomInt(actionAgilite.length);
            message.channel.send(actionAgilite[valeur]);
            message.delete();
        }

        if(args[0] === 'social')
        {
            let valeur = getRandomInt(actionSocial.length);
            message.channel.send(actionSocial[valeur]);
            message.delete();
        }

        if(args[0] === 'fouille')
        {
            let valeur = getRandomInt(actionFouille.length);
            message.channel.send(actionFouille[valeur]);
            message.delete();
        }
        
    }

    if(command === 'rip')
    {
        const rnd = getRandomInt(3);
        message.channel.send({files : ['.\\gif\\rip' + rnd + '.gif']});
        message.delete();
    }

    if(command === 'angry')
    {
        const rnd = getRandomInt(5);
        message.channel.send({files : ['.\\gif\\angry' + rnd + '.gif']});
        message.delete();
    }

    if(command === 'happy')
    {
        const rnd = getRandomInt(4);
        message.channel.send({files : ['.\\gif\\happy' + rnd + '.gif']});
        message.delete();
    }

    if(command === 'dé')
    {
        if(args.length > 0)
            message.channel.send("!" + args[0] + "d20");
        else
            message.channel.send("!1d20");
        
        message.delete();
    }

    if(command === 'aide')
    {
        if(args[0] == 'action')
        {
            const embed = new Discord.MessageEmbed()
                                    .setTitle("Aide pour les actions")
                                    .setColor(0x1e80d6)
                                    .setDescription("L'aide de votre Lanoar favori :D \n \n !action ou !action random : fais une action au hasard \n !action combat : fais une action de combat \n !action social : fais une action de social \n !action agilité : montre son agilité \n !action fouille : fouille un endroit");
            message.channel.send(embed);
            message.delete();
        }
        else if(args[0] == 'reaction')
        {
            const embed = new Discord.MessageEmbed()
                        .setTitle("Aide pour les réactions")
                        .setColor(0x1e80d6)
                        .setDescription("L'aide de votre Lanoar favori :D \n \n !angry : montre son énervement \n !rip : pleure la mort d'un camarade tombé au combat \n !happy : exprime sa joie et sa bonne humeur");
            message.channel.send(embed);
            message.delete();
        }
        else
        {
            const embed = new Discord.MessageEmbed()
                                    .setTitle("Aide")
                                    .setColor(0x1e80d6)
                                    .setDescription("L'aide de votre Lanoar favori :D \n \n !aide : affiche ce message (bien joué) \n !dé : lance un dé \n !<reaction> : réagit d'une certaine manière (!aide reaction pour la liste) \n !action <Catégorie de l'action> : effectue une action de la catégorie choisie");
            message.channel.send(embed); 
            message.delete();
        } 
    }

    if(command === 'fin')
    {
        message.channel.send({files : ['.\\gif\\end.jpg']});
        message.channel.send("C'était vraiment le meilleur scénario du monde !! ");
        message.delete();
    }  */

    
});



//randomizer de nombres entiers
function getRandomInt(max) 
{
    return Math.floor(Math.random() * Math.floor(max));
}

//debug : affichage des logs 
function affLog(username, text)
{
    while(username.length < 20)
    {
        username += " ";
    }

    console.log(username + " : " + text);
}