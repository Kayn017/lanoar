#!/bin/sh


#on check si nodejs est installé
npm version 1>/dev/null 2>/dev/null

#si ce n'est pas le cas, on demande a l'utilisateur de l'installer
if [ $? != 0 ]
then
    echo NPM ou Nodejs n\'est pas installé. Veuillez l\'installer sur https://nodejs.org/ ou avec votre gestionnaire de package habituel.
    echo Appuyez sur une touche pour quitter...
    read 
    exit 1
fi

#si discord.js n'est pas installé, on l'installe
if [ ! -e node_modules ]
then
    npm install
    echo Installation des dépendances terminée
fi

#On affiche la version de node installée
echo Version de node :
node -v

echo 

#on check si config.json est deja present
if [ ! -f config.json ]
then 
    #si non, on créé un fichier config.json
    echo { > config.json
    echo '"token":"Remplacez le texte entre ces guillements par le token de connexion du bot (https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)"', >> config.json
    echo '"prefix":"Remplacez le texte entre ces guillements par le prefixe que vous souhaitez pour que le programme reconnaisse une commande"' >> config.json
    echo } >> config.json

    echo 

    echo Un fichier de configuration a ete crée. Veuillez remplir les informations a l\'intérieur afin de faire fonctionner Lanoar.
    echo Pour poursuivre le lancement du bot, enregistrez les changements dans la fenetre qui va s\'afficher puis fermez la.

    sleep 5s

    #on ouvre un editeur de texte pour que l'utilisateur configure le bot (attention code très sale :c)
    gedit config.json 2>/dev/null

    if [ $? != 0 ]
    then
        kate config.json 2>/dev/null

            if [ $? != 0 ]
            then
                nano config.json 2>/dev/null

                if [ $? != 0 ]
                then
                    vim config.json 2>/dev/null

                    if [ $? != 0 ]
                    then
                        echo Impossible d\'ouvrir un éditeur de texte. Modifiez le à la main puis relancez ce script
                    fi
                fi
            fi
    fi
fi

#maintenant on lance le bot
npm start
pause