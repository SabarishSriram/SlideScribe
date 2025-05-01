<script setup lang="ts">
import { ref } from "vue";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FilePlus2 } from "lucide-vue-next";

// ShadCN Dialog Components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "./ui/dialog"; // Adjust path if needed
</script>

<template>
  <div class="flex justify-end">
    <Dialog>
      <!-- Trigger -->
      <DialogTrigger as-child>
        <Button class="text-white py-5 flex items-center gap-2">
          <FilePlus2 :stroke-width="3" :size="20" />
          Upload PDF/PPT
        </Button>
      </DialogTrigger>

      <!-- Content -->
      <DialogContent class="sm:max-w-lg bg-[#0F172A] text-white border-none">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription class=" text-gray-400">
            Drag and drop your PDF or PPT file here, or click to upload.
          </DialogDescription>
        </DialogHeader>

        <!-- Drag & Drop Area -->
        <label
          for="fileUpload"
          class="flex flex-col items-center justify-center w-full h-40 mt-4 p-4 border-2 border-dashed border-red-400 rounded-lg cursor-pointer hover:border-red-500 transition"
        >
          <span class="text-gray-400">Drag & Drop PDF/PPT here</span>
          <span class="text-sm text-gray-400 mt-1">or click to select</span>
          <input
            id="file"
            type="file"
            class="hidden"
            accept=".pdf,.ppt,.pptx"
          />
        </label>

        <!-- Optional Close Button -->
        <DialogClose as-child>
          <Button class="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  </div>

  <div class="mt-4">
    <Card>hi</Card>
  </div>
</template>
