import fs from "fs/promises";
import path from "path";
import PDFParse from "pdf-parse";
import PptxParser from "node-pptx-parser";
import { temporaryWrite } from "tempy"; // Make sure this import exists

const parsePptx = async (buffer) => {
  let tempFilePath;
  try {
    // Create temp file (node-pptx-parser requires file path)
    tempFilePath = await temporaryWrite(buffer, { extension: "pptx" });

    const parser = new PptxParser(tempFilePath);
    const slides = await parser.extractText();

    // Format extracted text
    let fullText = "";
    slides.forEach((slide) => {
      fullText += `\n=== Slide ${slide.id} ===\n`;
      fullText += slide.text.join("\n") + "\n";
    });
    console.log(fullText.trim())
    return fullText.trim();
  } catch (error) {
    console.error("PPTX Parsing Error:", error);
    throw new Error(`PPTX extraction failed: ${error.message}`);
  } finally {
    // Cleanup temp file
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (cleanupError) {
        console.warn("Temp file cleanup failed:", cleanupError);
      }
    }
  }
};

export const parsePDF = async (filepath) => {
  try {
    const fileExt = path.extname(filepath).toLowerCase();
    const buffer = await fs.readFile(filepath);

    if (fileExt === ".pdf") {
      const pdfData = await PDFParse(buffer);
      return pdfData.text;
    } else if (fileExt === ".pptx") {
      return await parsePptx(buffer);
    }
    throw new Error("Unsupported file type");
  } catch (error) {
    console.error("File Parsing Error:", error);
    throw error;
  }
};
