<script>
     import Calendar from "$lib/Calendar.svelte";
     import Info from "$lib/Info.svelte";

     let avenir = [
          {
               date: "1 jan 2023",
               description: "Description de l'évènement",
               title: "Template pour un évènement",
          }
     ]
     let passe = [
          {
            date: "4 oct 2023",
            description: "Grrrnd Zero - Vaulx en Velin",
            title: "Écoutes périphériques",

          },
          {
               date: "28 oct 2023",
               description: "L'Aiguillage - Polisot",
               title: "Algorave (Cookie Collective)",
          }
     ]
</script>

# Évènements

<Info info="Cette page recense tout les évènements dédiés au <i>live coding</i> organisés par la scène francophone. Ajoutez vos évènements. N'oubliez pas de fournir un lien si possible. Renseignez les évènements pour archivage !" markdown=false />

## À venir

<!-- Format attendu : 3 Fev 2023 -->

{#each avenir as {title, description, date}, i}
<Calendar date={date} description={description} title={title} />
{/each}

## Passés

{#each passe as {title, description, date}, i}
<Calendar date={date} description={description} title={title} />
{/each}
