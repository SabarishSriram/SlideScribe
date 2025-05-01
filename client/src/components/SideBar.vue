<template>
  <div
    class="w-full font-semibold h-full text-white flex flex-col space-y-2 px-4 py-6"
  >
    <router-link
      to="/dashboard"
      :class="[
        'flex gap-3 h-10 items-center justify-start rounded-lg transition-all px-6',
        route.path === '/dashboard'
          ? 'bg-[#fb444f] text-white'
          : '',
      ]"
    >
      <BookOpen :size="20" class="w-5 h-5" />
      <span class="">Notes</span>
    </router-link>

    <router-link
      to="/settings"
      :class="[
        'flex gap-3 h-10 items-center justify-start rounded-lg transition-all px-6',
        route.path === '/settings'
          ? 'bg-[#fb444f] text-white'
          : '',
      ]"
    >
      <Settings :size="20" class="w-5 h-5" />
      <span class="">Settings</span>
    </router-link>
  </div>
</template>

<script setup>
import { BookOpen, ScrollText, Settings } from "lucide-vue-next";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.path);
</script>
