<script lang="ts">
  export let image: string;
  export let name: string;
  export let mail: string;
  export let site: string;
  export let description: string;
</script>

<div
  class="mx-2 w-72 my-4 bg-base-300 dark:bg-base-300 border border-gray-200 rounded-lg shadow dark:border-gray-700"
>
  <div class="flex justify-end px-4 pt-4" />
  <div class="flex flex-col items-center pb-10">
    <img
      class="w-24 h-24 mb-3 rounded-full shadow-lg"
      src={image}
      alt="Portrait"
    />
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {name}
    </h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">{description}</span>
    <div class="flex mt-4 space-x-3 md:mt-6">
      <a href={site} class="btn btn-tertiary">Site</a>
    </div>
  </div>
</div>
