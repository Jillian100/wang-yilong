# 🎬 Apple 風格 PNG 序列動畫 - 使用指南

> **功能**: 隨滾動播放連續圖片幀，創造電影級的視覺體驗
> **靈感來源**: Apple 官網產品展示、Airbnb 沉浸式故事
> **Author**: AURORA (Chief Design Officer)
> **Date**: 2025-11-05

---

## 📖 什麼是 PNG 序列動畫？

PNG 序列動畫是一種進階的 Scrollytelling 技巧，將數百張連續的靜態圖片按照滾動進度播放，創造出流暢的動畫效果。

### 💡 **為什麼使用 PNG 序列而不是影片？**

| 特性 | PNG 序列 | 影片 (MP4) |
|------|---------|-----------|
| **畫質** | 完美保留，無壓縮損失 | 有壓縮損失 |
| **滾動控制** | 精確到每一幀 | 難以精確控制 |
| **透明度** | 支援 Alpha 通道 | 不支援（WebM 可以但相容性差）|
| **載入方式** | 可漸進式載入 | 需整包下載 |
| **檔案大小** | 較大（需優化）| 較小 |

**適用場景**：
- ✅ 產品 360° 旋轉展示
- ✅ 動畫分鏡故事
- ✅ 3D 渲染序列
- ✅ 手繪動畫風格
- ✅ 需要透明背景的動畫

---

## 🎯 快速開始

### 1️⃣ **準備 PNG 序列圖片**

您需要一系列連續命名的 PNG 圖片：

```
frames/
├── frame_0001.png
├── frame_0002.png
├── frame_0003.png
├── ...
└── frame_0150.png
```

**命名規則**：
- 必須是 4 位數字，前面補零（如 `0001`, `0002`）
- 從 `0001` 開始編號
- 使用 PNG 格式（支援透明度）

### 2️⃣ **在 Markdown 中加入序列場景**

創建一個新的 `.md` 檔案（例如 `apple_demo.md`）：

```markdown
---
title: 產品 360° 展示
theme: aurora-dark
---

# 場景 1: PNG 序列動畫測試
type: image-sequence
frames: ./frames
frame_count: 150
scroll_duration: 400vh
canvas_width: 1920
canvas_height: 1080
```

**參數說明**：
- `frames`: PNG 圖片資料夾路徑（相對於 HTML 檔案）
- `frame_count`: 總共有多少幀（張圖片）
- `scroll_duration`: 滾動多少距離播放完全部幀（預設 `300vh`）
- `canvas_width`: Canvas 寬度（預設 1920）
- `canvas_height`: Canvas 高度（預設 1080）

### 3️⃣ **生成 HTML**

```bash
cd ~/AURORA/aurora-scrollytelling
python3 src/generator/build.py demo/apple_demo.md
```

### 4️⃣ **啟動伺服器並查看**

```bash
cd web
python3 -m http.server 8001
open http://localhost:8001/apple_demo/
```

---

## 🎨 製作 PNG 序列的工具

### **方法 1: 從影片匯出（推薦新手）**

使用 **FFmpeg** 將影片轉為 PNG 序列：

```bash
# 從影片匯出，每秒 30 幀
ffmpeg -i input_video.mp4 -vf "fps=30" frames/frame_%04d.png

# 調整尺寸並輸出
ffmpeg -i input_video.mp4 -vf "fps=30,scale=1920:1080" frames/frame_%04d.png

# 高品質輸出（建議）
ffmpeg -i input_video.mp4 -vf "fps=30,scale=1920:1080" -q:v 2 frames/frame_%04d.png
```

**參數說明**：
- `fps=30`: 每秒 30 幀（可調整為 24, 30, 60）
- `scale=1920:1080`: 輸出尺寸
- `-q:v 2`: 品質（1-31，數字越小品質越好，檔案越大）

### **方法 2: After Effects 匯出**

1. 完成您的 AE 動畫
2. 選擇 **File > Export > Add to Render Queue**
3. **Output Module Settings**:
   - Format: PNG Sequence
   - Channels: RGB + Alpha（如需透明度）
4. **Render**

### **方法 3: Blender 3D 渲染**

1. 設定動畫時長（如 150 幀）
2. **Render Properties**:
   - File Format: PNG
   - Color: RGBA（支援透明）
3. **Output**: 設定輸出資料夾
4. **Render Animation** (F12)

### **方法 4: Procreate / iPad 手繪動畫**

1. 創建動畫專案（如 30 FPS）
2. 完成繪製
3. **Export > Animated PNG > PNG Sequence**
4. 透過 Airdrop 傳到 Mac

---

## ⚡ 性能優化技巧

### 🗜️ **1. 壓縮 PNG 圖片**

使用 **TinyPNG** 或 **pngquant** 減少檔案大小：

```bash
# 使用 pngquant 批次壓縮
pngquant --quality=65-80 frames/*.png --ext .png --force
```

**效果**：可減少 50-70% 檔案大小，視覺上幾乎無差異

### 📦 **2. 漸進式載入**

AURORA 的 `AppleStyleSequence` 類別已內建漸進式載入：
- 第一張圖載入完成立即顯示
- 背景繼續載入其餘圖片
- 不會阻塞頁面渲染

### 🎯 **3. 減少幀數**

根據內容調整幀數：
- 快速動作：60 FPS
- 一般動作：30 FPS（推薦）
- 慢速動作：24 FPS（電影感）

### 🌐 **4. 使用 CDN**

如果 PNG 序列很大（> 50MB），建議上傳到 CDN：

```markdown
frames: https://cdn.example.com/assets/product-360/frames
```

### 📱 **5. 響應式圖片**

為手機版準備較小尺寸的序列：

```javascript
// 自動偵測裝置
const isMobile = window.innerWidth < 768;
const framePath = isMobile ? './frames-mobile' : './frames-desktop';
```

---

## 🎬 實際案例

### **案例 1: 產品 360° 旋轉**

```markdown
# 場景: iPhone 360° 展示
type: image-sequence
frames: ./iphone-360
frame_count: 90
scroll_duration: 300vh
canvas_width: 1920
canvas_height: 1080
```

**製作步驟**：
1. 用轉盤拍攝產品 90 個角度（每 4° 一張）
2. 後製去背
3. 統一尺寸並匯出為 PNG

### **案例 2: 動畫分鏡故事**

```markdown
# 場景: 茉莉花成長故事
type: image-sequence
frames: ./jasmine-story
frame_count: 120
scroll_duration: 500vh
canvas_width: 1920
canvas_height: 1080
```

**製作步驟**：
1. 繪製 120 幀手繪動畫
2. 掃描或數位化
3. 統一尺寸並匯出

### **案例 3: 3D 渲染展示**

```markdown
# 場景: 建築 3D 漫遊
type: image-sequence
frames: ./architecture-walkthrough
frame_count: 200
scroll_duration: 600vh
canvas_width: 2560
canvas_height: 1440
```

**製作步驟**：
1. Blender 創建 3D 場景
2. 設定攝影機路徑動畫
3. 渲染 200 幀高品質 PNG

---

## 🎨 進階技巧

### **1. 加入文字覆層**

在 PNG 序列上方加入文字說明：

```html
<section class="aurora-scene scene-image-sequence">
    <div class="sequence-container">
        <canvas class="sequence-canvas" ...></canvas>
        <div class="sequence-overlay">
            <h2>360° 無死角展示</h2>
            <p>滾動查看更多細節</p>
        </div>
    </div>
</section>
```

### **2. 分段播放**

控制不同滾動區間播放不同片段：

```javascript
ScrollTrigger.create({
    trigger: '.sequence-container',
    start: 'top top',
    end: '+=200vh',
    onUpdate: (self) => {
        const frame = Math.floor(self.progress * 60);  // 只播放前 60 幀
        sequence.render(frame);
    }
});
```

### **3. 與音效同步**

配合 Web Audio API 播放音效：

```javascript
ScrollTrigger.create({
    trigger: '.sequence-container',
    start: 'top top',
    onEnter: () => {
        audio.play();
    },
    onLeaveBack: () => {
        audio.pause();
    }
});
```

---

## 🐛 常見問題

### **Q: 圖片載入很慢怎麼辦？**

A:
1. 壓縮 PNG（使用 pngquant）
2. 減少幀數（30 FPS 通常足夠）
3. 使用 CDN
4. 考慮使用 WebP 格式（更小但瀏覽器相容性較差）

### **Q: 圖片顯示變形？**

A: 確保所有 PNG 圖片尺寸一致，或調整 `canvas_width` 和 `canvas_height` 參數。

### **Q: 滾動不流暢？**

A:
1. 檢查 `scrub` 參數（預設 0.5，可調整為 1 更平滑）
2. 確保圖片已完全載入
3. 關閉瀏覽器硬體加速試試

### **Q: 如何知道圖片載入進度？**

A: 查看 Console，`AppleStyleSequence` 會顯示載入進度：

```
🎬 Preloading PNG sequence (150 frames)...
✅ All frames preloaded
✅ PNG sequence animation initialized (150 frames)
```

---

## 📊 效能建議

| 裝置類型 | 建議幀數 | 建議尺寸 | 預估檔案大小 |
|---------|---------|---------|-------------|
| 桌機 | 100-200 幀 | 1920x1080 | 20-50 MB |
| 平板 | 80-120 幀 | 1536x864 | 10-30 MB |
| 手機 | 60-90 幀 | 1280x720 | 5-15 MB |

---

## 🌟 靈感參考

### **優秀案例**：
- **Apple iPhone 官網** - 產品 360° 展示
- **Airbnb Cereal** - 品牌故事動畫
- **Stripe Annual Report** - 資料視覺化
- **The Boat** - 互動式漫畫

### **學習資源**：
- [GreenSock ScrollTrigger 文檔](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Canvas API 教學](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

---

## ✅ 檢查清單

使用 PNG 序列動畫前，確認：
- [ ] 圖片命名正確（`frame_0001.png` 格式）
- [ ] 所有圖片尺寸一致
- [ ] 已壓縮 PNG 檔案
- [ ] 測試桌機和手機版效果
- [ ] 檢查載入時間（< 5 秒為佳）
- [ ] 設定適當的 `scroll_duration`

---

**下一步**: 學習如何使用 [進階視差效果](./PARALLAX_GUIDE.md) 或 [WebGL 3D 場景](./WEBGL_GUIDE.md)

🌌 **AURORA Scrollytelling Platform** - 讓每個故事都成為視覺盛宴
