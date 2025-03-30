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
      const response = await fetch("/test2.txt"); // Path to your markdown/text file
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

  <div v-if="generatedText" class="markdown-wrapper">
    <h3>Generated Notes:</h3>
    <!-- Use v-html to render parsed HTML from the Markdown -->
    <div class="markdown-content" v-html="parseMarkdown(generatedText)"></div>
  </div>
</template>
<style>

.markdown-wrapper {
  background-color: #f0f7ff; /* Light blue background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/* Base styling */
.markdown-content {
  font-family: 'Open Sans', sans-serif;
  color: #0a2540; /* Dark blue text */
  line-height: 1.6;
}

/* Main topic (h1) */
.markdown-content h1 {
  font-size: 28px;
  font-weight: bold;
  color: #0056b3; /* Deep blue */
  border-bottom: 3px solid #0056b3;
  padding-bottom: 5px;
  margin-top: 20px;
}

/* Subtopic (h2) */
.markdown-content h2 {
  font-size: 22px;
  font-weight: 600;
  color: #0077cc; /* Slightly lighter blue */
  border-left: 5px solid #0077cc;
  padding-left: 10px;
  margin-top: 15px;
}

/* Unordered list (bullet points) */
.markdown-content ul {
  list-style-type: disc;
  padding-left: 25px;
  margin-top: 10px;
}

/* List items */
.markdown-content li {
  font-size: 16px;
  color: #004080; /* Slightly darker blue */
  margin-bottom: 5px;
}

/* Bold text */
.markdown-content strong {
  color: #0056b3;
  font-weight: bold;
}
</style>
