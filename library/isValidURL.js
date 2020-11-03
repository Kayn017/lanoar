module.exports = 
{
    name: 'isValidURL',
	description: 'vérifie si une URL est valide',
    isValidURL(str)
    {
        try
        {
            new URL(str);
        }
        catch(_)
        {
            return false;
        }

        return true;
	},
};