<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthButton from "@/components/AuthButton.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ArrowRight, FileText, Zap, BookOpen } from "lucide-vue-next";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/auth/profile", {
      withCredentials: true,
    });
    user.value = res.data;
    if (user.value) {
      router.push("/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div class="min-h-screen bg-black">
    <Navbar />

    <!-- Hero Section -->
    <div class="container mx-auto px-6 pt-32 pb-24">
      <div class="flex flex-col items-center text-center">
        <!-- Main Heading with Animation -->
        <h1
          class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in"
        >
          Transform Your <span class="text-[#FF4550]">Slides</span> into
          <span class="text-[#FF4550]">Smart Notes</span>
        </h1>

        <!-- Subheading -->
        <p
          class="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 animate-fade-in-delay"
        >
          Upload your presentations and let AI create comprehensive,
          well-structured notes. Save time and focus on what matters.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-delay-2"
        >
          <Dialog>
            <DialogTrigger>
              <Button
                class="bg-[#FF4550] hover:bg-[#FF4550]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl flex items-center gap-2"
              >
                Get Started <ArrowRight class="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent
              class="dark border-black text-white max-w-sm bg-[#0F172A]"
            >
              <DialogHeader>
                <DialogTitle
                  class="flex items-center py-5 space-x-2 justify-center"
                >
                  <img src="/smile.svg" alt="logo" class="w-7 h-7" />
                  <span class="font-semibold text-2xl">
                    <span class="text-[#FF4550]">SlideS</span>cribe
                  </span>
                </DialogTitle>
                <DialogDescription>
                  <AuthButton />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <!-- Feature Cards -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-delay-3"
        >
          <!-- Feature 1 -->
          <div
            class="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm"
          >
            <div
              class="w-12 h-12 bg-[#FF4550]/10 rounded-lg flex items-center justify-center mb-4"
            >
              <FileText class="w-6 h-6 text-[#FF4550]" />
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">Smart Upload</h3>
            <p class="text-gray-400">
              Upload your PDF or PPT files with ease and let our AI do the work.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm"
          >
            <div
              class="w-12 h-12 bg-[#FF4550]/10 rounded-lg flex items-center justify-center mb-4"
            >
              <Zap class="w-6 h-6 text-[#FF4550]" />
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">AI-Powered</h3>
            <p class="text-gray-400">
              Advanced AI technology converts your slides into comprehensive
              notes instantly.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm"
          >
            <div
              class="w-12 h-12 bg-[#FF4550]/10 rounded-lg flex items-center justify-center mb-4"
            >
              <BookOpen class="w-6 h-6 text-[#FF4550]" />
            </div>
            <h3 class="text-white font-semibold text-lg mb-2">Smart Notes</h3>
            <p class="text-gray-400">
              Get well-structured, easy-to-read notes with key topics
              highlighted.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
