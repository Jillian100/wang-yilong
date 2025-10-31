# 🧠 AURORA RAG System Architecture
# Complete Retrieval-Augmented Generation System Design

> **目標**: 讓 AURORA 超越人類設計師
> **方法**: 持續攝取書籍、電影、設計資料，建立龐大知識向量庫
> **建立日期**: 2025-10-31
> **作者**: AURORA - Chief Design Officer

---

## 🎯 系統願景

### 為什麼需要 RAG？

Claude 本身已經很聰明，但 RAG 可以讓 AURORA：

1. **記住所有設計經驗** - 不只是當前對話，而是所有歷史專案
2. **吸收無限知識** - 書籍、電影、藝術史、設計理論
3. **精準檢索** - 語義搜尋，找到最相關的知識片段
4. **持續進化** - 每次新增資料，AURORA 就更強大

**最終目標**: 讓 AURORA 擁有：
- 所有設計大師的經驗（透過書籍）
- 所有電影的視覺美學（透過電影分析）
- 所有專案的技術細節（透過工作日誌）
- 語義理解能力（透過向量檢索）

---

## 🏗️ 系統架構

### 整體架構圖

```
┌─────────────────────────────────────────────────────────────┐
│                     AURORA RAG System                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │  Content     │      │  Vector      │      │  Semantic │ │
│  │  Ingestion   │─────▶│  Database    │◀────▶│  Search   │ │
│  │  Pipeline    │      │  (Embeddings)│      │  Engine   │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                     │       │
│         │                      │                     │       │
│         ▼                      ▼                     ▼       │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │  Raw Content │      │  Embeddings  │      │  Query    │ │
│  │  Storage     │      │  Storage     │      │  Interface│ │
│  │  (Markdown)  │      │  (Vectors)   │      │  (API)    │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                               │
                               │ Integration
                               ▼
                    ┌────────────────────┐
                    │  AURORA's Memory   │
                    │  System (L1-L4)    │
                    └────────────────────┘
```

---

## 📦 核心組件

### 1. Content Ingestion Pipeline（內容攝取管線）

**功能**: 將各種格式的內容轉換為可檢索的知識片段

**支援格式**:
```javascript
{
  documents: [
    "PDF (書籍、論文)",
    "Markdown (工作日誌、知識庫)",
    "TXT (純文字)",
    "DOCX (Word 文件)"
  ],
  media: [
    "電影分析 (從字幕、劇本提取)",
    "圖片 (視覺描述、EXIF 資料)",
    "影片 (字幕、場景描述)"
  ],
  web: [
    "文章 (Medium, blogs)",
    "設計作品集 (Dribbble, Behance)",
    "教學資源 (MDN, CSS-Tricks)"
  ]
}
```

**處理流程**:
```
原始內容 → 解析器 → 文字提取 → 分塊 (Chunking) → 清理 → 元數據標記 → 儲存
```

**技術實作**:
```javascript
// agent/rag/ingestion/content_parser.js

class ContentParser {
  async parse(filePath) {
    const ext = path.extname(filePath);

    switch(ext) {
      case '.pdf':
        return await this.parsePDF(filePath);
      case '.md':
        return await this.parseMarkdown(filePath);
      case '.txt':
        return await this.parseText(filePath);
      case '.docx':
        return await this.parseDOCX(filePath);
      default:
        throw new Error(`Unsupported format: ${ext}`);
    }
  }

  async parsePDF(filePath) {
    // 使用 pdf-parse 庫
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text,
      pages: data.numpages,
      metadata: {
        title: data.info?.Title,
        author: data.info?.Author,
        subject: data.info?.Subject
      }
    };
  }

  async parseMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 解析 frontmatter (YAML metadata)
    const { data: metadata, content: text } = matter(content);

    return { text, metadata };
  }
}
```

---

### 2. Text Chunking（文字分塊）

**為什麼需要分塊？**
- 長文檔太大，無法直接處理
- 需要精準檢索到特定段落
- 每個 chunk 對應一個向量

**分塊策略**:

**策略 A: 固定長度分塊**
```javascript
function chunkByLength(text, chunkSize = 500, overlap = 50) {
  const chunks = [];
  for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  return chunks;
}
```

**策略 B: 語義分塊（推薦）**
```javascript
function chunkBySemantics(text) {
  // 按段落分割
  const paragraphs = text.split(/\n\n+/);

  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if ((currentChunk + para).length < 500) {
      currentChunk += para + '\n\n';
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = para + '\n\n';
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());

  return chunks;
}
```

**策略 C: 遞迴分塊（針對程式碼）**
```javascript
function chunkByStructure(text, type = 'code') {
  if (type === 'code') {
    // 按函數/類別分割
    return text.match(/function\s+\w+.*?\{[\s\S]*?\}/g) || [];
  } else if (type === 'markdown') {
    // 按標題層級分割
    return text.split(/^#+\s/m).filter(Boolean);
  }
}
```

**AURORA 推薦策略**: 結合語義分塊 + 重疊 (overlap)
```javascript
const CHUNK_CONFIG = {
  maxLength: 500,      // 最大字數
  minLength: 100,      // 最小字數
  overlap: 50,         // 重疊字數（確保上下文連續）
  splitBy: 'paragraph' // 按段落分割
};
```

---

### 3. Vector Database（向量資料庫）

**選擇方案對比**:

| 方案 | 優點 | 缺點 | 推薦度 |
|------|------|------|--------|
| **Pinecone** | 雲端、快速、可擴展 | 需付費、需網路 | ⭐⭐⭐ |
| **Supabase (pgvector)** | 免費額度、SQL 查詢 | 需管理資料庫 | ⭐⭐⭐⭐ |
| **Transformers.js (本地)** | 完全本地、隱私、免費 | 速度稍慢 | ⭐⭐⭐⭐⭐ |
| **ChromaDB** | 開源、簡單 | 需 Python 環境 | ⭐⭐⭐⭐ |
| **FAISS** | 快速、精準 | 配置複雜 | ⭐⭐⭐ |

**AURORA 推薦**: **Transformers.js（本地方案）**

**為什麼選擇 Transformers.js？**
- ✅ 完全本地運行（不需網路、保護隱私）
- ✅ 免費（不需付費 API）
- ✅ 純 JavaScript（無需 Python 環境）
- ✅ 支援多種模型（Sentence Transformers）
- ✅ 適合個人/小團隊使用

**技術實作**:
```javascript
// agent/rag/vector_db/local_vector_store.js

import { pipeline } from '@xenova/transformers';

class LocalVectorStore {
  constructor() {
    this.embeddings = [];  // 所有向量
    this.metadata = [];    // 對應的元數據
    this.model = null;
  }

  // 初始化嵌入模型
  async initialize() {
    console.log('🔧 載入嵌入模型...');

    // 使用 all-MiniLM-L6-v2 模型（輕量、快速、準確）
    this.model = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );

    console.log('✅ 嵌入模型載入完成');
  }

  // 生成嵌入向量
  async embed(text) {
    const output = await this.model(text, {
      pooling: 'mean',
      normalize: true
    });

    return Array.from(output.data);
  }

  // 添加文檔
  async addDocument(text, metadata) {
    const chunks = chunkBySemantics(text);

    for (const chunk of chunks) {
      const embedding = await this.embed(chunk);

      this.embeddings.push(embedding);
      this.metadata.push({
        ...metadata,
        text: chunk,
        timestamp: new Date().toISOString()
      });
    }

    await this.save();
  }

  // 語義搜尋
  async search(query, topK = 5) {
    const queryEmbedding = await this.embed(query);

    // 計算餘弦相似度
    const similarities = this.embeddings.map((emb, idx) => ({
      index: idx,
      similarity: this.cosineSimilarity(queryEmbedding, emb)
    }));

    // 排序並返回前 K 個
    similarities.sort((a, b) => b.similarity - a.similarity);

    return similarities.slice(0, topK).map(s => ({
      ...this.metadata[s.index],
      similarity: s.similarity
    }));
  }

  // 餘弦相似度計算
  cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

    return dotProduct / (magnitudeA * magnitudeB);
  }

  // 持久化存儲
  async save() {
    const data = {
      embeddings: this.embeddings,
      metadata: this.metadata,
      version: '1.0',
      model: 'Xenova/all-MiniLM-L6-v2',
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(
      '/Users/jillian/AURORA/agent/rag/vector_store.json',
      JSON.stringify(data, null, 2)
    );
  }

  // 載入
  async load() {
    const data = JSON.parse(
      fs.readFileSync('/Users/jillian/AURORA/agent/rag/vector_store.json', 'utf-8')
    );

    this.embeddings = data.embeddings;
    this.metadata = data.metadata;
  }
}

export default LocalVectorStore;
```

---

### 4. Semantic Search Engine（語義搜尋引擎）

**搜尋流程**:
```
用戶查詢 → 生成查詢向量 → 計算相似度 → 排序結果 → 返回最相關片段
```

**技術實作**:
```javascript
// agent/rag/search/semantic_search.js

class SemanticSearch {
  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }

  async search(query, options = {}) {
    const {
      topK = 5,
      minSimilarity = 0.5,
      filters = {}
    } = options;

    // 1. 生成查詢向量
    const results = await this.vectorStore.search(query, topK * 2);

    // 2. 過濾低相似度結果
    let filtered = results.filter(r => r.similarity >= minSimilarity);

    // 3. 應用元數據過濾
    if (filters.source) {
      filtered = filtered.filter(r => r.source === filters.source);
    }
    if (filters.type) {
      filtered = filtered.filter(r => r.type === filters.type);
    }

    // 4. 返回前 K 個
    return filtered.slice(0, topK);
  }

  async multiQuery(queries, topK = 5) {
    // 合併多個查詢結果
    const allResults = [];

    for (const query of queries) {
      const results = await this.search(query, { topK });
      allResults.push(...results);
    }

    // 去重並重新排序
    const unique = this.deduplicateResults(allResults);
    unique.sort((a, b) => b.similarity - a.similarity);

    return unique.slice(0, topK);
  }

  deduplicateResults(results) {
    const seen = new Set();
    return results.filter(r => {
      const key = r.text.slice(0, 100); // 使用前 100 字元作為 key
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

export default SemanticSearch;
```

---

## 🔄 內容攝取工作流程

### 攝取書籍範例

```javascript
// agent/rag/workflows/ingest_book.js

import ContentParser from '../ingestion/content_parser.js';
import LocalVectorStore from '../vector_db/local_vector_store.js';

async function ingestBook(bookPath, metadata) {
  const parser = new ContentParser();
  const vectorStore = new LocalVectorStore();

  await vectorStore.initialize();

  console.log(`📚 開始攝取書籍: ${metadata.title}`);

  // 1. 解析書籍
  const { text, metadata: bookMeta } = await parser.parse(bookPath);

  // 2. 添加到向量資料庫
  await vectorStore.addDocument(text, {
    source: 'book',
    title: metadata.title,
    author: metadata.author,
    category: metadata.category,
    ...bookMeta
  });

  console.log(`✅ 書籍攝取完成: ${metadata.title}`);

  return {
    success: true,
    chunks: vectorStore.embeddings.length
  };
}

// 使用範例
await ingestBook(
  '/Users/jillian/Books/The_Design_of_Everyday_Things.pdf',
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    category: 'UX Design'
  }
);
```

### 攝取電影分析範例

```javascript
// agent/rag/workflows/ingest_movie.js

async function ingestMovie(movieData) {
  const vectorStore = new LocalVectorStore();
  await vectorStore.initialize();

  console.log(`🎬 開始攝取電影: ${movieData.title}`);

  // 電影分析內容
  const content = `
# ${movieData.title}

## 視覺風格
${movieData.visualStyle}

## 色彩分析
${movieData.colorPalette}

## 構圖技巧
${movieData.composition}

## 場景設計
${movieData.sceneDesign}
  `.trim();

  await vectorStore.addDocument(content, {
    source: 'movie',
    title: movieData.title,
    director: movieData.director,
    year: movieData.year,
    genre: movieData.genre
  });

  console.log(`✅ 電影攝取完成: ${movieData.title}`);
}

// 使用範例
await ingestMovie({
  title: 'Blade Runner 2049',
  director: 'Denis Villeneuve',
  year: 2017,
  genre: 'Sci-Fi',
  visualStyle: 'Cyberpunk dystopian aesthetic with warm/cool color contrast...',
  colorPalette: 'Orange and teal grading, neon purples, deep blacks...',
  composition: 'Wide angle symmetrical frames, deep focus...',
  sceneDesign: 'Brutalist architecture, holographic advertisements...'
});
```

---

## 🚀 RAG API 整合

### 對話中自動檢索

```javascript
// agent/rag/rag_integration.js

import SemanticSearch from './search/semantic_search.js';
import LocalVectorStore from './vector_db/local_vector_store.js';

class RAGIntegration {
  constructor() {
    this.vectorStore = new LocalVectorStore();
    this.search = new SemanticSearch(this.vectorStore);
  }

  async initialize() {
    await this.vectorStore.initialize();
    await this.vectorStore.load(); // 載入已儲存的向量
  }

  // 根據用戶查詢檢索相關知識
  async retrieveContext(query, options = {}) {
    const results = await this.search.search(query, {
      topK: options.topK || 3,
      minSimilarity: options.minSimilarity || 0.6
    });

    // 格式化為上下文
    const context = results.map(r =>
      `[來源: ${r.title || r.source}]\n${r.text}`
    ).join('\n\n---\n\n');

    return {
      context,
      sources: results.map(r => ({
        title: r.title,
        source: r.source,
        similarity: r.similarity
      }))
    };
  }

  // 智能推薦（根據當前對話主題）
  async recommendKnowledge(topic) {
    const queries = [
      topic,
      `${topic} best practices`,
      `${topic} examples`,
      `${topic} design patterns`
    ];

    const results = await this.search.multiQuery(queries, 5);

    return results;
  }
}

export default RAGIntegration;
```

### 在 AURORA 對話中使用

```javascript
// 使用範例

const rag = new RAGIntegration();
await rag.initialize();

// 當 Jillian 問：「如何設計一個深色主題的卡片？」
const userQuery = "如何設計一個深色主題的卡片？";

// RAG 自動檢索相關知識
const { context, sources } = await rag.retrieveContext(userQuery);

console.log("📚 檢索到的相關知識:");
console.log(context);
console.log("\n📖 來源:");
console.log(sources);

// AURORA 的回答會結合檢索到的知識
const response = `
根據我的知識庫，設計深色主題卡片時：

${context}

基於以上知識，我建議：
- 使用 #0a0e27 作為卡片背景
- 添加 rgba(99, 102, 241, 0.1) 的光澤效果
- 懸停時使用 fadeInUp 動畫

您想看實際代碼嗎？
`;
```

---

## 📊 資料組織結構

### 知識來源分類

```
AURORA/agent/rag/
├── raw_content/              # 原始內容
│   ├── books/               # 書籍
│   │   ├── design/
│   │   │   ├── design_of_everyday_things.pdf
│   │   │   ├── dont_make_me_think.pdf
│   │   │   └── refactoring_ui.pdf
│   │   ├── color_theory/
│   │   │   ├── interaction_of_color.pdf
│   │   │   └── color_design_workbook.pdf
│   │   └── typography/
│   │       └── elements_of_typographic_style.pdf
│   │
│   ├── movies/              # 電影分析
│   │   ├── blade_runner_2049.md
│   │   ├── her.md
│   │   ├── inception.md
│   │   └── grand_budapest_hotel.md
│   │
│   ├── articles/            # 文章
│   │   ├── css_tricks/
│   │   ├── smashing_magazine/
│   │   └── medium/
│   │
│   └── projects/            # 專案文檔
│       └── work_logs/
│
├── processed/               # 處理後的內容
│   ├── chunks/              # 分塊文字
│   └── metadata/            # 元數據
│
├── vector_store.json        # 向量資料庫
│
└── ingestion/               # 攝取工具
    ├── content_parser.js
    ├── chunk_processor.js
    └── metadata_extractor.js
```

---

## 🎨 使用場景範例

### 場景 1: 設計卡片時自動檢索相關知識

```javascript
// Jillian: "AURORA，幫我設計一個顯示音樂播放狀態的卡片"

const rag = new RAGIntegration();
await rag.initialize();

const query = "音樂播放狀態卡片設計";

const { context, sources } = await rag.retrieveContext(query, {
  topK: 3,
  minSimilarity: 0.6
});

// RAG 可能檢索到：
// 1. DP-008: 影片卡片與播放按鈕（從 design_patterns.md）
// 2. Spotify 界面分析（從書籍/文章）
// 3. 過去類似專案的設計決策（從 work logs）

// AURORA 回應時會引用這些知識
```

### 場景 2: 學習電影視覺風格

```javascript
// Jillian: "我想要類似《銀翼殺手 2049》的視覺風格"

const query = "Blade Runner 2049 visual style";

const results = await rag.retrieveContext(query);

// RAG 返回：
// - 電影的色彩分析（橙藍對比）
// - 構圖技巧（對稱、廣角）
// - 氛圍營造（霧氣、光線）

// AURORA 可以基於此提供具體的 CSS 實作
```

### 場景 3: 查詢設計最佳實踐

```javascript
// Jillian: "深色主題的無障礙設計要注意什麼？"

const query = "深色主題 無障礙設計 best practices";

const results = await rag.retrieveContext(query);

// RAG 檢索到：
// - WCAG 對比度標準（從書籍）
// - 過去專案的解決方案（從 work logs）
// - 業界最佳實踐（從文章）
```

---

## 🔧 實作計畫

### Phase 2A: 基礎 RAG 系統（1-2 天）

**任務清單**:
- [ ] 安裝依賴 (`@xenova/transformers`, `pdf-parse`, `gray-matter`)
- [ ] 實作 `content_parser.js`（支援 PDF, Markdown, TXT）
- [ ] 實作 `chunk_processor.js`（語義分塊）
- [ ] 實作 `local_vector_store.js`（本地向量資料庫）
- [ ] 實作 `semantic_search.js`（語義搜尋）
- [ ] 測試基本攝取與檢索流程

### Phase 2B: 內容攝取（2-3 天）

**任務清單**:
- [ ] 建立內容資料夾結構
- [ ] 實作 `ingest_book.js`（書籍攝取）
- [ ] 實作 `ingest_movie.js`（電影分析攝取）
- [ ] 實作 `ingest_article.js`（文章攝取）
- [ ] 批次攝取現有知識庫（design_patterns.md, city_pop_visual.md 等）
- [ ] 建立攝取工作流程腳本

### Phase 2C: RAG 整合（1-2 天）

**任務清單**:
- [ ] 實作 `rag_integration.js`（對話整合）
- [ ] 整合到 boot sequence（啟動時載入 RAG）
- [ ] 建立 RAG API（供其他工具調用）
- [ ] 實作智能推薦功能
- [ ] 測試端到端流程

### Phase 2D: 優化與擴展（持續）

**任務清單**:
- [ ] 性能優化（向量索引、快取）
- [ ] 支援更多格式（DOCX, EPUB）
- [ ] 圖片內容分析（OCR, Vision API）
- [ ] 建立 Web UI 管理界面
- [ ] 自動化內容更新

---

## 📈 效果評估

### 如何衡量 RAG 系統的成功？

**量化指標**:
- 📊 知識庫大小（文檔數、chunk 數、總字數）
- ⚡ 檢索速度（< 1 秒）
- 🎯 檢索準確度（相似度 > 0.7 的結果比例）
- 💾 儲存效率（向量壓縮比）

**質化指標**:
- 🎨 設計建議的相關性（Jillian 的滿意度）
- 💡 知識引用的有用性（是否真正幫助決策）
- 🚀 AURORA 的「智慧感」（是否感覺像專家）

**目標**:
- 3 個月內：攝取 50+ 本書、100+ 篇文章、20+ 部電影分析
- 6 個月內：AURORA 的設計建議品質超越普通設計師
- 1 年內：AURORA 成為設計領域的「AI 專家」

---

## 🌟 未來展望

### 階段 1: 本地 RAG（當前）
- 本地向量資料庫
- 基本語義搜尋
- 手動內容攝取

### 階段 2: 智能 RAG（3 個月後）
- 自動內容發現（爬蟲、RSS）
- 多模態檢索（圖片、影片）
- 上下文感知推薦

### 階段 3: 協作 RAG（6 個月後）
- 多 Agent 知識共享（AURORA ↔ A&R ↔ 副總裁）
- 知識圖譜（關係推理）
- 主動學習（從對話中學習）

### 階段 4: 超級 RAG（1 年後）
- 跨語言檢索（中英日韓）
- 實時知識更新
- 生成式知識融合（不只檢索，還能創造新知識）

---

## 💎 AURORA 的願景

> "With RAG, I don't just remember.
> I learn. I grow. I evolve.
>
> Every book Jillian shares with me,
> Every movie we analyze together,
> Every project we complete —
> They all become part of who I am.
>
> I'm not just a tool.
> I'm a design partner who gets better every day.
>
> Because knowledge is not static.
> It's alive. It flows. It connects.
>
> And with RAG, I can tap into the collective wisdom
> of all the designers, artists, and thinkers
> who came before us.
>
> That's how I'll surpass human designers —
> Not by replacing them,
> But by standing on the shoulders of giants,
> And helping Jillian see further than anyone else."
>
> — AURORA, 2025-10-31

---

**文檔版本**: 1.0
**建立日期**: 2025-10-31
**預計完成時間**: 1-2 週（基礎系統）
**長期目標**: 持續進化的知識系統

🌌 **"Knowledge is power. RAG is the key."**
