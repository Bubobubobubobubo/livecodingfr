# Livecoding.fr

Ce dépôt contient la source du site web [https://livecoding.fr](https://livecoding.fr). Ce dépôt est ouvert à la collaboration. Ajoutez / modifiez / supprimez les informations que vous souhaitez. La source est organisée de sorte à ce que toutes les informations puissent être facilement modifiées sans trop toucher au **HTML/CSS/JS**. Chaque page est éditable en **MarkDown**, et vous pouvez toujours ajouter autant de **HTML/CSS** que vous souhaitez !

## Stack technique

Le site suit les standards modernes mais il est ensuite compilé comme un site
statique. Les outils suivants sont utilisés :

- [Svelte](https://svelte.dev/) : framework frontend.
- [SvelteKit](https://kit.svelte.dev/)/Vite : tooling.
- [Tailwind](https://tailwindcss.com/) : CSS.
- [DaisyUi](https://daisyui.com/) : CSS supplémentaire.
- [Mdsvex](https://github.com/pngwn/MDsveX) : MarkDown en Svelte.

## Comment contribuer ?

- Les pages du site sont écrites en **Markdown**. Vous pouvez les modifier même
  sans connaissance préalable de la programmation web.
- Les informations structurées (outils, membres, etc) sont contenues dans des
fichiers JSON qui sont dans `src/data`. Ajoutez votre info, et c'est tout :

```js
{
  name: "Joe Joe",
  description: "Pseudo",
  image: "url_image",
  site: "url_site",
  mail: "mail (non utilisé, laissez blanc)"
},
```
