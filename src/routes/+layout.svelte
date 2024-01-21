<script lang="ts">
  export const prerender = true;
  import "../app.postcss";
  let showMenu = false;
  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>

<div>
  <div class="bg-neutral-800 dark:bg-base-300">
    <nav class="pl-8 py-2 md:flex md:justify-between md:items-center pr-8">
      <div class="flex items-center justify-between">
        <a
          href="/"
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
        <a href="/evenements" class="mobile-menu-link">Évènements</a>
        <a href="/membres" class="mobile-menu-link">Membres</a>
        <a href="/outils" class="mobile-menu-link">Outils</a>
        <a href="/guides" class="mobile-menu-link">Guides</a>
        <a href="/articles" class="mobile-menu-link">Articles</a>
        <a href="/reseaux" class="mobile-menu-link">Réseaux</a>
        <a href="/ressources" class="mobile-menu-link">Ressources</a>
        <a href="/presse" class="mobile-menu-link">Presse</a>
        <a href="/contacts" class="mobile-menu-link">Contact</a>
      </div>
    </nav>
  </div>
</div>

<main class="bg-gray-100 dark:bg-base-100">
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content space-y-4 flex flex-col lg:px-16 px-4 py-8">
      <slot />
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay scrollbar-hide whitespace-nowrap overflow-hidden"
      />
      <ul class="menu sidemenu-style">
        <li class="sideli">
          <a class="sidebar-link" href="/evenements">Évènements</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/membres">Membres</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/outils">Outils</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/guides">Guides</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/articles">Articles</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/reseaux">Réseaux</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/ressources">Ressources</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/presse">Presse</a>
        </li>
        <li class="sideli">
          <a class="sidebar-link" href="/contacts">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</main>

<footer class="footer-style">
  <div class="flex justify-between">
    <p class="inline indent-4 text-bold text-white">Raphaël Forment</p>
    <p>
      <a
        class="inline pl-4"
        href="https://github.com/Bubobubobubobubo/livecodingfr">GitHub</a
      >
    </p>
  </div>
</footer>
