<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FilePlus2 } from "lucide-vue-next";

// Dialog Components from shadcn-vue
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

const fileInput = ref<HTMLInputElement | null>(null);
const router = useRouter();
const title = ref("");
const fileName = ref<string | null>(null);
const notes = ref([]);
const loading = ref(true);
const userId = ref(null);

const fetchUserId = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/auth/profile", {
      credentials: "include", // 👈 ensures cookies (session) are sent
    });
    const user = await res.json();
    userId.value = user.id;
    console.log(userId.value);
  } catch (err) {
    console.error("Failed to fetch profile:", err);
  }
};
const fetchNotes = async () => {
  try {
    const res = await fetch(
      `http://localhost:4000/api/allnotes/${userId.value}`
    );
    notes.value = await res.json();
    console.log(notes.value);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await fetchUserId();
  await fetchNotes();
});

const handleFileSelect = () => {
  const file = fileInput.value?.files?.[0];
  if (file) {
    fileName.value = file.name;
  }
};
const handleFileChange = async () => {
  const file = fileInput.value?.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title.value);

  try {
    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    router.push(`/notes/${data.id}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};
</script>

<template>
  <div class="flex justify-between items-center">
    <div>
      <h2 class="text-white font-bold text-xl">Your Notes</h2>
      <p class="text-gray-400 text-sm">
        Uploaded Notes will be displayed here.
      </p>
    </div>

    <Dialog>
      <!-- Trigger -->
      <DialogTrigger as-child>
        <Button class="text-white py-5 flex items-center font-semibold gap-2">
          <FilePlus2 :stroke-width="3" :size="20" />
          Upload PDF/PPT
        </Button>
      </DialogTrigger>

      <!-- Content -->
      <DialogContent class="sm:max-w-lg bg-[#0F172A] text-white border-none">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription class="text-gray-400">
            Enter the Title of your PDF/PPT and upload it.
          </DialogDescription>
        </DialogHeader>
        <div class="flex flex-col">
          <label>PDF/PPT Title:</label>
          <input
            v-model="title"
            class="bg-[#0f172A] py-2 border rounded-lg px-3 focus:outline-none focus:ring-1 focus:ring-red-500 border-red-400"
            type="text"
          />
        </div>
        <label
          for="fileUpload"
          class="flex flex-col items-center justify-center w-full h-40 mt-4 p-4 border-2 border-dashed border-red-400 rounded-lg cursor-pointer hover:border-red-500 transition"
        >
          <span class="text-gray-400">
            {{ fileName || "Drag & Drop PDF/PPT here" }}
          </span>
          <span class="text-sm text-gray-400 mt-1">{{
            fileName ? "" : "or click to select"
          }}</span>
          <input
            id="fileUpload"
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".pdf,.ppt,.pptx"
            @change="handleFileSelect"
          />
        </label>

        <!-- Optional Close Button -->

        <Button class="mt-4 text-white" @click="handleFileChange"
          >Upload</Button
        >
      </DialogContent>
    </Dialog>
  </div>

  <div class="mt-4">
    <div v-if="loading">Loading...</div>
    <div v-else-if="notes.length === 0">No notes found.</div>
    <ul v-else class="text-white flex">
      <li class=" w-60 border border-[]" v-for="note in notes" :key="note.id">
        <div class="bg-white">
          <img src="../assets/pdf.png" alt="" />
        </div>
        <a
          :href="`/notes/${note.id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white hover:underline"
        >
          {{ note.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
