<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<a
  href={link}
  class="flex flex-col bg-neutral-800 hover:bg-neutral-700 shadow md:flex-row md:min-h-32 transition-colors duration-200"
>
  <div class="w-full h-48 md:h-auto md:w-48 md:self-stretch flex-shrink-0 overflow-hidden">
    <img
      class="object-cover w-full h-full"
      src={image}
      alt=""
      loading="lazy"
    />
  </div>
  <div class="flex flex-col justify-between w-full p-4 min-h-0">
    <div>
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-semibold text-white leading-tight">
          {name}
        </h3>
        <p class="text-sm text-orange-300 font-medium ml-4 text-right flex-shrink-0">{creator}</p>
      </div>
      <p class="font-normal text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
</a>
