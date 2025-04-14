<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/auth/profile", {
      withCredentials: true,
    });
    user.value = res.data;
    if(user.value){
      router.push('/dashboard')
    }
    else{
      router.push('/')
    }
  } catch (err) {
    console.log(err)
  }
});
</script>

<template>
  <div class="w-full">
    <Navbar />
  </div>
</template>
