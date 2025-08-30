<script lang="ts">
  import { theme, type Theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  const themes: { value: Theme; label: string }[] = [
    { value: 'dark', label: 'Sombre' },
    { value: 'light', label: 'Clair' },
    { value: 'catppuccin-mocha', label: 'Mocha' },
    { value: 'catppuccin-frappe', label: 'Frappé' }
  ];

  let currentTheme: Theme;

  onMount(() => {
    theme.init();
  });

  $: currentTheme = $theme;
  $: currentThemeData = themes.find(t => t.value === currentTheme) || themes[0];

  function cycleTheme() {
    theme.toggle();
  }
</script>

<button
  on:click={cycleTheme}
  class="text-sm font-medium text-theme-text-muted hover:text-theme-accent-primary transition-colors duration-200 flex items-center gap-2"
  aria-label="Changer le thème: {currentThemeData.label}"
  title="Thème: {currentThemeData.label}"
>
  <svg 
    class="w-4 h-4" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M12 18C8.686 18 6 15.314 6 12s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-5-4a5 5 0 0110 0h-2a3 3 0 00-6 0H7z"/>
  </svg>
  <span class="hidden sm:inline">{currentThemeData.label}</span>
</button>