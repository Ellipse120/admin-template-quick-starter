<template>
  <div class="flex flex-col h-full">
    <div class="flex-none">
      <slot name="query" />
    </div>

    <div class="my-2 flex-auto relative">
      <div class="absolute overflow-auto h-full w-full">
        <slot name="table" />
      </div>
    </div>

    <div class="pb-2 flex-none">
      <slot name="pager" />
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'ListSkeleton'
}
</script>
