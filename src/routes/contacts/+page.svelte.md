<svelte:head>
    <title>Contact</title> 
</svelte:head>
<script>
     import Info from "$lib/components/Info.svelte"
     import Grid from "$lib/components/Grid.svelte"
     import ContactCard from "$lib/components/ContactCard.svelte"
     
     const contacts = [
       {
         title: "Cookie Collective",
         description: "Collectif parisien très actif, rassemble la plus grande communauté de live coders francophones. Événements réguliers, ateliers et performances.",
         link: "https://discord.gg/VZQGhUC",
         platform: "discord"
       },
       {
         title: "Creative Code Lyon",
         description: "Communauté dédiée au creative coding et au live coding pour l'est et le sud-est de la France. Meetups et ateliers réguliers.",
         link: "https://discord.gg/zwjmAaeEAH",
         platform: "discord"
       },
       {
         title: "TOPLAP",
         description: "Collectif international historique du live coding avec des sections francophones actives. Discussions techniques et artistiques.",
         link: "https://discord.gg/jtYGAsUggT",
         platform: "discord"
       },
       {
         title: "Forum Cookie Collective",
         description: "Forum officiel du Cookie Collective pour des discussions approfondies, partages de ressources et organisation d'événements.",
         link: "https://cookieforum.livecoding.fr",
         platform: "web"
       }
     ];
</script>

# Contact

<Info info="<b>Livecoding.fr</b> n'est ni un collectif ni une organisation. L'objectif de ce site est uniquement de centraliser l'information et de donner plus de visibilité à la scène <i>live coding</i> francophone. Pour discuter et rencontrer des <i>live coders</i> francophones, rejoignez les communautés ci-dessous." markdown=false />

<Grid>
  {#each contacts as contact}
    <ContactCard 
      title={contact.title}
      description={contact.description}
      link={contact.link}
      platform={contact.platform}
    />
  {/each}
</Grid>

## Contribuer au site

<div class="bg-theme-bg-secondary border border-theme-border-primary p-6 mt-8">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div>
      <p class="text-theme-text-secondary mb-4">
        Ce site est <strong class="text-theme-accent-primary">open source</strong> et maintenu par la communauté. Vous pouvez contribuer de plusieurs façons :
      </p>
      <ul class="space-y-3">
        <li class="flex items-start gap-3">
          <span class="text-theme-accent-primary mt-1">•</span>
          <div>
            <strong class="text-theme-text-primary">Ajouter votre profil</strong> dans la section Membres
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-theme-accent-primary mt-1">•</span>
          <div>
            <strong class="text-theme-text-primary">Partager vos outils</strong> et créations
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-theme-accent-primary mt-1">•</span>
          <div>
            <strong class="text-theme-text-primary">Annoncer des événements</strong> live coding
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-theme-accent-primary mt-1">•</span>
          <div>
            <strong class="text-theme-text-primary">Corriger ou améliorer</strong> le contenu existant
          </div>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center">
      <a 
        href="https://github.com/Bubobubobubobubo/livecodingfr"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center bg-theme-accent-primary hover:bg-theme-accent-secondary text-theme-bg-primary font-bold text-lg transition-colors duration-300 aspect-square w-full h-full p-8"
      >
        <svg class="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>Contribuer sur GitHub</span>
      </a>
    </div>
  </div>
</div>

## Contact direct

<div class="mt-8 p-6 bg-theme-bg-secondary border border-theme-border-primary">
  <p class="text-theme-text-secondary">
    Pour des questions spécifiques ou pour contacter individuellement des artistes et performers, n'hésitez pas à les joindre directement via leurs profils dans la section <a href="/membres" class="text-theme-accent-primary hover:text-theme-accent-secondary underline">Membres</a>. Ce site est maintenu bénévolement par <a href="https://raphaelforment.fr" target="_blank" rel="noopener noreferrer" class="text-theme-accent-primary hover:text-theme-accent-secondary underline">Raphaël Forment</a> et par une communauté de contributeurs.
  </p>
</div>