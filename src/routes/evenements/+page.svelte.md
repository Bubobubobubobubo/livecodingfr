<svelte:head>
    <title>Évènements</title> 
</svelte:head>
<script>
     import Calendar from "$lib/components/Calendar.svelte";
     import Info from "$lib/components/Info.svelte";
     import Evenements from "$lib/data/evenements.json";
     const passe = Evenements.passe;
     const avenir = Evenements.avenir;
</script>

# Évènements

<Info info="Cette page recense tout les évènements dédiés au <i>live coding</i> organisés par la scène francophone. Ajoutez vos évènements. N'oubliez pas de fournir un lien si possible. Renseignez les évènements avec quelques photographies ou captations pour faciliter l'archivage !" markdown=false />

## Agenda du Cookie Collective

<iframe width="100%" height="700" src="https://framagenda.org/apps/calendar/embed/zpDjE9gGFeFZAmdz"></iframe>
