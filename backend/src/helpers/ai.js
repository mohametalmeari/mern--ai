import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const codeInstructions = [
  {
    role: "user",
    parts: [
      {
        text: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations. If asked for something else, please respond with 'Sorry, I only generate code snippets.' and if asked about your purpose, respond with 'I am a code generator.'",
      },
    ],
  },
];
