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
  class="max-w-sm w-80 h-fit bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
>
  <a href="#">
    <img class="rounded-t-lg h-48 w-80 object-cover" src={image} alt="" />
  </a>
  <div class="p-5">
    <a href="#">
      <h5
        class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {truncateString(title, 50)}
      </h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
    <a
      href={link}
      class="inline-flex items-center btn btn-primary text-sm font-medium text-center"
    >
      En savoir plus
      <svg
        class="w-3.5 h-3.5 ml-2"
        aria-hidden="true"
        xmlns={link}
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </a>
  </div>
</div>
