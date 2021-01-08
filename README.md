# dejamobile_takehome_api

API de traitement pour l'application Dejamobile Takehome dévelopée par Doryan LOPEZ

## Getting Started
Avant toute chose, il faudra installer NodeJS et MongoDB sur la machine qui lancera cette API.
Voici les liens de téléchargement des deux outils :

- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

Suite à ça, il faudra télécharger les dépendances, sinon l'API ne se lancera pas.
Pour ce faire, il suffit d'ouvrir une console de commande qui pointera sur le répertoire où est installé le projet, et de taper la commande :

```
npm i
```

Pour ouvrir une telle console, il suffit de taper "cmd" dans l'outil de recherche de l'Explorateur Windows, une fois que l'on a ouvert le dossier du projet :
![https://ibb.co/L9XCzS7](https://ibb.co/L9XCzS7)

Et enfin, il faudra que votre machine soit configurée avec l'IP "192.168.1.100" . Vous pouvez bien sûr changer l'IP pour que celle-ci corresponde à votre machine,
auquel cas il vous faudra modifier le fichier "/lib/controllers/ApiController.dart" de l'application mobile et modifier la variable url à la ligne 6 pour intégrer
votre propre IP. Cette étape vous sera rappelée sur le README de [l'application mobile.](https://github.com/Yowims/Dejamobile_card_app)
