const pdfparse = require("pdf-parse");
const fs = require("fs/promises");
const path = require("path");

const parsePDF = async (filepath) => {
  try {
    const dataBuffer = await fs.readFile(filepath);
    const pdfData = await pdfparse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw error;
  }
};

module.exports = { parsePDF };
