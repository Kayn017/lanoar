//lien d'invitation du bot https://discordapp.com/oauth2/authorize?client_id=693219056630890556&scope=bot&permissions=1024

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


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
    
    
    
    
    /*

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





//debug : affichage des logs 
function affLog(username, text)
{
    while(username.length < 20)
    {
        username += " ";
    }

    console.log(username + " : " + text);
}