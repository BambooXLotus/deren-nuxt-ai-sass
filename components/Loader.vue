<template>
  <div class="h-full flex flex-col gap-y-4 items-center justify-center">
    <div class="w-10 h-10 relative animate-spin">
      <img alt="Logo" src="/logo.svg" fill />
    </div>
    <p v-if="processing" class="text-sm text-muted-foreground">
      DerenAI is thinking beep... boop...
    </p>
  </div>
</template>

<script setup lang="ts">
type LoaderProps = {
  processing?: boolean
}

withDefaults(defineProps<LoaderProps>(), {
  processing: true,
})
</script>
