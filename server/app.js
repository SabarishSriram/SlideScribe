const express = require("express");
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const pdfparse = require("pdf-parse");
const cors = require("cors");
const axios = require("axios");

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
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      { inputs: `Convert this into structured notes: ${text}` },
      {
        headers: {
          Authorization: `Bearer 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`,
        },
      }
    );
    console.log("i am working")
    return response.data;
  } catch (error) {
    console.error("Hugging Face API Error:", error);
  }
};

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded!");
  const filepath = path.join(__dirname, "uploads", req.file.filename);
  console.log(filepath);

  try {
    const databuffer = await fs.readFile(filepath);
    const pdfdata = await pdfparse(databuffer);
    console.log("ur text has been sent to the model🥰");

    const notes = await generateNotes(pdfdata.text);
    res.send(notes);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}✨`);
});
