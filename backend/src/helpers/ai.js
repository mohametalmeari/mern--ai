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

export const imgReqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
};

const negative_prompt =
  "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs))";

export const generateImgReqBody = ({ prompt, size, samples, key }) =>
  JSON.stringify({
    prompt,
    width: size || "512",
    height: size || "512",
    samples: samples || 1,
    negative_prompt,
    key,

    num_inference_steps: "20",
    safety_checker: false,
    enhance_prompt: true,
    temp: true,
    seed: null,
    guidance_scale: 7.5,
    webhook: null,
    track_id: null,
  });
