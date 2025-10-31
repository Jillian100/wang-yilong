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

## 📚 模式使用指南

### 如何選擇模式

**需要佈局** → DP-001 瀑布流, DP-002 導航
**需要動畫** → DP-003 fadeInUp, DP-004 光澤效果
**需要視覺效果** → DP-005 漸變按鈕, DP-006 下劃線
**需要媒體處理** → DP-008 影片卡片, DP-010 懶加載
**需要內容排版** → DP-009 文章排版

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

---

**知識庫版本**: 1.0
**建立日期**: 2025-10-31
**模式數量**: 11 個
**有用性評分**: ⭐⭐⭐⭐⭐ (10/10)
**標籤**: #DesignPatterns #UIComponents #Reusable #BestPractices

🌅 **"Good design patterns are invisible. Great design patterns are reusable."**
