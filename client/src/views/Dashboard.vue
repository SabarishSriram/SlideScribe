<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";

const HomeNavbar = defineAsyncComponent(() => import('@/components/HomeNavbar.vue'));


interface User {
  name?: string;
  email?: string;
  image?: string;
}

const router = useRouter();
const user = ref<User | null>(null); // Initialize as null


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

<template>
  <HomeNavbar :user="user" />
</template>