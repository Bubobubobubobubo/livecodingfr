---
title: Comment proposer un guide ?
date: '2023-12-22'
author: "Raphaël Maurice Forment"
---

Les guides sont rédigés en [MarkDown](https://en.wikipedia.org/wiki/Markdown), un format de balisage léger qui facilite l'écriture et la publication. Une fois ajoutés au site, ces derniers sont automatiquement recensés et publiés. Chaque article reçoit un entête simple qui permet de l'identifier. Voici l'entête de l'article actuel :

```yaml
---
title: Comment proposer un guide ?
date: '2023-12-22'
author: "Raphaël Maurice Forment"
---
```

Il n'est pas nécessaire de répéter le titre au début de votre article. Chaque balise se comprend assez facilement : 

- **title** : le titre complet de l'article
- **date** : au format `AAAA-MM-JJ`
- **author** : nom complet ou votre pseudonyme

Le site utilise ensuite ces données pour générer un entête. Les données peuvent ensuite être utilisées sous plusieurs formes pour faire référence au guide sur d'autres pages.

## Contenu de l'article

Écrivez ce que vous voulez ! Notez que vous pouvez librement mélanger **MarkDown**, **HTML/CSS** et composants **Svelte** pour les plus confirmés. Vous ne devriez pas avoir de problème pour publier quoi que ce soit sous la forme que vous imaginez ! Si vous écrivez du **MarkDown** pur et simple, votre article recevra le style par défaut utilisé par le site.

## Publication

Une fois votre article prêt, il vous faudra faire une [Pull Request](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) pour que ce dernier soit  au [dépôt](https://github.com/Bubobubobubobubo/livecodingfr) du site et validé par un contributeur. Bonne chance ! Nous avons besoin de guides pour couvrir l'essentiel des plateformes existantes !