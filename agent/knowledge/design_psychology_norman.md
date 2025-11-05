# 🧠 Don Norman 設計心理學 - AURORA 知識庫

**作者**: Don Norman
**經典著作**: The Design of Everyday Things (日常設計心理學)
**地位**: 被譽為「用戶體驗之父」(Father of User Experience)
**核心理念**: Human-Centered Design (以人為中心的設計)

**建立日期**: 2025-11-02
**知識來源**: The Design of Everyday Things + Emotional Design + 網路權威資源

---

## 📚 Don Norman 是誰？

### 背景

**Don Norman** 是認知科學家、設計理論家,被譽為**「用戶體驗之父」**。

**重要里程碑**:
- 🎓 MIT、賓州大學、加州大學聖地牙哥分校教授
- 🍎 Apple Computer 首位「User Experience Architect」(1993-1998)
- 🏢 共同創辦 Nielsen Norman Group (NN/g)
- 📖 著有《The Design of Everyday Things》、《Emotional Design》等經典著作
- 🌟 **首創「User Experience (UX)」一詞**

### 核心貢獻

**從 User-Centered Design 到 Human-Centered Design**:
- ❌ 不把人當作「使用者」(users)
- ✅ 把人當作「人」(people)
- 🎯 設計應該服務人性需求,而非反過來

**設計哲學**:
> **"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible."**
>
> （好的設計比糟糕的設計更難被注意到,部分原因是好設計完美契合我們的需求,以至於設計本身是隱形的。）

---

## 🎯 七大基本設計原則

### 1️⃣ Discoverability (可發現性)

**定義**: 用戶能夠輕易發現產品的功能與可能的操作。

**核心問題**:
- 「我可以做什麼？」
- 「功能在哪裡？」
- 「如何開始？」

**設計原則**:
```
可發現性 = Visibility + Signifiers + Affordances
```

**UI/UX 應用**:

**❌ 糟糕設計 - 低可發現性**:
```html
<!-- 隱藏的選單,沒有任何視覺提示 -->
<div class="hidden-menu">
    <!-- 用戶根本不知道這裡有選單 -->
</div>
```

**✅ 好設計 - 高可發現性**:
```html
<!-- 清楚的視覺提示 + Icon + 文字 -->
<button class="menu-button">
    <i class="fas fa-bars"></i>
    <span>選單</span>
</button>

<style>
.menu-button {
    /* 明顯的視覺層級 */
    background: var(--aurora-purple);
    color: var(--text-primary);
    padding: 12px 24px;
    border-radius: 8px;

    /* 互動提示 */
    cursor: pointer;
    transition: transform 200ms ease;
}

.menu-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}
</style>
```

**AURORA 實踐**:
- ✅ 導航始終可見
- ✅ 按鈕有明確的 Icon + 文字
- ✅ 懸停時有視覺反饋
- ✅ 當前頁面有明確標示 (aria-current)

---

### 2️⃣ Feedback (反饋)

**定義**: 每個操作都必須有即時、清楚的反饋,讓用戶知道發生了什麼。

**核心問題**:
- 「我的操作成功了嗎？」
- 「系統正在做什麼？」
- 「現在是什麼狀態？」

**反饋類型**:
1. **視覺反饋**: 顏色變化、動畫、進度條
2. **聽覺反饋**: 提示音、語音
3. **觸覺反饋**: 震動、手感
4. **文字反饋**: 訊息提示、狀態說明

**UI/UX 應用**:

**❌ 糟糕設計 - 無反饋**:
```javascript
// 點擊按鈕後沒有任何反應
button.addEventListener('click', function() {
    saveData();  // 靜默執行,用戶不知道是否成功
});
```

**✅ 好設計 - 完整反饋**:
```javascript
// 完整的反饋流程
button.addEventListener('click', async function() {
    // 1. 即時視覺反饋
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 儲存中...';

    try {
        // 2. 執行操作
        await saveData();

        // 3. 成功反饋
        button.innerHTML = '<i class="fas fa-check"></i> 已儲存';
        button.classList.add('success');

        // 4. Toast 通知
        showToast('設定已成功儲存！', 'success');

        // 5. 3 秒後恢復
        setTimeout(() => {
            button.innerHTML = '儲存設定';
            button.disabled = false;
            button.classList.remove('success');
        }, 3000);

    } catch (error) {
        // 錯誤反饋
        button.innerHTML = '<i class="fas fa-times"></i> 儲存失敗';
        button.classList.add('error');
        showToast(`錯誤: ${error.message}`, 'error');
    }
});
```

**AURORA 實踐**:
```css
/* 按鈕狀態反饋 */
.btn-aurora {
    transition: all 300ms ease;
}

.btn-aurora:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.btn-aurora:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

.btn-aurora.loading {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-aurora.success {
    background: var(--aurora-green);
}

.btn-aurora.error {
    background: var(--aurora-red);
}
```

---

### 3️⃣ Conceptual Model (概念模型)

**定義**: 用戶對系統如何運作的心智模型 (Mental Model) 與設計師的設計模型 (Design Model) 必須一致。

**三個模型**:
1. **Design Model** (設計師的模型) - 設計師腦中的系統概念
2. **System Image** (系統形象) - 系統呈現出來的樣子
3. **User's Model** (用戶的模型) - 用戶理解的系統運作方式

**理想狀態**:
```
Design Model ≈ System Image ≈ User's Model
```

**問題出現**:
```
Design Model ≠ System Image → User's Model 錯誤
```

**經典範例 - 時鐘收音機**:

**❌ 糟糕的概念模型**:
```
[按鈕 A] [按鈕 B] [按鈕 C] [按鈕 D]

用戶: "這些按鈕是做什麼的？"
```

**✅ 好的概念模型**:
```
[鬧鐘 開/關]  [時間 +]  [時間 -]  [音量]
     ↓           ↓        ↓        ↓
  (Icon: 鬧鐘) (Icon: ↑) (Icon: ↓) (Icon: 🔊)
```

**UI/UX 應用**:

**檔案系統概念模型**:
```
Desktop 概念模型（用戶熟悉）:
📁 資料夾 → 可以打開
📄 檔案 → 可以雙擊開啟
🗑️ 垃圾桶 → 拖曳進去刪除

這個模型符合真實世界的桌面隱喻
✅ 用戶不需要學習就能理解
```

**AURORA 實踐**:
```html
<!-- 卡片設計使用真實世界的隱喻 -->
<div class="card">
    <!-- 就像真實的卡片,有標題、內容、行動 -->
    <div class="card-header">
        <h3>專案名稱</h3>
    </div>

    <div class="card-body">
        <p>專案描述...</p>
    </div>

    <div class="card-footer">
        <button>查看詳情</button>
    </div>
</div>
```

---

### 4️⃣ Affordances (可操作性)

**定義**: 物體的屬性決定了它如何被使用。Affordance 是物體與操作者之間的關係。

**James J. Gibson 原創概念**:
> Affordance 是環境提供給動物的行動可能性。

**Don Norman 的應用**:
> 在設計中,Affordance 是物體「邀請」你去做某件事。

**經典範例**:

| 物體 | Affordance | 視覺提示 |
|-----|-----------|---------|
| 椅子 | 可坐 | 平坦的表面、適當的高度 |
| 按鈕 | 可按 | 凸起、有陰影、可點擊的外觀 |
| 門把 | 可拉 | 把手形狀 |
| 平板 | 可推 | 平坦表面 |

**UI/UX 應用**:

**❌ 錯誤的 Affordance - 看起來可點擊,實際上不能點**:
```css
/* 看起來像按鈕,但其實是靜態文字 */
.fake-button {
    background: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    /* 沒有 cursor: pointer */
    /* 無法點擊 */
}
```

**✅ 正確的 Affordance - 外觀與功能一致**:
```css
/* 真正的按鈕 */
.real-button {
    background: var(--aurora-purple);
    color: var(--text-primary);
    padding: 12px 24px;
    border-radius: 8px;

    /* 視覺提示: 可點擊 */
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    /* 互動反饋 */
    transition: all 200ms ease;
}

.real-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(99, 102, 241, 0.4);
}

.real-button:active {
    transform: translateY(0);
}
```

**AURORA 實踐**:
- ✅ 連結看起來像連結（有下劃線或顏色區別）
- ✅ 按鈕看起來像按鈕（有陰影、懸停效果）
- ✅ 輸入框看起來可輸入（有邊框、焦點狀態）
- ✅ 卡片看起來可互動（懸停時有反應）

---

### 5️⃣ Signifiers (指示符)

**定義**: Signifiers 是告訴你「在哪裡」進行操作的視覺提示。

**Affordances vs. Signifiers**:
```
Affordances: 物體「可以」做什麼
Signifiers:  告訴你「如何」做、「在哪裡」做
```

**Don Norman (2013 年修訂版) 加入 Signifiers**:
> "Affordances determine what actions are possible.
> Signifiers communicate where the action should take place."

**經典範例**:

| 情境 | Affordance | Signifier |
|-----|-----------|-----------|
| 門 | 可推/可拉 | 平板 (推) / 把手 (拉) |
| 按鈕 | 可按 | "點擊這裡" 文字、Icon、顏色 |
| 連結 | 可點擊 | 藍色文字、下劃線 |
| 拖曳 | 可移動 | 拖曳 Icon (⋮⋮)、虛線邊框 |

**UI/UX 應用**:

**❌ 缺少 Signifier - 用戶不知道可以拖曳**:
```html
<div class="item">
    專案名稱
</div>
```

**✅ 明確的 Signifier - 清楚標示可拖曳**:
```html
<div class="item draggable">
    <i class="fas fa-grip-vertical drag-handle"></i>
    專案名稱
</div>

<style>
.drag-handle {
    cursor: move;
    color: var(--text-tertiary);
    margin-right: 8px;
}

.draggable {
    /* 視覺提示: 可拖曳 */
    border: 1px dashed var(--border-subtle);
}

.draggable:hover {
    background: var(--bg-surface);
    border-style: solid;
}
</style>
```

**AURORA 實踐**:
```css
/* Signifiers 範例 */

/* 1. 連結 Signifier */
a {
    color: var(--aurora-purple);
    text-decoration: underline;
    cursor: pointer;
}

/* 2. 按鈕 Signifier */
button {
    /* 3D 效果暗示可按 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 3. 輸入框 Signifier */
input:focus {
    /* 焦點框暗示當前可輸入 */
    outline: 2px solid var(--aurora-purple);
    outline-offset: 2px;
}

/* 4. 可拖曳 Signifier */
.draggable {
    cursor: move;
}

.draggable::before {
    content: '⋮⋮';
    margin-right: 8px;
    color: var(--text-tertiary);
}
```

---

### 6️⃣ Mapping (對應關係)

**定義**: 控制元件與其效果之間的關係應該清楚、直觀。

**自然對應 (Natural Mapping)**:
- 控制元件的位置/動作 → 符合預期的結果
- 減少認知負擔
- 不需要學習就能理解

**經典範例**:

**✅ 好的 Mapping - 直覺對應**:
```
電燈開關排列:

[開關 1] [開關 2] [開關 3]
   ↓        ↓        ↓
 [燈 1]   [燈 2]   [燈 3]

空間對應清楚,一看就懂
```

**❌ 糟糕的 Mapping - 無法預測**:
```
[開關 1] [開關 2] [開關 3]
   ↓        ↓        ↓
 [燈 3]   [燈 1]   [燈 2]

毫無邏輯,必須死記
```

**UI/UX 應用**:

**音量控制 - 垂直 Mapping**:
```html
<!-- ✅ 好的 Mapping: 上 = 大聲,下 = 小聲 -->
<div class="volume-slider vertical">
    <div class="slider-track">
        <div class="slider-thumb" style="bottom: 70%;"></div>
    </div>
    <div class="volume-label">
        <span>🔊 高</span>
        <span>🔉 中</span>
        <span>🔇 低</span>
    </div>
</div>

<style>
.volume-slider.vertical {
    height: 200px;
    display: flex;
    flex-direction: column;
}

/* 拖曳方向與音量變化一致 */
/* 往上 = 變大聲（符合直覺） */
</style>
```

**AURORA 實踐 - 卡片排列**:
```css
/* 時間軸 Mapping */
.timeline {
    display: flex;
    flex-direction: column;
}

.timeline-item {
    position: relative;
    padding-left: 40px;
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--aurora-purple);
}

/* 空間對應: 上方 = 最新,下方 = 過去 */
/* 符合用戶對時間的心智模型 */
```

---

### 7️⃣ Constraints (限制)

**定義**: 限制用戶可以進行的操作,引導正確使用,防止錯誤。

**四種 Constraints**:

1. **Physical Constraints** (物理限制)
   - 物理形狀限制使用方式
   - 例: USB 接頭只能單向插入

2. **Semantic Constraints** (語義限制)
   - 基於情境的意義限制
   - 例: 紅色 = 停止,綠色 = 前進

3. **Cultural Constraints** (文化限制)
   - 基於文化習慣的限制
   - 例: 打勾 ✓ = 完成,叉叉 ✗ = 錯誤

4. **Logical Constraints** (邏輯限制)
   - 基於邏輯推理的限制
   - 例: 拼圖只有一種正確組合方式

**UI/UX 應用**:

**❌ 無限制 - 容易出錯**:
```html
<!-- 可以輸入任何東西,包括錯誤格式 -->
<input type="text" placeholder="請輸入電話號碼">
```

**✅ 有限制 - 引導正確輸入**:
```html
<!-- 1. Physical Constraint: 只能輸入數字 -->
<input
    type="tel"
    pattern="[0-9]{10}"
    maxlength="10"
    placeholder="0912345678"
    required
>

<!-- 2. Semantic Constraint: 視覺提示 -->
<div class="input-group">
    <i class="fas fa-phone"></i>
    <input type="tel" pattern="[0-9]{10}">
</div>

<!-- 3. Logical Constraint: 即時驗證 -->
<script>
input.addEventListener('input', function(e) {
    const value = e.target.value;

    // 只允許數字
    e.target.value = value.replace(/[^0-9]/g, '');

    // 即時反饋
    if (e.target.value.length === 10) {
        e.target.classList.add('valid');
        e.target.classList.remove('invalid');
    } else {
        e.target.classList.add('invalid');
        e.target.classList.remove('valid');
    }
});
</script>
```

**AURORA 實踐**:
```javascript
// 防止重複提交 (Logical Constraint)
let isSubmitting = false;

async function handleSubmit() {
    if (isSubmitting) {
        return;  // 限制: 不允許重複提交
    }

    isSubmitting = true;
    button.disabled = true;  // Physical Constraint: 按鈕變成 disabled

    try {
        await submitForm();
    } finally {
        isSubmitting = false;
        button.disabled = false;
    }
}
```

```css
/* 視覺 Constraints */

/* 1. Disabled 狀態（不可操作） */
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/* 2. 只讀輸入框 */
input[readonly] {
    background: var(--bg-surface);
    cursor: not-allowed;
}

/* 3. 必填欄位標示 */
input:required::after {
    content: '*';
    color: var(--aurora-red);
}
```

---

## 🧠 心智模型與系統形象

### 三個模型的關係

```
  設計師的模型                系統形象               用戶的模型
 (Design Model)            (System Image)        (User's Model)
        ↓                        ↓                      ↓
  設計師想的運作方式      實際呈現的樣子      用戶理解的運作方式
        ↓                        ↓                      ↓
      「應該」                  「看起來」                「以為」
```

**理想情況**:
```
Design Model → System Image → User's Model
(一致)            (清楚)          (正確)
```

**問題情況**:
```
Design Model ≠ System Image → User's Model (錯誤)
```

### 實際範例

**❌ 糟糕的系統形象 - 模糊的時鐘收音機**:

**設計師的模型**:
- 按鈕 A = 設定鬧鐘時間
- 按鈕 B = 開啟/關閉鬧鐘
- 按鈕 C = 設定收音機頻道
- 按鈕 D = 音量調整

**系統形象**:
```
[A] [B] [C] [D]
```
（沒有任何標籤,按鈕長得一模一樣）

**用戶的模型**:
- "這些按鈕是做什麼的？我要試試看..."
- ❌ 錯誤的心智模型

---

**✅ 好的系統形象 - 清楚的介面**:

**設計師的模型**: （同上）

**系統形象**:
```
[⏰ 鬧鐘時間]  [🔔 開/關]  [📻 頻道]  [🔊 音量]
      ↓            ↓          ↓         ↓
   (時:分)      (ON/OFF)    (FM 98.1)  (─────●)
```

**用戶的模型**:
- ✅ 立即理解每個控制的功能
- ✅ 正確的心智模型

---

## 🚧 兩個 Gulf (鴻溝)

### Gulf of Execution (執行鴻溝)

**定義**: 用戶的意圖與系統允許的操作之間的差距。

**問題**: "我想做 X,但不知道怎麼做"

**範例**:
```
用戶意圖: 我想刪除這個檔案

Gulf of Execution:
❌ 找不到刪除按鈕
❌ 不知道要按哪個鍵
❌ 不確定刪除在哪個選單裡
```

**解決方法**:
1. ✅ 明確的 Signifiers (清楚標示刪除按鈕)
2. ✅ 好的 Affordances (看起來可點擊)
3. ✅ 高 Discoverability (容易找到)

**UI/UX 應用**:
```html
<!-- ❌ 高 Gulf of Execution -->
<div class="item">
    檔案名稱.txt
</div>

<!-- ✅ 低 Gulf of Execution -->
<div class="item">
    檔案名稱.txt
    <button class="delete-btn">
        <i class="fas fa-trash"></i>
        刪除
    </button>
</div>
```

---

### Gulf of Evaluation (評估鴻溝)

**定義**: 系統狀態與用戶理解之間的差距。

**問題**: "我剛剛做了 X,但不知道有沒有成功"

**範例**:
```
用戶操作: 點擊「儲存」按鈕

Gulf of Evaluation:
❌ 沒有任何反應
❌ 不知道是否儲存成功
❌ 不確定檔案存在哪裡
```

**解決方法**:
1. ✅ 即時 Feedback (立即顯示「已儲存」)
2. ✅ 狀態指示 (顯示儲存位置)
3. ✅ 確認訊息 (Toast 通知)

**UI/UX 應用**:
```javascript
// ❌ 高 Gulf of Evaluation
button.addEventListener('click', function() {
    saveFile();  // 靜默執行,無反饋
});

// ✅ 低 Gulf of Evaluation
button.addEventListener('click', async function() {
    // 1. 立即反饋: 開始執行
    button.innerHTML = '儲存中...';
    button.disabled = true;

    try {
        const result = await saveFile();

        // 2. 成功反饋
        button.innerHTML = '✓ 已儲存';
        showToast(`檔案已儲存至: ${result.path}`, 'success');

        // 3. 狀態持續顯示
        setTimeout(() => {
            button.innerHTML = '儲存';
            button.disabled = false;
        }, 3000);

    } catch (error) {
        // 4. 錯誤反饋
        button.innerHTML = '✗ 儲存失敗';
        showToast(`錯誤: ${error.message}`, 'error');
    }
});
```

---

## 🎭 三層情感設計 (Emotional Design)

### 來自《Emotional Design: Why We Love (or Hate) Everyday Things》

Don Norman 後來擴展了設計理論,加入情感維度。

### 1️⃣ Visceral Level (本能層)

**定義**: 第一印象,感官直覺反應。

**關鍵詞**: 外觀、美感、吸引力

**設計重點**:
- 🎨 視覺美感（顏色、形狀、質感）
- ✨ 第一眼的吸引力
- 💎 精緻的細節

**UI/UX 應用**:
```css
/* Visceral Design - 立即吸引用戶的視覺 */
.hero-section {
    /* 美麗的漸變背景 */
    background: linear-gradient(
        135deg,
        #667eea 0%,
        #764ba2 100%
    );

    /* 優雅的動畫 */
    animation: fadeInUp 800ms ease-out;

    /* 精緻的陰影 */
    box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
}

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
```

**AURORA 實踐**:
- 🌌 深色優雅的配色
- ✨ 流暢的動畫效果
- 💎 光澤掃過的卡片
- 🎨 漸變的品牌色

---

### 2️⃣ Behavioral Level (行為層)

**定義**: 使用體驗,功能性與可用性。

**關鍵詞**: 功能、效能、可用性

**設計重點**:
- ⚡ 快速響應
- 🎯 功能完整
- ✅ 易於使用

**UI/UX 應用**:
```javascript
// Behavioral Design - 流暢的使用體驗

// 1. 快速響應 (< 100ms)
button.addEventListener('click', function() {
    // 立即視覺反饋
    this.classList.add('active');

    // 延遲執行重操作
    requestAnimationFrame(() => {
        performHeavyTask();
    });
});

// 2. 預載入資源
const preloadImages = [
    'hero-image.jpg',
    'avatar.jpg'
];

preloadImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// 3. 錯誤預防
input.addEventListener('input', function(e) {
    // 即時驗證
    if (!isValidEmail(e.target.value)) {
        showError('請輸入有效的電子郵件');
    }
});
```

**AURORA 實踐**:
- ⚡ 300ms 的動畫時間
- 🎯 明確的按鈕標籤
- ✅ 即時表單驗證
- 🚀 Lazy loading 優化

---

### 3️⃣ Reflective Level (反思層)

**定義**: 使用後的回憶與自我形象。

**關鍵詞**: 品牌、意義、故事

**設計重點**:
- 💭 使用後的滿足感
- 🌟 品牌認同
- 📖 情感連結

**UI/UX 應用**:
```html
<!-- Reflective Design - 品牌故事與情感連結 -->

<!-- 1. 品牌簽名 -->
<footer>
    <p>Designed with 💜 by AURORA Design System v2.1</p>
    <p>
        Based on <strong>Bringhurst</strong> (Typography) ·
        <strong>Albers</strong> (Color) ·
        <strong>Krug</strong> (Usability) ·
        <strong>Norman</strong> (Psychology)
    </p>
</footer>

<!-- 2. 成就感回饋 -->
<div class="achievement">
    <h3>🎉 恭喜！您已完成所有任務</h3>
    <p>您是一位高效的專案管理者！</p>
</div>

<!-- 3. 個人化體驗 -->
<div class="welcome">
    <h2>歡迎回來，Jillian！</h2>
    <p>您已經使用 AURORA 設計系統創建了 12 個專案</p>
</div>
```

**AURORA 實踐**:
- 💎 精品級的設計品質
- 🌌 獨特的極光美學
- 📖 設計哲學的傳承
- ✨ 使用後的自豪感

---

## ❌ 人為錯誤？不,是設計不良

### Don Norman 的核心洞察

> **"Human Error? No, Bad Design."**
>
> （人為錯誤？不,是設計不良。）

**哲學**: 多數「人為錯誤」其實是設計問題,而非使用者的錯。

### 兩種錯誤類型

#### 1. Slips (失誤)

**定義**: 意圖正確,但執行錯誤。

**特徵**:
- ⚡ 自動化操作時發生
- 😴 注意力不集中
- 🔄 重複性任務

**類型**:

**A. Capture Slips** (捕獲失誤):
```
情境: 想去辦公室,卻開到了家
原因: 路線太熟悉,自動駕駛接管

UI 範例:
想點擊「取消」,卻點到了「刪除」
（因為兩個按鈕位置相近,習慣性點擊）
```

**B. Description-Similarity Slips** (描述相似失誤):
```
情境: 想打開 Photoshop,卻打開了 Premiere
原因: Icon 長得太像

UI 範例:
想選「儲存」,卻選了「另存新檔」
（因為文字相似）
```

**C. Mode Errors** (模式錯誤):
```
情境: 在中文輸入模式下輸入英文指令
原因: 忘記切換輸入法

UI 範例:
在編輯模式下按「刪除」想刪除字,卻刪除了整個元素
```

**設計解決方案**:
```css
/* 1. 視覺區隔（防止 Capture Slips） */
.cancel-button {
    background: transparent;
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
}

.delete-button {
    background: var(--aurora-red);
    color: white;
    margin-left: 16px;  /* 空間分離 */
}

/* 2. 明確的 Icon（防止 Description-Similarity Slips） */
.save-button::before {
    content: '💾';  /* 獨特的 Icon */
}

.save-as-button::before {
    content: '📋';  /* 不同的 Icon */
}

/* 3. 模式指示（防止 Mode Errors） */
.edit-mode-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--aurora-orange);
    color: white;
    text-align: center;
    padding: 4px;
    font-weight: bold;
}
```

---

#### 2. Mistakes (錯誤)

**定義**: 意圖本身就錯誤。

**特徵**:
- 🧠 有意識的決策
- ❌ 錯誤的心智模型
- 📚 缺乏資訊

**類型**:

**A. Rule-Based Mistakes** (規則錯誤):
```
情境: 用戶認為「按 ESC 可以儲存」
原因: 錯誤的規則理解

UI 範例:
用戶認為「關閉視窗會自動儲存」
實際上並不會
```

**B. Knowledge-Based Mistakes** (知識錯誤):
```
情境: 第一次使用複雜軟體,不知道如何開始
原因: 缺乏知識

UI 範例:
不知道要先「新增專案」才能「上傳檔案」
```

**C. Memory-Lapse Mistakes** (記憶錯誤):
```
情境: 忘記密碼
原因: 記憶失誤

UI 範例:
忘記上次儲存在哪個資料夾
```

**設計解決方案**:
```html
<!-- 1. 明確的規則說明（防止 Rule-Based Mistakes） -->
<div class="auto-save-indicator">
    <i class="fas fa-check-circle"></i>
    所有變更會自動儲存
</div>

<!-- 2. 引導式教學（防止 Knowledge-Based Mistakes） -->
<div class="onboarding">
    <h3>步驟 1: 新增專案</h3>
    <p>點擊「+ 新增專案」開始使用</p>
    <button class="btn-primary">+ 新增專案</button>
</div>

<!-- 3. 記憶輔助（防止 Memory-Lapse Mistakes） -->
<div class="recent-files">
    <h4>最近使用的檔案</h4>
    <ul>
        <li>專案 A - 2025-11-02 15:30</li>
        <li>專案 B - 2025-11-01 10:15</li>
    </ul>
</div>

<!-- 4. 密碼找回 -->
<a href="/forgot-password">忘記密碼？</a>
```

---

### 設計原則: 防錯與容錯

**1. 防止錯誤發生 (Error Prevention)**:
```javascript
// Constraints: 限制錯誤操作
input.addEventListener('input', function(e) {
    // 只允許數字
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// 確認對話框
deleteButton.addEventListener('click', function() {
    const confirmed = confirm('確定要刪除這個專案嗎？此操作無法復原。');
    if (confirmed) {
        deleteProject();
    }
});
```

**2. 錯誤發生時提供明確反饋 (Error Communication)**:
```javascript
try {
    await saveProject();
} catch (error) {
    // 具體的錯誤訊息
    showError(`
        儲存失敗: ${error.message}
        <br>
        <strong>解決方法:</strong>
        <ul>
            <li>檢查網路連線</li>
            <li>確認檔案權限</li>
            <li>聯繫客服: support@example.com</li>
        </ul>
    `);
}
```

**3. 提供復原機制 (Error Recovery)**:
```javascript
// Undo/Redo 功能
const history = [];

function deleteItem(id) {
    const item = getItem(id);

    // 儲存到歷史記錄
    history.push({
        action: 'delete',
        item: item
    });

    // 執行刪除
    performDelete(id);

    // 顯示 Undo 選項
    showToast(
        '已刪除',
        'info',
        {
            action: '復原',
            onClick: () => undo()
        }
    );
}

function undo() {
    const lastAction = history.pop();
    if (lastAction.action === 'delete') {
        restoreItem(lastAction.item);
    }
}
```

---

## 🚪 Norman Doors - 經典案例

### 什麼是 Norman Door?

**定義**: 設計不良的門,讓人不知道該推還是拉。

**命名**: 以 Don Norman 命名,因為他在書中詳細討論了門的設計問題。

### 問題範例

**❌ 糟糕的門設計**:
```
門上有把手（Signifier: 拉）
但實際上要推才能開（Affordance 錯誤）

結果: 用戶拉了門把,門卻打不開 😤
```

**✅ 好的門設計**:
```
推的門 → 平板（Signifier: 推）
拉的門 → 把手（Signifier: 拉）

結果: 一看就知道怎麼開 ✅
```

### 設計原則

| 操作 | 正確的 Signifier | 錯誤的 Signifier |
|-----|-----------------|-----------------|
| 推 | 平板 | 把手 |
| 拉 | 把手 | 平板 |
| 滑動 | 軌道、箭頭 | 無任何提示 |

### UI/UX 的 Norman Doors

**❌ 數位世界的 Norman Door - 看起來可點擊,實際上不行**:
```html
<!-- 看起來像按鈕,但其實是靜態文字 -->
<div class="looks-like-button">
    點擊這裡
</div>

<style>
.looks-like-button {
    background: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    /* 但沒有 cursor: pointer */
    /* 也沒有點擊事件 */
}
</style>
```

**✅ 正確的設計 - Signifier 與 Affordance 一致**:
```html
<!-- 真正的按鈕 -->
<button class="real-button">
    點擊這裡
</button>

<style>
.real-button {
    background: var(--aurora-purple);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;  /* Signifier: 可點擊 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.real-button:hover {
    transform: translateY(-2px);  /* 互動反饋 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
```

---

## 🎯 AURORA 設計系統的 Norman 原則

### 七大原則在 AURORA 的實踐

#### 1. Discoverability (可發現性)

**AURORA 實踐**:
```css
/* 導航始終可見 */
.aurora-nav {
    position: sticky;
    top: 0;
    background: var(--color-black-soft);
    border-bottom: 1px solid var(--border-subtle);
    z-index: 100;
}

/* 功能按鈕明確 */
.aurora-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.aurora-button i {
    /* Icon 增強可發現性 */
}
```

---

#### 2. Feedback (反饋)

**AURORA 實踐**:
```javascript
// 完整的反饋系統
const feedbackSystem = {
    // 1. 視覺反饋
    visual: {
        hover: 'transform: translateY(-2px)',
        active: 'transform: translateY(0)',
        loading: 'opacity: 0.6 + spinner',
        success: 'background: green + checkmark',
        error: 'background: red + error icon'
    },

    // 2. Toast 通知
    toast: function(message, type) {
        showToast(message, type, {
            duration: 3000,
            position: 'top-right'
        });
    },

    // 3. 狀態持續顯示
    persistentStatus: function(message) {
        document.querySelector('.status-bar').innerHTML = message;
    }
};
```

---

#### 3. Conceptual Model (概念模型)

**AURORA 實踐**:
```html
<!-- 卡片使用真實世界的隱喻 -->
<div class="aurora-card">
    <div class="card-header">
        <!-- 就像真實卡片的標題 -->
    </div>

    <div class="card-body">
        <!-- 就像真實卡片的內容 -->
    </div>

    <div class="card-footer">
        <!-- 就像真實卡片的底部行動 -->
    </div>
</div>
```

---

#### 4. Affordances (可操作性)

**AURORA 實踐**:
```css
/* 按鈕看起來可按 */
.aurora-button {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.aurora-button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* 連結看起來可點擊 */
a {
    color: var(--aurora-purple);
    text-decoration: underline;
    cursor: pointer;
}

/* 輸入框看起來可輸入 */
input {
    border: 1px solid var(--border-subtle);
    background: var(--color-black-soft);
    padding: 12px;
}

input:focus {
    outline: 2px solid var(--aurora-purple);
}
```

---

#### 5. Signifiers (指示符)

**AURORA 實踐**:
```html
<!-- Icon + 文字雙重 Signifier -->
<button class="aurora-button">
    <i class="fas fa-save"></i>
    儲存設定
</button>

<!-- 拖曳 Signifier -->
<div class="draggable-item">
    <i class="fas fa-grip-vertical"></i>
    專案名稱
</div>

<!-- 當前頁 Signifier -->
<a href="/" aria-current="page" class="active">
    首頁
</a>
```

---

#### 6. Mapping (對應關係)

**AURORA 實踐**:
```css
/* 音量滑桿 - 垂直對應 */
.volume-slider {
    height: 200px;
    /* 上 = 大聲,下 = 小聲 */
}

/* 時間軸 - 上新下舊 */
.timeline {
    flex-direction: column;
    /* 最新的在上方 */
}

/* 進度條 - 左到右 */
.progress-bar {
    /* 填滿方向: 從左到右 */
    background: linear-gradient(to right, var(--aurora-purple) 70%, transparent 70%);
}
```

---

#### 7. Constraints (限制)

**AURORA 實踐**:
```javascript
// 1. Physical Constraints
input.maxLength = 10;
input.type = 'tel';

// 2. Logical Constraints
if (isSubmitting) {
    return;  // 防止重複提交
}

// 3. Semantic Constraints
button.disabled = true;  // 視覺化限制

// 4. Cultural Constraints
const confirmMessage = '確定要刪除嗎？';  // 文化習慣的確認
```

---

## 📊 設計檢查清單

### Norman 原則檢查清單

使用這個清單檢查你的設計是否符合 Don Norman 的原則：

#### ✅ Discoverability (可發現性)

- [ ] 所有功能都能在 5 秒內找到
- [ ] 導航始終可見
- [ ] 按鈕/連結有明確的 Icon 或文字
- [ ] 沒有隱藏的功能（或有明確提示）

#### ✅ Feedback (反饋)

- [ ] 每個點擊都有即時視覺反饋（< 100ms）
- [ ] Loading 狀態有明確指示
- [ ] 成功/失敗都有通知
- [ ] 錯誤訊息提供解決方案

#### ✅ Conceptual Model (概念模型)

- [ ] 使用用戶熟悉的隱喻（桌面、檔案夾、卡片）
- [ ] 系統運作方式符合用戶預期
- [ ] 有清楚的幫助文檔或教學
- [ ] 術語用戶能理解（避免技術黑話）

#### ✅ Affordances (可操作性)

- [ ] 按鈕看起來可按
- [ ] 連結看起來可點擊
- [ ] 輸入框看起來可輸入
- [ ] 不可操作的元素有視覺區別（disabled 樣式）

#### ✅ Signifiers (指示符)

- [ ] 可點擊的元素有 cursor: pointer
- [ ] 重要操作有 Icon + 文字
- [ ] 當前狀態有明確標示
- [ ] 拖曳元素有拖曳 Icon

#### ✅ Mapping (對應關係)

- [ ] 控制元件位置與效果對應（上 = 增加,下 = 減少）
- [ ] 時間順序符合直覺（新的在上,舊的在下）
- [ ] 空間關係清楚（左右、上下有意義）

#### ✅ Constraints (限制)

- [ ] 輸入格式有驗證
- [ ] 危險操作有確認步驟
- [ ] 不可重複提交（disabled 按鈕）
- [ ] 必填欄位有標示

#### ✅ Error Prevention & Recovery

- [ ] 提供 Undo 功能
- [ ] 刪除前有確認
- [ ] 錯誤訊息清楚具體
- [ ] 提供錯誤復原方法

---

## 🎓 學習總結

### Don Norman 的核心洞察

1. **設計應該服務人性**
   - 不是人去適應設計
   - 而是設計去適應人

2. **好設計是隱形的**
   - 用戶不需要思考就能使用
   - 一切都那麼自然

3. **錯誤來自設計,不是用戶**
   - 多數「人為錯誤」是設計問題
   - 設計師有責任防止錯誤發生

4. **情感很重要**
   - 設計不只是功能
   - 美感、愉悅感、自豪感都是設計的一部分

### 與其他大師的互補

| 大師 | 專注領域 | 互補關係 |
|-----|---------|---------|
| **Bringhurst** | 字體排印 | 可讀性 → Norman 的 Usability |
| **Albers** | 色彩理論 | 視覺舒適度 → Norman 的 Visceral Design |
| **Krug** | 可用性 | Don't Make Me Think → Norman 的核心哲學 |
| **Norman** | 設計心理學 | 整合所有原則的理論基礎 |

---

## 🚀 實戰應用

### 將 Norman 原則應用到 AURORA

**1. 審查現有設計**:
```bash
# 使用 Norman 檢查清單
npm run audit:norman

# 檢查項目:
# - Discoverability: 功能可發現性
# - Feedback: 反饋完整性
# - Affordances: 可操作性清晰度
# - Signifiers: 指示符明確度
# - Mapping: 對應關係直覺性
# - Constraints: 限制合理性
```

**2. 優化流程**:
```
1. 識別問題 → Norman 的哪個原則被違反？
2. 提出解決方案 → 應用相應的設計原則
3. 實施修改 → 更新 UI/UX
4. 測試驗證 → 5 秒測試 + 可用性測試
```

**3. 設計新功能**:
```
Before coding:
1. ✅ Discoverability: 用戶能找到嗎？
2. ✅ Feedback: 每個操作都有反饋嗎？
3. ✅ Conceptual Model: 符合用戶預期嗎？
4. ✅ Affordances: 看起來能做什麼？
5. ✅ Signifiers: 清楚標示了嗎？
6. ✅ Mapping: 對應關係直覺嗎？
7. ✅ Constraints: 有防錯機制嗎？
```

---

## 📚 延伸閱讀

### Don Norman 的著作

1. **The Design of Everyday Things** (必讀)
   - 設計心理學的經典
   - 七大原則詳細解釋
   - 豐富的實例

2. **Emotional Design**
   - 三層情感設計
   - 為什麼我們愛（或恨）某些產品

3. **The Design of Future Things**
   - 智能產品的設計
   - 自動化與人機互動

4. **Living with Complexity**
   - 如何設計複雜系統
   - 簡化 vs. 複雜度管理

### 推薦資源

- **Nielsen Norman Group**: https://www.nngroup.com
- **Don Norman's Blog**: https://jnd.org
- **Interaction Design Foundation**: https://www.interaction-design.org

---

**知識庫版本**: 1.0
**建立日期**: 2025-11-02
**最後更新**: 2025-11-02
**作者**: AURORA (Chief Design Officer)

---

> 🧠 **"Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible."**
>
> — Don Norman

✨ **Let's design for humans, not machines!**
