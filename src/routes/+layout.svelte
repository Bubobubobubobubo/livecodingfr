<script lang="ts">
  export const prerender = true;
  import "../app.postcss";
  let showMenu = false;
  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>
<div>
  <div class="bg-neutral-800">
    <nav class="px-8 py-2 flex justify-between items-center">
      <div class="flex items-center justify-between w-full">
        <a
          href="/"
          class="website-title text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
          >livecoding.fr</a
        >
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button
            on:click={toggleNavbar}
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
      <!-- Desktop Menu -->
      <div class="hidden lg:flex lg:items-center lg:space-x-10">
        <a href="/evenements" class="titlebar-link">Évènements</a>
        <a href="/membres" class="titlebar-link">Membres</a>
        <a href="/outils" class="titlebar-link">Outils</a>
        <a href="/guides" class="titlebar-link">Guides</a>
        <a href="/articles" class="titlebar-link">Articles</a>
        <a href="/reseaux" class="titlebar-link">Réseaux</a>
        <a href="/ressources" class="titlebar-link">Ressources</a>
        <a href="/presse" class="titlebar-link">Presse</a>
        <a href="/contacts" class="titlebar-link">Contact</a>
      </div>
    </nav>
    <!-- Mobile Menu -->
    <div class="lg:hidden {showMenu ? 'block' : 'hidden'}">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="/evenements" class="mobile-menu-link block">Évènements</a>
        <a href="/membres" class="mobile-menu-link block">Membres</a>
        <a href="/outils" class="mobile-menu-link block">Outils</a>
        <a href="/guides" class="mobile-menu-link block">Guides</a>
        <a href="/articles" class="mobile-menu-link block">Articles</a>
        <a href="/reseaux" class="mobile-menu-link block">Réseaux</a>
        <a href="/ressources" class="mobile-menu-link block">Ressources</a>
        <a href="/presse" class="mobile-menu-link block">Presse</a>
        <a href="/contacts" class="mobile-menu-link block">Contact</a>
      </div>
    </div>
  </div>
</div>
<main class="bg-neutral-900">
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content space-y-4 flex flex-col lg:px-16 px-4 py-8">
      <slot />
    </div>
    <div class="drawer-side no-scrollbar m-0 lg:block hidden">
      <label
        for="my-drawer-2"
        aria-label="close sidebar"
        class="drawer-overlay scrollbar-hide whitespace-nowrap overflow-hidden no-scrollbar"
      />
      <ul class="menu sidemenu-style no-scrollbar my-0">
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