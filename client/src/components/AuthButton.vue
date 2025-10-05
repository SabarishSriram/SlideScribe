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
  <div class="text-white space-y-3 sm:space-y-4">
    <Button
      v-if="loading === 'google'"
      class="text-sm sm:text-base bg-black text-white w-full cursor-not-allowed py-2 sm:py-3 px-4 rounded-lg"
    >
      <Loader2
        stroke-width="3"
        class="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-spin"
      />
    </Button>
    <Button
      v-else
      @click="logIn('google')"
      class="text-sm sm:text-base bg-black text-white hover:bg-[#fb444f] w-full flex justify-center items-center gap-2 sm:gap-3 py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200"
    >
      <img
        :src="google"
        alt="Google icon"
        class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />
      <span class="whitespace-nowrap">Sign in with Google</span>
    </Button>

    <Button
      v-if="loading === 'github'"
      class="text-sm sm:text-base bg-black text-white w-full cursor-not-allowed py-2 sm:py-3 px-4 rounded-lg"
    >
      <Loader2
        stroke-width="3"
        class="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-primary"
      />
    </Button>
    <Button
      v-else
      @click="logIn('github')"
      class="text-sm sm:text-base bg-black text-white w-full hover:bg-[#fb444f] flex justify-center items-center gap-2 sm:gap-3 py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200"
    >
      <img
        :src="github"
        alt="Github icon"
        class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
      />
      <span class="whitespace-nowrap">Sign in with Github</span>
    </Button>
  </div>
</template>
