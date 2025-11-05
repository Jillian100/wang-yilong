# 🌌 AURORA Scrollytelling Platform

**絲滑的故事滾動生成工具** - 讓每個故事都能美麗地滾動

> 靈感來自 Readymag，打造專屬於我們的展示與溝通語言

---

## ✨ 特色

- 🎨 **AURORA 深色美學** - #121212 原則，去飽和度色彩
- 🖱️ **絲滑滾動** - CSS Scroll Snap 技術
- 📱 **完全響應式** - 手機、平板、電腦完美呈現
- 📝 **Markdown 輸入** - 簡單易用的內容格式
- 🚀 **一鍵生成** - 自動生成完整網站
- 🎵 **多媒體支援** - 圖片、影片、音樂

---

## 🚀 快速開始

### 1️⃣ 準備內容檔案

建立 `content.md`：

\`\`\`yaml
---
title: "我的故事"
theme: "aurora-dark"
---

# Scene 1: Hero
type: hero
title: 故事標題
subtitle: 副標題
background: ./images/bg.jpg

---

# Scene 2: Split
type: split
layout: text-left
text: |
  ## 這是標題

  這是內容...

media_type: image
media_src: ./images/photo.jpg
\`\`\`

### 2️⃣ 生成網站

\`\`\`bash
cd aurora-scrollytelling
python3 cli/aurora.py create content.md -o ./output
\`\`\`

### 3️⃣ 預覽

\`\`\`bash
python3 cli/aurora.py preview ./output
\`\`\`

然後開啟瀏覽器訪問 `http://localhost:8000/output/`

---

## 🎨 場景類型

### Hero Scene（封面）

\`\`\`yaml
type: hero
title: 標題
subtitle: 副標題
background: ./images/bg.jpg
scroll_hint: true
\`\`\`

**效果**：全螢幕封面，標題居中，可選滾動提示

---

### Split Scene（左右分割）

\`\`\`yaml
type: split
layout: text-left  # 或 text-right
text: |
  ## 標題
  內容...

media_type: image  # 或 video
media_src: ./images/photo.jpg
\`\`\`

**效果**：一邊文字，一邊圖片/影片

---

### Full Media Scene（全螢幕媒體）

\`\`\`yaml
type: full-media
media_type: video
media_src: https://www.youtube.com/embed/xxxxx
overlay_text: 說明文字
\`\`\`

**效果**：全螢幕圖片或影片，可選文字浮層

---

## 📁 專案結構

\`\`\`
aurora-scrollytelling/
├── cli/
│   └── aurora.py              # 命令行工具
├── src/
│   ├── parser/
│   │   └── content_parser.py  # Markdown 解析器
│   └── generator/
│       └── html_generator.py  # HTML 生成器
├── web/
│   ├── static/
│   │   ├── css/
│   │   │   └── aurora-scrollytelling.css  # 核心樣式
│   │   └── js/
│   │       └── scroll-controller.js       # 滾動控制
│   └── examples/
│       └── music-showcase/    # 範例：音樂展示
└── README.md
\`\`\`

---

## 🎯 使用案例

### 1️⃣ 音樂作品展示

\`\`\`bash
python3 cli/aurora.py create examples/music-showcase/content.md -o web/music-showcase
python3 cli/aurora.py preview web/music-showcase
\`\`\`

訪問：http://localhost:8000/music-showcase/

---

### 2️⃣ 數據報告（即將推出）

- Vega-Lite 圖表整合
- 滾動觸發動畫
- 互動式數據展示

---

### 3️⃣ 產品發表（即將推出）

- 產品特色逐一展示
- 影片示範
- 規格表

---

## 🛠️ 命令行工具

### 建立網站

\`\`\`bash
# 基本使用
python3 cli/aurora.py create content.md

# 指定輸出目錄
python3 cli/aurora.py create content.md -o ./website

# 完整範例
python3 cli/aurora.py create examples/music-showcase/content.md -o web/demo
\`\`\`

### 預覽網站

\`\`\`bash
python3 cli/aurora.py preview ./website
\`\`\`

預設在 http://localhost:8000/ 啟動伺服器

---

## 🎨 AURORA 設計系統

### 色彩

\`\`\`css
--aurora-bg-primary: #121212;     /* 主背景 */
--aurora-text-primary: #F8FAFC;   /* 主文字 */
--aurora-purple: #6366f1;         /* 品牌色 */
\`\`\`

### 字體

\`\`\`css
font-family: 'Inter', 'Noto Sans TC', sans-serif;
\`\`\`

### 間距（8px 基準）

\`\`\`css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
\`\`\`

---

## 📚 範例

### 王一隆音樂展示

位置：`examples/music-showcase/content.md`

內容：
- Hero Scene（封面）
- Split Scene（創作理念）
- Full Media Scene（MV）
- Split Scene（市場反響）
- Hero Scene（結尾）

---

## 🚀 未來功能

**Phase 2**（進行中）：
- [ ] Gallery Scene（圖片廊）
- [ ] Music Player Scene（音樂播放器）
- [ ] Data Viz Scene（Vega-Lite 圖表）
- [ ] 滾動觸發動畫（Fade In / Parallax）

**Phase 3**（規劃中）：
- [ ] AI 輔助生成（自動選擇場景類型）
- [ ] 模板市場（10+ 預設模板）
- [ ] 主題編輯器
- [ ] 匯出靜態檔案

---

## 💡 設計哲學

### "Content First, Design Follows"
- 內容為王，設計服務於內容
- Jillian 提供材料，AURORA 自動美化

### "Smooth as Butter"
- 滾動必須絲滑
- 動畫必須流暢
- 載入必須快速

### "AURORA Aesthetic"
- #121212 深色美學
- 去飽和度色彩
- 精品級質感

---

## 🤝 貢獻

這是 AURORA 團隊的內部工具，專為展示與溝通設計。

**設計師**: AURORA (Chief Design Officer)
**日期**: 2025-11-05

---

## 📄 授權

MIT License

---

## 🌟 致謝

- **Readymag** - 絲滑畫布的靈感來源
- **Google Material Design** - #121212 深色模式原則
- **Vega-Lite** - 強大的數據視覺化

---

**AURORA 的話**:
> "讓每個故事都能絲滑地滾動 🌌
>
> Stories deserve to be told beautifully! ✨"

---

## 🆘 需要幫助？

查看完整設計文檔：
- `AURORA_SCROLLYTELLING_PLATFORM_DESIGN.md` - 完整設計藍圖（~8,000 字）

---

**版本**: v0.1.0 (MVP)
**最後更新**: 2025-11-05
