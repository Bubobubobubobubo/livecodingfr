<script>
  export let title = "";
  export let href = "";
  export let image = "";
  export let description = "";
  export let links = [];
</script>

<div class="resource-card">
  <div class="card-image">
    {#if image}
      <img src={image} alt={title} loading="lazy" />
    {:else}
      <div class="placeholder-image">
        <span>{title.charAt(0)}</span>
      </div>
    {/if}
  </div>
  <div class="card-content">
    <a href={href} class="card-title-link" target="_blank" rel="noopener noreferrer">
      <h3 class="card-title">{title}</h3>
    </a>
    {#if description}
      <p class="card-description">{description}</p>
    {/if}
    {#if links && links.length > 0}
      <div class="nested-links">
        {#each links as link}
          <a href={link.href} class="nested-link" target="_blank" rel="noopener noreferrer">
            <span class="link-arrow">→</span>
            <div class="link-content">
              <span class="link-title">{link.title}</span>
              {#if link.description}
                <span class="link-description">{link.description}</span>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .resource-card {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--color-bg-secondary));
    border: 1px solid rgb(var(--color-border-primary));
    overflow: hidden;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    height: 100%;
  }

  .resource-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-color: rgb(var(--color-accent-primary));
  }

  .card-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
    background-color: rgb(var(--color-bg-tertiary));
    flex-shrink: 0;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgb(var(--color-accent-primary)) 0%, rgb(var(--color-accent-secondary)) 100%);
  }

  .placeholder-image span {
    font-size: 3rem;
    font-weight: bold;
    color: rgb(var(--color-bg-primary));
    text-transform: uppercase;
  }

  .card-content {
    padding: 1rem;
    background-color: rgb(var(--color-bg-tertiary));
    border-top: 2px solid rgb(var(--color-accent-primary));
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title-link {
    text-decoration: none;
    display: inline-block;
  }

  .card-title-link:hover .card-title {
    color: rgb(var(--color-accent-secondary));
  }

  .card-title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: rgb(var(--color-accent-primary));
    line-height: 1.3;
    transition: color 0.2s ease;
  }

  .card-description {
    margin: 0.5rem 0 0.75rem 0;
    font-size: 0.875rem;
    color: rgb(var(--color-text-secondary));
    line-height: 1.4;
  }

  .nested-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: auto;
  }

  .nested-link {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: rgb(var(--color-bg-primary));
    border: 1px solid rgb(var(--color-border-secondary));
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .nested-link:hover {
    background-color: rgb(var(--color-bg-secondary));
    border-color: rgb(var(--color-accent-primary));
    transform: translateX(4px);
  }

  .link-arrow {
    color: rgb(var(--color-accent-primary));
    font-size: 0.875rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .link-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .link-title {
    color: rgb(var(--color-accent-primary));
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .link-description {
    color: rgb(var(--color-text-muted));
    font-size: 0.75rem;
    line-height: 1.3;
  }

  .nested-link:hover .link-title {
    color: rgb(var(--color-accent-secondary));
  }

  .nested-link:hover .link-arrow {
    transform: translateX(2px);
  }
</style>