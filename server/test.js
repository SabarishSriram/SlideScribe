const express = require("express");
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const pdfparse = require("pdf-parse");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const PORT = 3000;
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const generateNotes = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyCmUa6B3ppXQ5oRmhhWdnd_IZndCELcjm0"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Convert this into structured notes ${text}`;
    const result = await model.generateContent(prompt);
    console.log("i am working");
    return result;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
  }
};

app.post("/api/upload", upload.single("file"), async (req, res) => {
  console.log("Request Headers: 🤌🏻", req.headers);
  console.log("Uploaded File: 🤌🏻", req.file);
  if (!req.file) return res.status(400).send("No file uploaded!");
  const filepath = path.join(__dirname, "uploads", req.file.filename);
  console.log(filepath);

  try {
    const databuffer = await fs.readFile(filepath);
    const pdfdata = await pdfparse(databuffer);
    console.log("ur text has been sent to the model🥰");

    const notes = await generateNotes(pdfdata.text);
    const extractedText = notes.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.send(extractedText);
    console.log("Finished Succcesfuly!!!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}✨`);
});
