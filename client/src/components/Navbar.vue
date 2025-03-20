<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthButton from "./AuthButton.vue";
</script>

<template>
  <nav
    class="w-full bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-primary))] border-b border-[hsl(var(--sidebar-border))] dark"
  >
    <div
      class="container flex justify-between items-center mx-auto px-6 md:px-10"
    >
      <div class="flex items-center justify-between h-20">
        <!-- Logo and Brand -->
        <div class="flex items-center gap-3">
          <img src="/smile.svg" alt="" class="w-8" />
          <div class="flex-shrink-0">
            <a href="#" class="text-inherit font-semibold text-2xl">
              SlideS<span class="text-white">cribe</span>
            </a>
          </div>
        </div>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button class="font-semibold">Get Started</Button>
          </DialogTrigger>
          <DialogContent class="dark border-black text-white max-w-sm">
            <DialogHeader>
              <DialogTitle
                className="flex items-center py-3 space-x-2 justify-center"
              >
                <img src="/smile.svg" alt="logo" className="size-7" />
                <span className="font-semibold text-xl sm:text-xl md:text-2xl ">
                  <span
                    className=" text-primary text-lg sm:text-xl md:text-2xl"
                  >
                    SlideS</span
                  >cribe
                </span>
              </DialogTitle>
              <DialogDescription>
                <AuthButton/>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </nav>
</template>
