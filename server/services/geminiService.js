import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIReport = async (overall, departments) => {
  const prompt = `

You are an HR Analytics AI.

Analyze the following workforce statistics.

Overall Statistics:

${JSON.stringify(overall, null, 2)}

Department Statistics:

${JSON.stringify(departments, null, 2)}

Generate ONLY valid JSON.

Do not add markdown.

Do not add explanation.

Return exactly this structure:

{
  "healthScore": 95,
  "healthStatus": "Excellent",

  "executiveSummary":[
    "...",
    "..."
  ],

  "keyInsights":[
    "...",
    "..."
  ],

  "risks":[
    "...",
    "..."
  ],

  "recommendations":[
    "...",
    "..."
  ]
}

Health Score Rules:

95-100 = Excellent

80-94 = Good

60-79 = Fair

40-59 = Needs Attention

Below 40 = Critical

Generate 3-5 points for each section.

`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",

    contents: prompt,
  });

  return response.text;
};
