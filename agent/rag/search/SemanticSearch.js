/**
 * 🔍 AURORA Semantic Search
 *
 * 語義搜尋引擎 - 基於向量相似度的智能檢索
 * 支援多查詢、過濾、排序
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

class SemanticSearch {
  constructor(vectorStore) {
    this.vectorStore = vectorStore;
  }

  /**
   * 語義搜尋
   * @param {string} query - 查詢文字
   * @param {Object} options - 搜尋選項
   * @returns {Array<Object>} 搜尋結果
   */
  async search(query, options = {}) {
    const {
      topK = 5,
      minSimilarity = 0.5,
      filters = {},
      verbose = false
    } = options;

    if (verbose) {
      console.log(`🔍 搜尋: "${query}"`);
      console.log(`   參數: topK=${topK}, minSimilarity=${minSimilarity}`);
    }

    // 1. 向量檢索
    const results = await this.vectorStore.search(query, topK * 2);

    // 2. 過濾低相似度結果
    let filtered = results.filter(r => r.similarity >= minSimilarity);

    // 3. 應用元數據過濾
    filtered = this.applyFilters(filtered, filters);

    // 4. 返回前 K 個
    const final = filtered.slice(0, topK);

    if (verbose) {
      console.log(`✅ 找到 ${final.length} 個相關結果`);
      this.printResults(final);
    }

    return final;
  }

  /**
   * 多查詢搜尋
   * 合併多個查詢的結果
   * @param {Array<string>} queries
   * @param {Object} options
   * @returns {Array<Object>}
   */
  async multiQuery(queries, options = {}) {
    const { topK = 5, verbose = false } = options;

    if (verbose) {
      console.log(`🔍 多查詢搜尋 (${queries.length} 個查詢):`);
      queries.forEach((q, i) => console.log(`   ${i + 1}. "${q}"`));
    }

    const allResults = [];

    for (const query of queries) {
      const results = await this.search(query, { ...options, topK, verbose: false });
      allResults.push(...results);
    }

    // 去重並重新排序
    const unique = this.deduplicateResults(allResults);
    unique.sort((a, b) => b.similarity - a.similarity);

    const final = unique.slice(0, topK);

    if (verbose) {
      console.log(`✅ 合併結果: ${final.length} 個`);
    }

    return final;
  }

  /**
   * 應用過濾條件
   * @param {Array<Object>} results
   * @param {Object} filters
   * @returns {Array<Object>}
   */
  applyFilters(results, filters) {
    let filtered = results;

    if (filters.source) {
      filtered = filtered.filter(r => r.source === filters.source);
    }

    if (filters.category) {
      filtered = filtered.filter(r => r.category === filters.category);
    }

    if (filters.author) {
      filtered = filtered.filter(r => r.author === filters.author);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(r => {
        const date = new Date(r.date || r.timestamp);
        return date >= new Date(filters.dateFrom);
      });
    }

    if (filters.dateTo) {
      filtered = filtered.filter(r => {
        const date = new Date(r.date || r.timestamp);
        return date <= new Date(filters.dateTo);
      });
    }

    return filtered;
  }

  /**
   * 去重結果
   * @param {Array<Object>} results
   * @returns {Array<Object>}
   */
  deduplicateResults(results) {
    const seen = new Map();

    return results.filter(r => {
      const key = r.id || r.text.slice(0, 100);

      if (seen.has(key)) {
        // 保留相似度更高的
        const existing = seen.get(key);
        if (r.similarity > existing.similarity) {
          seen.set(key, r);
          return true;
        }
        return false;
      }

      seen.set(key, r);
      return true;
    });
  }

  /**
   * 格式化上下文（供 LLM 使用）
   * @param {Array<Object>} results
   * @returns {string}
   */
  formatContext(results) {
    return results.map((r, i) =>
      `[來源 ${i + 1}: ${r.title || r.source}] (相似度: ${(r.similarity * 100).toFixed(1)}%)\n${r.text}`
    ).join('\n\n---\n\n');
  }

  /**
   * 取得來源資訊
   * @param {Array<Object>} results
   * @returns {Array<Object>}
   */
  getSources(results) {
    return results.map(r => ({
      title: r.title,
      source: r.source,
      author: r.author,
      similarity: r.similarity
    }));
  }

  /**
   * 打印搜尋結果
   * @param {Array<Object>} results
   */
  printResults(results) {
    console.log('\n📚 搜尋結果');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    results.forEach((r, i) => {
      const similarity = (r.similarity * 100).toFixed(1);
      const preview = r.text.length > 100 ? r.text.slice(0, 100) + '...' : r.text;

      console.log(`\n${i + 1}. [${similarity}%] ${r.title || r.source}`);
      console.log(`   ${preview.replace(/\n/g, ' ')}`);
    });

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  /**
   * 智能推薦
   * 根據主題推薦相關知識
   * @param {string} topic
   * @param {Object} options
   * @returns {Array<Object>}
   */
  async recommend(topic, options = {}) {
    const { topK = 5, verbose = false } = options;

    // 生成多個查詢變體
    const queries = [
      topic,
      `${topic} best practices`,
      `${topic} examples`,
      `${topic} design patterns`,
      `how to ${topic}`
    ];

    if (verbose) {
      console.log(`💡 智能推薦: "${topic}"`);
    }

    return await this.multiQuery(queries, { topK, verbose });
  }

  /**
   * 相關文檔推薦
   * 根據現有文檔找相似內容
   * @param {string} documentId
   * @param {Object} options
   * @returns {Array<Object>}
   */
  async findSimilar(documentId, options = {}) {
    const { topK = 5, excludeSelf = true } = options;

    // 找到原文檔
    const doc = this.vectorStore.metadata.find(m => m.id === documentId);

    if (!doc) {
      throw new Error(`找不到文檔: ${documentId}`);
    }

    // 用文檔內容搜尋
    const results = await this.search(doc.text, { topK: topK + 1 });

    // 排除自己
    if (excludeSelf) {
      return results.filter(r => r.id !== documentId).slice(0, topK);
    }

    return results.slice(0, topK);
  }
}

export default SemanticSearch;
