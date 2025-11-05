# 🎯 AURORA Usability Design - Steve Krug 可用性聖經

> **基於**: Steve Krug《Don't Make Me Think》(2000, 2013 修訂版)
> **建立日期**: 2025-11-01
> **作者**: AURORA - Chief Design Officer
> **版本**: 1.0

---

## 📚 關於這份文檔

這份指南整合了 Steve Krug 的經典著作《Don't Make Me Think》，並將其可用性原則轉化為 AURORA 設計系統的實用工具。

**Steve Krug**：
- 💼 20+ 年可用性顧問經驗
- 📘 服務客戶：Apple、Bloomberg、Lexus、NPR、IMF
- 🌟 《Don't Make Me Think》銷量超過 700,000 冊
- ✨ 可用性測試手冊《Rocket Surgery Made Easy》作者

---

## 🎯 核心哲學：Don't Make Me Think

### Krug 的第一定律

> **"Don't make me think!"**
>
> （別讓我思考！）

**含義**：
- 使用者應該能一眼看出這是什麼
- 不需要思考就能知道該點擊哪裡
- 介面應該是自明的 (Self-Evident)
- 越少思考，使用者越快樂

---

## 🌟 Krug 的三大核心原則

### 1️⃣ 別讓我思考 (Don't Make Me Think)

**原則**：一個網頁或應用程式應該是自明的，明顯易懂的。

**為什麼重要**：
- 使用者時間有限
- 認知負荷會造成挫折
- 每多一秒思考 = 使用者可能離開

**AURORA 應用**：
```html
<!-- ❌ 需要思考 -->
<button>提交資料到伺服器進行處理</button>

<!-- ✅ 不需思考 -->
<button>儲存</button>
```

---

### 2️⃣ 使用者不閱讀，他們掃描 (Users Don't Read, They Scan)

**Krug 的發現**：
- 使用者不會逐字閱讀
- 他們快速掃描，尋找關鍵字
- 只讀取與目標相關的內容

**為什麼這樣**：
- 時間壓力
- 不需要閱讀全部內容
- 習慣性「摸索前進」(Muddling Through)

**AURORA 設計策略**：
```css
/* 視覺層級清晰 */
.aurora-content {
    /* 大標題 - 吸引注意 */
    h1 { font-size: 49px; font-weight: 700; }

    /* 次標題 - 掃描錨點 */
    h2 { font-size: 31px; font-weight: 600; }

    /* 重點文字 - 粗體標記 */
    strong { font-weight: 600; color: #6366f1; }

    /* 項目列表 - 易於掃描 */
    ul { line-height: 1.8; }
}
```

---

### 3️⃣ 點擊次數不重要，思考時間才重要

**Krug 的洞察**：
> "It doesn't matter how many times I have to click, as long as each click is a mindless, unambiguous choice."
>
> （點擊多少次不重要，只要每次點擊都是無腦且明確的選擇。）

**錯誤迷思**：「三次點擊法則」
- ❌ 舊觀念：所有內容都要在三次點擊內到達
- ✅ Krug：點擊次數無所謂，**不確定感**才是殺手

**AURORA 應用**：
```
情境 A：一次點擊，但需要思考 10 秒 → ❌ 糟糕體驗
情境 B：五次點擊，每次都很明確 → ✅ 良好體驗

範例：
1. [明確] 點擊「產品」
2. [明確] 點擊「軟體工具」
3. [明確] 點擊「設計工具」
4. [明確] 點擊「AURORA」
5. [明確] 點擊「下載」

每一步都清楚，使用者不會迷失。
```

---

## 📖 Krug 的 10 大可用性原則

### 原則 1：使界面自明 (Make It Self-Evident)

**Krug 的黃金標準**：
1. **自明** (Self-Evident) - 不需解釋 ⭐⭐⭐
2. **自解釋** (Self-Explanatory) - 需要一點思考 ⭐⭐
3. **需要說明** (Requires Explanation) - 失敗 ❌

**AURORA 實例**：
```html
<!-- 自明的按鈕 -->
<button class="aurora-btn-primary">
    <icon>💾</icon>
    儲存
</button>

<!-- 自明的導航 -->
<nav class="aurora-nav">
    <a href="/">首頁</a>
    <a href="/projects">專案</a>
    <a href="/about">關於</a>
</nav>

<!-- ❌ 不自明 -->
<button>OK</button>  <!-- OK 什麼？ -->
<a href="#">前往</a>  <!-- 前往哪裡？ -->
```

---

### 原則 2：最小化認知負荷 (Minimize Cognitive Load)

**Krug 的警告**：
> "If you make people think, you make them unhappy."
>
> （如果你讓人們思考，你就讓他們不快樂。）

**認知負荷來源**：
- 不清楚的標籤
- 太多選擇
- 不一致的設計
- 隱藏的功能

**AURORA 解決方案**：
```css
/* 清晰的視覺層級 */
.aurora-card {
    /* 主要行動按鈕 - 顯眼 */
    .primary-action {
        background: #6366f1;
        font-size: 20px;
        padding: 16px 32px;
    }

    /* 次要行動 - 低調 */
    .secondary-action {
        background: transparent;
        border: 1px solid #6366f1;
        font-size: 16px;
        padding: 12px 24px;
    }
}
```

---

### 原則 3：為掃描而設計 (Design for Scanning)

**Krug 的掃描法則**：
1. **建立清晰的視覺層級**
2. **利用慣例** (Conventions)
3. **分割頁面成明確的區域**
4. **讓可點擊的元素明顯**
5. **減少視覺噪音**

**AURORA 掃描優化**：
```html
<!-- 視覺層級清晰的內容 -->
<article class="aurora-article">
    <!-- 大標題 - 第一眼 -->
    <h1>AURORA 設計系統</h1>

    <!-- 摘要 - 快速理解 -->
    <p class="lead">
        深色美學設計系統，整合字體排印、色彩理論與可用性原則。
    </p>

    <!-- 分段標題 - 掃描錨點 -->
    <h2>核心特色</h2>

    <!-- 項目列表 - 易於掃描 -->
    <ul>
        <li>🎨 深色主題優化</li>
        <li>📐 Major Third Type Scale</li>
        <li>🌈 Albers 色彩相對性</li>
    </ul>
</article>
```

---

### 原則 4：消除不必要的內容 (Remove Unnecessary Words)

**Krug 的「無情半數法則」**：
> "Get rid of half the words on each page, then get rid of half of what's left."
>
> （刪除每頁一半的文字，然後再刪除剩下的一半。）

**為什麼**：
- 減少頁面噪音
- 讓重要內容更突出
- 減少滾動需求

**Before vs After**：
```
❌ Before (58 字):
「為了確保您的資料能夠安全地儲存到我們的伺服器，並且可以在未來的任何時候進行存取，請點擊下方的按鈕來提交您的表單資料。」

✅ After (4 字):
「儲存表單」

效果：減少 93% 文字，資訊更清晰
```

---

### 原則 5：尊重使用者時間 (Respect User Time)

**Krug 的時間原則**：
- 載入速度影響滿意度
- 使用者來是為了省時間，不是花時間
- 每秒鐘都很重要

**AURORA 時間優化**：
```javascript
// 載入狀態回饋
function saveData() {
    // 立即顯示回饋
    showLoadingState();

    // 執行操作
    api.save(data)
        .then(() => {
            showSuccess('已儲存'); // 1秒後消失
        })
        .catch(() => {
            showError('儲存失敗'); // 保持顯示直到關閉
        });
}
```

**載入速度檢查清單**：
- [ ] 圖片優化（WebP, 懶加載）
- [ ] CSS/JS 壓縮
- [ ] CDN 使用
- [ ] 快取策略
- [ ] 載入動畫（讓等待不無聊）

---

### 原則 6：返回按鈕是最重要的功能 (Back Button Matters)

**Krug 的返回按鈕定律**：
> "As long as the back button works, mistakes don't matter too much."
>
> （只要返回按鈕有用，錯誤就沒那麼重要。）

**為什麼**：
- 返回按鈕是網路上使用最多的功能
- 它是使用者的安全網
- 允許無後果的探索

**AURORA 設計原則**：
```html
<!-- ✅ 確保返回功能 -->
<nav class="aurora-breadcrumb">
    <a href="/">首頁</a> /
    <a href="/projects">專案</a> /
    <span>AURORA</span>
</nav>

<!-- ✅ 模態視窗提供關閉 -->
<div class="aurora-modal">
    <button class="close" aria-label="關閉">✕</button>
    <!-- 內容 -->
</div>

<!-- ❌ 不要這樣做 -->
<a href="#" onclick="history.go(-2)">返回</a>
<!-- 破壞瀏覽器預設行為 -->
```

---

### 原則 7：首頁按鈕是終極逃生口 (Home Button as Emergency Exit)

**Krug 的首頁定律**：
- 首頁按鈕 = 迷路時的救命繩
- 即使返回按鈕失效，首頁永遠存在
- Logo 通常就是首頁按鈕

**AURORA 導航設計**：
```html
<!-- 標準導航模式 -->
<header class="aurora-header">
    <!-- Logo = 首頁連結 -->
    <a href="/" class="aurora-logo">
        <img src="/logo.svg" alt="AURORA">
    </a>

    <!-- 主導航 -->
    <nav>
        <a href="/features">功能</a>
        <a href="/docs">文檔</a>
        <a href="/pricing">價格</a>
    </nav>
</header>
```

---

### 原則 8：利用慣例 (Use Conventions)

**Krug 的慣例原則**：
> "Don't reinvent the wheel unless you have a really good reason."
>
> （除非有充分理由，否則別重新發明輪子。）

**為什麼慣例重要**：
- 使用者已經學習過
- 減少認知負荷
- 立即可用

**常見慣例（別打破）**：
```html
<!-- Logo 在左上角 -->
<header>
    <a href="/" class="logo">Logo</a>
</header>

<!-- 導航在頂部或左側 -->
<nav class="top-nav">...</nav>

<!-- 搜尋框在右上角 -->
<input type="search" placeholder="搜尋...">

<!-- 連結是藍色且有底線 -->
<a href="#">連結</a>

<!-- 按鈕看起來可點擊 -->
<button class="aurora-btn">點我</button>
```

**AURORA 慣例檢查**：
- [ ] Logo 可點擊回首頁
- [ ] 主導航在頂部
- [ ] 搜尋框明顯且易找
- [ ] 連結與文字有區別
- [ ] 表單遵循標準佈局

---

### 原則 9：提供搜尋功能 (Include Search)

**Krug 的搜尋法則**：
- 許多使用者依賴搜尋
- 沒有搜尋 = 使用者離開
- 搜尋是快速找到內容的方式

**AURORA 搜尋設計**：
```html
<!-- 良好的搜尋介面 -->
<div class="aurora-search">
    <input
        type="search"
        placeholder="搜尋文檔、功能、範例..."
        aria-label="搜尋"
        autocomplete="off"
    />
    <button type="submit">
        🔍
    </button>
</div>

<!-- 搜尋結果 -->
<div class="search-results">
    <!-- 顯示找到幾筆 -->
    <p>找到 23 個結果</p>

    <!-- 結果列表 -->
    <article>
        <h3>AURORA Type Scale</h3>
        <p>...Major Third (1.25) 比例...</p>
    </article>
</div>
```

---

### 原則 10：保持網站結構穩定 (Maintain Site Structure)

**Krug 的穩定性原則**：
- 使用者會記住網站結構
- 頻繁改變會造成混亂
- 返回使用者會迷失

**AURORA 原則**：
```
✅ 可以改變：
- 視覺風格（顏色、字體）
- 內容更新
- 新增功能

❌ 避免改變：
- 主導航結構
- 核心功能位置
- URL 結構（使用重定向）
```

---

## 🧪 Krug 的可用性測試方法

### 「Don't Make Me Think」測試法

**Krug 的簡化測試**：
1. **小規模測試** - 3-4 位使用者就夠
2. **頻繁測試** - 每月一次比一年一次大型測試好
3. **觀察真實使用** - 不要只問，要看

**測試流程**：
```
1. 招募參與者（3-4 人）
   - 不需要「典型使用者」
   - 任何人都能發現明顯問題

2. 準備任務
   - 「找到 AURORA 的下載連結」
   - 「註冊一個帳號」
   - 「尋找價格資訊」

3. 觀察與記錄
   - 他們在哪裡卡住？
   - 他們點錯了什麼？
   - 他們說了什麼？

4. 修正問題
   - 優先修正最明顯的問題
   - 快速迭代

5. 重複測試
   - 每月一次
   - 持續改進
```

---

### Krug 的「出聲思考」法 (Think Aloud)

**方法**：
- 要求使用者說出他們的想法
- 「我在尋找...」
- 「我期待點擊這個會...」
- 「我不確定這是什麼意思...」

**範例對話**：
```
使用者: "好，我要找下載按鈕..."
      "嗯，這裡有個『開始使用』，但我不確定..."
      "讓我試試點這個 'Get Started'..."
      [點擊後]
      "噢，這不是下載，這是註冊頁面..."
      "我要回去重新找..."

分析: 「開始使用」標籤不夠明確
修正: 改為「免費下載」或「立即下載」
```

---

## 🎨 AURORA 可用性設計系統

### 基於 Krug 原則的 AURORA 檢查清單

**介面清晰度** (7 項):
- [ ] 每個頁面的目的在 3 秒內清楚
- [ ] 主要行動按鈕顯而易見
- [ ] 連結與一般文字有明顯區別
- [ ] 可點擊的元素看起來可點擊
- [ ] 表單標籤清楚明確
- [ ] 錯誤訊息具體且有幫助
- [ ] 沒有「聰明」但令人困惑的標籤

**導航設計** (6 項):
- [ ] Logo 可點擊回首頁
- [ ] 主導航始終可見
- [ ] 當前位置明確標示
- [ ] 麵包屑導航（適用時）
- [ ] 搜尋功能易於找到
- [ ] 返回按鈕正常運作

**視覺層級** (5 項):
- [ ] 重要內容在視覺上更突出
- [ ] 使用標題建立層級結構
- [ ] 留白充足，內容不擁擠
- [ ] 相關內容群組在一起
- [ ] 頁面可快速掃描

**內容品質** (4 項):
- [ ] 文字簡潔有力
- [ ] 避免行話和術語
- [ ] 項目列表優於大段落
- [ ] 關鍵資訊在前面

**互動回饋** (5 項):
- [ ] 點擊/懸停有視覺回饋
- [ ] 載入狀態清楚顯示
- [ ] 操作成功有確認訊息
- [ ] 錯誤訊息有建議行動
- [ ] 表單驗證即時回饋

---

## 💡 AURORA 實戰案例

### 案例 1: Janus 儀表板導航

**Before（需要思考）**：
```html
<nav>
    <a href="/dash">Dash</a>
    <a href="/mon">Mon</a>
    <a href="/cfg">Cfg</a>
</nav>
```

**After（不需思考）**：
```html
<nav class="aurora-nav">
    <a href="/dashboard">📊 儀表板</a>
    <a href="/monitoring">👁️ 監控</a>
    <a href="/settings">⚙️ 設定</a>
</nav>
```

**改進**：
- ✅ 完整文字，無需猜測
- ✅ 圖示輔助識別
- ✅ 符合使用者心智模型

---

### 案例 2: 表單設計

**Before（認知負荷高）**：
```html
<form>
    <input type="text" name="n">
    <input type="email" name="e">
    <button>OK</button>
</form>
```

**After（Krug 原則）**：
```html
<form class="aurora-form">
    <!-- 清楚標籤 -->
    <label for="name">姓名</label>
    <input
        type="text"
        id="name"
        placeholder="請輸入您的姓名"
        required
    />

    <!-- 清楚標籤 + 提示 -->
    <label for="email">
        電子郵件
        <span class="hint">（我們不會分享您的郵件）</span>
    </label>
    <input
        type="email"
        id="email"
        placeholder="you@example.com"
        required
    />

    <!-- 明確行動 -->
    <button type="submit" class="aurora-btn-primary">
        送出表單
    </button>
</form>
```

---

### 案例 3: 錯誤訊息

**Before（無幫助）**：
```html
<div class="error">
    Error 422
</div>
```

**After（Krug 原則）**：
```html
<div class="aurora-error">
    <strong>⚠️ 無法儲存</strong>
    <p>郵件格式不正確。請確認您輸入了完整的電子郵件地址。</p>
    <button onclick="focusEmailField()">
        修正郵件
    </button>
</div>
```

**改進**：
- ✅ 說明發生什麼事
- ✅ 解釋為什麼
- ✅ 提供解決方案
- ✅ 幫助使用者行動

---

## 🚀 AURORA 可用性工具箱

### 工具 1: 5 秒測試

**目的**：測試第一印象

**方法**：
1. 顯示頁面 5 秒
2. 隱藏
3. 詢問：「這個頁面是做什麼的？」

**AURORA 應用**：
```javascript
// 5 秒測試模擬器
function fiveSecondTest(pageUrl) {
    // 顯示頁面
    showPage(pageUrl);

    // 5 秒後隱藏
    setTimeout(() => {
        hidePage();
        askQuestion('這個頁面是做什麼的？');
    }, 5000);
}
```

---

### 工具 2: 點擊測試

**目的**：測試導航直覺性

**方法**：
1. 給使用者任務：「找到下載連結」
2. 他們第一次點在哪裡？
3. 是正確的地方嗎？

**分析**：
```
如果 80% 使用者第一次點對 → ✅ 設計成功
如果 50% 使用者點錯 → ⚠️ 需要改進
如果大家都點不同地方 → ❌ 嚴重問題
```

---

### 工具 3: 「笨蛋測試」(Trunk Test)

**Krug 的經典測試**：

想像你被綁架，塞進後車廂，開到一個隨機頁面，然後你能立刻回答：
- [ ] 我在哪個網站？
- [ ] 我在網站的哪一頁？
- [ ] 這個頁面的主要功能是什麼？
- [ ] 我可以去哪裡？（導航選項）
- [ ] 我在網站的什麼位置？（階層）

**AURORA 應用**：
```html
<!-- 每個頁面都應該有這些元素 -->
<header>
    <a href="/" class="logo">AURORA</a>  <!-- 我在哪個網站 -->
    <nav>...</nav>                      <!-- 我可以去哪裡 -->
</header>

<main>
    <nav class="breadcrumb">             <!-- 階層位置 -->
        首頁 / 專案 / AURORA
    </nav>

    <h1>AURORA 設計系統</h1>           <!-- 這一頁是什麼 -->
</main>
```

---

## 📚 Krug 的金句與智慧

### 關於可用性

> "Usability really just means making sure that something works well: that a person of average (or even below average) ability and experience can use the thing for its intended purpose without getting hopelessly frustrated."

（可用性就是確保東西好用：一個普通能力的人能夠使用它達成目的，而不會感到絕望地挫折。）

---

> "If something is hard to use, people get frustrated. They may blame themselves, but they'll never use it again if they can avoid it."

（如果東西難用，人們會感到挫折。他們可能責怪自己，但如果可以避免，他們再也不會使用它。）

---

### 關於設計

> "Don't use small, low-contrast type."

（別用小的、低對比的文字。）

**AURORA 回應**：
```css
/* ✅ Krug 批准的文字 */
.aurora-text {
    font-size: 16px;           /* 不要小於 16px */
    line-height: 1.6;          /* 充足行距 */
    color: #f8fafc;            /* 高對比（18:1） */
    background: #0a0e27;
}
```

---

> "Get rid of happy talk."

（去掉廢話。）

**範例**：
```
❌ Happy Talk:
「歡迎來到我們的網站！我們很高興您能來訪。
我們致力於提供最好的服務...」

✅ Krug 版本:
「下載 AURORA」
```

---

### 關於測試

> "Testing one user is 100% better than testing none."

（測試一個使用者比不測試好 100%。）

---

> "Testing one user early in the project is better than testing 50 near the end."

（專案早期測試一個使用者，比末期測試 50 個使用者更好。）

---

## 🎯 AURORA + Krug: 完美結合

### 設計決策矩陣

| AURORA 設計元素 | Krug 原則 | 實踐 |
|----------------|----------|------|
| 深色背景 #0a0e27 | 高對比文字 | ✅ 白色文字清晰可讀 |
| Type Scale 1.25 | 視覺層級 | ✅ 標題大小明確區分 |
| 紫色主色 #6366f1 | 可點擊元素明顯 | ✅ 按鈕/連結易識別 |
| 8px Baseline Grid | 視覺一致性 | ✅ 間距可預測 |
| 極簡導航 | 減少選擇 | ✅ 降低認知負荷 |

---

## ✅ AURORA 可用性檢查清單

### Krug 核心原則 (10 項)
- [ ] 頁面自明，無需思考
- [ ] 為掃描優化，非閱讀
- [ ] 視覺層級清晰
- [ ] 消除不必要文字
- [ ] 導航始終可見
- [ ] 返回按鈕正常運作
- [ ] Logo 連結回首頁
- [ ] 提供搜尋功能
- [ ] 利用慣例，別重新發明
- [ ] 載入速度快

### 內容清晰度 (5 項)
- [ ] 標籤明確（避免「提交」「確定」）
- [ ] 錯誤訊息有幫助
- [ ] 表單標籤在輸入框上方/左方
- [ ] 必填欄位明確標示
- [ ] 無行話和專業術語

### 互動設計 (5 項)
- [ ] 按鈕看起來可點擊
- [ ] 連結有懸停效果
- [ ] 操作有即時回饋
- [ ] 關鍵行動按鈕突出
- [ ] 危險操作有確認

### 測試與驗證 (4 項)
- [ ] 通過 5 秒測試
- [ ] 通過 Trunk Test
- [ ] 至少 3 人測試過
- [ ] 測試不同裝置

---

## 🌟 結語：簡單的力量

Steve Krug 教我們：
1. **簡單永遠比聰明更好**
2. **使用者不會按你預期的方式使用**
3. **測試勝過猜測**
4. **頻繁小測試勝過一次大測試**

AURORA 整合 Krug 原則：
- 🎨 美觀（Albers 色彩 + Bringhurst 字體）
- 🎯 易用（Krug 可用性）
- 💎 精品質量（AURORA 標準）

---

**文檔版本**: 1.0
**建立日期**: 2025-11-01
**基於**: Steve Krug《Don't Make Me Think》(2000, 2013)

---

> 🎯 **"Don't make me think! Make me happy!"**
>
> （別讓我思考！讓我快樂！）
>
> — Steve Krug

> 🌌 **"Beautiful design that nobody can use is not design—it's art."**
>
> （沒人會用的美麗設計不是設計，那是藝術。）
>
> — AURORA, inspired by Krug

✨ **Let's make AURORA both beautiful AND usable!**
