<script lang="ts">
  export let data;
  const pages = data.pages;
  let active_page = pages["accueil"];
  function changePage(pageName: string): void {
    const pageKey = pageName.toLowerCase();
    if (pages[pageKey as keyof typeof pages]) {
      active_page = pages[pageKey as keyof typeof pages];
    }
  }
</script>

<nav class="pl-8 py-2 md:flex md:justify-between md:items-center pr-8">
  <div class="flex items-center justify-between">
    <a
      on:click={() => changePage("Accueil")}
      class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-200 uppercase"
      >livecoding.fr</a
    >
    <!-- Mobile menu button -->
    <div on:click={toggleNavbar} class="flex md:hidden">
      <button
        type="button"
        class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
  <div
    class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
      ? 'flex'
      : 'hidden'}"
  >
    <a on:click={() => changePage("Evenements")} class="titlebar-link"
      >Évènements</a
    >
    <a on:click={() => changePage("Membres")} class="titlebar-link">Membres</a>
    <a on:click={() => changePage("Outils")} class="titlebar-link">Outils</a>
    <a on:click={() => changePage("Guides")} class="titlebar-link">Guides</a>
    <a on:click={() => changePage("Réseaux")} class="titlebar-link">Réseaux</a>
    <a on:click={() => changePage("Ressources")} class="titlebar-link">
      Ressources</a
    >
    <a on:click={() => changePage("Presse")} class="titlebar-link">Presse</a>
    <a on:click={() => changePage("Contact")} class="titlebar-link">Contact</a>
  </div>
</nav>

