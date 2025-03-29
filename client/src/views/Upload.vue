<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { marked } from "marked"; // Import marked for Markdown parsing
const generatedText = ref(""); // Store the raw generated text

// Function to parse Markdown to HTML
const parseMarkdown = (text: string) => {
    const markedtext = marked(text, {
    breaks: true,       // Enable line breaks
    gfm: true,          // Enable GitHub-flavored Markdown (e.g., tables)
  });
  console.log(markedtext);
  return markedtext; // Convert the raw markdown text to HTML
};

const uploadFile = async (event: any) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:4000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Assuming response.data.text is the raw Markdown
    generatedText.value = response.data.text;
  } catch (error) {
    console.error("Upload failed", error);
  }
};
</script>

<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="file">Upload PPT</Label>
    <Input id="file" type="file" @change="uploadFile" />
  </div>

  <div v-if="generatedText">
    <h3>Generated Notes:</h3>
    <!-- Use v-html to render parsed HTML from the Markdown -->
    <div v-html="parseMarkdown(generatedText)"></div>
  </div>
</template>

<style scoped>
/* Custom styles for your notes */
h1,
h2,
h3,
h4 {
  margin-top: 10px;
}
</style>
