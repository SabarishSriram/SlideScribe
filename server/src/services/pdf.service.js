import pdfparse from "pdf-parse";
import fs from "fs/promises";
import path from "path";

export const parsePDF = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);
    console.log(filepath)
    const pdfData = await pdfparse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw error;
  }
};
