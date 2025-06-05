<script setup>
import { ref } from "vue";
import google from "@/assets/google.svg"; // Adjust the path as needed
import github from "@/assets/github.svg";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI library
import { Loader2 } from "lucide-vue-next"; // If you're using Lucide icons

const loading = ref(null);
const logIn = (provider) => {
  loading.value = provider;
  window.location.href = `http://localhost:4000/api/auth/${provider}`;
};
</script>

<template>
  <div class="text-white">
    <Button
      v-if="loading === 'google'"
      class="text-base bg-black text-white mb-3 w-full cursor-not-allowed"
    >
      <Loader2 stroke-width="3" class="text-primary animate-spin" />
    </Button>
    <Button
      v-else
      @click="logIn('google')"
      class="text-base mb-3 bg-black text-white hover:bg-[#fb444f] w-full flex justify-center items-center"
    >
      <img :src="google" alt="Google icon" class="size-5" />
      Sign in with Google
    </Button>

    <Button
      v-if="loading === 'github'"
      class="text-base bg-black text-white w-full cursor-not-allowed"
    >
      <Loader2 stroke-width="3" class="size-7 animate-spin text-primary" />
    </Button>
    <Button
      v-else
      @click="logIn('github')"
      class="text-base bg-black text-white w-full hover:bg-[#fb444f] flex justify-center items-center"
    >
      <img :src="github" alt="Github icon" class="size-5" />
      Sign in with Github
    </Button>
  </div>
</template>
