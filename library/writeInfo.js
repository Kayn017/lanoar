const { exception } = require("console");
const fs = require('fs');


module.exports = 
{
    name: 'writeInfo',
    args: true,
	description: 'Ecris les infos données en paramètre dans un fichier json',
    write(donneestxt, destination)
    {
        //on convertis les donnees passées en paramètres en json
        let donneesjson = JSON.stringify(donneestxt);

        //on écrit dans le fichier de config
        fs.writeFile(destination, donneesjson, function(erreur) 
        {
            if(erreur)
            {
                console.log(erreur);
            }
            else
            {
                console.log("Données écrites avec succès dans " + destination);
            }
        })
	},
};