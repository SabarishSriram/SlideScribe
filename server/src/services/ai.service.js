const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Load API key from .env file

const generateNotes = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Convert this into structured notes ${text}`;
    const result = await model.generateContent(prompt);
    
    return result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

module.exports = { generateNotes };
