::     Script de lancement pour le bot lanoar 
::     Pour Windows uniquement
::     
::     Auteur : Tanguy Gimenez


@echo off

echo Lancement de Lanoar en cours...

::On check si node est installé
node -v > nul

::Si c'est pas installé, on affiche un message d'erreur et on quitte le script
IF %ERRORLEVEL% NEQ 0 (
   title Node.js n'est pas installe
   echo Node.js n'est pas installe. Veuillez l'installer sur https://nodejs.org/ 
   echo Appuyez sur une touche pour quitter...
   pause > nul 
   EXIT /B 1
   ) 

::on vérifie si discord.js est installé
IF not exist "node_modules\*.*" (
   title Installation des dependances
   npm install & echo Installation des dépendances terminee & echo. & echo. & lanoar_windows.bat
   )

::On affiche la version de node installée
echo Version de node :
node -v

echo.

::on créé un fichier config.json s'il n'existe pas
IF NOT EXIST config.json (GOTO :creer_config) ELSE (echo Le fichier config.json est bien present & GOTO :lancerbot)


::on créé le fichier de config et on demande à l'utilisateur de le remplir
:creer_config
echo { > config.json
echo "token":"Remplacez le texte entre ces guillements par le token de connexion du bot (https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)", >> config.json
echo "prefix":"Remplacez le texte entre ces guillements par le prefixe que vous souhaitez pour que le programme reconnaisse une commande" >> config.json
echo } >> config.json
title Configuration du bot...
echo .
echo Un fichier de configuration a ete cree. Veuillez remplir les informations a l'interieur afin de faire fonctionner Lanoar.
echo Pour poursuivre le lancement du bot, enregistrez les changements dans la fenetre qui va s'afficher puis fermez la.
timeout /t 5 > nul
::l'utilisateur édite le fichier de config
notepad config.json 
GOTO :lancerbot


::on execute le bot
:lancerbot
npm start & pause