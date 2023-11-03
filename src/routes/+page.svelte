<script lang="ts">
  import Accueil from "$lib/Accueil.svelte.md";
  import Evenements from "$lib/Evenements.svelte.md";
  import Contact from "$lib/Contact.svelte.md";
  import Presse from "$lib/Presse.svelte.md";
  import Membres from "$lib/Membres.svelte.md";
  import Outils from "$lib/Outils.svelte.md";
  import Reseaux from "$lib/Reseaux.svelte.md";
  import Ressources from "$lib/Ressources.svelte.md";
  const pages = {
    accueil: Accueil,
    evenements: Evenements,
    membres: Membres,
    outils: Outils,
    réseaux: Reseaux,
    presse: Presse,
    ressources: Ressources,
    contact: Contact,
  };
  let active_page = pages["accueil"];

  let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }

  /**
   * Changes the active page based on the provided page name.
   *
   * @param {string} pageName - The name of the page to activate.
   */
  function changePage(pageName: string): void {
    const pageKey = pageName.toLowerCase(); // Convert to lowercase to match the keys in the pages object.
    if (pages[pageKey]) {
      active_page = pages[pageKey];
    }
  }
</script>

<div>
  <div class="bg-neutral-800 dark:bg-base-300">
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
        <a
          on:click={() => changePage("Evenements")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden"
          >Évènements</a
        >
        <a
          on:click={() => changePage("Membres")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden">Membres</a
        >
        <a
          on:click={() => changePage("Outils")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden">Outils</a
        >
        <a
          on:click={() => changePage("Réseaux")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden">Réseaux</a
        >
        <a
          on:click={() => changePage("Ressources")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden"
          >Ressources</a
        >
        <a
          on:click={() => changePage("Presse")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden">Presse</a
        >
        <a
          on:click={() => changePage("Contact")}
          class="text-gray-100 hover:text-orange-300 flex md:hidden">Contact</a
        >
      </div>
    </nav>
  </div>
</div>

<main class="bg-gray-100 dark:bg-base-100">
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content space-y-4 flex flex-col lg:px-16 px-4 py-8">
      <svelte:component this={active_page} />
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <ul
        class="menu p-4 w-40 min-h-full bg-neutral-800 dark:bg-base-300 text-base-content"
      >
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Evenements")}>Évènements</a
          >
        </li>
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Membres")}>Membres</a
          >
        </li>
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Outils")}>Outils</a
          >
        </li>
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Réseaux")}>Réseaux</a
          >
        </li>
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Ressources")}>Ressources</a
          >
        </li>

        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Presse")}>Presse</a
          >
        </li>
        <li class="text-xl">
          <a
            class="text-white hover:text-orange-300"
            on:click={() => changePage("Contact")}>Contact</a
          >
        </li>
      </ul>
    </div>
  </div>

  <footer
    class="footer ml-0 pl-0 pb-4 pt-4 bg-neutral-800 dark:bg-base-300 justify-between pr-16"
  >
    <p class="indent-4 text-bold text-white">Raphaël Forment</p>
    <p>
      <a class="pl-4" href="https://github.com/Bubobubobubobubo/livecodingfr"
        >GitHub</a
      >
    </p>
  </footer>
</main>
