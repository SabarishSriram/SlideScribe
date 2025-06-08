<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Button } from "./ui/button";
import { FilePlus2, Loader2 } from "lucide-vue-next";

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
const isUploading = ref(false);

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
      `http://localhost:4000/api/allnotes/${userId.value}`,
      {
        credentials: "include",
      }
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
    isUploading.value = true;
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
  } finally {
    isUploading.value = false;
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

        <Button
          class="mt-4 w-full bg-[#FB444F] hover:bg-[#FB444F]/90 disabled:opacity-50 text-white"
          @click="handleFileChange"
          :disabled="isUploading"
        >
          <Loader2 v-if="isUploading" class="w-4 h-4 animate-spin mr-2" />
          {{ isUploading ? "Uploading..." : "Upload Document" }}
        </Button>
      </DialogContent>
    </Dialog>
  </div>

  <div class="mt-4">
    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"
      ></div>
    </div>
    <div v-else-if="notes.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-lg">No notes found.</div>
      <p class="text-gray-500 mt-2">
        Upload your first document to get started!
      </p>
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <router-link
        v-for="note in notes"
        :key="note.id"
        :to="`/notes/${note.id}`"
        class="group bg-[#0F172A] rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
      >
        <div class="aspect-[4/3] relative bg-slate-900/50 overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <img
              src="../assets/pdf.png"
              alt="PDF Preview"
              class="w-20 h-20 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div
            class="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0F172A] to-transparent"
          ></div>
        </div>
        <div class="p-4">
          <h3
            class="text-white font-medium text-sm truncate group-hover:text-red-500 transition-colors"
          >
            {{ note.title }}
          </h3>
          <p class="text-slate-400 text-xs mt-1">Click to view notes</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
