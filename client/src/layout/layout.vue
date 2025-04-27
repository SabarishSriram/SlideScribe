<!-- Layout.vue -->
<template>
    <div class="min-h-screen w-full flex flex-col">
      <HomeNavbar :user="user" />
  
      <div class="flex flex-1">
        <div class="hidden md:block w-[250px] bg-slate-900 rounded-br-3xl">
          <SideBar />
        </div>
  
        <div class="flex-1 p-6">
          <!-- Child pages will render here -->
          <RouterView />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import HomeNavbar from "@/components/HomeNavbar.vue";
  import SideBar from "@/components/SideBar.vue";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  interface User {
    name?: string;
    email?: string;
    image?: string;
  }
  
  const router = useRouter();
  const user = ref<User | null>(null);
  
  onMounted(async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/profile", {
        withCredentials: true,
      });
      user.value = res.data;
    } catch (err) {
      router.push("/");
    }
  });
  </script>
  