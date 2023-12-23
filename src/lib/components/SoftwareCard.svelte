<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<a
  href={link}
  class="flex flex-col items-center rounded-lg shadow md:flex-row dark:hover:bg-base-100 hover:bg-base-100 bg-base-300 dark:bg-base-300"
>
  <img
    class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src={image}
    alt=""
  />
  <div class="flex flex-col items-start md:items-end w-full">
    <div class="flex flex-col justify-between p-4 leading-normal w-full">
      <div class="flex justify-between">
      <h5 class="inline mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" > {name} </h5>
      <p class="inline text-right">{creator}</p>
      </div>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </div>
  </div>
</a>
