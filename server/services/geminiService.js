import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAIReport = async (overall, departments) => {
  try {
    const prompt = `

You are an HR Analytics AI assistant.

Analyze the employee workforce data.

Overall Statistics:

${JSON.stringify(overall, null, 2)}


Department Statistics:

${JSON.stringify(departments, null, 2)}


Return ONLY valid JSON.

Do not use markdown.
Do not add explanation.


Return this structure:

{
    "healthScore": 95,

    "healthStatus": "Excellent",

    "executiveSummary": [
        "point 1",
        "point 2",
        "point 3"
    ],

    "keyInsights": [
        "point 1",
        "point 2",
        "point 3"
    ],

    "risks": [
        "point 1",
        "point 2",
        "point 3"
    ],

    "recommendations": [
        "point 1",
        "point 2",
        "point 3"
    ]
}


Health Score:

95-100 Excellent

80-94 Good

60-79 Fair

40-59 Needs Attention

0-39 Critical


Generate 3-5 points in every section.

`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",

      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.log("Gemini Error:", error.message);

    throw error;
  }
};
