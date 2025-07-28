<script lang="ts">
  export let date: string;
  export let title: string;
  export let description: string;
  export let link: string = "";

  let realDate = date.split(" ");
</script>

<div class="flex flex-row">
  <div
    class="w-42 block overflow-hidden bg-white text-center min-w-max"
  >
    <div class="bg-red-800 text-white py-1">{realDate[1]}</div>
    <div class="pt-1 border-l border-r">
      <span class="text-4xl font-bold">{realDate[0]}</span>
    </div>
    <div
      class="pb-2 px-2 border-l border-r border-b flex justify-between"
    >
      <span class="text-xs font-bold">{realDate[2]}</span>
    </div>
  </div>
  <!-- Info -->
  <div class="flex-col">
    <h3 class="pl-4 flex">{title}</h3>
    <p class="pl-4">{description}</p>
    <a class="mt-4 ml-4 btn btn-primary btn btn-xs text-right" href={link}
      >Lien</a
    >
  </div>
</div>
