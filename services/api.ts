
import { GoogleGenAI, Type } from '@google/genai';

/**
 * TextFlow API Service
 * Инкапсулирует всю логику работы с Gemini и эмуляцию очередей.
 */
export const TextFlowAPI = {
  /** Аудит текста */
  async auditText(text: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Проведи SEO-аудит (JSON format): ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            params: {
              type: Type.OBJECT,
              properties: {
                seo: { type: Type.NUMBER },
                readability: { type: Type.NUMBER },
                water: { type: Type.NUMBER }
              }
            },
            verdict: { type: Type.STRING },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "params", "verdict", "tips"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  },

  /** Эмуляция генерации одного текста */
  async generateTextPreview(title: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Напиши короткое превью (100 слов) для статьи: ${title}`,
    });
    return response.text;
  }
};
