<script setup>
import { ref } from "vue";
import google from "@/assets/google.svg"; // Adjust the path as needed
import github from "@/assets/github.svg";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI library
import { Loader2 } from "lucide-vue-next"; // If you're using Lucide icons

const googlePending = ref(false);
const githubPending = ref(false);

const logIn = (provider) => {
  console.log(`Logging in with ${provider}`);
};
</script>

<template>
  <div class="space-y-3">
    <Button
      v-if="googlePending"
      variant="outline"
      class="text-base w-full cursor-not-allowed"
    >
      <Loader2 stroke-width="3" class="text-primary animate-spin" />
    </Button>
    <Button
      v-else
      variant="outline"
      @click="logIn('google')"
      class="text-base w-full flex justify-center items-center"
    >
      <img :src="google" alt="Google icon" class="size-5" />
      Sign in with Google
    </Button>

    <Button
      v-if="githubPending"
      variant="outline"
      class="text-base w-full cursor-not-allowed"
    >
      <Loader2 stroke-width="3" class="size-7 animate-spin text-primary" />
    </Button>
    <Button
      v-else
      variant="outline"
      @click="logIn('github')"
      class="text-base w-full flex justify-center items-center"
    >
      <img :src="github" alt="Github icon" class="size-5" />
      Sign in with Github
    </Button>
  </div>
</template>
