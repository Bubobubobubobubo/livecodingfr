<script lang="ts">
  export let name: string;
  export let creator: string;
  export let link: string;
  export let image: string;
  export let description: string;
</script>

<a
  href={link}
  class="flex flex-col bg-neutral-800 shadow-lg hover:shadow-xl md:flex-row md:min-h-32 transition-all duration-200 border border-gray-700 hover:border-orange-400"
>
  <div class="w-full h-48 md:h-auto md:w-48 md:self-stretch flex-shrink-0 overflow-hidden">
    <img
      class="object-cover w-full h-full"
      src={image}
      alt=""
      loading="lazy"
    />
  </div>
  <div class="flex flex-col justify-between w-full p-4 min-h-0 border-t-2 border-orange-400 md:border-t-0 md:border-l-2">
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
