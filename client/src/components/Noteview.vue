<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked"; // Import marked for Markdown parsing
import { useRoute, useRouter } from "vue-router";
import { Button } from "./ui/button";
import { ArrowLeft, BookOpen } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const noteid = route.params.id;
const generatedText = ref(""); // Store the raw generated text
const topics = ref<string[]>([]); // Store extracted topics
const loading = ref(true); // Spinner control
const title = ref("");

// Function to parse Markdown to HTML
const parseMarkdown = (text: string) => {
  return marked(text, {
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub-flavored Markdown (e.g., tables)
  });
};

// Function to extract topics dynamically
const extractTopics = (text: string) => {
  loading.value = false;
  return text
    .split("\n") // Split text into lines
    .filter((line) => line.startsWith("#")) // Get lines with headings
    .map((line) => line.replace(/^#+\s*/, "")); // Remove # symbols
};

const handleBack = () => {
  router.back();
};

// Fetch text file on mount
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/notes/${noteid}`, {
      credentials: "include",
    });
    if (response) {
      const data = await response.json();
      generatedText.value = data.content;
      title.value = data.title || "Untitled Note";
      topics.value = extractTopics(generatedText.value); // Extract topics after fetching
    }
  } catch (error) {
    console.error("Failed to load text:", error);
  }
});
</script>

<template>
  <div class="min-h-screen pb-12 bg-black">
    <!-- Loading State -->
    <div class="flex justify-center items-center min-h-[50vh]" v-if="loading">
      <div class="flex flex-col items-center gap-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"
        ></div>
        <p class="text-gray-400">Loading your notes...</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center py-6">
        <div>
          <h1
            class="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            {{ title }}
          </h1>
          <p class="text-gray-400 text-sm mt-1">
            Generated notes from your document
          </p>
        </div>
        <Button
          @click="handleBack"
          variant="outline"
          class="border-slate-700 hover:bg-[#FB444F] bg-slate-800 text-[#FB444F] px-3 sm:px-4 py-2 text-sm sm:text-base"
        >
          <ArrowLeft class="w-4 h-4 mr-1 sm:mr-2" />
          <span class="hidden sm:inline">Back to Notes</span>
          <span class="sm:hidden">Back</span>
        </Button>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Topics Sidebar -->
        <div class="lg:w-64 order-2 lg:order-1">
          <div class="sticky top-6">
            <div
              v-if="topics.length"
              class="bg-[#0F172A] rounded-xl border border-slate-800 overflow-hidden"
            >
              <div class="p-4 border-b border-slate-800">
                <div class="flex items-center gap-2 text-red-500">
                  <BookOpen class="w-4 h-4" />
                  <h2 class="font-semibold">Table of Contents</h2>
                </div>
              </div>
              <nav class="p-4">
                <ul class="space-y-2">
                  <li
                    v-for="(topic, index) in topics"
                    :key="index"
                    class="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {{ topic }}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div
          v-if="generatedText"
          class="flex-1 order-1 lg:order-2 bg-[#0F172A] p-6 lg:p-8 rounded-xl border border-slate-800 shadow-lg"
        >
          <div class="prose prose-invert max-w-none">
            <div
              class="markdown-content"
              v-html="parseMarkdown(generatedText)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Base styles for markdown content */
.markdown-content {
  @apply text-gray-200;
}

.markdown-content h1 {
  @apply text-3xl font-bold text-white border-b-2 border-red-500/30 pb-3 mb-6 mt-8;
}

.markdown-content h2 {
  @apply text-2xl font-semibold text-white border-l-4 border-red-500 pl-4 py-2 my-6 bg-slate-800/50 rounded-r-lg;
}

.markdown-content h3 {
  @apply text-xl font-medium text-[#FB444F] mt-6 mb-4;
}

.markdown-content ul {
  @apply space-y-2 my-4 ml-6 list-disc marker:text-[#FB444F];
}

.markdown-content ol {
  @apply space-y-2 my-4 ml-6 list-decimal marker:text-[#FB444F];
}

.markdown-content li {
  @apply text-gray-300 leading-relaxed;
}

.markdown-content p {
  @apply text-gray-300 leading-relaxed mb-4;
}

.markdown-content strong {
  @apply font-semibold text-[#FB444F] bg-slate-800/50 px-1.5 py-0.5 rounded;
}

.markdown-content blockquote {
  @apply border-l-4 border-[#FB444F]/30 pl-4 my-4 italic text-gray-400;
}

.markdown-content code {
  @apply bg-slate-800 px-1.5 py-0.5 rounded text-[#FB444F] text-sm;
}

.markdown-content pre {
  @apply bg-slate-800 p-4 rounded-lg my-4 overflow-x-auto;
}

.markdown-content pre code {
  @apply bg-transparent p-0 text-gray-300;
}

.markdown-content img {
  @apply rounded-lg shadow-lg my-6 max-w-full;
}

.markdown-content a {
  @apply text-[#FB444F] hover:text-red-300 underline-offset-2 hover:underline;
}

.markdown-content hr {
  @apply my-8 border-slate-800;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .markdown-content h1 {
    @apply text-2xl;
  }

  .markdown-content h2 {
    @apply text-xl;
  }

  .markdown-content h3 {
    @apply text-lg;
  }
}
</style>
