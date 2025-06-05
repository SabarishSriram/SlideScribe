<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthButton from "./AuthButton.vue";
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <nav
    class="w-full bg-[#0F172A] text-[hsl(var(--sidebar-primary))] border-[hsl(var(--sidebar-border))] dark"
  >
    <div
      class="container flex justify-between items-center mx-auto px-4 sm:px-6 md:px-10"
    >
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-2 sm:gap-3">
          <img src="/smile.svg" alt="" class="w-6 sm:w-8" />
          <div class="flex-shrink-0">
            <a
              href="#"
              class="text-inherit font-semibold text-xl sm:text-2xl whitespace-nowrap"
            >
              SlideS<span class="text-white">cribe</span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button
              class="bg-[#FF4550] hover:bg-[#FF4550]/90 text-white px-2 py-2 sm:px-3 sm:py-3 text-sm sm:text-base font-semibold rounded-lg flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:scale-105"
            >
              <span class="hidden sm:inline">Get Started</span>
              <span class="sm:hidden"
                >Get Started <ArrowRight class="w-4 h-4 sm:w-5 sm:h-5"
              /></span>
              <ArrowRight class="w-4 hidden sm:inline h-4 sm:w-5 sm:h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent
            class="dark border-black bg-[#0F172A] text-white max-w-[90vw] sm:max-w-sm mx-4 sm:mx-0"
          >
            <DialogHeader>
              <DialogTitle
                class="flex items-center py-3 sm:py-5 space-x-2 justify-center"
              >
                <img
                  src="/smile.svg"
                  alt="logo"
                  class="w-5 h-5 sm:w-7 sm:h-7"
                />
                <span
                  class="font-semibold text-lg sm:text-xl md:text-2xl whitespace-nowrap"
                >
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
    </div>
  </nav>
</template>
