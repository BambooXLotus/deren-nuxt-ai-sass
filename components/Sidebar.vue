<template>
  <div class="space-y-4 py-4 flex flex-col h-full bg-white shadow-sm border-r">
    <div class="px-3 py-2 flex-1">
      <NuxtLink to="/" class="flex items-center pl-3 pb-10">
        <div class="h-8 w-24 mr-4">
          <img alt="Logo" src="/logo.svg" />
        </div>
        <h1 class="text-2xl font-extralight">DerenAI</h1>
      </NuxtLink>
      <div class="space-y-1">
        <NuxtLink
          v-for="route in routes"
          :key="route.link"
          :to="route.link"
          class="text-sm group text-primary flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition hover:bg-muted"
          :class="{
            'bg-muted': currentRoute.path === route.link,
          }"
        >
          <div class="flex items-center flex-1">
            <Icon :name="route.icon" :class="`h-5 w-5 mr-3 ${route.color}`" />
            {{ route.label }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dashboardRoutes } from '~/lib/constants'

const routes = ref(dashboardRoutes)
const currentRoute = useRoute()
</script>

<style scoped></style>
