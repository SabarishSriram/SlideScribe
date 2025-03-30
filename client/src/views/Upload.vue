<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked"; // Import marked for Markdown parsing
const generatedText = ref(""); // Store the raw generated text

// Function to parse Markdown to HTML
const parseMarkdown = (text: string) => {
  const markedtext = marked(text, {
    breaks: true, // Enable line breaks
    gfm: true, // Enable GitHub-flavored Markdown (e.g., tables)
  });
  console.log(markedtext);
  return markedtext; // Convert the raw markdown text to HTML
};

// const uploadFile = async (event: any) => {

//   // const file = event.target.files[0];
//   // if (!file) return;

//   // const formData = new FormData();
//   // formData.append("file", file);

// };

onMounted(async () => {
  try {
    const response = await fetch("/test1.txt"); // Path to your markdown/text file
    if (response.ok) {
      const text = await response.text();
      generatedText.value = text;
    }
  } catch (error) {
    console.error("Failed to load text:", error);
  }
});
</script>

<template>
  <div v-if="generatedText" class="bg-black p-5 rounded-lg shadow-md mt-5">
    <h3>Generated Notes:</h3>
    <!-- Use v-html to render parsed HTML from the Markdown -->
    <div class="markdown-content" v-html="parseMarkdown(generatedText)"></div>
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
</style>
