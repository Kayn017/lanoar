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

		let members = await message.guild.members.fetch();


		let membresPasBot = [];

		members.forEach(member => 
		{
			if(member.user.bot)
				return;

			membresPasBot.push(member.user);
			
		});

		let donneur = [...membresPasBot];
		let receveur = [...membresPasBot];

		while(donneur.length > 0)
		{
			let nbDonneur = rnd.execute(donneur.length)
			let nbReceveur = rnd.execute(receveur.length);

			if(donneur[nbDonneur].id != receveur[nbReceveur].id)
			{
				console.log(`${donneur[nbDonneur].username} donne un cadeau à ${receveur[nbReceveur].username} !`);
				
				donneur[nbDonneur].send(`Héhé tu va devoir donner un cadeau à ce sacripan de ${receveur[nbReceveur].username} !`);

				donneur.splice(nbDonneur,1);
				receveur.splice(nbReceveur,1);
			}
		}

	}
};