const { prefix } = require('../config/config.json');
const rnd = require('../library/getRandomInt.js');

module.exports = 
{
    name: 'santa',
    args: false,
    usage: `${prefix}santa`,
	description: 'Fait un pere noel surprise',
    async execute(message, args)
    {
		
		message.channel.send("How How How :santa: Regardez vos mp, vous devriez avoir un message de moi pour le Père Noel surprise");

		//on récupère tout les membres de la guilde
		let members = await message.guild.members.fetch();


		let membresPasBot = [];

		//on vire les bots et on en profite pour tout mettre dans une array, parce que les collections ca va bien 5 min mais c'est chiant
		members.forEach(member => 
		{
			if(member.user.bot)
				return;

			membresPasBot.push(member.user);
			
		});


		let donneur = [...membresPasBot];
		let receveur = [...membresPasBot];

		//tant que tout le monde n'a pas quelqu'un a qui donner un cadeau
		while(donneur.length > 0)
		{
			//on pioche un donneur au hasard et un receveur au hasard
			let nbDonneur = rnd.execute(donneur.length)
			let nbReceveur = rnd.execute(receveur.length);

			//Si le donneur ne donne pas a lui même, alors on envoie le message
			if(donneur[nbDonneur].id != receveur[nbReceveur].id)
			{
				donneur[nbDonneur].send(`Héhé tu va devoir donner un cadeau à ce sacripan de ${receveur[nbReceveur].username} !`);

				donneur.splice(nbDonneur,1);
				receveur.splice(nbReceveur,1);
			}
		}

	}
};