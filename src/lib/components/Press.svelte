<script lang="ts">
  export let title: string;
  export let description: string;
  export let image: string;
  export let link: string;

  const truncateString = (title: string, length: number) => {
    return title.length > length ? title.slice(0, length - 3) + "..." : title;
  };
</script>

<div
  class="max-w-sm my-4 w-80 h-fit rounded-lg shadow-md bg-neutral-800 hover:bg-neutral-700"
>
  <a href="/">
    <img class="rounded-t-lg h-48 w-80 object-cover" src={image} alt="" />
  </a>
  <div class="p-5">
    <a href="/">
      <h5 class="mb-2 text-lg font-bold tracking-tight text-white">
        {truncateString(title, 50)}
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-400">
      {description}
    </p>
    <a
      href={link}
      class="inline-flex items-center btn btn-primary text-sm font-medium text-center text-white"
    >
      En savoir plus
    </a>
  </div>
</div>
