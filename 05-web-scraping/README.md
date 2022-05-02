
## Installation
* Rentrez dans le dossier *05-web-scraping* ``cd 05-web-scraping/``
* Installez les packages nécessaires et qui sont dans le package.json ```npm install```
* Cette fois ci, les résultats seront directement imprimés dans le terminal avec ```node src/index.js```

## Faire une capture d'écran de la page des cantons [Wikipédia](https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales)
>L'utilisation de `puppeteer` est recommandée



## Récupération des données
>Pour les exercices suivants, vous pouvez choisir n'importe quelle libraries que l'on a vues en cours ! 


### Webscraper Wikipedia
Imprimez dans la console tous les noms de cantons et les populations respectives, à partir de la page Wikipedia citée ci-dessus. 
> Vous aurez une liste de noeuds, mais comment afficher les valeurs des noeuds ?
Liens utiles: [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), [nth-child](https://bobbyhadz.com/blog/javascript-queryselector-nth-child)

### Webscraper un site e-commerce
Allez à ce [lien](https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops) et construisez la liste d'objets suivante : 
```js
[
  {
    "produit": "Asus VivoBook X441NA-GA190"
    "prix": "$295.99",
    "etoiles": 3,
  },
  {
    "produit": "Prestigio SmartBook 133S Dark Grey"
    "prix": "$299.00",
    "etoiles": 2,
  },
  ...
]
```

