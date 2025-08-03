<script lang="ts">
  export const prerender = true;
  import "../app.postcss";
  let showMenu = false;
  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>
<div class="min-h-screen flex flex-col">
  <header class="bg-neutral-800 sticky top-0 z-50 shadow-lg">
    <nav class="px-4 sm:px-6 lg:px-8 py-2">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <a
              href="/"
              class="website-title text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
            >
              livecoding.fr
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-6">
            <a href="/evenements" class="nav-link">Évènements</a>
            <a href="/membres" class="nav-link">Membres</a>
            <a href="/outils" class="nav-link">Outils</a>
            <a href="/reseaux" class="nav-link">Réseaux</a>
            <a href="/ressources" class="nav-link">Ressources</a>
            <a href="/presse" class="nav-link">Presse</a>
            <a href="/contacts" class="nav-link">Contact</a>
            <a href="https://cookieforum.livecoding.fr" class="nav-link">Forum</a>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              on:click={toggleNavbar}
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-300 transition-all duration-200 {showMenu ? 'bg-neutral-700' : ''}"
              aria-expanded={showMenu}
              aria-label={showMenu ? 'Close menu' : 'Open menu'}
            >
              <span class="sr-only">{showMenu ? 'Close' : 'Open'} main menu</span>
              {#if !showMenu}
                <svg class="h-6 w-6 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              {:else}
                <svg class="h-6 w-6 transition-transform duration-200 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden {showMenu ? 'block animate-in slide-in-from-top-2 duration-200' : 'hidden'} mt-3 border-t border-neutral-700 pt-3">
          <div class="space-y-1 pb-2">
            <a href="/evenements" class="mobile-nav-link" on:click={() => showMenu = false}>Évènements</a>
            <a href="/membres" class="mobile-nav-link" on:click={() => showMenu = false}>Membres</a>
            <a href="/outils" class="mobile-nav-link" on:click={() => showMenu = false}>Outils</a>
            <a href="/reseaux" class="mobile-nav-link" on:click={() => showMenu = false}>Réseaux</a>
            <a href="/ressources" class="mobile-nav-link" on:click={() => showMenu = false}>Ressources</a>
            <a href="/presse" class="mobile-nav-link" on:click={() => showMenu = false}>Presse</a>
            <a href="/contacts" class="mobile-nav-link" on:click={() => showMenu = false}>Contact</a>
            <a href="https://cookieforum.livecoding.fr" class="mobile-nav-link" on:click={() => showMenu = false}>Forum</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
<main class="bg-neutral-900 flex-1">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <slot />
  </div>
</main>
<footer class="footer-style mt-auto">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-row justify-between items-center">
      <span class="text-gray-400 text-sm">© 2024 Raphaël Forment</span>
      <a
        class="text-gray-400 hover:text-orange-300 transition-colors duration-200 text-sm flex items-center gap-2"
        href="https://github.com/Bubobubobubobubo/livecodingfr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </div>
</footer>
</div>
