const path = require("path");
const { parsePDF } = require("../services/pdf.service");
const { generateNotes } = require("../services/ai.service");
const uploadPDF = async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded!");

  const filepath = path.join(__dirname,"../../uploads", req.file.filename);
  
  try {
    const extractedText = await parsePDF(filepath);
    console.log("Text extracted, sending to AI Model");

    const notes = await generateNotes(extractedText);
    console.log("Notes generated successfully!");

    res.json({ text: notes });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
};

module.exports = { uploadPDF };
