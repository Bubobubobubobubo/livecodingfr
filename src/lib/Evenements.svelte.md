<script>
     import Calendar from "$lib/Calendar.svelte";
     import Info from "$lib/Info.svelte";
     import Evenements from "$lib/data/Evenements.json";
     const passe = Evenements.passe;
     const avenir = Evenements.avenir;
</script>

# Évènements

<Info info="Cette page recense tout les évènements dédiés au <i>live coding</i> organisés par la scène francophone. Ajoutez vos évènements. N'oubliez pas de fournir un lien si possible. Renseignez les évènements pour archivage !" markdown=false />

## À venir

<!-- Format attendu : 3 Fev 2023 -->

{#each avenir as {title, description, date, link}, i}
<Calendar date={date} description={description} title={title} link={link} />
{/each}

## Passés

{#each passe as {title, description, date, link}, i}
<Calendar date={date} description={description} title={title} link={link} />
{/each}
