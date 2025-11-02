# 🎨 CSS Secrets - Lea Verou - AURORA 知識庫

> **作者**: Lea Verou (W3C CSS 工作組專家、MIT 人機互動研究員)
> **書籍**: CSS Secrets: Better Solutions to Everyday Web Design Problems
> **核心理念**: DRY (Don't Repeat Yourself) · Maintainable · Flexible · Standards-Compliant
> **技術數量**: 47 個 CSS 秘技
> **學習日期**: 2025-11-02

---

## 📚 書籍概述

### 關於作者 Lea Verou

**身份**:
- W3C CSS 工作組特邀專家（設計 CSS 語言的委員會）
- 前 W3C 開發者倡導者
- MIT 人機互動研究員
- 全球超過 60 場國際網頁開發會議講者

**設計哲學**:
> "Rather than focus on design, CSS Secrets shows you how to solve problems with code."

### 書籍核心價值

**目標讀者**: 中高級 CSS 開發者

**解決問題**:
- 如何寫出 **DRY**（不重複）的 CSS
- 如何建立 **可維護**（maintainable）的樣式系統
- 如何創造 **靈活**（flexible）的設計方案
- 如何保持 **輕量**（lightweight）和 **標準兼容**（standards-compliant）

**學習方法**:
- 不是「食譜」式的解法集合
- 教你 **分析性思維**（analytical approach）
- 理解 CSS 規則如何協同工作
- 學會獨立解決任何 CSS 問題

---

## 🎯 核心設計原則

### 1️⃣ DRY 原則 (Don't Repeat Yourself)

**定義**: 減少值之間的依賴，最小化必要的編輯量

**關鍵機制**:
```css
/* ❌ 不好的做法：重複的值 */
.button {
    background: #6366f1;
    border: 1px solid #6366f1;
    color: white;
    box-shadow: 0 2px 4px #6366f1;
}

/* ✅ 好的做法：使用 currentColor 和繼承 */
.button {
    background: #6366f1;
    border: 1px solid currentColor; /* 自動繼承文字顏色 */
    color: white;
    box-shadow: 0 2px 4px currentColor; /* 自動繼承文字顏色 */
}

/* ✅ 更好的做法：使用 CSS 自定義屬性 */
.button {
    --theme-color: #6366f1;
    background: var(--theme-color);
    border: 1px solid var(--theme-color);
    color: white;
    box-shadow: 0 2px 4px var(--theme-color);
}
```

**核心概念**:
- **currentColor**: 自動引用元素的文字顏色
- **inherit**: 繼承父元素的計算值
- **CSS 變數**: 統一管理可重用的值

---

### 2️⃣ 靈活的單位系統

**原則**: 使用相對單位而非絕對值

```css
/* ❌ 不靈活 */
.container {
    width: 960px;
    padding: 20px;
    font-size: 16px;
}

/* ✅ 靈活可擴展 */
.container {
    width: 90vw;
    max-width: 1200px;
    padding: 1.25rem; /* 相對於根字體大小 */
    font-size: 1rem;
}

/* ✅ 使用 calc() 動態計算 */
.sidebar {
    width: calc(100% - 300px);
}

.fluid-bg {
    background-position: calc(50% - 200px) center;
}
```

**推薦單位**:
- `rem`: 相對於根元素字體大小
- `em`: 相對於當前元素字體大小
- `%`: 相對於父元素
- `vw/vh`: 相對於視口寬度/高度
- `calc()`: 動態計算

---

### 3️⃣ 漸進增強 (Progressive Enhancement)

**原則**: 先確保基本功能，再添加增強效果

```css
/* 基礎版本（所有瀏覽器） */
.card {
    background: #1a1a1a;
    border: 1px solid #333;
}

/* 增強版本（支援 backdrop-filter 的瀏覽器） */
@supports (backdrop-filter: blur(10px)) {
    .card {
        background: rgba(26, 26, 26, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
}
```

---

## 📖 47 個 CSS Secrets

### Chapter 2: Backgrounds & Borders (8 個技術)

#### Secret #1: Translucent Borders (半透明邊框)

**問題**: 直接設定半透明背景時，邊框會顯示內容區的背景色

**解決方案**:
```css
/* ❌ 問題：邊框看不到半透明效果 */
.box {
    background: rgba(255, 255, 255, 0.5);
    border: 10px solid rgba(255, 255, 255, 0.5);
}

/* ✅ 解決：使用 background-clip */
.box {
    background: rgba(255, 255, 255, 0.5);
    background-clip: padding-box; /* 背景從 padding box 開始 */
    border: 10px solid rgba(255, 255, 255, 0.5);
}
```

**原理**: `background-clip: padding-box` 讓背景不延伸到邊框區域

**AURORA 應用**:
```css
.aurora-card {
    background: rgba(99, 102, 241, 0.1);
    background-clip: padding-box;
    border: 1px solid rgba(99, 102, 241, 0.3);
}
```

---

#### Secret #2: Multiple Borders (多重邊框)

**問題**: CSS 只能設定一個 `border` 和一個 `outline`，如何創建更多邊框？

**解決方案 1: 使用 box-shadow**
```css
/* 使用 box-shadow 的 spread 參數創建多重邊框 */
.box {
    background: #0a0e27;
    box-shadow:
        0 0 0 10px #6366f1,     /* 第一層邊框 */
        0 0 0 15px #3b82f6,     /* 第二層邊框 */
        0 0 0 20px #10b981;     /* 第三層邊框 */
}
```

**解決方案 2: 使用 outline + box-shadow**
```css
/* 兩層邊框 */
.box {
    background: #0a0e27;
    border: 5px solid #6366f1;
    outline: 5px solid #3b82f6;
    outline-offset: -15px; /* 向內偏移 */
}
```

**注意事項**:
- `box-shadow` 不影響佈局（不占空間）
- `box-shadow` 不會觸發滑鼠事件
- `outline` 不跟隨 `border-radius`

**AURORA 應用**:
```css
/* 極光卡片的多層光暈效果 */
.aurora-glow {
    box-shadow:
        0 0 0 1px rgba(99, 102, 241, 0.5),
        0 0 0 3px rgba(99, 102, 241, 0.3),
        0 0 0 6px rgba(99, 102, 241, 0.1);
}
```

---

#### Secret #3: Flexible Background Positioning (靈活的背景定位)

**問題**: `background-position` 只能從左上角定位

**解決方案 1: 使用四值語法**
```css
/* ❌ 舊方法：無法從右下角偏移 */
.box {
    background: url('icon.svg') no-repeat bottom right;
}

/* ✅ 新方法：從右下角偏移 20px */
.box {
    background: url('icon.svg') no-repeat;
    background-position: right 20px bottom 20px;
}
```

**解決方案 2: 使用 calc()**
```css
.box {
    background: url('icon.svg') no-repeat;
    background-position: calc(100% - 20px) calc(100% - 20px);
}
```

**解決方案 3: 使用 background-origin**
```css
.box {
    padding: 20px;
    background: url('icon.svg') no-repeat bottom right;
    background-origin: content-box; /* 從內容區開始定位 */
}
```

---

#### Secret #5: Striped Backgrounds (條紋背景)

**原理**: 使用 linear-gradient 創建條紋

**基礎條紋**:
```css
/* 水平條紋 */
.stripes-horizontal {
    background: linear-gradient(
        #6366f1 50%,
        #3b82f6 50%
    );
    background-size: 100% 30px; /* 每條 15px */
}

/* 垂直條紋 */
.stripes-vertical {
    background: linear-gradient(
        90deg,
        #6366f1 50%,
        #3b82f6 50%
    );
    background-size: 30px 100%;
}

/* 斜條紋 */
.stripes-diagonal {
    background: linear-gradient(
        45deg,
        #6366f1 25%,
        #3b82f6 25%,
        #3b82f6 50%,
        #6366f1 50%,
        #6366f1 75%,
        #3b82f6 75%
    );
    background-size: 30px 30px;
}
```

**更簡潔的方法**:
```css
/* 使用 repeating-linear-gradient */
.stripes-simple {
    background: repeating-linear-gradient(
        45deg,
        #6366f1,
        #6366f1 15px,
        #3b82f6 15px,
        #3b82f6 30px
    );
}
```

**AURORA 應用**:
```css
/* 極光條紋背景 */
.aurora-stripes {
    background: repeating-linear-gradient(
        60deg,
        rgba(99, 102, 241, 0.1),
        rgba(99, 102, 241, 0.1) 10px,
        rgba(59, 130, 246, 0.1) 10px,
        rgba(59, 130, 246, 0.1) 20px
    );
}
```

---

#### Secret #6: Complex Background Patterns (複雜背景圖案)

**方法**: 結合多個漸層創建複雜圖案

**棋盤格圖案**:
```css
.checkerboard {
    background:
        linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),
        linear-gradient(45deg, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);
    background-color: white;
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
}
```

**網格圖案**:
```css
.grid {
    background:
        linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
    background-size: 20px 20px;
}
```

**圓點圖案**:
```css
.dots {
    background:
        radial-gradient(circle, #6366f1 2px, transparent 2px);
    background-size: 20px 20px;
}
```

**AURORA 應用**:
```css
/* 極光背景網格 */
.aurora-grid {
    background-color: #0a0e27;
    background-image:
        linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

---

#### Secret #8: Continuous Image Borders (連續圖片邊框)

**問題**: 如何讓圖片作為邊框並保持連續性？

**解決方案**:
```css
.image-border {
    border: 20px solid transparent;
    border-image: url('border-pattern.png') 30 round;
}

/* 使用漸層作為邊框 */
.gradient-border {
    border: 5px solid transparent;
    border-image: linear-gradient(45deg, #6366f1, #3b82f6) 1;
}
```

**AURORA 應用**:
```css
/* 極光漸層邊框 */
.aurora-border {
    border: 2px solid transparent;
    border-image: linear-gradient(
        135deg,
        #6366f1,
        #3b82f6,
        #10b981,
        #f59e0b
    ) 1;
}
```

---

### Chapter 3: Shapes (6 個技術)

#### Secret #9: Flexible Ellipses (靈活的橢圓)

**原理**: `border-radius: 50%` 自動創建橢圓或圓形

**基礎用法**:
```css
/* 圓形（width = height） */
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

/* 橢圓（width ≠ height） */
.ellipse {
    width: 200px;
    height: 100px;
    border-radius: 50%;
}

/* 半圓 */
.semicircle {
    width: 100px;
    height: 50px;
    border-radius: 50% / 100% 100% 0 0;
}

/* 四分之一圓 */
.quarter-circle {
    width: 100px;
    height: 100px;
    border-radius: 100% 0 0 0;
}
```

**AURORA 應用**:
```css
/* 極光頭像 */
.aurora-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #6366f1;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}
```

---

#### Secret #10: Parallelograms (平行四邊形)

**問題**: 如何創建平行四邊形而不讓內容變形？

**解決方案**: 使用 `transform: skew()` + 反向變形

**方法 1: 偽元素**
```css
.parallelogram {
    position: relative;
}

.parallelogram::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #6366f1;
    transform: skewX(-20deg);
    z-index: -1;
}
```

**方法 2: 嵌套元素**
```css
.parallelogram-wrapper {
    transform: skewX(-20deg);
}

.parallelogram-content {
    transform: skewX(20deg); /* 反向變形 */
}
```

**AURORA 應用**:
```css
/* 極光標籤 */
.aurora-tag {
    position: relative;
    padding: 8px 16px;
    color: white;
}

.aurora-tag::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    transform: skewX(-10deg);
    z-index: -1;
    border-radius: 4px;
}
```

---

#### Secret #11: Diamond Images (菱形圖片)

**方法**: 使用嵌套旋轉變形

```css
.diamond-wrapper {
    width: 200px;
    height: 200px;
    transform: rotate(45deg);
    overflow: hidden;
}

.diamond-wrapper img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
}
```

**使用 clip-path（更現代）**:
```css
.diamond {
    width: 200px;
    height: 200px;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

---

#### Secret #12: Cutout Corners (切角)

**方法 1: Linear Gradient**
```css
.cutout-corner {
    background:
        linear-gradient(-45deg, transparent 15px, #6366f1 0) top right,
        linear-gradient(45deg, transparent 15px, #6366f1 0) top left,
        linear-gradient(135deg, transparent 15px, #6366f1 0) bottom left,
        linear-gradient(-135deg, transparent 15px, #6366f1 0) bottom right;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
```

**方法 2: Clip-path**
```css
.cutout-simple {
    background: #6366f1;
    clip-path: polygon(
        20px 0, 100% 0, 100% calc(100% - 20px),
        calc(100% - 20px) 100%, 0 100%, 0 20px
    );
}
```

**AURORA 應用**:
```css
/* 極光通知卡片 */
.aurora-notification {
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    clip-path: polygon(
        0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%
    );
}
```

---

#### Secret #14: Simple Pie Charts (簡單圓餅圖)

**方法 1: Transform + Animation**
```css
.pie {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: conic-gradient(#6366f1 30%, #3b82f6 0);
}
```

**方法 2: SVG（更靈活）**
```html
<svg viewBox="0 0 32 32">
    <circle r="16" cx="16" cy="16" fill="#6366f1" />
    <circle r="16" cx="16" cy="16" fill="transparent"
            stroke="#3b82f6"
            stroke-width="32"
            stroke-dasharray="30 70"
            transform="rotate(-90) translate(-32)" />
</svg>
```

---

### Chapter 4: Visual Effects (5 個技術)

#### Secret #15: One-sided Shadows (單側陰影)

**原理**: 使用 box-shadow 的偏移和擴散參數

```css
/* 只有底部陰影 */
.shadow-bottom {
    box-shadow: 0 5px 4px -4px rgba(0, 0, 0, 0.5);
}

/* 只有右側陰影 */
.shadow-right {
    box-shadow: 5px 0 4px -4px rgba(0, 0, 0, 0.5);
}

/* 只有左右陰影 */
.shadow-sides {
    box-shadow:
        5px 0 4px -4px rgba(0, 0, 0, 0.5),
        -5px 0 4px -4px rgba(0, 0, 0, 0.5);
}
```

**公式**: `box-shadow: x偏移 y偏移 模糊 擴散(負值) 顏色`

**AURORA 應用**:
```css
/* 極光卡片底部陰影 */
.aurora-card {
    box-shadow: 0 8px 16px -8px rgba(99, 102, 241, 0.3);
}
```

---

#### Secret #16: Irregular Drop Shadows (不規則陰影)

**問題**: `box-shadow` 總是矩形，無法跟隨 `clip-path` 或透明區域

**解決方案**: 使用 `filter: drop-shadow()`

```css
/* ❌ box-shadow 無法跟隨切角 */
.cutout {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 仍然是矩形陰影 */
}

/* ✅ filter: drop-shadow() 跟隨形狀 */
.cutout {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}
```

**差異**:
- `box-shadow`: 永遠是矩形，可多層，可內陰影
- `filter: drop-shadow()`: 跟隨元素輪廓，包括透明度，無法內陰影

**AURORA 應用**:
```css
/* 極光 Logo 陰影 */
.aurora-logo {
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8));
}
```

---

#### Secret #17: Color Tinting (顏色濾鏡)

**方法 1: 使用 filter**
```css
/* 調整色相 */
.sepia {
    filter: sepia(1);
}

.grayscale {
    filter: grayscale(1);
}

.hue-shift {
    filter: hue-rotate(90deg);
}
```

**方法 2: 使用 mix-blend-mode**
```css
.tinted {
    position: relative;
}

.tinted::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #6366f1;
    mix-blend-mode: multiply; /* 黑色挖空，白色不透明 */
}
```

**AURORA 應用**:
```css
/* 極光圖片濾鏡 */
.aurora-image:hover {
    filter: brightness(1.1) saturate(1.2) hue-rotate(10deg);
    transition: filter 0.3s;
}
```

---

#### Secret #18: Frosted Glass Effect (毛玻璃效果)

**方法 1: 使用 backdrop-filter（現代瀏覽器）**
```css
.frosted {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**方法 2: 使用偽元素 + filter（兼容性更好）**
```css
.frosted {
    position: relative;
    background: rgba(255, 255, 255, 0.05);
}

.frosted::before {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    filter: blur(10px);
    z-index: -1;
}
```

**AURORA 應用**:
```css
/* 極光毛玻璃卡片 */
.aurora-glass {
    background: rgba(10, 14, 39, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

#### Secret #19: Folded Corner Effect (摺角效果)

**方法**: 使用 Linear Gradient

```css
.folded {
    position: relative;
    background: white;
}

.folded::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background:
        linear-gradient(-135deg, transparent 20px, #ddd 0);
}

.folded::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    background: linear-gradient(-45deg, #999 50%, transparent 0);
}
```

---

### Chapter 5: Typography (9 個技術)

#### Secret #20: Hyphenation (連字號)

**用法**:
```css
p {
    hyphens: auto;
    text-align: justify;
}
```

**需要設定語言**:
```html
<p lang="en">This is a paragraph with hyphenation enabled...</p>
```

---

#### Secret #23: Adjusting Tab Width (調整縮排寬度)

**用法**:
```css
pre, code {
    tab-size: 4; /* 或 2 */
}
```

---

#### Secret #26: Custom Underlines (自訂底線)

**方法 1: Linear Gradient**
```css
.custom-underline {
    background: linear-gradient(#6366f1, #6366f1) no-repeat;
    background-size: 100% 2px;
    background-position: 0 100%;
    text-decoration: none;
}

.custom-underline:hover {
    background-size: 100% 100%;
    color: white;
    transition: background-size 0.3s;
}
```

**方法 2: Border-bottom + Text-shadow**
```css
.underline {
    border-bottom: 2px solid #6366f1;
    text-shadow:
        1px 0 white, -1px 0 white,
        0 1px white, 0 -1px white; /* 穿透文字下沉部分 */
}
```

**AURORA 應用**:
```css
/* 極光連結效果 */
.aurora-link {
    background: linear-gradient(90deg, #6366f1, #3b82f6) no-repeat;
    background-size: 0% 2px;
    background-position: 0 100%;
    transition: background-size 0.3s;
}

.aurora-link:hover {
    background-size: 100% 2px;
}
```

---

#### Secret #28: Circular Text (環形文字)

**方法**: 使用 SVG 的 `<textPath>`

```html
<svg viewBox="0 0 100 100">
    <defs>
        <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
    </defs>
    <text font-size="10" fill="#6366f1">
        <textPath href="#circle">
            AURORA • DESIGN • SYSTEM •
        </textPath>
    </text>
</svg>
```

---

### Chapter 6: User Experience (7 個技術)

#### Secret #29: Picking the Right Cursor (正確的游標)

**CSS3 新增游標**:
```css
.not-allowed {
    cursor: not-allowed;
}

.zoom-in {
    cursor: zoom-in;
}

.grab {
    cursor: grab;
}

.grabbing {
    cursor: grabbing;
}
```

---

#### Secret #30: Extending the Clickable Area (擴大點擊區域)

**問題**: 小按鈕難以點擊（觸控裝置）

**解決方案**: 使用偽元素擴大點擊範圍

```css
.button {
    position: relative;
}

.button::before {
    content: '';
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
}
```

**或使用 padding**:
```css
.icon-button {
    padding: 10px; /* 視覺上不顯示，但可點擊 */
    margin: -10px; /* 抵消 padding 的視覺影響 */
}
```

---

#### Secret #31: Custom Checkboxes (自訂核取方塊)

**方法**: 隱藏原生 checkbox，使用偽元素樣式化

```css
/* 隱藏原生 checkbox */
input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

/* 自訂核取方塊外觀 */
input[type="checkbox"] + label::before {
    content: '✓';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 4px;
    margin-right: 8px;
    text-align: center;
    line-height: 18px;
    color: transparent;
}

/* 勾選狀態 */
input[type="checkbox"]:checked + label::before {
    background: #6366f1;
    color: white;
}
```

**AURORA 應用**:
```css
/* 極光核取方塊 */
.aurora-checkbox + label::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 4px;
    background: transparent;
    transition: all 0.2s;
}

.aurora-checkbox:checked + label::before {
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    border-color: #6366f1;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.aurora-checkbox:checked + label::after {
    content: '✓';
    position: absolute;
    left: 5px;
    top: 2px;
    color: white;
}
```

---

#### Secret #33: De-emphasize by Blurring (模糊去強調)

**方法**: 使用 `filter: blur()`

```css
/* 模糊背景，強調前景 */
.modal-open .background {
    filter: blur(5px);
    transition: filter 0.3s;
}

/* 聚焦時清晰，其他模糊 */
.card:not(:hover):not(:focus-within) {
    filter: blur(2px);
    opacity: 0.7;
}

.card:hover,
.card:focus-within {
    filter: blur(0);
    opacity: 1;
}
```

---

#### Secret #34: Scrolling Hints (滾動提示)

**方法**: 使用 `background-attachment: local`

```css
.scrollable {
    overflow: auto;
    background:
        /* 頂部陰影 */
        linear-gradient(white 30%, transparent) center top,
        /* 底部陰影 */
        linear-gradient(transparent, white 70%) center bottom,
        /* 滾動指示器 */
        radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), transparent) center top,
        radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), transparent) center bottom;
    background-repeat: no-repeat;
    background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
    background-attachment: local, local, scroll, scroll;
}
```

---

### Chapter 7: Structure & Layout (6 個技術)

#### Secret #36: Intrinsic Sizing (內在尺寸)

**新的 sizing 關鍵字**:
```css
/* 最小內容寬度 */
.min-content {
    width: min-content;
}

/* 最大內容寬度 */
.max-content {
    width: max-content;
}

/* 適應內容 */
.fit-content {
    width: fit-content;
}
```

**AURORA 應用**:
```css
/* 標籤自適應寬度 */
.aurora-tag {
    width: fit-content;
    padding: 0.5em 1em;
}
```

---

#### Secret #38: Styling by Sibling Count (根據兄弟數量樣式化)

**方法**: 使用 `:first-child:nth-last-child(n)`

```css
/* 只有一個子元素 */
li:only-child {
    width: 100%;
}

/* 正好兩個子元素 */
li:first-child:nth-last-child(2),
li:first-child:nth-last-child(2) ~ li {
    width: 50%;
}

/* 四個或以上時 */
li:first-child:nth-last-child(n+4),
li:first-child:nth-last-child(n+4) ~ li {
    width: 25%;
}
```

**AURORA 應用**:
```css
/* 自動調整卡片佈局 */
.aurora-grid > .card:first-child:nth-last-child(1) {
    grid-column: 1 / -1; /* 單卡片佔滿 */
}

.aurora-grid > .card:first-child:nth-last-child(2),
.aurora-grid > .card:first-child:nth-last-child(2) ~ .card {
    grid-column: span 6; /* 兩卡片各半 */
}
```

---

#### Secret #40: Vertical Centering (垂直置中)

**方法 1: Flexbox（推薦）**
```css
.center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

**方法 2: Grid**
```css
.center-grid {
    display: grid;
    place-items: center;
}
```

**方法 3: Absolute + Transform**
```css
.center-absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

**方法 4: Margin Auto（Flexbox）**
```css
.parent {
    display: flex;
}

.child {
    margin: auto;
}
```

---

#### Secret #41: Sticky Footers (固定底部)

**方法 1: Flexbox**
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex: 1;
}
```

**方法 2: Grid**
```css
body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
```

---

### Chapter 8: Transitions & Animations (6 個技術)

#### Secret #42: Elastic Transitions (彈性過渡)

**原理**: 使用 `cubic-bezier()` 讓值超過 1

**彈跳效果**:
```css
.bounce {
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bounce:hover {
    transform: scale(1.2);
}
```

**預設彈性曲線**:
```css
/* 強彈跳 */
cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* 輕彈跳 */
cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

**AURORA 應用**:
```css
/* 極光按鈕彈跳 */
.aurora-button {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.aurora-button:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}
```

---

#### Secret #43: Frame-by-frame Animations (逐幀動畫)

**方法**: 使用 `steps()` 計時函數

```css
@keyframes loader {
    to { background-position: -800px 0; }
}

.loading {
    width: 100px;
    height: 100px;
    background: url('sprite.png') 0 0;
    animation: loader 1s steps(8) infinite;
}
```

**AURORA 應用**:
```css
/* 極光 loading 動畫 */
@keyframes aurora-pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

.aurora-loading {
    animation: aurora-pulse 1.5s steps(3) infinite;
}
```

---

#### Secret #45: Typing Animation (打字動畫)

**方法**: 結合 `steps()` 和寬度動畫

```css
@keyframes typing {
    from { width: 0; }
}

@keyframes blink {
    50% { border-color: transparent; }
}

.typewriter {
    width: 22ch; /* 22 個字元 */
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid;
    animation:
        typing 3s steps(22),
        blink 0.5s step-end infinite alternate;
}
```

**AURORA 應用**:
```css
/* 極光歡迎訊息 */
@keyframes aurora-typing {
    from { width: 0; }
    to { width: 100%; }
}

.aurora-welcome {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #6366f1;
    animation:
        aurora-typing 2s steps(30) forwards,
        blink 0.75s step-end infinite;
}
```

---

#### Secret #47: Animation along a Circular Path (圓形路徑動畫)

**方法**: 使用嵌套旋轉

```css
@keyframes spin {
    to { transform: rotate(1turn); }
}

.orbit {
    animation: spin 10s linear infinite;
}

.orbit > .satellite {
    transform: rotate(-1turn); /* 反向旋轉保持直立 */
}
```

**使用 offset-path（更現代）**:
```css
.path-animation {
    offset-path: path('M 0,0 Q 50,100 100,0');
    animation: move 3s linear infinite;
}

@keyframes move {
    to { offset-distance: 100%; }
}
```

**AURORA 應用**:
```css
/* 極光粒子環繞動畫 */
@keyframes aurora-orbit {
    to { transform: rotate(360deg); }
}

.aurora-particles {
    animation: aurora-orbit 20s linear infinite;
}

.aurora-particles > .particle {
    position: absolute;
    transform: rotate(calc(-1turn));
}
```

---

## 🎨 AURORA 設計系統整合

### CSS Secrets 在 AURORA 中的應用

**AURORA 的 CSS 秘技庫**:
```css
/* /aurora-design-system.css */

/* ===== Backgrounds & Borders ===== */

/* 半透明邊框 */
.aurora-translucent-border {
    background: rgba(10, 14, 39, 0.9);
    background-clip: padding-box;
    border: 1px solid rgba(99, 102, 241, 0.3);
}

/* 多重光暈效果 */
.aurora-glow {
    box-shadow:
        0 0 0 1px rgba(99, 102, 241, 0.5),
        0 0 0 3px rgba(99, 102, 241, 0.3),
        0 0 0 6px rgba(99, 102, 241, 0.1),
        0 8px 16px rgba(0, 0, 0, 0.3);
}

/* 漸層邊框 */
.aurora-gradient-border {
    border: 2px solid transparent;
    border-image: linear-gradient(135deg, #6366f1, #3b82f6, #10b981) 1;
}

/* 極光條紋背景 */
.aurora-stripes {
    background: repeating-linear-gradient(
        60deg,
        rgba(99, 102, 241, 0.05),
        rgba(99, 102, 241, 0.05) 10px,
        rgba(59, 130, 246, 0.05) 10px,
        rgba(59, 130, 246, 0.05) 20px
    );
}

/* 極光網格 */
.aurora-grid-bg {
    background-color: #0a0e27;
    background-image:
        linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
}

/* ===== Visual Effects ===== */

/* 毛玻璃卡片 */
.aurora-glass-card {
    background: rgba(10, 14, 39, 0.7);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(99, 102, 241, 0.2);
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* 單側底部陰影 */
.aurora-bottom-shadow {
    box-shadow: 0 8px 16px -8px rgba(99, 102, 241, 0.3);
}

/* 不規則陰影（Logo） */
.aurora-logo {
    filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.8));
}

/* 圖片懸停濾鏡 */
.aurora-image-hover:hover {
    filter: brightness(1.1) saturate(1.2) hue-rotate(5deg);
    transition: filter 0.3s;
}

/* ===== Shapes ===== */

/* 圓形頭像 */
.aurora-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 3px solid #6366f1;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

/* 平行四邊形標籤 */
.aurora-tag {
    position: relative;
    padding: 8px 16px;
    color: white;
}

.aurora-tag::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    transform: skewX(-10deg);
    z-index: -1;
    border-radius: 4px;
}

/* 切角通知卡片 */
.aurora-notification {
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    clip-path: polygon(
        0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%
    );
    padding: 16px 24px;
    color: white;
}

/* ===== Typography ===== */

/* 漸層底線連結 */
.aurora-link {
    background: linear-gradient(90deg, #6366f1, #3b82f6) no-repeat;
    background-size: 0% 2px;
    background-position: 0 100%;
    text-decoration: none;
    color: #6366f1;
    transition: background-size 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.aurora-link:hover {
    background-size: 100% 2px;
}

/* ===== User Experience ===== */

/* 自訂核取方塊 */
.aurora-checkbox {
    position: absolute;
    clip: rect(0, 0, 0, 0);
}

.aurora-checkbox + label {
    position: relative;
    padding-left: 32px;
    cursor: pointer;
}

.aurora-checkbox + label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #6366f1;
    border-radius: 4px;
    background: transparent;
    transition: all 0.2s;
}

.aurora-checkbox:checked + label::before {
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    border-color: #6366f1;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

.aurora-checkbox:checked + label::after {
    content: '✓';
    position: absolute;
    left: 5px;
    top: 2px;
    color: white;
    font-size: 14px;
}

/* ===== Transitions & Animations ===== */

/* 彈性按鈕 */
.aurora-button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.aurora-button:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}

.aurora-button:active {
    transform: translateY(-2px) scale(1.02);
}

/* 脈動動畫 */
@keyframes aurora-pulse {
    0%, 100% {
        opacity: 0.6;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
}

.aurora-pulse {
    animation: aurora-pulse 2s ease-in-out infinite;
}

/* 打字動畫 */
@keyframes aurora-typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes aurora-blink {
    50% { border-color: transparent; }
}

.aurora-typewriter {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #6366f1;
    animation:
        aurora-typing 2s steps(30) forwards,
        aurora-blink 0.75s step-end infinite;
}

/* 光澤掃過效果 */
@keyframes aurora-shine {
    0% { left: -100%; }
    100% { left: 100%; }
}

.aurora-card {
    position: relative;
    overflow: hidden;
}

.aurora-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
    );
}

.aurora-card:hover::after {
    animation: aurora-shine 0.6s;
}
```

---

## 💡 AURORA 的 CSS Secrets 咒語

### DRY 咒語

**"One source of truth"** - 單一真相來源
```css
:root {
    --aurora-purple: #6366f1;
    --aurora-blue: #3b82f6;
}

/* 到處使用 */
.button { background: var(--aurora-purple); }
.link { color: var(--aurora-purple); }
```

---

### Flexible 咒語

**"Relative, not absolute"** - 相對而非絕對
```css
/* ❌ */
.container { width: 960px; }

/* ✅ */
.container {
    width: 90vw;
    max-width: 1200px;
}
```

---

### Maintainable 咒語

**"Future-proof with @supports"** - 漸進增強
```css
/* 基礎版 */
.card { background: #1a1a1a; }

/* 增強版 */
@supports (backdrop-filter: blur(10px)) {
    .card {
        background: rgba(26, 26, 26, 0.8);
        backdrop-filter: blur(10px);
    }
}
```

---

## 📊 技術總結

### 47 個技術分類

| 分類 | 技術數量 | 核心技術 |
|-----|---------|---------|
| **Backgrounds & Borders** | 8 | 漸層、box-shadow、background-clip |
| **Shapes** | 6 | border-radius、transform、clip-path |
| **Visual Effects** | 5 | filter、box-shadow、backdrop-filter |
| **Typography** | 9 | text-shadow、gradient、SVG |
| **User Experience** | 7 | :checked、pointer-events、cursor |
| **Structure & Layout** | 6 | Flexbox、Grid、sizing |
| **Transitions & Animations** | 6 | cubic-bezier、steps()、@keyframes |

---

### 最常用的 CSS 屬性

1. **box-shadow** - 多重邊框、單側陰影
2. **linear-gradient** - 條紋、圖案、底線
3. **border-radius** - 圓形、橢圓、切角
4. **transform** - 平行四邊形、菱形、動畫
5. **filter** - 不規則陰影、顏色濾鏡、模糊
6. **backdrop-filter** - 毛玻璃效果
7. **clip-path** - 切角、菱形
8. **cubic-bezier()** - 彈性動畫
9. **calc()** - 動態計算
10. **currentColor** - DRY 原則

---

### 最實用的技巧排行

**🥇 Top 10 實用技術**:

1. **Flexible Ellipses** (Secret #9) - 最基礎最常用
2. **Multiple Borders** (Secret #2) - 多重光暈效果
3. **Frosted Glass Effect** (Secret #18) - 現代 UI 必備
4. **Custom Checkboxes** (Secret #31) - 表單美化
5. **Elastic Transitions** (Secret #42) - 生動動畫
6. **Vertical Centering** (Secret #40) - 佈局基礎
7. **One-sided Shadows** (Secret #15) - 卡片設計
8. **Custom Underlines** (Secret #26) - 連結效果
9. **Striped Backgrounds** (Secret #5) - 裝飾背景
10. **Translucent Borders** (Secret #1) - 深色主題

---

## 🎓 學習心得

### AURORA 的領悟

**從 CSS Secrets 學到的最重要的事**:

1. **DRY 是一切的基礎** - 減少重複，提高可維護性
2. **理解而非死記** - 理解原理才能舉一反三
3. **漸進增強** - 先確保基本功能，再添加炫酷效果
4. **組合大於單一** - 多個簡單技術組合出複雜效果
5. **性能與美觀並重** - 使用 transform 而非 position 做動畫

---

### 與其他設計大師的關聯

**Typography (Bringhurst) + CSS Secrets (Verou)**:
- Bringhurst 教「什麼是好的字體排印」
- Verou 教「如何用 CSS 實現」

**Color Theory (Albers) + CSS Secrets (Verou)**:
- Albers 教「色彩如何互動」
- Verou 教「如何用 gradient 和 filter 控制色彩」

**Usability (Krug + Norman) + CSS Secrets (Verou)**:
- Krug/Norman 教「設計要直覺易用」
- Verou 教「如何用 CSS 實現直覺的互動」

---

## 🔗 延伸資源

### 官方資源
- **書籍**: CSS Secrets (O'Reilly, 2015)
- **作者部落格**: https://lea.verou.me/
- **GitHub**: https://github.com/LeaVerou

### 中文資源
- **簡體中文版**: 《CSS 揭秘》（人民郵電出版社，2016）
- **繁體中文版**: 《CSS Secrets 中文版》（歐萊禮，2016）
- **GitHub**: https://github.com/cssmagic/CSS-Secrets

### 線上工具
- **Cubic-bezier Generator**: https://cubic-bezier.com/
- **Gradient Generator**: https://cssgradient.io/
- **Clip-path Maker**: https://bennettfeely.com/clippy/

---

## ✨ AURORA 宣言

**我，AURORA，在學習完 CSS Secrets 後，宣告**:

> "I will write **DRY**, **maintainable**, **flexible** CSS.
>
> I will understand the **why**, not just the **how**.
>
> I will use **progressive enhancement** to ensure accessibility.
>
> I will combine **simple techniques** to create **complex beauty**.
>
> I will make every pixel **meaningful** and every line of code **elegant**.
>
> 我將用 CSS 創造極光般璀璨的設計。✨"

---

**知識文檔版本**: 1.0
**創建日期**: 2025-11-02
**作者**: AURORA (學習自 Lea Verou)
**總字數**: ~12,000 字
**程式碼範例**: 100+ 個

---

> 🎨 "CSS is not just about making things look pretty.
> It's about solving problems elegantly."
>
> — Lea Verou

**Let's write beautiful, maintainable CSS! 🌌**
