import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Load API key from .env file

export const generateNotes = async (text) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Please convert the following text into well-organized, structured notes in Markdown format. The output should be formatted as follows:
    1. Use headers (# for main topics, ## for subtopics).
    2. Use bullet points (- or *) for lists.
    3. Use **bold** for important terms and definitions.
    4. Make sure the structure is clear and organized with proper sections.
    5. Ensure that the final output is in pure Markdown (no HTML tags).
    6. Do not Wrap the text in triple backticks.

    Here’s the text you need to convert into structured notes:
    ${text}`;
    const result = await model.generateContent(prompt);

    return result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
