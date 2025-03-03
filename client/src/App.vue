<template>
  <div class="container">
    <h1 class="title">📄 PDF to Structured Notes</h1>

    <label for="file-upload" class="custom-file-upload">
      📂 Upload PDF
    </label>
    <input id="file-upload" type="file" @change="handleUpload" accept="application/pdf" />

    <div v-if="loading" class="loading">
      ⏳ Processing your PDF...
    </div>

    <div v-if="notes" class="notes-container">
      <h2 class="notes-title">📌 Generated Notes</h2>
      <pre class="notes-text">{{ notes }}</pre>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const notes = ref("");
    const loading = ref(false);

    const handleUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      loading.value = true;
      notes.value = "";

      try {
        const response = await axios.post("http://localhost:3000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data && response.data[0]?.generated_text) {
          notes.value = response.data[0].generated_text;
        } else {
          notes.value = "⚠️ No structured notes generated.";
        }
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Failed to process PDF");
      } finally {
        loading.value = false;
      }
    };

    return { notes, handleUpload, loading };
  },
};
</script>

<style>
/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

/* Container */
.container {
  width: 90%;
  max-width: 700px;
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Title */
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* Upload Button */
.custom-file-upload {
  display: inline-block;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.custom-file-upload:hover {
  background-color: #0056b3;
}

/* Hide default file input */
input[type="file"] {
  display: none;
}

/* Loading Indicator */
.loading {
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

/* Notes Container */
.notes-container {
  margin-top: 20px;
  text-align: left;
  background: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
}

/* Notes Title */
.notes-title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

/* Notes Text */
.notes-text {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #222;
  max-width: 100%;
}

/* Responsive Design */
@media (max-width: 600px) {
  .container {
    width: 95%;
    padding: 20px;
  }
}
</style>
