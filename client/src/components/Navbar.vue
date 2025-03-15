<template>
  <nav
    class="w-full bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-primary))] border-b border-[hsl(var(--sidebar-border))] dark"
  >
    <div class="container flex justify-between items-center mx-auto px-6 md:px-10">
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

      <DialogRoot>
    <DialogTrigger
      class="text-grass11 font-semibold hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-md px-[15px] leading-none shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-green8 focus:outline-none border"
    >
      Get Started
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-sm leading-normal">
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-grass11 w-[90px] text-right text-sm"
            for="name"
          > Name </label>
          <input
            id="name"
            class="text-grass11 bg-stone-50 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            defaultValue="Pedro Duarte"
          >
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-grass11 w-[90px] text-right text-sm"
            for="username"
          > Username </label>
          <input
            id="username"
            class="text-grass11 bg-stone-50 shadow-green7 focus:shadow-green8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            defaultValue="@peduarte"
          >
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              class="bg-green4 text-green11 text-sm hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-lg px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <Icon icon="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
      
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

const isDialogOpen = ref(false)
</script>
