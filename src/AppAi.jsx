import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [showOtherRecipes, setShowOtherRecipes] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [stepOpen, setStepOpen] = useState({});
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- サーバー経由でAI呼び出し ---
  const fetchRecipesFromAI = async (ingredients) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      const data = await res.json();
      if (!Array.isArray(data)) return [];
      return data;
    } catch (err) {
      console.error("React側 fetch エラー:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const addTag = (tag) => {
    const t = tag.trim();
    if (t && !tags.includes(t)) {
      const newTags = [...tags, t];
      setTags(newTags);
      setInput("");
      searchRecipes(newTags);
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    searchRecipes(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(input);
    }
  };

  const searchRecipes = async (userIngredients) => {
    if (userIngredients.length === 0) {
      setRecipeList([]);
      setShowOtherRecipes(false);
      return;
    }

    const recipesFromAI = await fetchRecipesFromAI(userIngredients);

    if (recipesFromAI.length === 0) {
      setRecipeList([{ 
        name: "該当するレシピがありません", 
        steps: ["材料を増やすか、他の料理を試してください"] 
      }]);
      setShowOtherRecipes(false);
      return;
    }

    setRecipeList(recipesFromAI);
    setShowOtherRecipes(false);
    setVisibleCount(3);
    setStepOpen({});
    setVisibleIndexes([]);
  };

  const toggleStep = (idx) => {
    setStepOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getStepIcon = (step) => {
    if (/切る|刻む|薄切り/.test(step)) return "🔪";
    if (/焼く|炒める|オーブン/.test(step)) return "🔥";
    if (/卵/.test(step)) return "🍳";
    if (/煮込む|煮る/.test(step)) return "🍲";
    if (/レンチン|電子レンジ/.test(step)) return "⚡";
    return "➡️";
  };

  // スクロールで3件ずつ追加
  useEffect(() => {
    const handleScroll = () => {
      if (!showOtherRecipes) return;
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;
      if (scrollTop + vh + 50 >= bodyHeight && visibleCount < recipeList.length - 1) {
        setVisibleCount(prev => Math.min(prev + 3, recipeList.length - 1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOtherRecipes, visibleCount, recipeList]);

  // フェードインインデックス更新
  useEffect(() => {
    const newIndexes = [];
    for (let i = visibleIndexes.length; i < visibleCount; i++) {
      newIndexes.push(i);
    }
    if (newIndexes.length > 0) {
      setTimeout(() => setVisibleIndexes(prev => [...prev, ...newIndexes]), 50);
    }
  }, [visibleCount]);

  return (
    <div style={{ textAlign:"center", marginTop:"40px", fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background:"linear-gradient(#fff8e1, #ffe0b2)", minHeight:"100vh", padding:"20px" }}>
      <h1 style={{ color:"#ff6f61" }}>🍳 ご飯作るのめんどくさい</h1>

      {/* タグ表示 */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", marginBottom:"10px" }}>
        {tags.map((tag, idx)=>(
          <div key={idx} style={{ backgroundColor:"#ffcc80", padding:"6px 10px", borderRadius:"12px", display:"flex", alignItems:"center", gap:"6px" }}>
            {tag}
            <span style={{ cursor:"pointer" }} onClick={()=>removeTag(idx)}>×</span>
          </div>
        ))}
      </div>

      {/* 食材入力 */}
      <input
        type="text"
        placeholder="冷蔵庫になにある？"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding:"10px 14px", width:"300px", fontSize:"16px", borderRadius:"8px", border:"1px solid #ccc" }}
      />

      {loading && <p style={{ marginTop:"20px", color:"#ff6f61" }}>レシピを生成中…⏳</p>}

      {/* レシピ表示 */}
      {recipeList.length > 0 && (
        <>
          <div style={{ marginTop:"30px", backgroundColor:"#ffe0b2", width:"80%", maxWidth:"600px", margin:"30px auto 0", padding:"20px", borderRadius:"15px", boxShadow:"4px 4px 12px rgba(0,0,0,0.2)", textAlign:"left" }}>
            <h2 style={{ color:"#ff6f61" }}>🍴 今日のおすすめ：{recipeList[0].name}</h2>
            <ol style={{ paddingLeft:"20px" }}>
              {(stepOpen[0] ? recipeList[0].steps : recipeList[0].steps.slice(0,3)).map((step,i)=>(
                <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"6px", opacity:0, animation:"fadeSlide 0.5s forwards" }}>
                  <span>{getStepIcon(step)}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {recipeList[0].steps.length>3 && <button onClick={()=>toggleStep(0)} style={{ marginTop:"6px", fontSize:"14px", color:"#ff6f61", background:"transparent", border:"none", cursor:"pointer" }}>{stepOpen[0] ? "閉じる" : "もっと見る"}</button>}
          </div>

          {recipeList.length>1 && (
            <button onClick={()=>setShowOtherRecipes(prev=>!prev)} style={{ fontSize:"18px", padding:"10px 20px", marginTop:"15px", cursor:"pointer", borderRadius:"8px", border:"none", backgroundColor:"#ffd180", boxShadow:"1px 1px 5px rgba(0,0,0,0.2)" }}>
              {showOtherRecipes ? "🔼 他のレシピを閉じる" : "🔽 他のレシピを見る"}
            </button>
          )}

          {showOtherRecipes && recipeList.slice(1, visibleCount+1).map((r, idx)=>(
            <div key={idx} style={{
              marginTop:"20px",
              backgroundColor:"#fff3e0",
              width:"80%",
              maxWidth:"600px",
              marginLeft:"auto",
              marginRight:"auto",
              padding:"20px",
              borderRadius:"15px",
              boxShadow:"2px 2px 10px rgba(0,0,0,0.1)",
              textAlign:"left",
              opacity: visibleIndexes.includes(idx+1) ? 1 : 0,
              transform: visibleIndexes.includes(idx+1) ? "translateY(0)" : "translateY(10px)",
              transition:"all 0.5s ease"
            }}>
              <h3 style={{ color:"#ff6f61" }}>{r.name}</h3>
              <ol style={{ paddingLeft:"20px" }}>
                {(stepOpen[idx+1] ? r.steps : r.steps.slice(0,3)).map((step,i)=>(
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"6px", opacity:0, animation:"fadeSlide 0.5s forwards" }}>
                    <span>{getStepIcon(step)}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {r.steps.length>3 && <button onClick={()=>toggleStep(idx+1)} style={{ marginTop:"6px", fontSize:"14px", color:"#ff6f61", background:"transparent", border:"none", cursor:"pointer" }}>{stepOpen[idx+1] ? "閉じる" : "もっと見る"}</button>}
            </div>
          ))}
        </>
      )}

      <style>
        {`
          @keyframes fadeSlide {
            from { opacity:0; transform: translateY(10px); }
            to { opacity:1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
