<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<div class="card card-side bg-base-100 shadow-xl">
  <figure class="object-cover h-80 w-1/2">
    <img src={image} alt={description} class="object-cover" />
  </figure>
  <div class="card-body">
    <h2 class="card-title pt-0 mt-0">{name}</h2>
    <h3>{creator}</h3>
    <p class="indent-0">{description}</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href={link}>Lien</a>
    </div>
  </div>
</div>
