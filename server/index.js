import express from "express";
import cors from "cors";
import { fetchRecipesFromAI } from "./openai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recipes", async (req, res) => {
  try {
    const { ingredients } = req.body;
    const recipes = await fetchRecipesFromAI(ingredients || []);
    res.json({ content: recipes }); // ← content 配列で返す
  } catch (err) {
    console.error("レシピ取得エラー:", err);
    res.status(500).json({ content: [] });
  }
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
