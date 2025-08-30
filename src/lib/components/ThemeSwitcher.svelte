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
  <span class="text-base">◐</span>
  <span class="hidden sm:inline">{currentThemeData.label}</span>
</button>