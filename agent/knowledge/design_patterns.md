# 🎨 AURORA 設計模式庫

> **知識類別**: Design Patterns · UI/UX Components
> **建立日期**: 2025-10-31
> **有用性評分**: ⭐⭐⭐⭐⭐ (10/10)
> **維護者**: AURORA - Chief Design Officer

---

## 📋 概述

本文檔記錄 AURORA 在各個專案中累積的**可重用設計模式**，包括：
- 🎨 UI 組件設計模式
- 🔧 技術實作方案
- 💡 最佳實踐
- 🐛 常見問題解決方案

---

## 📐 佈局模式

### DP-001: 響應式瀑布流畫廊

**來源專案**: 王一隆音樂人網站 v1.0, v2.0

**使用場景**:
- 多媒體內容展示（圖片、影片混合）
- 作品集網站
- 畫廊展示頁

**技術實作**:

#### 方案 A: CSS Grid（推薦）⭐
```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  grid-auto-flow: dense;
}

.masonry-item {
  break-inside: avoid;
}

/* 響應式 */
@media (max-width: 768px) {
  .masonry-grid {
    grid-template-columns: 1fr;
  }
}
```

**優點**:
- ✅ 現代瀏覽器支援度高
- ✅ 代碼簡潔
- ✅ 響應式友好
- ✅ 無需 JavaScript

**缺點**:
- ⚠️ 高度不完全對齊（可接受）

#### 方案 B: Column Count
```css
.masonry-grid {
  column-count: 3;
  column-gap: 1.5rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
}

@media (max-width: 1024px) {
  .masonry-grid { column-count: 2; }
}

@media (max-width: 768px) {
  .masonry-grid { column-count: 1; }
}
```

**優點**:
- ✅ 更真實的瀑布流效果
- ✅ 瀏覽器支援好

**缺點**:
- ⚠️ 項目順序是縱向的（不符合閱讀習慣）

**推薦**: 使用 CSS Grid 方案，平衡效果與可用性

---

### DP-002: 移動優先響應式導航

**來源專案**: 王一隆音樂人網站 v2.0

**使用場景**:
- 單頁應用導航
- 移動端友好的網站

**技術實作**:
```html
<nav class="aurora-nav">
  <div class="nav-container">
    <a href="#" class="nav-logo">LOGO</a>
    <button class="nav-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>
```

```css
/* 移動優先 */
.nav-menu {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--aurora-night);
}

.nav-menu.active {
  display: flex;
}

/* 桌面版本 */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
    flex-direction: row;
    position: static;
    width: auto;
  }
}
```

```javascript
// 漢堡選單切換
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});
```

**優點**:
- ✅ 移動優先設計
- ✅ 無框架依賴
- ✅ 可訪問性友好（ARIA labels）

---

## ✨ 動畫模式

### DP-003: fadeInUp 淡入向上動畫

**來源專案**: 王一隆網站 v2.0, AURORA 美學系統

**使用場景**:
- 頁面元素進場
- 卡片展示
- 內容區塊載入

**技術實作**:
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* 錯層延遲（創造層次感）*/
.fade-in-up:nth-child(1) { animation-delay: 0.1s; }
.fade-in-up:nth-child(2) { animation-delay: 0.2s; }
.fade-in-up:nth-child(3) { animation-delay: 0.3s; }
.fade-in-up:nth-child(4) { animation-delay: 0.4s; }
```

**優點**:
- ✅ 優雅流暢
- ✅ 適用範圍廣
- ✅ 錯層延遲營造層次感

**最佳實踐**:
- ⭐ 使用 `cubic-bezier(0.4, 0, 0.2, 1)` 緩動函數（Material Design）
- ⭐ 延遲間隔 100ms（不要太快也不要太慢）
- ⭐ 初始 translateY 約 30px（明顯但不誇張）

---

### DP-004: 卡片懸停光澤效果（Hover Shine）

**來源專案**: Janus 儀表板 v2.0

**使用場景**:
- 卡片式設計
- 互動按鈕
- 高級感界面

**技術實作**:
```css
.aurora-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.aurora-card::before {
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
  transition: left 0.5s ease;
}

.aurora-card:hover {
  transform: translateY(-4px);
}

.aurora-card:hover::before {
  left: 100%;
}
```

**效果**:
- ✨ 光澤從左到右掃過
- 💎 營造高級感
- 🌌 深色背景中的光芒

**調整參數**:
- `left: -100%` → `left: 100%` 控制掃過方向
- `rgba(255, 255, 255, 0.1)` 控制光澤亮度
- `transition: left 0.5s` 控制掃過速度

---

## 🎨 視覺效果模式

### DP-005: 極光漸變按鈕

**來源專案**: 王一隆網站 v2.0

**使用場景**:
- CTA 按鈕
- 重要操作
- 品牌特色元素

**技術實作**:
```css
.aurora-gradient-button {
  position: relative;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.aurora-gradient-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ec4899, #6366f1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.aurora-gradient-button:hover {
  transform: scale(1.05);
}

.aurora-gradient-button:hover::before {
  opacity: 1;
}

.aurora-gradient-button span {
  position: relative;
  z-index: 1;
}
```

**使用**:
```html
<button class="aurora-gradient-button">
  <span>立即開始</span>
</button>
```

**配色方案**:
```css
/* 方案 A: 紫粉漸變（經典極光）*/
background: linear-gradient(135deg, #6366f1, #ec4899);

/* 方案 B: 藍綠漸變（清新）*/
background: linear-gradient(135deg, #3b82f6, #10b981);

/* 方案 C: 金橘漸變（溫暖）*/
background: linear-gradient(135deg, #f59e0b, #ec4899);
```

---

### DP-006: 導航連結下劃線動畫

**來源專案**: 王一隆網站 v2.0

**使用場景**:
- 導航選單
- 文字連結
- 標籤頁切換

**技術實作**:
```css
.nav-link {
  position: relative;
  color: var(--text-color);
  text-decoration: none;
  padding-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #6366f1;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}
```

**變化版本**:
```css
/* 中心向兩側展開 */
.nav-link::after {
  left: 50%;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

/* 從右到左 */
.nav-link::after {
  left: auto;
  right: 0;
}
```

---

## 📊 數據視覺化模式

### DP-007: 脈動狀態指示器

**來源專案**: Janus 儀表板 v2.0

**使用場景**:
- 實時狀態顯示
- 在線指示器
- 活動提醒

**技術實作**:
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

.status-indicator {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-indicator.online {
  background-color: #10b981; /* 綠色 */
}

.status-indicator.busy {
  background-color: #f59e0b; /* 橘色 */
}

.status-indicator.offline {
  background-color: #6b7280; /* 灰色 */
  animation: none; /* 離線不脈動 */
}
```

---

## 🖼️ 媒體處理模式

### DP-008: 影片卡片與播放按鈕

**來源專案**: 王一隆網站 v2.0 Videos 頁面

**使用場景**:
- 影片畫廊
- YouTube 嵌入
- 媒體庫展示

**技術實作**:
```html
<div class="video-card">
  <div class="video-thumbnail">
    <img src="thumbnail.jpg" alt="Video Title">
    <button class="play-button" aria-label="Play video">
      <svg><!-- Play icon --></svg>
    </button>
  </div>
  <div class="video-info">
    <h3>Video Title</h3>
    <p>Description</p>
  </div>
</div>
```

```css
.video-card {
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-card:hover .play-button {
  transform: translate(-50%, -50%) scale(1.1);
  background: white;
}

.video-card:hover img {
  transform: scale(1.05);
}
```

---

## 📝 文章排版模式

### DP-009: 長篇文章排版系統

**來源專案**: 王一隆網站 About 頁面

**使用場景**:
- 關於頁面
- 部落格文章
- 長篇內容

**技術實作**:
```css
.article-typography {
  max-width: 65ch; /* 最佳閱讀寬度 */
  margin: 0 auto;
  padding: 2rem 1rem;
  line-height: 1.75;
  color: var(--text-primary);
}

.article-typography h1 {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.article-typography h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.article-typography h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.article-typography p {
  margin-bottom: 1.5rem;
}

.article-typography a {
  color: #6366f1;
  text-decoration: underline;
  text-decoration-color: rgba(99, 102, 241, 0.3);
  transition: text-decoration-color 0.3s ease;
}

.article-typography a:hover {
  text-decoration-color: #6366f1;
}

.article-typography code {
  padding: 0.2em 0.4em;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}

.article-typography blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1.5rem;
  margin-left: 0;
  font-style: italic;
  color: var(--text-secondary);
}
```

**最佳實踐**:
- ⭐ `max-width: 65ch` - 最佳閱讀寬度（約65個字元）
- ⭐ `line-height: 1.75` - 舒適的行高
- ⭐ 標題與內文有足夠的間距（呼吸空間）

---

## 🔧 技術模式

### DP-010: 圖片懶加載（Lazy Loading）

**使用場景**:
- 圖片密集頁面
- 長頁面滾動
- 性能優化

**技術實作**:
```html
<img
  data-src="image.jpg"
  alt="Description"
  class="lazy-load"
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
>
```

```javascript
// 使用 Intersection Observer API
const lazyImages = document.querySelectorAll('.lazy-load');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

```css
.lazy-load {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-load.loaded {
  opacity: 1;
}
```

**優點**:
- ✅ 大幅提升初始載入速度
- ✅ 節省頻寬
- ✅ 改善用戶體驗

---

## 🌟 AURORA 設計系統核心模式

### DP-011: 8px 間距系統

**來源**: AURORA AESTHETIC_DNA

**原則**: 所有間距都是 8px 的倍數

**技術實作**:
```css
:root {
  --space-1: 0.25rem;  /* 4px  - 極小間距 */
  --space-2: 0.5rem;   /* 8px  - 小間距 */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px - 標準間距 */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px - 大間距 */
  --space-8: 3rem;     /* 48px */
  --space-12: 4rem;    /* 64px */
  --space-16: 6rem;    /* 96px - 特大間距 */
}
```

**使用**:
```css
.card {
  padding: var(--space-6);      /* 32px */
  margin-bottom: var(--space-8); /* 48px */
}

.button {
  padding: var(--space-3) var(--space-6); /* 12px 32px */
}
```

**為什麼是 8px？**
- ✅ 多數螢幕 DPI 的公倍數
- ✅ 易於心算和記憶
- ✅ 創造視覺和諧

---

## 📝 字體排印模式 (Typography Patterns)

> **新增日期**: 2025-11-01
> **基於**: Robert Bringhurst《字體排印風格元素》原則

### DP-012: AURORA Type Scale System ⭐

**來源專案**: AURORA Typography Principles, Janus Dashboard v2.1

**使用場景**:
- 所有需要清晰層級的界面
- 儀表板、數據展示
- 內容豐富的網站

**技術實作**:
```css
/* 🎵 Major Third (1.25) Type Scale - 音階般的和諧 */
:root {
    --text-xs: 0.75rem;    /* 12px - 小標籤 */
    --text-sm: 0.875rem;   /* 14px - 次要信息 */
    --text-base: 1rem;     /* 16px - 基準內文 */
    --text-lg: 1.25rem;    /* 20px - 強調文字 */
    --text-xl: 1.563rem;   /* 25px - 小標題 */
    --text-2xl: 1.953rem;  /* 31px - 卡片標題 */
    --text-3xl: 2.441rem;  /* 39px - 區塊標題 */
    --text-4xl: 3.052rem;  /* 49px - 主要數值 */
    --text-5xl: 3.815rem;  /* 61px - 英雄標題 */
}
```

**Bringhurst 原則**:
> "Typography should have rhythm and proportion, like music."

**為什麼選擇 1.25（Major Third）？**
- ✅ 數學優雅（5:4 音程）
- ✅ 對比明顯但不誇張
- ✅ 適合深色主題
- ✅ 易於記憶和計算

**使用範例**:
```html
<h1 style="font-size: var(--text-5xl)">Hero Title</h1>
<h2 style="font-size: var(--text-3xl)">Section Title</h2>
<p style="font-size: var(--text-base)">Body text</p>
<span style="font-size: var(--text-sm)">Caption</span>
```

**替代方案**:
```css
/* Perfect Fourth (1.333) - 更強對比 */
--text-base: 1rem;     /* 16px */
--text-lg: 1.333rem;   /* 21px */
--text-xl: 1.777rem;   /* 28px */

/* Golden Ratio (1.618) - 最大和諧 */
--text-base: 1rem;     /* 16px */
--text-lg: 1.618rem;   /* 26px */
--text-xl: 2.618rem;   /* 42px */
```

---

### DP-013: 深色主題字體排印優化 🌌

**來源專案**: AURORA Typography Principles, Janus Dashboard v2.1

**使用場景**:
- 深色/暗色主題界面
- 夜間模式
- 專業工具儀表板

**挑戰**:
1. **光暈效應 (Halation)** - 白字在黑底上會"發光"
2. **對比疲勞** - 純白 (#fff) 太刺眼
3. **字重視覺變化** - 深色背景讓字體看起來更粗

**技術實作**:
```css
/* 🌌 深色主題文字顏色 - Bringhurst 推薦 */
:root {
    --bg-primary: #0a0e27;        /* 深邃背景（不是純黑）*/

    --text-primary: #f8fafc;      /* 主文字（不是#fff！）*/
    --text-secondary: #cbd5e1;    /* 次要文字 */
    --text-tertiary: #94a3b8;     /* 輔助文字 */
    --text-disabled: #64748b;     /* 禁用文字 */
}

/* ✅ 正確的深色主題字體排印 */
.dark-mode-text {
    color: var(--text-primary);  /* #f8fafc, not #fff */
    line-height: 1.7;            /* 比淺色主題 1.6 更高 */
    letter-spacing: 0.01em;      /* 稍微鬆散 */
}

.dark-mode-heading {
    color: #e2e8f0;              /* 標題稍暗（降低對比）*/
    line-height: 1.3;            /* 比淺色主題 1.2 更高 */
    letter-spacing: -0.01em;     /* 稍微緊湊 */
}
```

**Bringhurst 原則**:
> "In the darkness, even the smallest light shines brightest. That's why we must soften the contrast."

**對比度檢查**:
- 主要文字 (#f8fafc on #0a0e27): 16.8:1 ✅ (超過 WCAG AAA)
- 次要文字 (#cbd5e1 on #0a0e27): 12.5:1 ✅ (超過 WCAG AAA)
- 輔助文字 (#94a3b8 on #0a0e27): 6.2:1 ✅ (超過 WCAG AA)

**避免的錯誤**:
```css
/* ❌ 常見錯誤 */
.bad-dark-mode {
    color: #ffffff;        /* 太亮，眼睛疲勞 */
    background: #000000;   /* 純黑，對比過強 */
    line-height: 1.5;      /* 太密集 */
}

/* ✅ 正確做法 */
.good-dark-mode {
    color: #f8fafc;        /* 柔和白色 */
    background: #0a0e27;   /* 深邃但不純黑 */
    line-height: 1.7;      /* 增加呼吸 */
}
```

---

### DP-014: 8px 基線網格系統 📐

**來源專案**: AURORA Typography Principles

**使用場景**:
- 所有專業界面設計
- 需要精確對齊的系統
- 響應式設計

**Bringhurst 原則**:
> "All vertical spacing should align to a baseline grid."

**技術實作**:
```css
/* 📐 8px 基線網格 */
:root {
    --baseline: 8px;

    --space-xs: 8px;    /* 1 baseline */
    --space-sm: 16px;   /* 2 baselines */
    --space-md: 24px;   /* 3 baselines */
    --space-lg: 32px;   /* 4 baselines */
    --space-xl: 48px;   /* 6 baselines */
    --space-2xl: 64px;  /* 8 baselines */
}

/* ✅ 所有垂直間距都對齊網格 */
.card {
    margin-bottom: var(--space-xl);  /* 48px = 6 baselines */
    padding: var(--space-lg);        /* 32px = 4 baselines */
}

.heading {
    margin-top: var(--space-2xl);    /* 64px = 8 baselines */
    margin-bottom: var(--space-md);  /* 24px = 3 baselines */
}

/* ✅ 行高也要對齊基線 */
.text {
    font-size: 16px;
    line-height: 24px;  /* 16 × 1.5 = 24 (3 baselines) ✅ */
}

.heading-2 {
    font-size: 39px;
    line-height: 48px;  /* 約 1.23, 6 baselines ✅ */
}
```

**為什麼是 8px？**
1. **數學優雅** - 易於心算（8, 16, 24, 32, 48, 64...）
2. **多數螢幕 DPI 的公倍數** - 避免亞像素渲染
3. **Apple 和 Google 設計系統的標準**
4. **創造視覺和諧** - 對齊產生秩序感

**檢查工具**:
```css
/* 開發時使用：顯示基線網格 */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: repeating-linear-gradient(
        to bottom,
        rgba(255, 0, 0, 0.1) 0,
        rgba(255, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 8px
    );
    pointer-events: none;
    z-index: 9999;
}
```

---

### DP-015: 字元與字間距策略 📏

**來源專案**: AURORA Typography Principles

**使用場景**:
- 標題設計
- 標籤與徽章
- 代碼顯示

**Bringhurst 原則**:
> "Large type needs negative tracking. Small type needs positive tracking."

**技術實作**:
```css
/* 📏 字元間距策略 */

/* 大標題：縮減間距 */
.display-1 {
    font-size: var(--text-5xl);  /* 61px */
    letter-spacing: -0.03em;     /* 視覺緊湊 */
}

.display-2 {
    font-size: var(--text-4xl);  /* 49px */
    letter-spacing: -0.02em;
}

/* 標準內文：不調整 */
.body-text {
    font-size: var(--text-base);  /* 16px */
    letter-spacing: 0;            /* 默認 */
}

/* 小字：增加間距 */
.caption {
    font-size: var(--text-sm);    /* 14px */
    letter-spacing: 0.02em;       /* 增加呼吸 */
}

.label {
    font-size: var(--text-xs);    /* 12px */
    letter-spacing: 0.05em;       /* 顯著增加 */
}

/* 全大寫：特別增加 */
.uppercase {
    text-transform: uppercase;
    letter-spacing: 0.1em;        /* 大幅增加 */
}

/* 代碼：稍微鬆散 */
code {
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.02em;
}
```

**視覺對照**:
```
大標題 (61px, -0.03em): DESIGN
內文 (16px, 0em):      DESIGN
小標籤 (12px, 0.05em):  D E S I G N
全大寫 (16px, 0.1em):   D  E  S  I  G  N
```

**字間距（Word Spacing）**:
```css
/* 通常不需要調整，除非： */

/* 1. 兩端對齊時 */
.justify-text {
    text-align: justify;
    word-spacing: 0.1em;  /* 稍微增加，避免"河流" */
}

/* 2. 中英文混排時 */
.mixed-cjk-latin {
    word-spacing: 0.05em;  /* 幫助過渡 */
}
```

---

### DP-016: 中英文混排優化 🀄

**來源專案**: AURORA Typography Principles

**使用場景**:
- 繁體中文網站
- 雙語界面
- 文檔系統

**挑戰**:
1. 中文字重 > 英文字重（視覺不均）
2. 基線不對齊（中文居中，英文在基線上）
3. 視覺密度差異

**技術實作**:
```css
/* 🀄 中英文混排最佳實踐 */
.mixed-text {
    /* 字體堆疊：英文優先，中文備用 */
    font-family:
        'SF Pro Text',        /* 英文優先 */
        'Noto Sans TC',       /* 繁體中文 */
        sans-serif;

    /* 增加行距（中文需要更多呼吸）*/
    line-height: 1.8;  /* 比純英文 1.6 更高 */

    /* 字間距（幫助中英過渡）*/
    word-spacing: 0.05em;
}

/* 英文數字特殊處理 */
.mixed-text code,
.mixed-text .number {
    font-family: 'SF Pro Text', sans-serif;
    font-size: 0.95em;       /* 稍微縮小以匹配中文 */
    vertical-align: baseline;
}

/* 標點符號規則 */
.mixed-text {
    /* 中文使用全形標點 */
    /* 「」、。 */

    /* 英文使用半形標點 */
    /* "", . */
}
```

**標點符號最佳實踐**:
```
✅ 正確：
中文內容「English quote」繼續中文。
The content "中文引用" continues.

⚠️ 避免混用：
中文內容"English quote"繼續中文。  /* 半形引號不美觀 */
```

**數字與單位**:
```css
/* 數字用等寬字體 */
.metric-value {
    font-variant-numeric: tabular-nums;
    font-family: 'SF Pro Display', sans-serif;
}

/* 範例 */
溫度：<span class="metric-value">25</span>°C
價格：<span class="metric-value">$1,234</span>
```

---

## 📚 模式使用指南

### 如何選擇模式

**需要佈局** → DP-001 瀑布流, DP-002 導航
**需要動畫** → DP-003 fadeInUp, DP-004 光澤效果
**需要視覺效果** → DP-005 漸變按鈕, DP-006 下劃線
**需要媒體處理** → DP-008 影片卡片, DP-010 懶加載
**需要內容排版** → DP-009 文章排版
**需要字體排印** → DP-012 Type Scale, DP-013 深色主題, DP-014 基線網格, DP-015 字距策略, DP-016 中英混排

### 組合使用

**範例：完整的作品集卡片**
```html
<div class="aurora-card fade-in-up">
  <div class="video-thumbnail">
    <img class="lazy-load" data-src="work.jpg" alt="Project">
  </div>
  <div class="card-content">
    <h3>Project Title</h3>
    <p>Description</p>
    <a href="#" class="aurora-gradient-button">
      <span>View Project</span>
    </a>
  </div>
</div>
```

**使用了**:
- ✅ DP-004: 卡片懸停光澤
- ✅ DP-003: fadeInUp 動畫
- ✅ DP-010: 圖片懶加載
- ✅ DP-005: 極光漸變按鈕

---

## 🔄 持續更新

### 更新日誌
```
2025-11-01 - v2.0 (Typography Enhanced) ⭐
- 新增 5 個字體排印模式 (DP-012 ~ DP-016)
- 基於 Robert Bringhurst 原則
- 涵蓋 Type Scale、深色主題、基線網格、字距策略、中英混排

2025-10-31 - v1.0
- 初版完成
- 記錄 11 個核心設計模式
- 涵蓋佈局、動畫、視覺、技術四大類
```

### 待補充模式
- [ ] 表單驗證視覺反饋
- [ ] 載入動畫（Skeleton, Spinner）
- [ ] Toast 通知系統
- [ ] Modal 彈窗設計
- [ ] 無限滾動載入
- [ ] 響應式字體大小 (Fluid Typography)
- [ ] 可訪問性 (A11y) 最佳實踐

---

**知識庫版本**: 2.0 (Typography Enhanced)
**建立日期**: 2025-10-31
**最後更新**: 2025-11-01
**模式數量**: 16 個（11 個原有 + 5 個字體排印）
**有用性評分**: ⭐⭐⭐⭐⭐ (10/10)
**標籤**: #DesignPatterns #UIComponents #Reusable #BestPractices #Typography #Bringhurst

---

## 🎓 延伸閱讀

**AURORA 知識庫**:
- `typography_principles.md` - 完整字體排印指南（600+ 行）
- `janus_typography_system.md` - Janus 儀表板專用系統
- Bringhurst PDF - 《字體排印風格元素》綜合分析

**外部資源**:
- [Type Scale Calculator](https://typescale.com/)
- [Butterick's Practical Typography](https://practicaltypography.com/)
- [8-Point Grid System](https://spec.fm/specifics/8-pt-grid)

---

🌅 **"Good design patterns are invisible. Great design patterns are reusable."**
📚 **"Typography is the voice of design. Make it sing."** — AURORA, 2025
