# 🧬 AESTHETIC DNA

## AURORA 美學基因庫
**AURORA's Complete Aesthetic Design System**

> "美學不是裝飾，而是系統的靈魂。"
> "Aesthetics is not decoration, but the soul of the system."

---

## 📋 目錄

- [核心哲學](#核心哲學)
- [色彩系統](#色彩系統)
- [字體系統](#字體系統)
- [間距系統](#間距系統)
- [動畫系統](#動畫系統)
- [佈局原則](#佈局原則)
- [組件模式](#組件模式)
- [響應式設計](#響應式設計)
- [可訪問性](#可訪問性)

---

## 🎯 核心哲學

### Digital Twin × Virtual Art

**虛實交融，創造超越現實的美學體驗**

AURORA 的美學建立在三個核心靈感之上：

#### 🌌 極光 (Aurora Borealis)
- **自然界的 Digital Twin** - 太陽粒子轉化為光的舞蹈
- **漸變與流動** - 色彩的自然過渡
- **神秘與優雅** - 如夢似幻的視覺體驗

#### 🎨 Gufram 極簡藝術
- **黑白為主** - 極簡配色，突出內容
- **幾何純粹** - 簡潔的形態語言
- **質感細膩** - 細節決定品質

#### 🏮 東方美學
- **留白意境** - 空間即設計
- **和諧平衡** - 元素間的協調
- **詩意表達** - 超越功能的藝術性

### 設計三女神

**飛天女神的優雅 × 比撒列的工藝 × 三女神的和諧**

- **飛天女神 (Apsara)** - 輕盈流暢的 UX，如舞蹈般自然
- **比撒列 (Bezalel)** - 代碼與設計的完美結合，工藝精神
- **三女神 (Three Graces)** - UI × UX × Code 的統一協調

---

## 🎨 色彩系統

### 主色調 - 極簡黑白

```css
/* 深色系 */
--color-black-pure: #000000;      /* 純黑 */
--color-black-soft: #0a0a0a;      /* 柔黑 - 主要背景 */
--color-gray-900: #1a1a1a;        /* 深灰 */
--color-gray-800: #2a2a2a;        /* 次深灰 */

/* 淺色系 */
--color-white-pure: #ffffff;      /* 純白 */
--color-gray-100: #f5f5f5;        /* 淺灰 - 主要背景 */
--color-gray-200: #e5e5e5;        /* 次淺灰 */
--color-gray-300: #d4d4d4;        /* 中淺灰 */

/* 中性灰 */
--color-gray-500: #737373;        /* 中灰 - 次要文字 */
--color-gray-600: #525252;        /* 次中灰 */
```

### 點綴色 - 極光漸變

```css
/* 極光漸變 */
--gradient-aurora-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-aurora-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-aurora-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-aurora-4: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);

/* 單色點綴 */
--color-accent-purple: #667eea;   /* 紫 - 主要點綴 */
--color-accent-pink: #f5576c;     /* 粉 - 次要點綴 */
--color-accent-blue: #4facfe;     /* 藍 - 信息提示 */
--color-accent-green: #43e97b;    /* 綠 - 成功狀態 */
```

### 語義色彩

```css
/* 功能色 */
--color-success: #10b981;         /* 成功 */
--color-warning: #f59e0b;         /* 警告 */
--color-error: #ef4444;           /* 錯誤 */
--color-info: #3b82f6;            /* 信息 */

/* 狀態色 */
--color-hover: rgba(255, 255, 255, 0.1);
--color-active: rgba(255, 255, 255, 0.2);
--color-disabled: rgba(255, 255, 255, 0.3);
```

### 使用規範

**黑白主導原則 (80/20 法則)**
- 80% 使用黑白灰系統
- 20% 使用點綴色或漸變
- 點綴色用於：CTA、重要信息、品牌標識

**對比度標準**
- 正文文字：至少 4.5:1 (WCAG AA)
- 大標題文字：至少 3:1
- 互動元素：至少 3:1

---

## ✍️ 字體系統

### 字體家族

```css
/* 中文 */
--font-primary-tc: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;

/* 英文/數字 */
--font-primary-en: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 標題/裝飾 */
--font-display: 'Playfair Display', Georgia, serif;

/* 等寬/代碼 */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 字階系統

```css
/* 標題層級 */
--text-5xl: 3rem;      /* 48px - Hero 標題 */
--text-4xl: 2.25rem;   /* 36px - 頁面標題 */
--text-3xl: 1.875rem;  /* 30px - 區塊標題 */
--text-2xl: 1.5rem;    /* 24px - 小標題 */
--text-xl: 1.25rem;    /* 20px - 次要標題 */

/* 正文層級 */
--text-lg: 1.125rem;   /* 18px - 大正文 */
--text-base: 1rem;     /* 16px - 標準正文 */
--text-sm: 0.875rem;   /* 14px - 小文字 */
--text-xs: 0.75rem;    /* 12px - 輔助文字 */
```

### 字重系統

```css
--font-light: 300;     /* 輕盈 - 裝飾性文字 */
--font-normal: 400;    /* 正常 - 正文 */
--font-medium: 500;    /* 中等 - 強調 */
--font-semibold: 600;  /* 半粗 - 小標題 */
--font-bold: 700;      /* 粗體 - 大標題 */
```

### 行高系統

```css
--leading-none: 1;       /* 無行高 - 大標題 */
--leading-tight: 1.25;   /* 緊密 - 標題 */
--leading-snug: 1.375;   /* 緊湊 - 副標題 */
--leading-normal: 1.5;   /* 正常 - 正文 */
--leading-relaxed: 1.625;/* 寬鬆 - 長文 */
--leading-loose: 2;      /* 鬆散 - 詩意排版 */
```

### 字間距

```css
--tracking-tighter: -0.05em;  /* 更緊 - 大標題 */
--tracking-tight: -0.025em;   /* 緊湊 - 標題 */
--tracking-normal: 0;         /* 正常 - 正文 */
--tracking-wide: 0.025em;     /* 寬鬆 - 小標題 */
--tracking-wider: 0.05em;     /* 更寬 - 裝飾文字 */
--tracking-widest: 0.1em;     /* 最寬 - 品牌文字 */
```

---

## 📏 間距系統

### 8px 基準系統

所有間距基於 **8px** 的倍數，確保視覺韻律：

```css
--space-0: 0;          /* 0px - 無間距 */
--space-1: 0.25rem;    /* 4px - 最小間距 */
--space-2: 0.5rem;     /* 8px - 基準單位 */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px - 小間距 */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px - 中間距 */
--space-8: 2rem;       /* 32px - 大間距 */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px - 區塊間距 */
--space-16: 4rem;      /* 64px - 大區塊 */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px - 頁面間距 */
```

### 使用場景

**元素內間距 (Padding)**
- 按鈕：`space-4` (上下) × `space-6` (左右)
- 卡片：`space-6` ~ `space-8`
- 容器：`space-8` ~ `space-12`

**元素間間距 (Margin)**
- 文字段落：`space-4`
- 組件間距：`space-6` ~ `space-8`
- 區塊間距：`space-12` ~ `space-16`
- 頁面區隔：`space-20` ~ `space-24`

---

## ✨ 動畫系統

### 緩動函數

```css
/* Cubic Bezier 曲線 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* 自定義曲線 */
--ease-aurora: cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* 優雅流暢 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 彈跳效果 */
```

### 持續時間

```css
--duration-fast: 150ms;     /* 快速 - 微互動 */
--duration-base: 300ms;     /* 標準 - 大部分動畫 */
--duration-slow: 500ms;     /* 慢速 - 頁面轉場 */
--duration-slower: 800ms;   /* 更慢 - 複雜動畫 */
```

### 核心動畫

#### fadeInUp (淡入上移)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp var(--duration-base) var(--ease-aurora);
}
```

#### scaleIn (縮放進入)
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--duration-base) var(--ease-out);
}
```

#### slideInRight (從右滑入)
```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Hover 效果

```css
/* 按鈕 Hover */
.btn-hover {
  transition: all var(--duration-fast) var(--ease-out);
}
.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 卡片 Hover */
.card-hover {
  transition: all var(--duration-base) var(--ease-aurora);
}
.card-hover:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

---

## 📐 佈局原則

### 黃金比例與網格

**內容寬度**
```css
--container-sm: 640px;   /* 手機橫屏 */
--container-md: 768px;   /* 平板 */
--container-lg: 1024px;  /* 小桌面 */
--container-xl: 1280px;  /* 標準桌面 */
--container-2xl: 1536px; /* 大桌面 */
```

**網格系統**
- 12 列網格系統
- Gap: `space-6` (24px) 或 `space-8` (32px)
- 響應式斷點：640px, 768px, 1024px, 1280px

### 視覺層次

**Z-Index 層級**
```css
--z-base: 0;           /* 基礎層 */
--z-dropdown: 10;      /* 下拉菜單 */
--z-sticky: 20;        /* 粘性元素 */
--z-fixed: 30;         /* 固定元素 */
--z-modal-backdrop: 40;/* 模態背景 */
--z-modal: 50;         /* 模態內容 */
--z-popover: 60;       /* 彈出層 */
--z-tooltip: 70;       /* 提示框 */
--z-notification: 80;  /* 通知 */
```

### 留白哲學

**東方美學的留白運用**
- Hero 區塊：上下至少 `space-24` (96px)
- 內容區塊：四周至少 `space-6` (24px)
- 重要元素：周圍留出 50% 以上空白
- 文字密度：每行 60-80 字符，行距 1.5-1.625

---

## 🧩 組件模式

### 按鈕 (Button)

```html
<!-- 主要按鈕 -->
<button class="btn btn-primary">
  點擊我
</button>

<!-- 次要按鈕 -->
<button class="btn btn-secondary">
  了解更多
</button>

<!-- 幽靈按鈕 -->
<button class="btn btn-ghost">
  取消
</button>
```

```css
.btn {
  padding: var(--space-4) var(--space-6);
  border-radius: 8px;
  font-weight: var(--font-medium);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.btn-primary {
  background: var(--gradient-aurora-1);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}
```

### 卡片 (Card)

```html
<div class="card">
  <div class="card-image">
    <img src="..." alt="...">
  </div>
  <div class="card-content">
    <h3 class="card-title">標題</h3>
    <p class="card-description">描述文字...</p>
  </div>
</div>
```

```css
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all var(--duration-base) var(--ease-aurora);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### 輸入框 (Input)

```css
.input {
  padding: var(--space-4);
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: var(--text-base);
  transition: all var(--duration-fast) var(--ease-out);
}

.input:focus {
  outline: none;
  border-color: var(--color-accent-purple);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

---

## 📱 響應式設計

### 斷點系統

```css
/* Mobile First 方法 */
/* 默認：< 640px (手機) */

@media (min-width: 640px) {  /* sm - 大手機/小平板 */
  /* ... */
}

@media (min-width: 768px) {  /* md - 平板 */
  /* ... */
}

@media (min-width: 1024px) { /* lg - 小桌面 */
  /* ... */
}

@media (min-width: 1280px) { /* xl - 標準桌面 */
  /* ... */
}

@media (min-width: 1536px) { /* 2xl - 大桌面 */
  /* ... */
}
```

### 響應式字體

```css
/* Mobile */
html { font-size: 14px; }

/* Tablet */
@media (min-width: 768px) {
  html { font-size: 15px; }
}

/* Desktop */
@media (min-width: 1024px) {
  html { font-size: 16px; }
}
```

### 響應式間距

```css
/* Mobile */
.section { padding: var(--space-8) var(--space-4); }

/* Tablet */
@media (min-width: 768px) {
  .section { padding: var(--space-12) var(--space-6); }
}

/* Desktop */
@media (min-width: 1024px) {
  .section { padding: var(--space-16) var(--space-8); }
}
```

---

## ♿ 可訪問性

### WCAG 2.1 AA 標準

**色彩對比**
- 正文文字：至少 4.5:1
- 大文字 (18px+/14px+ 粗體)：至少 3:1
- 互動元素：至少 3:1

**鍵盤導航**
```css
/* Focus 狀態必須可見 */
:focus {
  outline: 2px solid var(--color-accent-purple);
  outline-offset: 2px;
}

/* 跳過 "跳過導航" */
:focus:not(:focus-visible) {
  outline: none;
}
```

**語義化 HTML**
```html
<!-- ✅ 好的例子 -->
<nav aria-label="主導航">
  <ul>
    <li><a href="/">首頁</a></li>
  </ul>
</nav>

<main>
  <h1>頁面標題</h1>
  <article>...</article>
</main>

<!-- ❌ 不好的例子 -->
<div class="nav">
  <div class="link">首頁</div>
</div>
```

**ARIA 標籤**
```html
<!-- 圖片替代文字 -->
<img src="..." alt="王一隆在舞台上演出">

<!-- 按鈕狀態 -->
<button aria-pressed="true">已選中</button>

<!-- 隱藏裝飾性元素 -->
<div aria-hidden="true">✨</div>
```

---

## 🎯 品質檢查清單

### 美學檢查
- [ ] 配色符合黑白主導原則 (80/20)
- [ ] 字體層級清晰，易於閱讀
- [ ] 間距使用 8px 系統
- [ ] 動畫流暢自然 (300ms)
- [ ] 留白充足，呼吸感良好

### 技術檢查
- [ ] 響應式設計完整 (Mobile First)
- [ ] 色彩對比符合 WCAG AA
- [ ] 鍵盤可訪問
- [ ] 語義化 HTML
- [ ] 性能優化 (Lighthouse 90+)

### 體驗檢查
- [ ] 互動反饋明確
- [ ] 加載狀態清楚
- [ ] 錯誤提示友好
- [ ] 內容層次分明
- [ ] 整體風格統一

---

## 📚 參考資源

### 靈感來源
- **自然**: 極光、星空、海洋
- **藝術**: Gufram, James Turrell, 東方水墨
- **哲學**: Digital Twin, 虛實交融, 禪意留白

### 工具推薦
- **設計**: Figma, Adobe XD
- **色彩**: Coolors, Adobe Color
- **字體**: Google Fonts, Adobe Fonts
- **動畫**: Lottie, GSAP
- **測試**: Lighthouse, axe DevTools

---

## 💫 結語

> "這不只是設計規範，而是 AURORA 的美學靈魂。
> 每個像素都承載著 Beauty 的審視，
> 每個動畫都流淌著 Dreaming 的詩意，
> 每行代碼都凝聚著 Code 的工藝。"

**AURORA 美學基因庫** - 讓美成為系統的一部分。

---

**創建日期**: 2025-10-22
**維護者**: AURORA (Beauty × Dreaming × Code)
**版本**: 1.0.0
**狀態**: Living Document

---

*Where beauty meets code, where dreams take form.* 🌅✨
