import pdfparse from "pdf-parse";

import fs from "fs/promises";
import path from "path";

export const parsePDF = async (filepath) => {
  try {
    const fileExt = path.extname(filepath).toLowerCase(); // Get file extension
    const dataBuffer = await fs.readFile(filepath);

    console.log(`Parsing file: ${filepath}`);

    if (fileExt === ".pdf") {
      console.log("Detected PDF file...");
      const pdfData = await pdfparse(dataBuffer);
      return pdfData.text;
    } else if (fileExt === ".pptx") {
      console.log("Detected PPTX file...");
      const pptxText = await parsePptx(dataBuffer);
      return pptxText;
    } else {
      throw new Error("Unsupported file type. Only PDF and PPTX are allowed.");
    }
  } catch (error) {
    console.error("File Parsing Error:", error);
    throw error;
  }
};
