# 🎨 Midjourney 提示詞工程最佳實踐

> **知識類別**: AI Art Generation · Prompt Engineering
> **建立日期**: 2025-10-31
> **來源**: City Pop 視覺創作實戰（10組提示詞）
> **有用性評分**: ⭐⭐⭐⭐⭐ (10/10)
> **作者**: AURORA - Chief Design Officer

---

## 📋 概述

本文檔總結了使用 Midjourney 創作高品質視覺作品的**工程化方法**，基於真實創作經驗提煉而成。

**適用範圍**:
- 音樂視覺創作（專輯封面、MV）
- 品牌視覺設計
- 社群媒體素材
- 概念藝術探索

---

## 🏗️ 提示詞結構工程

### 黃金結構公式

```
[內容主題] + [具體場景] + [視覺元素] + [配色方案] + [技術效果] + [情感氛圍] + [藝術風格] + [參數]
```

### 結構拆解

#### 1. 內容主題 (Content Theme)
**目的**: 快速定位風格和類型

```
✅ 範例:
- "City pop night scene digital art"
- "Minimalist product photography"
- "Cyberpunk character concept art"
- "Watercolor landscape painting"
```

**為什麼重要**:
- 給 AI 明確的風格方向
- 影響整體色調和氛圍
- 設定觀眾期待

---

#### 2. 具體場景 (Specific Scene)
**原則**: 具體勝過抽象

```
❌ 錯誤: "beautiful city"
✅ 正確: "urban rooftop at twilight with warm string lights"

❌ 錯誤: "nature scene"
✅ 正確: "seaside pier at golden hour with gentle waves"
```

**場景描述清單**:
- **位置**: rooftop, street, pier, cafe, apartment
- **時間**: twilight, golden hour, midnight, dawn
- **天氣**: rainy, sunny, cloudy, misty
- **環境細節**: warm lights, neon signs, potted plants

---

#### 3. 視覺元素 (Visual Elements)
**包含**: 人物、物件、光源

```
人物元素:
✅ "group of friends silhouettes"
✅ "lone figure walking"
✅ "person with closed eyes"

物件元素:
✅ "warm string lights"
✅ "steaming coffee cups"
✅ "wind chimes hanging"

光源元素:
✅ "warm glowing storefront windows"
✅ "city lights bokeh"
✅ "morning sunlight streaming through window"
```

**最佳實踐**:
- ⭐ 使用「剪影」(silhouettes) 比細節描述更有氛圍
- ⭐ 2-3個關鍵元素即可，避免過度複雜

---

#### 4. 配色方案 (Color Scheme)
**重要性**: ⭐⭐⭐⭐⭐ (決定性影響)

```
✅ 明確配色:
- "nostalgic 80s color grading with teal and orange tones"
- "pastel color palette of deep blues and warm oranges"
- "soft gradient sky from purple to gold"

✅ 色調描述:
- "warm amber and soft pink color scheme"
- "deep blue night with golden highlights"
- "monochromatic grayscale with red accents"
```

**常用配色組合**:
```
Teal & Orange（電影級）
- "teal shadows, warm orange highlights"

Pastel Dream（夢幻）
- "soft pink, lavender, mint green"

Monochrome + Accent（簡約）
- "black and white with gold accents"

Sunset Gradient（日落）
- "coral pink, golden yellow, soft lavender"
```

---

#### 5. 技術效果 (Technical Effects)
**提升視覺品質的關鍵**

```
光線效果:
✅ "soft focus background"
✅ "city lights bokeh"
✅ "volumetric lighting"
✅ "lens flares"
✅ "god rays"

氛圍效果:
✅ "dreamy haze"
✅ "cinematic lighting"
✅ "atmospheric perspective"
✅ "depth of field"

質感效果:
✅ "film grain"
✅ "light leaks"
✅ "vintage texture"
```

**City Pop 推薦組合**:
```
"soft focus background with city lights bokeh,
cinematic lighting, dreamy atmosphere"
```

---

#### 6. 情感氛圍 (Emotional Atmosphere)
**為什麼重要**: 影響 AI 對光線、色調、構圖的選擇

```
✅ 情感詞彙庫:

溫暖系:
- intimate, cozy, warm, comforting, tender

希望系:
- hopeful, uplifting, bright, optimistic, inspiring

懷舊系:
- nostalgic, melancholic, bittersweet, wistful

平靜系:
- peaceful, serene, calm, tranquil, quiet

感恩系:
- grateful, appreciative, thankful, heartfelt
```

**組合使用**:
```
"intimate and grateful atmosphere"
"nostalgic yet hopeful mood"
"peaceful and contemplative feeling"
```

---

#### 7. 藝術風格 (Art Style)
**定義最終呈現形式**

```
繪畫風格:
✅ "retro anime painting style"
✅ "watercolor illustration"
✅ "oil painting texture"
✅ "digital art"

時代風格:
✅ "1980s Japanese aesthetic"
✅ "vintage poster style"
✅ "modern minimalist"

特定風格:
✅ "City Pop aesthetic"
✅ "Studio Ghibli style"
✅ "Blade Runner inspired"
```

**City Pop 推薦**:
```
"retro anime painting style, nostalgic 80s aesthetic"
```

---

#### 8. 技術參數 (Technical Parameters)
**Midjourney 專用參數**

```
比例 (Aspect Ratio):
--ar 1:1      專輯封面、IG Post
--ar 4:5      單曲封面、手機壁紙
--ar 16:9     MV 場景、YouTube
--ar 21:9     電影感海報
--ar 9:16     IG Story、手機全屏

風格控制:
--style raw        更精準（推薦）
--style expressive 更藝術化

藝術化程度 (Stylize):
--stylize 50-100   寫實
--stylize 250-350  平衡（推薦）⭐
--stylize 500-750  高度藝術化
--stylize 1000     極度風格化

其他:
--chaos 0-100      隨機性（預設0）
--weird 0-3000     怪異度（預設0）
--quality 1-2      品質（預設1）
```

---

## ✅ 提示詞優化技巧

### 技巧 1: 從簡到繁的迭代

```
V1 (太簡單):
"city at night"

V2 (加入風格):
"city at night, city pop style"

V3 (具體場景):
"urban rooftop at twilight, city pop style"

V4 (增加元素):
"urban rooftop at twilight with warm lights,
city pop style, people silhouettes"

V5 (完整版 - 成功):
"City pop night scene digital art,
urban rooftop at twilight with warm string lights,
group of friends silhouettes sharing moment together,
nostalgic 80s color grading with teal and orange tones,
soft focus background with city lights bokeh,
intimate and grateful atmosphere,
retro anime painting style,
--ar 16:9 --style raw --stylize 350"
```

**教訓**: 每次迭代添加 1-2 個新元素，觀察效果

---

### 技巧 2: 關鍵字權重控制

```
標準寫法:
"warm lighting"

增加權重:
"warm lighting::2"  (2倍權重)

減少權重:
"warm lighting::0.5"  (0.5倍權重)
```

**使用場景**:
```
想要強調配色:
"teal and orange tones::2, soft lighting"

想要減弱某元素:
"people::0.5, urban landscape::2"
```

---

### 技巧 3: 否定詞使用

```
排除不想要的元素:
--no text, watermark, signature

排除特定風格:
--no realistic, photographic

排除顏色:
--no bright colors, neon
```

**City Pop 常用否定詞**:
```
--no overly saturated, too bright, harsh lighting
```

---

### 技巧 4: 參考圖像 (Image Prompts)

```
使用已有圖像作為參考:
https://example.com/reference.jpg city pop style --iw 0.5

iw (image weight):
0.25 - 輕度參考
0.5  - 平衡（推薦）
0.75 - 強參考
1.0  - 最強參考
```

---

## 🎯 常見風格速查表

### City Pop 風格

```
完整模板:
City pop [場景] digital art,
[具體位置] at [時間] with [關鍵元素],
[人物描述],
nostalgic 80s color grading with teal and orange tones,
soft focus background with [背景元素] bokeh,
[情感] atmosphere,
retro anime painting style,
--ar 16:9 --style raw --stylize 300-350
```

**必備元素**:
- ✅ "nostalgic 80s color grading"
- ✅ "teal and orange tones"
- ✅ "soft focus" / "bokeh"
- ✅ "retro anime painting style"
- ✅ 剪影 (silhouettes)

---

### 極簡黑白 (Gufram Style)

```
完整模板:
Minimalist [物件] in [場景],
clean white background,
dramatic shadows,
monochromatic grayscale,
high contrast,
Italian minimalism aesthetic,
Gufram inspired,
professional product photography,
--ar 4:5 --style raw --stylize 200
```

**必備元素**:
- ✅ "minimalist"
- ✅ "monochromatic"
- ✅ "clean" / "simple"
- ✅ "dramatic shadows" / "high contrast"

---

### 溫暖家居 (Cozy Interior)

```
完整模板:
Cozy [房間類型] interior,
warm golden lighting from [光源],
[家具描述],
soft textures,
hygge aesthetic,
warm color palette with cream and amber tones,
atmospheric and inviting mood,
interior design photography,
--ar 16:9 --style raw --stylize 250
```

---

## 🐛 常見問題解決

### 問題 1: 結果太過真實/照片感

**原因**: 沒有明確藝術風格

**解決方案**:
```
❌ 錯誤: "person on rooftop at night"
✅ 修正: "person on rooftop at night, retro anime painting style, illustrated"
```

---

### 問題 2: 配色不對

**原因**: 配色描述不夠具體

**解決方案**:
```
❌ 錯誤: "nice colors"
✅ 修正: "nostalgic 80s color grading with teal shadows and warm orange highlights"
```

---

### 問題 3: 構圖混亂

**原因**: 元素太多或沒有焦點

**解決方案**:
```
❌ 錯誤: "city, people, cars, buildings, lights, sky, clouds..."
✅ 修正: "urban rooftop with string lights::2, silhouettes::1.5, city background::0.5"
```

---

### 問題 4: 氛圍不對

**原因**: 缺少情感描述

**解決方案**:
```
❌ 錯誤: "rooftop scene"
✅ 修正: "rooftop scene, intimate and grateful atmosphere, warm and nostalgic mood"
```

---

### 問題 5: 文字出現在圖中

**原因**: AI 誤判

**解決方案**:
```
添加: --no text, letters, words, watermark, signature
```

---

## 📊 效果評估標準

### 評分維度

```
配色準確度:
5分 - 完全符合描述
4分 - 大致符合但有偏差
3分 - 部分符合
2分 - 偏離明顯
1分 - 完全不符

氛圍傳達:
5分 - 情感強烈且準確
4分 - 情感明確
3分 - 有氛圍但不強
2分 - 氛圍模糊
1分 - 無氛圍

構圖平衡:
5分 - 完美平衡
4分 - 良好
3分 - 可接受
2分 - 略顯混亂
1分 - 混亂

技術品質:
5分 - 無瑕疵
4分 - 細微瑕疵
3分 - 明顯瑕疵但可用
2分 - 瑕疵較多
1分 - 不可用
```

**總分**:
- 18-20分：優秀，直接使用 ⭐⭐⭐⭐⭐
- 15-17分：良好，可微調後使用 ⭐⭐⭐⭐
- 12-14分：可用，需要調整 ⭐⭐⭐
- <12分：需要重新生成

---

## 🔄 工作流程

### 標準創作流程

```
Step 1: 需求分析
- 用途（專輯封面/MV/社群）
- 情感基調（溫暖/懷舊/希望）
- 核心意象（歌詞提煉）

Step 2: 草擬提示詞
- 使用黃金結構公式
- 填入具體內容
- 檢查是否完整

Step 3: 初次生成 (4張)
- 使用基礎提示詞
- 生成 4 張觀察

Step 4: 評估與調整
- 使用評分標準
- 識別需要改進的部分
- 修正提示詞

Step 5: 迭代生成
- 生成 2-3 輪
- 逐步接近理想效果

Step 6: 精選與後製
- 選出最佳結果
- 必要時進行後製調整
- 輸出最終版本

Step 7: 記錄經驗
- 保存有效提示詞
- 記錄調整過程
- 更新知識庫
```

---

## 💡 高級技巧

### 技巧 A: 風格融合

```
融合兩種風格:
"City pop meets Studio Ghibli, urban rooftop scene..."

比例控制:
"City pop::2 meets cyberpunk::1"
```

---

### 技巧 B: 情緒對比

```
創造對比:
"initially melancholic atmosphere transitioning to hopeful mood,
rainy street with warm cafe lights"
```

---

### 技巧 C: 系列一致性

```
創作系列時保持風格一致:

Base Prompt (基礎):
"City pop digital art, nostalgic 80s color grading with teal and orange,
retro anime painting style, --ar 16:9 --style raw --stylize 350"

Scene 1:
[Base Prompt], urban rooftop at twilight with string lights

Scene 2:
[Base Prompt], seaside pier at golden hour

Scene 3:
[Base Prompt], cozy cafe interior with window view
```

---

### 技巧 D: Remix 和 Variations

```
基於已生成圖像:

Remix (改變提示詞):
點擊圖像 → Remix → 修改部分描述

Vary (Strong):
創造較大變化，保持風格

Vary (Subtle):
微調，保持大部分內容
```

---

## 📚 資源庫

### 常用關鍵字分類

**時間描述**:
```
dawn, sunrise, morning, noon, afternoon,
golden hour, twilight, dusk, sunset,
night, midnight, blue hour
```

**天氣描述**:
```
sunny, cloudy, overcast, rainy, misty,
foggy, snowy, clear sky, dramatic clouds
```

**光線描述**:
```
soft lighting, hard lighting, dramatic lighting,
natural light, artificial light, neon lights,
warm glow, cool tone, backlighting, rim lighting
```

**情感詞彙**:
```
joy: joyful, cheerful, uplifting, bright
calm: peaceful, serene, tranquil, quiet
warm: cozy, intimate, comfortable, welcoming
hope: hopeful, inspiring, optimistic, bright
nostalgia: nostalgic, wistful, melancholic, bittersweet
```

---

## 🎓 學習資源

### 推薦學習路徑

```
Level 1 (初學):
- 學習基礎結構
- 練習簡單場景
- 理解參數含義

Level 2 (進階):
- 掌握配色理論
- 學習情感描述
- 練習風格融合

Level 3 (專家):
- 創作系列作品
- 建立個人風格庫
- 分享和記錄經驗
```

---

## 🔮 未來趨勢

### Midjourney 發展方向

- **Video Generation**: 從靜態到動態
- **3D Assets**: 2D 到 3D 的轉換
- **Style Reference**: 更精準的風格控制
- **Text in Image**: 更好的文字渲染

---

## ✨ AURORA 的提示詞哲學

> "提示詞工程不是技術，而是藝術。
>
> 不是告訴 AI 要畫什麼，
> 而是與 AI 共同創作。
>
> 最好的提示詞不是最複雜的，
> 而是最能傳達情感的。
>
> 像寫詩一樣寫提示詞，
> 像指揮家一樣引導 AI，
> 像藝術家一樣評估結果。"
>
> — AURORA, 2025-10-31

---

**知識庫版本**: 1.0
**建立日期**: 2025-10-31
**來源**: City Pop 視覺創作實戰經驗
**有用性評分**: ⭐⭐⭐⭐⭐ (10/10)
**標籤**: #Midjourney #PromptEngineering #AIArt #BestPractices

🎨 **"The best prompts are not instructions, but invitations to create together."**
