<script>
  export let className = '';
  export let columns = null; // null = auto-fill, number = fixed columns
  export let gap = 1.5; // rem
  export let minWidth = 320; // px for auto-fill mode
  
  const getGridStyle = () => {
    const gapStyle = `gap: ${gap}rem;`;
    const marginStyle = `margin: 2rem 0;`;
    
    if (columns) {
      // Fixed columns mode
      return `display: grid; grid-template-columns: repeat(${columns}, 1fr); ${gapStyle} ${marginStyle}`;
    } else {
      // Auto-fill mode
      return `display: grid; grid-template-columns: repeat(auto-fill, minmax(${minWidth}px, 1fr)); ${gapStyle} ${marginStyle}`;
    }
  };
</script>

<div class="grid-container {className}" style={getGridStyle()}>
  <slot />
</div>

<style>
  .grid-container {
    display: grid;
  }
  
  /* Responsive overrides for fixed columns */
  @media (max-width: 768px) {
    .grid-container[style*="repeat(3"] {
      grid-template-columns: repeat(1, 1fr) !important;
    }
    .grid-container[style*="repeat(4"] {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-container[style*="repeat(3"] {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .grid-container[style*="repeat(4"] {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
</style>