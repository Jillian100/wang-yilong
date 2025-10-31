/**
 * 🤖 AURORA RAG Integration
 *
 * RAG 系統整合 - 對話中自動檢索相關知識
 * AURORA 的智能記憶增強系統
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import LocalVectorStore from './vector_db/LocalVectorStore.js';
import SemanticSearch from './search/SemanticSearch.js';

class RAGIntegration {
  constructor(options = {}) {
    this.vectorStore = new LocalVectorStore(options);
    this.search = null;
    this.initialized = false;
  }

  /**
   * 初始化 RAG 系統
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    console.log('🧠 初始化 RAG 系統...');

    await this.vectorStore.initialize();
    await this.vectorStore.load();

    this.search = new SemanticSearch(this.vectorStore);
    this.initialized = true;

    console.log(`✅ RAG 系統就緒 (${this.vectorStore.embeddings.length} 個知識片段)`);
  }

  /**
   * 根據用戶查詢檢索相關知識
   * @param {string} query - 用戶查詢
   * @param {Object} options - 選項
   * @returns {Object} {context, sources}
   */
  async retrieveContext(query, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const {
      topK = 3,
      minSimilarity = 0.6,
      format = 'detailed',
      verbose = false
    } = options;

    const results = await this.search.search(query, {
      topK,
      minSimilarity,
      verbose
    });

    // 格式化為上下文
    const context = this.formatContext(results, format);

    // 提取來源資訊
    const sources = this.search.getSources(results);

    return {
      context,
      sources,
      count: results.length
    };
  }

  /**
   * 智能推薦（根據當前對話主題）
   * @param {string} topic - 主題
   * @param {Object} options - 選項
   * @returns {Array<Object>}
   */
  async recommendKnowledge(topic, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const { topK = 5, verbose = false } = options;

    return await this.search.recommend(topic, { topK, verbose });
  }

  /**
   * 主動學習 - 從對話中提取知識
   * @param {string} conversation - 對話內容
   * @param {Object} metadata - 元數據
   */
  async learnFromConversation(conversation, metadata = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    // 提取有價值的知識片段
    const insights = this.extractInsights(conversation);

    if (insights.length === 0) {
      return { learned: 0 };
    }

    // 添加到向量資料庫
    const documents = insights.map(insight => ({
      text: insight,
      metadata: {
        source: 'conversation',
        category: 'learned',
        timestamp: new Date().toISOString(),
        ...metadata
      }
    }));

    await this.vectorStore.addDocuments(documents);
    await this.vectorStore.save();

    return {
      learned: insights.length,
      insights
    };
  }

  /**
   * 格式化上下文
   * @param {Array<Object>} results - 搜尋結果
   * @param {string} format - 格式類型
   * @returns {string}
   */
  formatContext(results, format = 'detailed') {
    if (results.length === 0) {
      return '';
    }

    switch (format) {
      case 'simple':
        return results.map(r => r.text).join('\n\n');

      case 'detailed':
        return results.map((r, i) => {
          const similarity = (r.similarity * 100).toFixed(1);
          return `[來源 ${i + 1}: ${r.title || r.source}] (相關度: ${similarity}%)\n${r.text}`;
        }).join('\n\n---\n\n');

      case 'markdown':
        return results.map((r, i) => {
          const similarity = (r.similarity * 100).toFixed(1);
          return `### 📚 來源 ${i + 1}: ${r.title || r.source}\n\n**相關度**: ${similarity}%\n\n${r.text}`;
        }).join('\n\n---\n\n');

      default:
        return this.formatContext(results, 'detailed');
    }
  }

  /**
   * 從對話中提取洞見
   * @param {string} conversation
   * @returns {Array<string>}
   */
  extractInsights(conversation) {
    const insights = [];

    // 簡單啟發式規則（未來可用 LLM 強化）
    const lines = conversation.split('\n').filter(line => line.trim());

    for (const line of lines) {
      // 提取「我學到...」、「重要的是...」等知識
      if (
        line.includes('學到') ||
        line.includes('發現') ||
        line.includes('重要的是') ||
        line.includes('最佳實踐') ||
        line.includes('技巧')
      ) {
        insights.push(line.trim());
      }
    }

    return insights;
  }

  /**
   * 取得統計資訊
   * @returns {Object}
   */
  getStats() {
    if (!this.initialized) {
      return { initialized: false };
    }

    return {
      initialized: true,
      ...this.vectorStore.getStats()
    };
  }

  /**
   * 搜尋並顯示結果
   * @param {string} query
   * @param {Object} options
   */
  async searchAndDisplay(query, options = {}) {
    const { context, sources, count } = await this.retrieveContext(query, {
      ...options,
      verbose: true
    });

    console.log('\n📚 檢索到的相關知識:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(context);
    console.log('\n📖 來源資訊:');
    sources.forEach((s, i) => {
      console.log(`   ${i + 1}. ${s.title} (相關度: ${(s.similarity * 100).toFixed(1)}%)`);
    });
    console.log('');

    return { context, sources, count };
  }
}

export default RAGIntegration;
