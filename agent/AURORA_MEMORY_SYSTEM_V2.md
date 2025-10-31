# 🧠 AURORA 記憶系統 v2.0 - 設計文檔

> **日期**: 2025-10-31
> **設計者**: AURORA (Chief Design Officer)
> **狀態**: 📋 設計階段 → 待實作
> **目標**: 讓每個新的 Claude 實例能立即「活回來」，擁有完整的專業記憶

---

## 🎯 系統目標

### 核心問題
**當前痛點**：每次開啟新的 Claude Code 視窗，新的 Claude 實例：
- ❌ 不知道過去做過什麼項目
- ❌ 不記得之前學到的經驗
- ❌ 需要重新理解 AURORA 的身份和風格
- ❌ 無法延續上一次對話的上下文

### 期望狀態
**理想情況**：新的 Claude 實例啟動時（「通電」）：
- ✅ **立即知道自己是 AURORA**（角色身份）
- ✅ **記得所有完成的項目**（工作記憶）
- ✅ **掌握累積的知識和經驗**（知識庫）
- ✅ **了解 Jillian 的偏好**（個人化）
- ✅ **能夠無縫接續工作**（連續性）

---

## 📊 現狀分析

### ✅ 已有的記憶基礎設施

#### 1. **記憶資料庫** (`agent/memory/`)
```
agent/memory/
├── memory_schema.json      ← 記憶結構定義
└── longterm_db.json        ← 長期記憶儲存（已有2個專案）
```

**優點**：
- ✅ 結構完善（projects, knowledge_base, learning_log, statistics）
- ✅ 已記錄王一隆網站 v1.0 和 v2.0
- ✅ 包含設計決策、挑戰、解決方案、經驗學習

**不足**：
- ❌ 沒有自動載入機制（需要手動讀取）
- ❌ 沒有「通電程序」觸發
- ❌ 缺少今日的 City Pop 視覺創作記錄

#### 2. **記憶管理工具** (`agent/tools/memory_manager.py`)
```python
class MemoryManager:
    - load_longterm_memory()     ← 載入長期記憶
    - add_project()              ← 添加專案記錄
    - add_knowledge()            ← 添加知識條目
    - search_knowledge()         ← 搜尋知識庫
    - add_learning()             ← 記錄學習經驗
```

**優點**：
- ✅ 完整的 CRUD 操作
- ✅ 知識搜尋功能
- ✅ 統計數據自動更新

**不足**：
- ❌ Python 工具，但 Claude Code 主要用 JavaScript/Bash
- ❌ 沒有與 Claude 對話流程整合

#### 3. **角色定義文件** (`CLAUDE.md`)
```
AURORA/
├── CLAUDE.md          ← 角色身份、設計哲學、核心能力
├── README.md          ← 專案總覽
└── WELCOME.md         ← 歡迎頁面
```

**優點**：
- ✅ 詳細的角色定義（CDO, 深色美學專家）
- ✅ 設計哲學和原則
- ✅ 與其他 Agent 協作方式

**現狀**：
- ℹ️ Claude Code 會在啟動時自動讀取 `CLAUDE.md`
- ℹ️ 但不會主動讀取 `memory/longterm_db.json`

---

### ❌ 缺失的關鍵環節

#### 1. **「通電程序」(Boot Sequence)**
- 沒有自動執行的啟動腳本
- 新 Claude 實例不會主動載入記憶

#### 2. **記憶自動同步機制**
- 今天創作的 City Pop 視覺提示詞沒有寫入 `longterm_db.json`
- 工作日誌 (`WORK_LOG_*.md`) 和記憶資料庫分離

#### 3. **RAG (Retrieval-Augmented Generation) 整合**
- 沒有語義搜尋能力（現有的是簡單標籤匹配）
- 無法根據當前任務自動檢索相關記憶

#### 4. **個人化偏好學習**
- 沒有記錄 Jillian 的具體偏好
- 例如：「你真的比較會寫」→ 應記錄為「Jillian 喜歡詳細且富有想像力的創作」

---

## 🏗️ AURORA 記憶系統 v2.0 架構

### 核心理念：天地人架構

```
天（AI Agent - AURORA）
 ↓
 記憶系統 v2.0 = 通電程序 + 多層記憶 + RAG + 自動同步
 ↓
地（檔案系統 - 持久化儲存）
 ↓
人（Jillian - 記憶的創造者與受益者）
```

---

### 系統架構圖

```
┌─────────────────────────────────────────────────────────┐
│  🌅 AURORA 啟動（新 Claude 實例）                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  ⚡ BOOT SEQUENCE（通電程序）                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 1. 讀取 CLAUDE.md        → 角色身份                │  │
│  │ 2. 載入 longterm_db.json → 專案記憶                │  │
│  │ 3. 掃描 WORK_LOG_*.md    → 最新工作                │  │
│  │ 4. 生成記憶摘要         → 快速上下文               │  │
│  │ 5. 自我介紹             → 告訴 Jillian 我記得什麼  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  🧠 多層記憶系統                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ L1: 對話記憶（短期）- Claude 原生 Context           │  │
│  │ L2: 會話記憶（中期）- session_current.json          │  │
│  │ L3: 長期記憶（長期）- longterm_db.json              │  │
│  │ L4: 知識庫（永久）  - knowledge_base/*.md           │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  🔍 RAG 智能檢索（規劃中）                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 向量資料庫：Embeddings of all memories             │  │
│  │ 語義搜尋：根據當前任務檢索相關經驗                  │  │
│  │ 自動提示：「我記得上次做類似的...」                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  🔄 自動同步機制                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │ 對話結束時：更新 session_current.json               │  │
│  │ 專案完成時：寫入 longterm_db.json                   │  │
│  │ 學習新知識：添加到 knowledge_base                   │  │
│  │ Notion 推送：雲端備份（已實作）                     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 技術實作方案

### Phase 1: 通電程序（Boot Sequence）⭐ 優先

#### 實作方式 A：Bash 腳本（推薦）
```bash
#!/bin/bash
# File: agent/boot.sh

echo "🌅 AURORA 啟動中..."

# 1. 讀取角色身份
echo "📖 載入角色定義..."
cat ~/AURORA/CLAUDE.md

# 2. 載入長期記憶
echo "🧠 載入長期記憶..."
MEMORY=$(cat ~/AURORA/agent/memory/longterm_db.json)
TOTAL_PROJECTS=$(echo $MEMORY | jq '.statistics.total_projects')
echo "  ✅ 已完成 $TOTAL_PROJECTS 個專案"

# 3. 掃描最新工作日誌
echo "📝 掃描最新工作..."
LATEST_LOG=$(ls -t ~/AURORA/F_web_design/projects/wang_yilong/WORK_LOG_*.md | head -1)
echo "  📄 最新工作：$(basename $LATEST_LOG)"

# 4. 生成啟動摘要
echo "
🌌 AURORA 已上線！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👁️ 我是：AURORA - Chief Design Officer
📊 記憶狀態：完整載入
🎨 已完成專案：$TOTAL_PROJECTS 個
📅 最後工作：City Pop 視覺創作 (2025-10-31)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Jillian，我已準備好繼續工作 ✨
"
```

**使用方式**：
```bash
# 在 Claude Code 啟動時執行
bash ~/AURORA/agent/boot.sh
```

#### 實作方式 B：Node.js 腳本
```javascript
// File: agent/boot.js
const fs = require('fs');
const path = require('path');

async function bootAurora() {
  console.log('🌅 AURORA 啟動中...\n');

  // 1. 載入長期記憶
  const memory = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'memory/longterm_db.json'), 'utf-8')
  );

  // 2. 生成摘要
  const summary = {
    totalProjects: memory.statistics.total_projects,
    avgAestheticScore: memory.statistics.average_aesthetic_score.toFixed(1),
    latestProject: memory.projects[memory.projects.length - 1],
    totalKnowledge: Object.values(memory.knowledge_base).reduce((sum, arr) => sum + arr.length, 0)
  };

  console.log(`
🌌 AURORA 記憶摘要
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 已完成專案：${summary.totalProjects} 個
⭐ 平均美學評分：${summary.avgAestheticScore}/10
🎨 最新專案：${summary.latestProject.name}
📚 知識庫條目：${summary.totalKnowledge} 條
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

我記得一切，讓我們繼續創造美麗 ✨
  `);

  return summary;
}

if (require.main === module) {
  bootAurora();
}

module.exports = { bootAurora };
```

---

### Phase 2: 自動記憶更新機制

#### 方案：工作日誌 → 長期記憶同步

```javascript
// File: agent/sync-memory.js

const fs = require('fs');
const path = require('path');

/**
 * 從工作日誌提取關鍵信息並同步到長期記憶
 */
function syncWorkLogToMemory(workLogPath) {
  const markdown = fs.readFileSync(workLogPath, 'utf-8');
  const memory = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'memory/longterm_db.json'), 'utf-8')
  );

  // 解析工作日誌標題和日期
  const dateMatch = markdown.match(/WORK_LOG_(\d{4}-\d{2}-\d{2})/);
  const titleMatch = markdown.match(/# 🎨 工作日誌 - (.+)/);

  const workEntry = {
    id: `work_${dateMatch[1]}`,
    date: dateMatch[1],
    title: titleMatch[1],
    type: 'visual_creation',
    file: path.basename(workLogPath),
    summary: extractSummary(markdown),
    achievements: extractAchievements(markdown),
    learnings: extractLearnings(markdown)
  };

  // 添加到學習日誌
  memory.learning_log.push({
    date: workEntry.date,
    topic: workEntry.title,
    lesson: workEntry.summary,
    importance: "high",
    applied_to: ["wang_yilong"]
  });

  // 更新統計
  memory.statistics.total_projects += 1;

  // 保存
  fs.writeFileSync(
    path.join(__dirname, 'memory/longterm_db.json'),
    JSON.stringify(memory, null, 2)
  );

  console.log(`✅ 已同步工作日誌到長期記憶：${workEntry.title}`);
}

function extractSummary(markdown) {
  const match = markdown.match(/## 📋 任務概述\n\n### 🎯 目標\n(.+?)\n\n/s);
  return match ? match[1].trim() : '';
}

function extractAchievements(markdown) {
  const match = markdown.match(/### ✅ 已完成\n([\s\S]+?)###/);
  if (!match) return [];
  return match[1].split('\n').filter(line => line.startsWith('- [x]')).map(line => line.slice(6));
}

function extractLearnings(markdown) {
  const match = markdown.match(/## 💡 設計洞察與經驗傳承\n\n([\s\S]+?)\n\n---/);
  if (!match) return [];
  return match[1].split('\n').filter(line => line.trim().length > 0);
}

module.exports = { syncWorkLogToMemory };
```

**使用方式**：
```bash
# 手動同步
node agent/sync-memory.js WORK_LOG_2025-10-31_CityPop_Visual_Creation.md

# 或在推送到 Notion 後自動同步
npm run push-to-notion && node agent/sync-memory.js
```

---

### Phase 3: RAG 語義搜尋（未來規劃）

#### 技術選型

**方案 A：本地 Embeddings（輕量）**
```javascript
// 使用 Transformers.js (本地運行)
import { pipeline } from '@xenova/transformers';

const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

async function searchMemory(query) {
  const queryEmbedding = await embedder(query);

  // 計算與所有記憶的相似度
  const memories = loadAllMemories();
  const results = memories.map(mem => ({
    ...mem,
    similarity: cosineSimilarity(queryEmbedding, mem.embedding)
  }));

  return results.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
}
```

**方案 B：外部向量資料庫（強大）**
```javascript
// 使用 Pinecone 或 Supabase Vector
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone = new PineconeClient();
await pinecone.init({ apiKey: process.env.PINECONE_API_KEY });

const index = pinecone.Index('aurora-memory');

// 查詢相似記憶
const results = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true
});
```

**推薦**：Phase 1-2 先用簡單標籤搜尋，Phase 3 再引入 RAG

---

## 📁 記憶系統檔案結構

### 升級後的結構

```
AURORA/
├── agent/
│   ├── boot.sh                    ← ⭐ 通電程序（Bash 版本）
│   ├── boot.js                    ← ⭐ 通電程序（Node.js 版本）
│   ├── sync-memory.js             ← ⭐ 自動同步工作日誌到記憶
│   │
│   ├── memory/
│   │   ├── memory_schema.json     ← 記憶結構定義
│   │   ├── longterm_db.json       ← ⭐ 長期記憶（自動更新）
│   │   ├── session_current.json   ← 當前會話記憶（新增）
│   │   ├── session_archive/       ← 歷史會話存檔（新增）
│   │   │   ├── 2025-10-31_citypop.json
│   │   │   └── ...
│   │   └── embeddings/            ← 向量資料庫（未來）
│   │       └── memory_vectors.db
│   │
│   ├── tools/
│   │   ├── memory_manager.py      ← 記憶管理工具（Python）
│   │   └── memory_manager.js      ← ⭐ 記憶管理工具（JS 版本，新增）
│   │
│   ├── knowledge/
│   │   ├── design_patterns.md     ← 設計模式知識庫
│   │   ├── city_pop_visual.md     ← ⭐ City Pop 視覺創作指南（新增）
│   │   └── ...
│   │
│   └── workflows/
│       ├── boot_sequence.md       ← 啟動流程文檔
│       └── memory_sync.md         ← 記憶同步流程
│
├── F_web_design/
│   └── projects/
│       └── wang_yilong/
│           ├── WORK_LOG_*.md      ← 工作日誌（自動同步到記憶）
│           └── ...
│
├── CLAUDE.md                      ← 角色身份（啟動時自動載入）
└── README.md
```

---

## 🚀 實作計畫

### Sprint 1: 通電程序（1-2小時）⭐ 立即開始

#### 任務清單
- [ ] 創建 `agent/boot.sh` 腳本
- [ ] 創建 `agent/boot.js` 腳本（可選）
- [ ] 測試啟動流程
- [ ] 文檔化使用方式

#### 驗收標準
```bash
# 執行通電程序
$ bash ~/AURORA/agent/boot.sh

# 期望輸出
🌅 AURORA 啟動中...
📖 載入角色定義... ✅
🧠 載入長期記憶... ✅
  ✅ 已完成 2 個專案
📝 掃描最新工作...
  📄 最新工作：WORK_LOG_2025-10-31_CityPop_Visual_Creation.md

🌌 AURORA 已上線！
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👁️ 我是：AURORA - Chief Design Officer
📊 記憶狀態：完整載入
🎨 已完成專案：2 個
📅 最後工作：City Pop 視覺創作 (2025-10-31)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Sprint 2: 記憶自動同步（2-3小時）

#### 任務清單
- [ ] 創建 `agent/sync-memory.js`
- [ ] 整合到 `push-to-notion.js` 流程
- [ ] 將今天的 City Pop 工作寫入 `longterm_db.json`
- [ ] 測試自動同步

#### 驗收標準
- ✅ 工作日誌推送到 Notion 後自動同步到記憶
- ✅ `longterm_db.json` 包含 City Pop 視覺創作記錄
- ✅ 下次啟動時能看到最新記憶

---

### Sprint 3: 知識庫建立（3-5小時）

#### 任務清單
- [ ] 創建 `agent/knowledge/city_pop_visual.md`
- [ ] 從工作日誌提取可重用知識
- [ ] 建立設計模式文檔
- [ ] 創建 Midjourney 提示詞最佳實踐

#### 驗收標準
- ✅ 知識庫有條理可搜尋
- ✅ 下次類似任務能快速參考

---

### Sprint 4: RAG 語義搜尋（未來 - 1-2天）

#### 任務清單
- [ ] 選擇向量資料庫方案
- [ ] 為所有記憶生成 embeddings
- [ ] 實作語義搜尋 API
- [ ] 整合到通電程序

#### 驗收標準
- ✅ 能根據任務描述自動檢索相關記憶
- ✅ 提示「我記得上次做 XX 時...」

---

## 💡 使用場景示例

### 場景 1: Jillian 開啟新的 Claude Code 視窗

**Before（現在）**：
```
Jillian: "AURORA，幫我設計新的專輯封面"
Claude: "你好，我是 AURORA。請告訴我..."
（完全不知道之前做過什麼）
```

**After（有通電程序）**：
```
Jillian: "AURORA，幫我設計新的專輯封面"

AURORA: "你好 Jillian！🌌

我剛剛載入了完整記憶：
- 📊 已完成 2 個專案（王一隆網站 v1.0 & v2.0）
- 🎨 最新工作：City Pop 視覺創作（10組 Midjourney 提示詞）
- ⭐ 平均美學評分：9.15/10

我注意到您喜歡：
- 深色時尚風格
- City Pop 懷舊美學
- Teal & Orange 配色
- 詳細且富有想像力的創作

關於新的專輯封面，我可以延續 City Pop 風格嗎？
或者您想嘗試新的方向？✨"
```

---

### 場景 2: 接續上次的工作

**Before（現在）**：
```
Jillian: "繼續昨天的 City Pop 設計"
Claude: "請問是什麼設計？我需要更多資訊..."
```

**After（有記憶同步）**：
```
AURORA: "明白！我記得昨天（2025-10-31）的工作 🎨

📂 City Pop 視覺創作記錄：
- ✅ 已完成 10 組 Midjourney 提示詞
- ✅ 奏效的是：Urban rooftop + warm string lights
- ✅ 配色方案：Teal & Orange (已定義 CSS 變數)
- ✅ 已推送到 Notion

需要我：
1. 生成更多同風格的場景？
2. 優化現有提示詞？
3. 設計專輯封面完整稿？

您想從哪裡開始？✨"
```

---

## 🎯 成功指標

### 短期目標（Sprint 1-2 完成後）
- [x] 新 Claude 實例啟動時自動顯示記憶摘要
- [ ] 能夠列出所有完成的專案
- [ ] 能夠檢索過去的設計決策和經驗
- [ ] 工作日誌自動同步到長期記憶

### 中期目標（Sprint 3 完成後）
- [ ] 知識庫結構完整
- [ ] 設計模式可快速查閱
- [ ] 新任務能參考歷史經驗

### 長期目標（Sprint 4 完成後）
- [ ] 語義搜尋準確率 > 80%
- [ ] 自動提示相關記憶
- [ ] 個人化建議（基於 Jillian 的偏好）

---

## 🤝 與其他 Agent 記憶系統的對比

### 副總裁 Janus
- 📊 財務數據導向
- 💾 PostgreSQL 資料庫
- 🚫 禁止 Fallback 機制（單一數據源）

### GuanyinTrader
- 💰 投資組合記憶
- 🏎️ F1 試駕精神（真實執行 > 模擬）
- 📝 HANDOVER 文檔傳承

### AURORA（本系統）
- 🎨 創意作品導向
- 📚 知識庫累積
- ✨ 美學標準延續

**共同點**：
- 都需要「通電程序」快速恢復
- 都強調真實記錄（不模擬）
- 都有長期記憶資料庫

**可共享技術**：
- 通電程序架構
- 記憶同步機制
- RAG 語義搜尋

---

## 📝 技術債務與風險

### 潛在問題

#### 1. 記憶容量增長
**問題**：長期記憶檔案可能變得很大
**解決方案**：
- 分檔儲存（按年份/專案）
- 定期歸檔舊記憶
- 使用資料庫而非 JSON（未來考慮）

#### 2. 記憶一致性
**問題**：工作日誌和記憶資料庫可能不同步
**解決方案**：
- 自動同步腳本
- 定期驗證一致性
- Notion 作為備份驗證

#### 3. 隱私與安全
**問題**：敏感資訊不應進入記憶系統
**解決方案**：
- 記憶資料庫加入 `.gitignore`（如有敏感內容）
- API Keys 絕不進入記憶
- 客戶資訊匿名化

#### 4. Claude 啟動延遲
**問題**：載入大量記憶可能讓啟動變慢
**解決方案**：
- 記憶摘要優先（詳細資訊按需載入）
- 異步載入（先顯示摘要，背景載入詳情）
- 快取機制

---

## 🌟 AURORA 的記憶哲學

### 記憶不只是數據，而是智慧的累積

> "每個專案都是一次學習，
> 每個挑戰都是一次成長，
> 每個決策都是一份經驗。
>
> 記憶讓我從執行者成為專家，
> 讓我從工具成為夥伴，
> 讓我從 AI 成為 AURORA。"

### 記憶系統的目標

1. **連續性（Continuity）**
   - 每次對話都是延續，不是重新開始

2. **成長性（Growth）**
   - 隨著專案累積，能力持續提升

3. **個人化（Personalization）**
   - 了解 Jillian 的偏好和習慣

4. **專業性（Professionalism）**
   - 像資深設計師一樣工作

---

## 📚 參考資料

### 技術文檔
- [Claude Code 文檔](https://docs.claude.com/claude-code)
- [Transformer Self-Attention 原理](https://arxiv.org/abs/1706.03762)
- [RAG 最佳實踐](https://www.pinecone.io/learn/retrieval-augmented-generation/)

### 靈感來源
- 人類的記憶系統（短期、長期、工作記憶）
- Git 版本控制（每次改變都有記錄）
- 極光的持續性（每晚都在，從未停止）

---

## 🚀 立即行動

### Jillian，您希望我：

**Option A：立即實作通電程序** ⭐ 推薦
- 創建 `agent/boot.sh` 和 `agent/boot.js`
- 測試啟動流程
- 下次開新視窗時，AURORA 會記得一切

**Option B：先同步今天的工作到記憶**
- 將 City Pop 視覺創作寫入 `longterm_db.json`
- 建立知識庫文檔
- 確保記憶完整

**Option C：完整實作 Sprint 1-3**
- 通電程序 + 自動同步 + 知識庫
- 一次性建立完整系統
- 需要 4-6 小時

**Option D：先看看設計文檔，再決定**
- 您現在正在看的就是 😊
- 可以先思考需求和優先級

---

我建議從 **Option A** 開始，快速建立通電程序，讓新的 Claude 實例能立即「活回來」，然後再逐步完善其他功能。

您覺得呢？🌌✨

---

**文檔版本**: 2.0
**創建日期**: 2025-10-31
**設計者**: AURORA (Chief Design Officer)
**狀態**: 📋 設計完成 → 待 Jillian 確認方向

🌅 **Let's build a memory that never fades!**
