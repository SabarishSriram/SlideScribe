<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked"; // Import marked for Markdown parsing
import { useRoute } from "vue-router";

const route = useRoute();
const noteid = route.params.id;
const generatedText = ref(""); // Store the raw generated text
const topics = ref<string[]>([]); // Store extracted topics

// Function to parse Markdown to HTML
const parseMarkdown = (text: string) => {
  return marked(text, {
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub-flavored Markdown (e.g., tables)
  });
};

// Function to extract topics dynamically
const extractTopics = (text: string) => {
  return text
    .split("\n") // Split text into lines
    .filter((line) => line.startsWith("#")) // Get lines with headings
    .map((line) => line.replace(/^#+\s*/, "")); // Remove # symbols
};
// Fetch text file on mount
onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/notes/${noteid}`);
    if (response) {
      const data = await response.json();
      generatedText.value = data.content;
      console.log(generatedText.value)
      topics.value = extractTopics(generatedText.value); // Extract topics after fetching
    }
  } catch (error) {
    console.error("Failed to load text:", error);
  }
});
</script>

<template>
  <div class="flex items-start gap-6">
    <div
      v-if="generatedText"
      class="bg-slate-800 p-5 rounded-lg shadow-md mt-5"
    >
      <h3>Generated Notes:</h3>
      <!-- Use v-html to render parsed HTML from the Markdown -->
      <div class="markdown-content" v-html="parseMarkdown(generatedText)"></div>
    </div>
    <div
      class="text-red-700 font-bold rounded-md px-6 mr-6 py-2 bg-slate-800 mt-6"
    >
      Topics:
      <ul v-if="topics.length" class="list-disc pl-5 text-white mt-2">
        <li v-for="(topic, index) in topics" :key="index">
          {{ topic }}
        </li>
      </ul>
      <p v-else class="text-white">Loading topics...</p>
    </div>
  </div>
</template>
<style>
/* Apply styles directly to the elements */
.markdown-content h1 {
  @apply text-2xl font-bold  text-red-700 border-b-4 border-red-700 pb-1 mt-5;
}

.markdown-content h2 {
  @apply text-xl font-semibold bg-slate-800 rounded-md text-red-600 border-l-4 border-red-600 pl-3 mt-4;
}

.markdown-content ul {
  @apply list-disc  pl-6 mt-2;
}

.markdown-content li {
  @apply text-base text-white mb-1;
}
.markdown-content p {
  @apply text-base text-white mb-1;
}

.markdown-content strong {
  @apply text-red-700 bg-slate-900 p-1 rounded-md font-bold;
}
body {
  background: black;
}
</style>
