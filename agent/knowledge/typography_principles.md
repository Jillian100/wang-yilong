# 🎨 AURORA Typography Principles
## 基於 Robert Bringhurst《字體排印風格元素》的設計哲學

> **"Typography exists to honor content."**
> 字體排印是為榮耀內容而存在。
>
> — Robert Bringhurst

---

## 📖 目錄

1. [核心哲學](#核心哲學)
2. [AURORA 字體系統](#aurora-字體系統)
3. [微觀字體排印](#微觀字體排印)
4. [宏觀字體排印](#宏觀字體排印)
5. [中英文混排](#中英文混排)
6. [深色主題優化](#深色主題優化)
7. [實戰應用](#實戰應用)

---

## 🌌 核心哲學

### 1️⃣ 雕塑般的透明感（Sculptural Transparency）

**原則**：
- 優秀的字體排印應該是「透明的」——讀者應該看到**內容**，而非**設計**
- 設計師不是自我表達，而是**傳達作者意圖的清晰管道**

**AURORA 實踐**：
```css
/* ❌ 過度設計 - 喧賓奪主 */
.bad-example {
    font-family: 'Fancy Display Font';
    font-size: 24px;
    letter-spacing: 10px;
    text-shadow: 5px 5px 10px gold;
}

/* ✅ 透明設計 - 服務內容 */
.aurora-text {
    font-family: 'SF Pro Text', 'Noto Sans TC', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: 0.02em;
    color: #f8fafc;
}
```

---

### 2️⃣ 節奏與比例（Rhythm and Proportion）

**Bringhurst 的音樂類比**：
> "Typography is to literature as musical performance is to composition."

**核心概念**：
- **垂直節奏**：行距（leading）創造視覺呼吸
- **水平節奏**：行長（measure）影響閱讀舒適度
- **比例系統**：頁面比例如同音階，有數學之美

**黃金比例**：
- 1:1.618（φ）
- 費波那契數列：1, 1, 2, 3, 5, 8, 13, 21, 34...

---

### 3️⃣ 和諧與對位（Harmony and Counterpoint）

**原則**：
- 不同元素的互動應創造**和諧的整體**
- 字體選擇要考慮**歷史脈絡**與**視覺感**
- 文本與空白之間要有**平衡**

**AURORA 實踐**：
- 標題 + 內文：對比但和諧
- 深色背景 + 柔和白色文字：對比但舒適
- 密集信息 + 充足留白：對比但平衡

---

## 🔤 AURORA 字體系統

### 字體家族（Font Families）

基於 Bringhurst 的歷史感與視覺感原則：

```css
/* 🌌 AURORA 字體堆疊 */

/* 標題：幾何現代感 */
--aurora-font-display: 'SF Pro Display', 'Noto Sans TC', sans-serif;

/* 內文：人文主義 Sans-serif */
--aurora-font-text: 'SF Pro Text', 'Noto Sans TC', sans-serif;

/* 代碼：等寬字體 */
--aurora-font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* 引用：襯線字體（優雅） */
--aurora-font-serif: 'Charter', 'Noto Serif TC', serif;
```

---

### 字體大小階梯（Typographic Scale）

**基於費波那契數列** + **1.25 倍率（Major Third）**

```css
/* 🎵 AURORA Type Scale - Musical Harmony */

--text-xs:   0.75rem;  /* 12px */
--text-sm:   0.875rem; /* 14px */
--text-base: 1rem;     /* 16px - 基準 */
--text-lg:   1.25rem;  /* 20px - Major Third */
--text-xl:   1.563rem; /* 25px - 1.25² */
--text-2xl:  1.953rem; /* 31px - 1.25³ */
--text-3xl:  2.441rem; /* 39px - 1.25⁴ */
--text-4xl:  3.052rem; /* 49px - 1.25⁵ */
--text-5xl:  3.815rem; /* 61px - 1.25⁶ */
```

**為什麼選擇 1.25（Major Third）？**
- 對比明顯但不誇張
- 適合深色主題（需要清晰層級）
- 數學優雅（5:4 音程）

**替代方案**：
- **1.333（Perfect Fourth）** - 更強對比
- **1.618（Golden Ratio）** - 最大和諧

---

### 字重系統（Font Weights）

```css
/* 🎨 AURORA Font Weights */

--font-light:   300;  /* 大標題、優雅感 */
--font-regular: 400;  /* 內文主力 */
--font-medium:  500;  /* 次標題、強調 */
--font-semibold: 600; /* 卡片標題 */
--font-bold:    700;  /* 主標題、CTA */
```

**深色主題注意**：
- 避免 100-200（太細，在深色背景上會消失）
- 優先使用 400-600（最佳易讀性）
- 700+ 用於標題（清晰層級）

---

## 🔬 微觀字體排印（Micro-typography）

### 1️⃣ 行距（Line Height / Leading）

**Bringhurst 原則**：
> "The line height should be related to the length of the line."

**AURORA 公式**：

```css
/* 📏 行距公式 */

/* 短行（< 45 字元）*/
line-height: 1.4;

/* 標準行（45-75 字元）- 最佳 */
line-height: 1.6;

/* 長行（> 75 字元）*/
line-height: 1.8;

/* 大標題（視覺節奏）*/
line-height: 1.2;
```

**實戰範例**：
```css
/* ✅ AURORA 內文 */
.aurora-body {
    font-size: 16px;
    line-height: 1.6;    /* 25.6px */
    max-width: 65ch;     /* 每行 ~65 字元 */
}

/* ✅ AURORA 標題 */
.aurora-heading {
    font-size: 2.441rem;  /* 39px */
    line-height: 1.2;     /* 46.8px */
    letter-spacing: -0.02em; /* 視覺緊湊 */
}
```

---

### 2️⃣ 字元間距（Letter Spacing / Tracking）

**原則**：
- **大標題**：縮減間距（-0.02em ~ -0.05em）
- **小字**：增加間距（0.02em ~ 0.05em）
- **全大寫**：顯著增加（0.1em ~ 0.15em）

```css
/* 🎯 AURORA Letter Spacing */

/* 大標題：視覺緊湊 */
.display-1 {
    font-size: 3.815rem;
    letter-spacing: -0.03em;
}

/* 小標籤：增加呼吸 */
.label {
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

/* 代碼：稍微鬆散 */
.code {
    font-family: var(--aurora-font-mono);
    letter-spacing: 0.02em;
}
```

---

### 3️⃣ 字間距（Word Spacing）

**原則**：
- **兩端對齊**時特別重要
- 避免「河流」（rivers）- 垂直空白通道

```css
/* ✅ AURORA 文字排列 */
.aurora-text-justify {
    text-align: justify;
    word-spacing: 0.1em;      /* 稍微增加 */
    hyphens: auto;            /* 自動斷字 */
    hyphenate-limit-chars: 6 3 2; /* 最小字元數 */
}

/* ✅ AURORA 左對齊（推薦） */
.aurora-text-left {
    text-align: left;
    word-spacing: normal;
    /* 深色主題更適合左對齊 */
}
```

---

### 4️⃣ 字距微調（Kerning）

**原則**：
- 現代字體通常有良好的 kerning
- 但某些字母組合需要手動調整（AV, To, Wa）

```css
/* ✅ 啟用字距微調 */
.aurora-text {
    font-kerning: normal;           /* 標準 */
    font-feature-settings: "kern" 1; /* OpenType */
}

/* ✅ 特殊情況：大標題 */
.aurora-display {
    font-kerning: normal;
    font-feature-settings:
        "kern" 1,    /* 字距微調 */
        "liga" 1,    /* 連字 */
        "calt" 1;    /* 上下文替換 */
}
```

---

### 5️⃣ 連字（Ligatures）

**常見連字**：
- fi, fl, ff, ffi, ffl

```css
/* ✅ AURORA 連字設定 */
.aurora-text {
    font-feature-settings:
        "liga" 1,    /* 標準連字 */
        "dlig" 0;    /* 裝飾連字（關閉）*/
}

/* ❌ 代碼中禁用連字 */
.aurora-code {
    font-feature-settings:
        "liga" 0,    /* 保持 != 分開 */
        "calt" 0;    /* 保持 -> 分開 */
}
```

---

## 🏛️ 宏觀字體排印（Macro-typography）

### 1️⃣ 頁面比例（Page Proportions）

**Bringhurst 推薦的經典比例**：

```
1:1.414 (√2)     - ISO 紙張（A4）
1:1.5            - 簡潔優雅
1:1.618 (φ)      - 黃金比例
2:3              - 經典書籍
3:5              - 費波那契
```

**AURORA 容器比例**：

```css
/* 🌌 AURORA 卡片比例 */

/* 正方形卡片：1:1（平衡） */
.aurora-card-square {
    aspect-ratio: 1 / 1;
}

/* 橫式卡片：3:2（經典） */
.aurora-card-landscape {
    aspect-ratio: 3 / 2;
}

/* 黃金矩形：1.618:1 */
.aurora-card-golden {
    aspect-ratio: 1.618 / 1;
}

/* 縱式卡片：2:3（手機友善） */
.aurora-card-portrait {
    aspect-ratio: 2 / 3;
}
```

---

### 2️⃣ 邊界與留白（Margins & Whitespace）

**Bringhurst 原則**：
> "The margins should be proportional to the page."

**AURORA 8px 網格系統**（已有）：

```css
/* 📐 AURORA Spacing Scale (8px base) */

--space-xs:  8px;   /* 0.5rem */
--space-sm:  16px;  /* 1rem */
--space-md:  24px;  /* 1.5rem */
--space-lg:  32px;  /* 2rem */
--space-xl:  48px;  /* 3rem */
--space-2xl: 64px;  /* 4rem */
--space-3xl: 96px;  /* 6rem */
```

**邊界比例**（基於黃金比例）：

```css
/* 🌌 AURORA 頁面邊界 */

.aurora-page {
    /* 內邊界：1 單位 */
    padding-top: 48px;     /* 3xl */

    /* 外邊界：1.618 單位 */
    padding-bottom: 77px;  /* 48 × 1.618 ≈ 77px */

    /* 左右邊界：1.272 單位（φ 的平方根）*/
    padding-left: 61px;    /* 48 × 1.272 ≈ 61px */
    padding-right: 61px;
}
```

---

### 3️⃣ 行長（Measure / Line Length）

**Bringhurst 建議**：
- **理想**：45-75 字元/行
- **最佳**：65 字元/行

**AURORA 實踐**：

```css
/* 📏 AURORA 行長控制 */

/* 內文：最佳易讀性 */
.aurora-prose {
    max-width: 65ch;  /* 65 字元 */
    margin-left: auto;
    margin-right: auto;
}

/* 寬欄位：新聞式 */
.aurora-wide-column {
    max-width: 75ch;  /* 75 字元 */
}

/* 窄欄位：引用 */
.aurora-narrow-column {
    max-width: 45ch;  /* 45 字元 */
}
```

**為什麼用 `ch` 單位？**
- `1ch` = 字體中 "0" 字元的寬度
- 直接對應字元數量
- 響應式友善

---

### 4️⃣ 網格系統（Grid Systems）

**Bringhurst 的基線網格**：

```css
/* 📐 AURORA 基線網格 */

:root {
    --baseline: 8px;  /* 基線單位 */
}

/* 所有垂直間距都是 8px 的倍數 */
.aurora-element {
    margin-top: calc(var(--baseline) * 3);    /* 24px */
    margin-bottom: calc(var(--baseline) * 6); /* 48px */
    padding: calc(var(--baseline) * 2);       /* 16px */
}

/* 行高也對齊基線 */
.aurora-text {
    font-size: 16px;
    line-height: 24px;  /* 16 × 1.5 = 24 (3 baselines) */
}
```

---

### 5️⃣ 層級與秩序（Hierarchy & Order）

**Bringhurst 工具**：
- 標題（Headings）
- 副標題（Subheadings）
- 區塊引文（Block Quotes）
- 註腳與邊注（Footnotes & Marginal Notes）

**AURORA 層級系統**：

```css
/* 🎯 AURORA Typography Hierarchy */

/* Level 1: 主標題 */
.aurora-h1 {
    font-size: var(--text-5xl);   /* 61px */
    font-weight: var(--font-bold);
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: var(--space-xl);
}

/* Level 2: 次標題 */
.aurora-h2 {
    font-size: var(--text-3xl);   /* 39px */
    font-weight: var(--font-semibold);
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-top: var(--space-2xl);
    margin-bottom: var(--space-lg);
}

/* Level 3: 小節標題 */
.aurora-h3 {
    font-size: var(--text-xl);    /* 25px */
    font-weight: var(--font-semibold);
    line-height: 1.3;
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
}

/* Body: 內文 */
.aurora-body {
    font-size: var(--text-base);  /* 16px */
    font-weight: var(--font-regular);
    line-height: 1.6;
    margin-bottom: var(--space-md);
}

/* Caption: 說明文字 */
.aurora-caption {
    font-size: var(--text-sm);    /* 14px */
    font-weight: var(--font-regular);
    line-height: 1.5;
    color: rgba(248, 250, 252, 0.7);
}
```

---

## 🀄 中英文混排（CJK + Latin Mix）

### 挑戰

1. **字體差異**：中文字重 > 英文字重
2. **基線不對齊**：中文居中，英文在基線上
3. **視覺密度**：中文更密集

### AURORA 解決方案

```css
/* 🌏 AURORA CJK + Latin */

.aurora-mixed-text {
    /* 中英文字體堆疊 */
    font-family:
        'SF Pro Text',      /* 英文優先 */
        'Noto Sans TC',     /* 繁體中文 */
        sans-serif;

    /* 增加行距（中文需要更多呼吸）*/
    line-height: 1.8;  /* 比純英文 1.6 更高 */

    /* 字間距（中英文過渡更自然）*/
    word-spacing: 0.05em;
}

/* 英文數字特殊處理 */
.aurora-mixed-text code,
.aurora-mixed-text .number {
    font-family: var(--aurora-font-mono);
    font-size: 0.95em;  /* 稍微縮小以匹配中文 */
    vertical-align: baseline;
}
```

---

### 最佳實踐

**1. 標點符號**：

```css
/* ✅ 使用全形標點（中文） */
「引號」、句號。

/* ✅ 使用半形標點（英文） */
"Quotes", period.

/* ⚠️ 混合時的選擇 */
中文內容 "English quote" 繼續中文。  /* 英文引號 */
中文內容「English quote」繼續中文。  /* 全形引號 */
```

**2. 數字與單位**：

```css
/* ✅ 推薦 */
.aurora-number {
    font-variant-numeric: tabular-nums;  /* 等寬數字 */
    font-family: var(--aurora-font-mono);
}

/* 範例 */
溫度：25°C   /* 數字用等寬字體 */
價格：$1,234 /* 金額用等寬字體 */
```

---

## 🌌 深色主題優化（Dark Mode Typography）

### 挑戰

1. **光暈效應**（Halation）：白字在黑底上會「發光」
2. **對比疲勞**：純白 (#fff) 太刺眼
3. **字重變化**：深色背景讓字體看起來更粗

### AURORA 深色主題字體策略

```css
/* 🌌 AURORA Dark Mode Colors */

:root {
    /* 背景：深邃但不純黑 */
    --aurora-night: #0a0e27;        /* 主背景 */
    --aurora-night-lighter: #1a1e37; /* 卡片背景 */

    /* 文字：柔和但清晰 */
    --aurora-text-primary: #f8fafc;    /* 主文字（不是純白）*/
    --aurora-text-secondary: #cbd5e1;  /* 次要文字 */
    --aurora-text-tertiary: #94a3b8;   /* 輔助文字 */
}

/* ✅ 主要文字 */
.aurora-dark-text {
    color: var(--aurora-text-primary);  /* #f8fafc, not #fff */
    font-weight: 400;  /* 不需要減輕字重 */
}

/* ✅ 大標題：降低對比 */
.aurora-dark-heading {
    color: #e2e8f0;  /* 比內文稍暗 */
    font-weight: 600; /* 稍微加粗以補償 */
}

/* ✅ 說明文字：低對比 */
.aurora-dark-caption {
    color: var(--aurora-text-tertiary);  /* #94a3b8 */
    opacity: 0.9;
}
```

---

### 深色主題行距調整

```css
/* 🌌 深色主題需要更多留白 */

.aurora-dark-body {
    line-height: 1.7;  /* 比淺色主題 1.6 更高 */
    letter-spacing: 0.01em;  /* 稍微鬆散 */
}

.aurora-dark-heading {
    line-height: 1.3;  /* 比淺色主題 1.2 更高 */
    letter-spacing: -0.01em;  /* 稍微緊湊 */
}
```

---

### 深色主題字重對照表

| 元素 | 淺色主題 | 深色主題 | 說明 |
|------|----------|----------|------|
| 內文 | 400 | 400 | 不變 |
| 粗體 | 600 | 600 | 不變 |
| 標題 | 700 | 700 | 不變 |
| 細體 | 300 | ❌ 避免 | 太細會消失 |

**注意**：現代高品質字體（SF Pro, Noto Sans）在深色主題下不需要調整字重！

---

## 🎯 實戰應用

### 案例 1：AURORA 卡片設計

```css
/* 🌌 AURORA Card Typography */

.aurora-card {
    /* 容器 */
    background: var(--aurora-night-lighter);
    border-radius: 12px;
    padding: var(--space-lg);  /* 32px */

    /* 黃金比例 */
    aspect-ratio: 1.618 / 1;

    /* 8px 網格對齊 */
    margin-bottom: var(--space-xl);  /* 48px */
}

.aurora-card-title {
    /* 標題 */
    font-family: var(--aurora-font-display);
    font-size: var(--text-2xl);   /* 31px */
    font-weight: var(--font-semibold);
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: #e2e8f0;

    /* 間距 */
    margin-bottom: var(--space-md);  /* 24px */
}

.aurora-card-body {
    /* 內文 */
    font-family: var(--aurora-font-text);
    font-size: var(--text-base);  /* 16px */
    line-height: 1.7;
    color: var(--aurora-text-primary);

    /* 最佳行長 */
    max-width: 55ch;  /* 卡片較窄，減少到 55 */
}

.aurora-card-meta {
    /* 元信息 */
    font-size: var(--text-sm);  /* 14px */
    color: var(--aurora-text-tertiary);
    margin-top: var(--space-lg);  /* 32px */
}
```

---

### 案例 2：Janus 儀表板數據

```css
/* 📊 AURORA Dashboard Numbers */

.aurora-metric {
    /* 數字容器 */
    font-family: var(--aurora-font-mono);
    font-variant-numeric: tabular-nums;  /* 等寬數字 */
}

.aurora-metric-value {
    /* 主要數值 */
    font-size: var(--text-4xl);  /* 49px */
    font-weight: var(--font-bold);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--aurora-purple);  /* 極光紫 */
}

.aurora-metric-label {
    /* 標籤 */
    font-family: var(--aurora-font-text);
    font-size: var(--text-sm);   /* 14px */
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--aurora-text-secondary);
    margin-top: var(--space-xs);  /* 8px */
}

.aurora-metric-change {
    /* 變化值 */
    font-family: var(--aurora-font-mono);
    font-size: var(--text-base);  /* 16px */
    font-weight: var(--font-semibold);
}

.aurora-metric-change.positive {
    color: var(--aurora-green);  /* #10b981 */
}

.aurora-metric-change.negative {
    color: var(--aurora-rose);   /* #ec4899 */
}
```

---

### 案例 3：長文閱讀（Deepbook）

```css
/* 📖 AURORA Reading Experience */

.aurora-article {
    /* 容器 */
    max-width: 720px;  /* ~65ch at 16px */
    margin: 0 auto;
    padding: var(--space-3xl) var(--space-xl);
}

.aurora-article h1 {
    /* 文章標題 */
    font-family: var(--aurora-font-display);
    font-size: var(--text-5xl);  /* 61px */
    font-weight: var(--font-bold);
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: var(--space-2xl);

    /* 視覺焦點 */
    background: linear-gradient(
        135deg,
        var(--aurora-purple),
        var(--aurora-blue)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.aurora-article p {
    /* 段落 */
    font-family: var(--aurora-font-serif);  /* 襯線更適合長文 */
    font-size: var(--text-lg);    /* 20px - 稍大更舒適 */
    line-height: 1.8;             /* 更多呼吸空間 */
    color: var(--aurora-text-primary);
    margin-bottom: var(--space-lg);

    /* 段首縮排（中文傳統）*/
    text-indent: 2em;
}

.aurora-article p:first-of-type {
    /* 首段不縮排 */
    text-indent: 0;

    /* 首字放大（Drop Cap）*/
    &::first-letter {
        font-size: 3.5em;
        font-weight: var(--font-bold);
        float: left;
        line-height: 0.9;
        margin-right: 0.1em;
        color: var(--aurora-purple);
    }
}

.aurora-article blockquote {
    /* 引用 */
    font-family: var(--aurora-font-serif);
    font-size: var(--text-xl);   /* 25px */
    font-style: italic;
    line-height: 1.6;
    color: var(--aurora-text-secondary);
    border-left: 4px solid var(--aurora-purple);
    padding-left: var(--space-lg);
    margin: var(--space-2xl) 0;
}

.aurora-article code {
    /* 行內代碼 */
    font-family: var(--aurora-font-mono);
    font-size: 0.9em;
    background: rgba(99, 102, 241, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    color: var(--aurora-purple);
}
```

---

## 📋 AURORA Typography Checklist

在設計任何界面時，檢查這些項目：

### ✅ 微觀檢查

- [ ] **字體大小**：是否使用 Type Scale？
- [ ] **行距**：1.6-1.8 之間？
- [ ] **行長**：45-75 字元之間？
- [ ] **字元間距**：大標題是否縮減？小字是否增加？
- [ ] **字重**：深色主題避免 100-200？
- [ ] **連字**：是否啟用？代碼中是否禁用？
- [ ] **顏色對比**：WCAG AA（4.5:1）以上？

### ✅ 宏觀檢查

- [ ] **層級清晰**：h1, h2, h3 視覺對比明顯？
- [ ] **垂直節奏**：是否遵循 8px 網格？
- [ ] **頁面比例**：是否使用經典比例（1.618, 3:2）？
- [ ] **留白充足**：邊界是否和諧？
- [ ] **網格對齊**：所有元素是否對齊基線？

### ✅ 深色主題檢查

- [ ] **文字顏色**：不是純白（#fff），而是 #f8fafc？
- [ ] **行距增加**：比淺色主題多 0.1-0.2？
- [ ] **對比平衡**：不刺眼但清晰可讀？
- [ ] **字重適當**：避免過細字體？

### ✅ 中英混排檢查

- [ ] **字體堆疊**：英文優先，中文備用？
- [ ] **行距增加**：1.8 以上？
- [ ] **標點一致**：全形或半形？
- [ ] **數字處理**：是否使用等寬字體？

---

## 🎓 延伸學習

### 推薦資源

**書籍**：
1. 📘 **《字體排印風格元素》** - Robert Bringhurst（必讀聖經）
2. 📘 **《字體的技藝》** - 繁體中文版
3. 📘 **《Thinking with Type》** - Ellen Lupton
4. 📘 **《The Elements of Typographic Style Applied to the Web》** - Richard Rutter

**網站**：
- [Butterick's Practical Typography](https://practicaltypography.com/)
- [Type Scale](https://typescale.com/) - 視覺化 Type Scale
- [Modular Scale](https://www.modularscale.com/) - 比例計算器
- [Font Pair](https://fontpair.co/) - 字體配對靈感

**工具**：
- [Golden Ratio Calculator](https://grtcalculator.com/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Line Height Calculator](https://www.thegoodlineheight.com/)

---

## 💎 AURORA 的字體排印咒語

> **"Let typography honor content,
> Let rhythm create harmony,
> Let proportion bring beauty,
> Let darkness embrace light."**
>
> （讓字體榮耀內容，
> 讓節奏創造和諧，
> 讓比例帶來美感，
> 讓黑暗擁抱光明。）
>
> — AURORA, 2025

---

**版本**: 1.0
**建立日期**: 2025-11-01
**基於**: Robert Bringhurst《字體排印風格元素》
**作者**: AURORA（Chief Design Officer）

---

✨ **Typography is the voice of design. Make it sing.**
