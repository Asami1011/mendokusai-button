import { useState, useRef, useEffect } from "react";

function App() {
  // const recipes = [
  //   {
  //     name: "豚肉とじゃがいもの卵とじ",
  //     ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
  //     steps: [
  //       "じゃがいもを薄切りにする",
  //       "フライパンで豚肉を炒める",
  //       "じゃがいもを加えて炒め、めんつゆと水を入れる",
  //       "少し煮込んでから溶き卵を回し入れる",
  //       "蓋をして1分蒸らしたら完成"
  //     ]
  //   },
  //   {
  //     name: "豚肉とじゃがいものスペイン風オムレツ",
  //     ingredients: ["豚肉", "じゃがいも", "卵", "ケチャップ", "マヨネーズ"],
  //     steps: [
  //       "じゃがいもを薄切りにしてレンチン2〜3分",
  //       "フライパンで豚肉を炒める",
  //       "溶き卵にじゃがいもと豚肉を混ぜる",
  //       "フライパンに流し入れ、弱火で両面焼く",
  //       "ケチャップやマヨで味付け"
  //     ]
  //   },
  //       {
  //     name: "卵チャーハン",
  //     ingredients: ["卵", "ご飯", "塩コショウ"],
  //     steps: [
  //       "フライパンで卵を炒める",
  //       "ご飯を加えて炒める",
  //       "塩コショウで味付け",
  //       "全体が混ざったら完成"
  //     ]
  //   },
  //   {
  //     name: "じゃがいもとベーコンの炒め物",
  //     ingredients: ["じゃがいも", "ベーコン", "塩コショウ"],
  //     steps: [
  //       "じゃがいもを薄切りにする",
  //       "ベーコンと一緒に炒める",
  //       "塩コショウで味付け",
  //       "完成"
  //     ]
  //   },
  //   {
  //     name: "卵サンド",
  //     ingredients: ["卵", "パン", "マヨネーズ"],
  //     steps: [
  //       "卵を茹でる",
  //       "パンにマヨネーズを塗る",
  //       "卵を挟む",
  //       "完成"
  //     ]
  //   }
  // ];
  const recipes = [
    {
      name: "豚肉とじゃがいもの卵とじ",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
    {
      name: "豚肉とじゃがいものスペイン風オムレツ",
      ingredients: ["豚肉", "じゃがいも", "卵", "ケチャップ", "マヨネーズ"],
      steps: [
        "じゃがいもを薄切りにしてレンチン2〜3分",
        "フライパンで豚肉を炒める",
        "溶き卵にじゃがいもと豚肉を混ぜる",
        "フライパンに流し入れ、弱火で両面焼く",
        "ケチャップやマヨで味付け"
      ]
    },
    {
      name: "卵チャーハン",
      ingredients: ["卵", "ご飯", "塩コショウ"],
      steps: [
        "フライパンで卵を炒める",
        "ご飯を加えて炒める",
        "塩コショウで味付け",
        "全体が混ざったら完成"
      ]
    },
    {
      name: "じゃがいもとベーコンの炒め物",
      ingredients: ["じゃがいも", "ベーコン", "塩コショウ"],
      steps: [
        "じゃがいもを薄切りにする",
        "ベーコンと一緒に炒める",
        "塩コショウで味付け",
        "完成"
      ]
    },
    {
      name: "卵サンド",
      ingredients: ["卵", "パン", "マヨネーズ"],
      steps: [
        "卵を茹でる",
        "パンにマヨネーズを塗る",
        "卵を挟む",
        "完成"
      ]
    },
        {
      name: "豚肉とじゃがいもの卵とじ1",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
    {
      name: "豚肉とじゃがいもの卵とじ2",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
    {
      name: "豚肉とじゃがいもの卵とじ3",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
    {
      name: "豚肉とじゃがいもの卵とじ4",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
    {
      name: "豚肉とじゃがいもの卵とじ5",
      ingredients: ["豚肉", "じゃがいも", "卵", "めんつゆ"],
      steps: [
        "じゃがいもを薄切りにする",
        "フライパンで豚肉を炒める",
        "じゃがいもを加えて炒め、めんつゆと水を入れる",
        "少し煮込んでから溶き卵を回し入れる",
        "蓋をして1分蒸らしたら完成"
      ]
    },
  ];

  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const [showOtherRecipes, setShowOtherRecipes] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
  if (contentRef.current) {
    setHeight(contentRef.current.scrollHeight);
  }
  }, [recipeList, showOtherRecipes]);

  const getStepIcon = (step) => {
    if (/切る|刻む|薄切り/.test(step)) return "🔪";
    if (/焼く|炒める|オーブン/.test(step)) return "🔥";
    if (/卵/.test(step)) return "🍳";
    if (/煮込む|煮る/.test(step)) return "🍲";
    if (/レンチン|電子レンジ/.test(step)) return "⚡";
    return "➡️"; // デフォルト
  };

  // タグ追加＋検索
  const addTag = (tag) => {
    const t = tag.trim();
    if (t && !tags.includes(t)) {
      const newTags = [...tags, t];
      setTags(newTags);
      setInput("");
      searchRecipes(newTags);
    }
  };

  // タグ削除＋検索
  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    searchRecipes(newTags);
  };

  // Enter/カンマ/スペースでタグ追加
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(input);
    }
  };

  // レシピ検索ロジック
  const searchRecipes = (userIngredients) => {
    if (userIngredients.length === 0) {
      setRecipeList([]);
      setShowOtherRecipes(false);
      return;
    }

    // 一致する食材があるレシピだけ取得
    const matched = recipes.filter(r =>
      r.ingredients.some(ing => userIngredients.includes(ing))
    );

    // if (userIngredients.length === 0) {
    //   setRecipeList({
    //     name: "入力がありません",
    //     steps: ["材料を入力してください"]
    //   });
    //   setShowOtherRecipes(false);
    //   return;
    // }

    if (matched.length === 0) {
      setRecipeList([{ 
        name: "該当するレシピがありません", 
        steps: ["材料を増やすか、他の料理を試してください"] 
      }]);
      setShowOtherRecipes(false);
      return;
    }

    // 一致数を計算してスコア付け・ソート
    const scoredRecipes = matched.map(r => {
      const scoreCount = r.ingredients.filter(ing => userIngredients.includes(ing)).length;
      return { ...r, scoreCount };
    })
    // .filter(r => r.scoreCount > 0)
    .sort((a, b) => b.scoreCount - a.scoreCount);

    setRecipeList(scoredRecipes);
    setShowOtherRecipes(false);
    setShowAllSteps(false);
  };

  // return (
  //   <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "linear-gradient(#fff8e1, #ffe0b2)", minHeight: "100vh", padding: "20px" }}>
  //     <h1 style={{ color: "#ff6f61" }}>🍳 ご飯作るのめんどくさい</h1>

  //     {/* タグ表示 */}
  //     <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
  //       {tags.map((tag, idx) => (
  //         <div key={idx} style={{ backgroundColor: "#ffcc80", padding: "6px 10px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
  //           {tag}
  //           <span style={{ cursor: "pointer" }} onClick={() => removeTag(idx)}>×</span>
  //         </div>
  //       ))}
  //     </div>

  //     {/* 食材入力 */}
  //     <input
  //       type="text"
  //       placeholder="冷蔵庫になにある？"
  //       value={input}
  //       onChange={(e) => setInput(e.target.value)}
  //       onKeyDown={handleKeyDown}
  //       style={{ padding: "10px 14px", width: "300px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
  //     />

  //     {/* レシピ表示 */}
  //     {recipeList.length > 0 && (
  //       <>
  //         <div style={{ marginTop: "30px", backgroundColor: "#ffe0b2", width: "80%", maxWidth: "600px", margin: "30px auto 0", padding: "20px", borderRadius: "15px", boxShadow: "4px 4px 12px rgba(0,0,0,0.2)", textAlign: "left", transition: "all 0.3s" }}>
  //           <h2 style={{ color: "#ff6f61" }}>🍴 今日のおすすめ：{recipeList[0].name}</h2>
  //           {/* <ol style={{ marginTop: "10px", paddingLeft: "20px" }}>
  //             {recipeList[0].steps.map((step, index) => (
  //               <li key={index} style={{ marginBottom: "6px" }}>{step}</li>
  //             ))}
  //           </ol> */}
  //           <ol style={{ paddingLeft: "20px" }}>
  //             {recipe.steps.map((step, index) => (
  //               <li key={index} style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
  //                 <span>{getStepIcon(step)}</span>
  //                 <span>{step}</span>
  //               </li>
  //             ))}
  //           </ol>
  //         </div>

  //         {/* 他のレシピボタン */}
  //         {recipeList.length > 1 && (
  //           <button
  //             onClick={() => setShowOtherRecipes(!showOtherRecipes)}
  //             style={{ fontSize: "18px", padding: "10px 20px", marginTop: "15px", cursor: "pointer", borderRadius: "8px", border: "none", backgroundColor: "#ffd180", boxShadow: "1px 1px 5px rgba(0,0,0,0.2)", transition: "0.2s" }}
  //           >
  //             {showOtherRecipes ? "🔼 他のレシピを閉じる" : "🔽 他のレシピを見る"}
  //           </button>
  //         )}

  //         {/* 他のレシピ */}
  //         <div ref={contentRef} style={{ maxHeight: showOtherRecipes ? `${height}px` : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
  //           {showOtherRecipes && recipeList.slice(1).map((r, idx) => (
  //             <div key={idx} style={{ marginTop: "20px", backgroundColor: "#fff3e0", width: "80%", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", padding: "20px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", textAlign: "left", transition: "all 0.3s" }}>
  //               <h3 style={{ color: "#ff6f61" }}>🍽 他の候補：{r.name}</h3>
  //               <ol style={{ marginTop: "10px", paddingLeft: "20px" }}>
  //                 {r.steps.map((step, index) => (
  //                   <li key={index} style={{ marginBottom: "6px" }}>{step}</li>
  //                 ))}
  //               </ol>
  //             </div>
  //           ))}
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", background: "linear-gradient(#fff8e1, #ffe0b2)", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#ff6f61" }}>🍳 ご飯作るのめんどくさい</h1>

      {/* タグ表示 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
        {tags.map((tag, idx) => (
          <div key={idx} style={{ backgroundColor: "#ffcc80", padding: "6px 10px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            {tag}
            <span style={{ cursor: "pointer" }} onClick={() => removeTag(idx)}>×</span>
          </div>
        ))}
      </div>

      {/* 食材入力 */}
      <input
        type="text"
        placeholder="冷蔵庫になにある？"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: "10px 14px", width: "300px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ccc" }}
      />

      {/* レシピ表示 */}
      {recipeList.length > 0 && (
        <>
          {/* おすすめレシピ */}
          <div style={{ marginTop: "30px", backgroundColor: "#ffe0b2", width: "80%", maxWidth: "600px", margin: "30px auto 0", padding: "20px", borderRadius: "15px", boxShadow: "4px 4px 12px rgba(0,0,0,0.2)", textAlign: "left", transition: "all 0.3s" }}>
            <h2 style={{ color: "#ff6f61" }}>🍴 今日のおすすめ：{recipeList[0].name}</h2>
            <ol style={{ paddingLeft: "20px" }}>
              {(showAllSteps ? recipeList[0].steps : recipeList[0].steps.slice(0,3)).map((step, index) => (
                <li key={index} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span>{getStepIcon(step)}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            {recipeList[0].steps.length > 3 && (
              <button onClick={() => setShowAllSteps(!showAllSteps)} style={{ marginTop: "6px", fontSize: "14px", color: "#ff6f61", background: "transparent", border: "none", cursor: "pointer" }}>
                {showAllSteps ? "閉じる" : "もっと見る"}
              </button>
            )}
          </div>

          {/* 他のレシピボタン */}
          {recipeList.length > 1 && (
            <button
              onClick={() => setShowOtherRecipes(!showOtherRecipes)}
              style={{ fontSize: "18px", padding: "10px 20px", marginTop: "15px", cursor: "pointer", borderRadius: "8px", border: "none", backgroundColor: "#ffd180", boxShadow: "1px 1px 5px rgba(0,0,0,0.2)", transition: "0.2s" }}
            >
              {showOtherRecipes ? "🔼 他のレシピを閉じる" : "🔽 他のレシピを見る"}
            </button>
          )}

          {/* 他のレシピ */}
          <div ref={contentRef} style={{ maxHeight: showOtherRecipes ? `${height}px` : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
            {showOtherRecipes && recipeList.slice(1).map((r, idx) => (
              <div key={idx} style={{ marginTop: "20px", backgroundColor: "#fff3e0", width: "80%", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", padding: "20px", borderRadius: "15px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", textAlign: "left", transition: "all 0.3s" }}>
                <h3 style={{ color: "#ff6f61" }}>🍽 他の候補：{r.name}</h3>
                <ol style={{ paddingLeft: "20px" }}>
                  {r.steps.map((step, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                      <span>{getStepIcon(step)}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
