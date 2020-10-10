const { exception } = require("console");

module.exports = 
{
    name: 'getRandomInt',
    args: true,
	description: 'retourne un nombre entier aléatoire entre 0 et le nombre max entrée en paramètre',
    execute(max)
    {
        if(!max)
        {
            throw new exception("getRandomInt prend un paramètre");
            return;
        }

        return Math.floor(Math.random() * Math.floor(max));
	},
};