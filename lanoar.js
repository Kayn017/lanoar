//lien d'invitation du bot https://discordapp.com/oauth2/authorize?client_id=693219056630890556&scope=bot&permissions=1024

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config/config.json');


//inventaire
let { arme, armure, objets } = require('./config/inventaire.json');




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
    console.log('Le bot est lancé!');
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