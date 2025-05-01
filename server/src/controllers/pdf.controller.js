import path from "path";
import { fileURLToPath } from "url";
import { parsePDF } from "../services/pdf.service.js";
import { generateNotes } from "../services/ai.service.js";
import prisma from "../config/prisma.js";

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPDF = async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded!");
  const {title}=req.body;
  const profileId = req.user.id; // assuming your user model has an `id` field
  console.log(profileId)
  const filepath = path.join(__dirname, "../../uploads", req.file.filename);

  try {
    const extractedText = await parsePDF(filepath);
    console.log("Text extracted, sending to AI Model");

    const notes = await generateNotes(extractedText);
    console.log("Notes generated successfully!");

    const savedNote = await prisma.note.create({
      data: {
        title: title,
        content: notes,
        userId: profileId,
      },
    });
    res.status(200).json({id:savedNote.id})
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
};
