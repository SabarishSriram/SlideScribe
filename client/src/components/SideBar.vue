<template>
    <div class="w-full h-full text-white flex flex-col space-y-2 px-4 py-6">
      <router-link
        to="/dashboard"
        class="flex gap-3 h-10 items-center justify-start rounded-lg transition-all px-6 hover:bg-muted/20"
      >
        <ScrollText :size="20" class="w-5 h-5" />
        <span class="text-sm font-medium">Event Types</span>
      </router-link>
  
      <router-link
        to="/dashboard/settings"
        class="flex gap-3 h-10 items-center justify-start rounded-lg transition-all px-6 hover:bg-muted/20"
      >
        <Settings :size="20" class="w-5 h-5" />
        <span class="text-sm font-medium">Settings</span>
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ScrollText, Settings } from 'lucide-vue-next';
  </script>
  