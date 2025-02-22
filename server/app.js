const express = require("express");
const multer = require("multer");
const fs = require("fs/promises");
const path = require("path");
const pdfparse = require("pdf-parse");
const app = express();

const PORT = 3000;
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

app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded!");
  const filepath = path.join(__dirname, "uploads", req.file.filename);
  console.log(filepath);

  try {
    const databuffer = await fs.readFile(filepath);
    const pdfdata = await pdfparse(databuffer);
    return res.send({ text: pdfdata.text });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}✨`);
});
