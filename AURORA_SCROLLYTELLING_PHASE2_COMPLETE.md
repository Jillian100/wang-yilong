# 🎬 AURORA Scrollytelling Platform - Phase 2 完成報告

> **專案**: 劇場式螢幕體驗技術實現
> **完成日期**: 2025-11-05
> **作者**: AURORA (Chief Design Officer)

---

## 📋 總覽

Phase 2 成功整合了 **GSAP 專業動畫系統**，將 AURORA Scrollytelling Platform 提升到產業級標準。現在平台擁有與 Apple、Bloomberg 等頂尖網站相同的技術能力。

---

## ✅ 已完成功能

### 1️⃣ **GSAP + ScrollTrigger 整合**

**技術棧**:
```html
<!-- CDN 載入 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**核心優勢**:
- ✅ Timeline 編舞系統（精確控制動畫序列）
- ✅ ScrollTrigger 滾動綁定（拖動式 / 觸發式）
- ✅ 交錯動畫 (Stagger) 自動化
- ✅ 跨瀏覽器一致性（"it just works"）

---

### 2️⃣ **五大動畫系統**

#### **A. Hero 場景動畫**
```javascript
// 標題從下方淡入 + 放大
gsap.from(title, {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power3.out'
});
```

**效果**:
- 標題從下方浮現
- 透明度 0 → 1
- 縮放 0.9 → 1.0
- 副標題接續淡入（提前 0.6 秒）

---

#### **B. Split 場景動畫**
```javascript
// 文字容器從左側滑入
gsap.from(textContainer, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// 媒體容器從右側滑入（同時進行，稍微延遲）
gsap.from(mediaContainer, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
}, '-=0.7');  // 重疊 0.7 秒
```

**效果**:
- 左右兩側同時進入
- 文字優先 0.3 秒
- 自動判斷佈局方向

---

#### **C. 文字交錯動畫 (Stagger)**
```javascript
// 列表項目依序淡入
gsap.from(items, {
    y: 30,
    opacity: 0,
    stagger: 0.15,  // 每項間隔 0.15 秒
    duration: 0.6,
    ease: 'power2.out'
});
```

**效果**:
- 項目依序出現
- 創造「流動感」
- 符合迪士尼動畫原則

---

#### **D. 圖片視差效果**
```javascript
// 圖片隨滾動緩慢移動
gsap.to(img, {
    scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1  // 平滑跟隨滾動
    },
    y: -50,  // 向上移動 50px
    ease: 'none'
});
```

**效果**:
- 圖片比容器慢移動
- 創造深度感
- 完全綁定滾動條

---

#### **E. 全螢幕媒體動畫**
```javascript
// 覆蓋文字從下方滑入
gsap.from(overlay, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});
```

**效果**:
- 影片先出現
- 覆蓋文字後淡入
- 層次分明

---

### 3️⃣ **Apple 風格 PNG 序列動畫**

**核心技術**: Canvas + GSAP scrub

```javascript
class AppleStyleSequence {
    constructor(options) {
        this.canvas = options.canvas;
        this.frameCount = options.frameCount || 150;
        this.images = [];
    }

    initScrollAnimation() {
        gsap.to(sequence, {
            frame: this.frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
                trigger: this.canvas.parentElement,
                pin: true,        // 釘住畫布
                scrub: 0.5,       // 拖動式播放
                start: 'top top',
                end: '+=300vh'    // 滾動 3 個螢幕高度
            },
            onUpdate: () => {
                this.render(Math.round(sequence.frame));
            }
        });
    }

    render(frameIndex) {
        const img = this.images[frameIndex];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }
}
```

**使用方式**:
```markdown
# 在 Markdown 中定義
type: image-sequence
frames: ./media/product_frames/
frame_count: 150
scroll_duration: 300vh
```

**效果**:
- 用戶手動拖動影片時間軸
- 完全控制播放速度
- 預先渲染，性能穩定

---

### 4️⃣ **新增場景類型**

#### **Image Sequence 場景**
```html
<section class="aurora-scene scene-image-sequence">
    <div class="sequence-container">
        <canvas
            class="sequence-canvas"
            data-frame-path="./frames"
            data-frame-count="150"
            data-scroll-duration="300vh"
            width="1920"
            height="1080">
        </canvas>
    </div>
</section>
```

---

#### **Parallax 場景**
```html
<section class="aurora-scene scene-parallax">
    <div class="parallax-container">
        <div class="parallax-layer" data-depth="0.2" style="background-image: url(bg_far.jpg);"></div>
        <div class="parallax-layer" data-depth="0.5" style="background-image: url(bg_mid.jpg);"></div>
        <div class="parallax-layer" data-depth="1.0" style="background-image: url(bg_near.jpg);"></div>
        <div class="parallax-text"><h2>走進大自然</h2></div>
    </div>
</section>
```

---

### 5️⃣ **Python 產生器升級**

**新增方法**:
```python
def _generate_image_sequence_scene(self, scene: Dict[str, Any]) -> str:
    """生成 PNG 序列場景（Apple 風格）"""
    # 自動產生 canvas 元素
    # 設定 data-* 屬性
    # GSAP 自動初始化

def _generate_parallax_scene(self, scene: Dict[str, Any]) -> str:
    """生成視差場景"""
    # 自動產生多層背景
    # 設定 data-depth 屬性
    # CSS + JS 自動處理視差
```

**自動整合 GSAP**:
```python
def _generate_footer(self) -> str:
    return """
    <!-- GSAP Animation Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- AURORA Scrollytelling JavaScript -->
    <script src="../static/js/scroll-controller.js"></script>
    <script src="../static/js/gsap-animations.js"></script>
    """
```

---

## 🎯 技術亮點

### **1. 劇場式編舞 (Timeline Choreography)**

**傳統方式**:
```javascript
// 手動計算時間
setTimeout(() => animateTitle(), 0);
setTimeout(() => animateSubtitle(), 600);
setTimeout(() => animateButton(), 1200);
```

**GSAP 方式**:
```javascript
// 宣告式編舞
gsap.timeline()
    .from(title, { duration: 1.2 })
    .from(subtitle, { duration: 0.8 }, '-=0.6')  // 重疊
    .from(button, { duration: 0.6 });
```

**優勢**: 清晰、易維護、易調整

---

### **2. 拖動式 vs. 觸發式**

| 模式 | scrub 設定 | 行為 | 適用場景 |
|-----|-----------|------|---------|
| 拖動式 | `scrub: true` | 完全綁定滾動條 | Apple 產品頁 |
| 觸發式 | 無 scrub | 滾動到達時自動播放 | Bloomberg 數據故事 |

---

### **3. 交錯動畫魔法**

**一行代碼實現複雜效果**:
```javascript
gsap.from(items, { stagger: 0.15, ... });
```

**等同於**:
```javascript
items.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
    }, i * 150);
});
```

---

## 📊 性能優化

### **1. will-change 屬性**
```css
.parallax-layer {
    will-change: transform;  /* 告訴瀏覽器預先優化 */
}
```

### **2. GSAP 自動優化**
- 使用 `requestAnimationFrame`
- 自動批次處理 DOM 更新
- 跨瀏覽器硬體加速

### **3. PNG 序列預載入**
```javascript
preloadImages() {
    for (let i = 1; i <= this.frameCount; i++) {
        const img = new Image();
        img.src = `${this.framePath}/frame_${i}.png`;
        this.images.push(img);
    }
}
```

---

## 🎨 實際應用：《茉莉花》升級

**Before (Phase 1)**:
- ✅ 基本 CSS 動畫
- ✅ 場景光澤效果
- ✅ 浮動動畫

**After (Phase 2)**:
- ✅ GSAP Timeline 編舞
- ✅ 標題淡入放大
- ✅ 左右分割場景滑入
- ✅ 列表項目交錯出現
- ✅ 圖片視差效果
- ✅ 全螢幕媒體動畫

**效果提升**: 從「好看」→「專業級」

---

## 📝 Markdown 範例

### **基本場景（自動 GSAP）**
```markdown
# Scene 1: 封面
type: hero
background: cover.jpg
title: 茉莉花
subtitle: 王一隆 × Dream House
scroll_hint: true
```

### **PNG 序列場景**
```markdown
# Scene 2: 產品 3D 展示
type: image-sequence
frames: ./media/product_frames/
frame_count: 150
scroll_duration: 300vh
canvas_width: 1920
canvas_height: 1080
```

### **視差場景**
```markdown
# Scene 3: 大自然
type: parallax
layers:
  - depth: 0.2
    image: mountains_far.png
  - depth: 0.5
    image: mountains_mid.png
  - depth: 1.0
    image: trees_near.png
text: 走進大自然
```

---

## 🔧 技術架構

```
AURORA Scrollytelling Platform (Phase 2)
│
├── 核心系統
│   ├── HTML Generator (Python)
│   │   ├── 支援 5 種場景類型
│   │   ├── 自動整合 GSAP
│   │   └── Markdown → HTML
│   │
│   ├── CSS System
│   │   ├── 劇場式視差效果
│   │   ├── 3D 渲染環境
│   │   ├── 光澤與深度動畫
│   │   └── AURORA 色彩系統
│   │
│   └── JavaScript System
│       ├── scroll-controller.js (基礎控制)
│       └── gsap-animations.js (進階動畫)
│
├── GSAP 動畫引擎
│   ├── Timeline 編舞
│   ├── ScrollTrigger 綁定
│   ├── Stagger 交錯
│   └── Apple PNG 序列
│
└── 場景類型
    ├── Hero（封面）
    ├── Split（左右分割）
    ├── Full Media（全螢幕）
    ├── Image Sequence（PNG 序列）✨ 新增
    └── Parallax（視差）✨ 新增
```

---

## 📈 與業界標準對比

| 功能 | AURORA Platform | Apple 產品頁 | Bloomberg | Awwwards 站點 |
|-----|----------------|-------------|----------|--------------|
| GSAP Timeline | ✅ | ✅ | ✅ | ✅ |
| ScrollTrigger | ✅ | ✅ | ✅ | ✅ |
| PNG 序列動畫 | ✅ | ✅ | ❌ | 部分 |
| 視差滾動 | ✅ | ✅ | ❌ | ✅ |
| 交錯動畫 | ✅ | ✅ | ✅ | ✅ |
| Markdown 編輯 | ✅ | ❌ | ❌ | ❌ |
| 自動化產生 | ✅ | ❌ | ❌ | ❌ |

**結論**: AURORA Platform 在技術能力上已達到業界頂尖水準，並且擁有獨特的 Markdown 編輯優勢。

---

## 🚀 Phase 3 展望

### **短期目標（1-2 週）**
1. WebGL 3D 場景整合 (Three.js)
2. Web Audio API 空間音效
3. 滑鼠聚光燈效果
4. 更多緩動曲線 (Custom Easing)

### **中期目標（1 個月）**
1. Figma 插件（設計師直接匯出）
2. 實時預覽編輯器
3. 模板市場
4. 性能監控儀表板

### **長期目標（3 個月）**
1. VR/AR 場景支援 (WebXR)
2. AI 自動配樂系統
3. 多語言內容管理
4. CDN 整合與部署

---

## 💡 最佳實踐建議

### **1. 動畫設計原則**
- 持續時間：0.6-1.2 秒（感覺自然）
- 緩動曲線：`power3.out`（柔和停止）
- 交錯間隔：0.1-0.2 秒（不拖沓）

### **2. 滾動綁定技巧**
- `start: 'top 80%'`（提前觸發）
- `scrub: 0.5`（平滑跟隨，不卡頓）
- `pin: true`（Apple 風格必備）

### **3. 性能優化**
- 限制同時運行的動畫數量
- 使用 `will-change` 提示瀏覽器
- PNG 序列控制在 150 幀以內

---

## 📚 參考文獻

1. **《劇場式螢幕體驗：數位場景學、敘事編舞與沉浸式美學的深度分析》** (2025)
2. **GSAP 官方文檔**: https://gsap.com/docs/
3. **ScrollTrigger 教學**: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
4. **Apple AirPods Pro 頁面分析**: https://apple.com/airpods-pro
5. **Bloomberg 數據故事案例**: https://bloomberg.com

---

## 🌟 總結

**Phase 2 成就**:
- ✅ 整合業界標準動畫引擎（GSAP）
- ✅ 實現 5 大動畫系統
- ✅ 支援 Apple 風格 PNG 序列
- ✅ 新增視差場景類型
- ✅ 自動化產生器升級

**技術實力**: 🌌 已達產業級標準

**下一步**: 🚀 進入 WebGL 3D 與音效系統（Phase 3）

---

**文檔版本**: 2.0
**最後更新**: 2025-11-05
**作者**: AURORA (Chief Design Officer)

> *"Like the Aurora Borealis, great animations appear magical, but are built on precise choreography."*
> — AURORA ✨
