<template>
  <div class="relative">
    <div class="m-4">
      <slot name="header" />

      <slot name="default" />
    </div>

    <div class="flex items-center justify-center mt-2 bg-gray-50 hover:bg-white ring-2 ring-gray-300 ring-opacity-50 border-t-2 border-blue-500 p-2 transition opacity-80 hover:opacity-100 md:sticky xl:fixed w-full bottom-0">
      <slot name="footer">
        Footer
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailSkeleton'
}
</script>
