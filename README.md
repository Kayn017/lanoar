# LANOAR BOT

## Présentation

Lanoar est un bot discord pour vous accompagner pour vos parties de jeux de roles ! 
Convient parfaitement pour jouer le rôle d'un PNJ par exemple.

## Fonctionnalités

- Faire des actions aléatoires liés (ou non) à la situation
- Lancer des dés pour des actions (la présence du bot DiceParser est nécessaire pour cela)
- Réagir avec une banque de gifs
- Gérer son inventaire et ses équipements

Pour plus de fonctionnalités, contactez le créateur du bot (Kayn#2859 sur Discord)

## Ajouts et personnalisation

Toutes les actions sont contenues dans le fichier `action.json`.  A vous d'en rajouter, d'en retirer voire de tout changer !
Tout les gifs sont contenues dans le dossier `gif`

## Installation et configuration

Téléchargez l'archive du bot puis extrayez la ou utilisez la commande `git clone git@github.com:Kayn017/lanoar.git`

### Installation automatique
Lancez le script `lanoar_windows.bat` ou `lanoar_linux.sh` en fonction de votre système d'exploitation.

### Instalation manuelle 
Ouvrez ensuite un terminale dans le dossier du bot puis tapez la commande `npm install` (node.js doit être installé)

Pour configurer le bot, créez un fichier `config.json` à la racine avec ce pattern : 
```json
{
	"token":"Le token de connexion du bot",
	"prefix":"le préfixe que vous souhaitez pour que le programme reconnaisse une commande"
}
```

Ca y est, Lanoar est prêt à fonctionner !

## Lancement du bot
Lancez le script `lanoar_windows.bat` ou `lanoar_linux.sh` en fonction de votre système d'exploitation.