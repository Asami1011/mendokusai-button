import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const fetchRecipesFromAI = async (ingredients) => {
  if (!ingredients || ingredients.length === 0) return [];

  try {
    const prompt = `
      以下の材料で作れるレシピを最低15件、最大30件JSON形式で作ってください。
      もし材料が少ない場合でも、1件以上は必ず返してください。
      もし15件以上作れない場合でも、可能な限り多く返してください。
      材料: ${ingredients.join(", ")}
      形式:
      [
        {
          "name": "レシピ名",
          "ingredients": ["材料1","材料2",...],
          "steps": ["手順1","手順2",...]
        }
      ]
      出力はJSONのみで。
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano-2025-08-07",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("OpenAIレスポンス全体:", response);

    const content = response?.choices?.[0]?.message?.content;
    if (!content) {
      console.error("OpenAIから内容が取得できませんでした");
      return [];
    }

    let recipes = [];
    try {
      // 制御文字を除去して JSON をパース
      const cleanedContent = content
        .replace(/[\u0000-\u001F]+/g, "") // 制御文字除去
        .trim();
      
      // さらに、JSON の前後に余計な文字があれば取り除く
      const firstBracket = cleanedContent.indexOf("[");
      const lastBracket = cleanedContent.lastIndexOf("]");
      if (firstBracket !== -1 && lastBracket !== -1) {
        const jsonString = cleanedContent.slice(firstBracket, lastBracket + 1);
        recipes = JSON.parse(jsonString);
      } else {
        console.error("JSON配列の形式が正しくありません:", cleanedContent);
      }
    } catch (e) {
      console.error("JSON parse エラー:", e, "\ncontent:", content);
      recipes = [];
    }

    console.log("パース後のrecipes:", recipes);
    return recipes;
  } catch (err) {
    console.error("OpenAI呼び出しエラー:", err);
    return [];
  }
};
