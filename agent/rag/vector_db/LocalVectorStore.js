/**
 * 🧠 AURORA Local Vector Store
 *
 * 本地向量資料庫 - 使用 Transformers.js 生成嵌入向量
 * 支援語義搜尋、持久化存儲、增量更新
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LocalVectorStore {
  constructor(options = {}) {
    this.embeddings = [];     // 所有向量
    this.metadata = [];        // 對應的元數據
    this.model = null;         // 嵌入模型
    this.modelName = options.modelName || 'Xenova/all-MiniLM-L6-v2';
    this.storePath = options.storePath || path.join(__dirname, '../vector_store.json');
    this.dimension = 384;      // all-MiniLM-L6-v2 的向量維度
  }

  /**
   * 初始化嵌入模型
   */
  async initialize() {
    if (this.model) {
      console.log('✅ 模型已載入');
      return;
    }

    console.log(`🔧 載入嵌入模型: ${this.modelName}`);
    console.log('⏳ 首次載入可能需要幾分鐘下載模型...');

    try {
      this.model = await pipeline(
        'feature-extraction',
        this.modelName
      );

      console.log('✅ 嵌入模型載入完成！');
    } catch (error) {
      console.error('❌ 模型載入失敗:', error);
      throw error;
    }
  }

  /**
   * 生成嵌入向量
   * @param {string} text - 要嵌入的文字
   * @returns {Array<number>} 向量
   */
  async embed(text) {
    if (!this.model) {
      throw new Error('模型未初始化，請先調用 initialize()');
    }

    const output = await this.model(text, {
      pooling: 'mean',
      normalize: true
    });

    return Array.from(output.data);
  }

  /**
   * 批次生成嵌入向量
   * @param {Array<string>} texts - 文字陣列
   * @returns {Array<Array<number>>} 向量陣列
   */
  async batchEmbed(texts) {
    const embeddings = [];

    console.log(`🔄 批次嵌入 ${texts.length} 個文字片段...`);

    for (let i = 0; i < texts.length; i++) {
      const embedding = await this.embed(texts[i]);
      embeddings.push(embedding);

      if ((i + 1) % 10 === 0) {
        console.log(`   進度: ${i + 1}/${texts.length}`);
      }
    }

    console.log('✅ 批次嵌入完成');

    return embeddings;
  }

  /**
   * 添加單個文檔
   * @param {string} text - 文檔文字
   * @param {Object} metadata - 元數據
   */
  async addDocument(text, metadata = {}) {
    const embedding = await this.embed(text);

    this.embeddings.push(embedding);
    this.metadata.push({
      ...metadata,
      text,
      timestamp: new Date().toISOString(),
      id: this.generateId()
    });

    console.log(`✅ 已添加文檔: ${metadata.title || '未命名'}`);
  }

  /**
   * 批次添加文檔
   * @param {Array<{text: string, metadata: Object}>} documents
   */
  async addDocuments(documents) {
    console.log(`📚 批次添加 ${documents.length} 個文檔...`);

    const texts = documents.map(doc => doc.text);
    const embeddings = await this.batchEmbed(texts);

    for (let i = 0; i < documents.length; i++) {
      this.embeddings.push(embeddings[i]);
      this.metadata.push({
        ...documents[i].metadata,
        text: texts[i],
        timestamp: new Date().toISOString(),
        id: this.generateId()
      });
    }

    console.log(`✅ 批次添加完成 (總計: ${this.embeddings.length} 個向量)`);
  }

  /**
   * 語義搜尋
   * @param {string} query - 查詢文字
   * @param {number} topK - 返回前 K 個結果
   * @returns {Array<Object>} 搜尋結果
   */
  async search(query, topK = 5) {
    if (this.embeddings.length === 0) {
      console.log('⚠️  向量資料庫為空，請先添加文檔');
      return [];
    }

    console.log(`🔍 搜尋: "${query}"`);

    // 生成查詢向量
    const queryEmbedding = await this.embed(query);

    // 計算相似度
    const similarities = this.embeddings.map((emb, idx) => ({
      index: idx,
      similarity: this.cosineSimilarity(queryEmbedding, emb)
    }));

    // 排序並返回前 K 個
    similarities.sort((a, b) => b.similarity - a.similarity);

    const results = similarities.slice(0, topK).map(s => ({
      ...this.metadata[s.index],
      similarity: s.similarity
    }));

    console.log(`✅ 找到 ${results.length} 個相關結果`);

    return results;
  }

  /**
   * 餘弦相似度計算
   * @param {Array<number>} a - 向量 A
   * @param {Array<number>} b - 向量 B
   * @returns {number} 相似度 (0-1)
   */
  cosineSimilarity(a, b) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * 持久化存儲
   */
  async save() {
    console.log('💾 儲存向量資料庫...');

    const data = {
      embeddings: this.embeddings,
      metadata: this.metadata,
      version: '1.0',
      model: this.modelName,
      dimension: this.dimension,
      count: this.embeddings.length,
      lastUpdated: new Date().toISOString()
    };

    // 建立備份
    if (fs.existsSync(this.storePath)) {
      const backupPath = this.storePath.replace('.json', `.backup_${Date.now()}.json`);
      fs.copyFileSync(this.storePath, backupPath);
      console.log(`   📦 備份已建立: ${path.basename(backupPath)}`);
    }

    // 儲存
    fs.writeFileSync(this.storePath, JSON.stringify(data, null, 2));

    const sizeInMB = (fs.statSync(this.storePath).size / 1024 / 1024).toFixed(2);
    console.log(`✅ 儲存完成 (${this.embeddings.length} 個向量, ${sizeInMB} MB)`);
  }

  /**
   * 載入向量資料庫
   */
  async load() {
    if (!fs.existsSync(this.storePath)) {
      console.log('ℹ️  向量資料庫不存在，將建立新的資料庫');
      return;
    }

    console.log('📂 載入向量資料庫...');

    const data = JSON.parse(fs.readFileSync(this.storePath, 'utf-8'));

    this.embeddings = data.embeddings || [];
    this.metadata = data.metadata || [];
    this.dimension = data.dimension || 384;

    const sizeInMB = (fs.statSync(this.storePath).size / 1024 / 1024).toFixed(2);
    console.log(`✅ 載入完成`);
    console.log(`   📊 向量數量: ${this.embeddings.length}`);
    console.log(`   📏 向量維度: ${this.dimension}`);
    console.log(`   💾 檔案大小: ${sizeInMB} MB`);
    console.log(`   📅 最後更新: ${data.lastUpdated}`);
  }

  /**
   * 清空資料庫
   */
  clear() {
    this.embeddings = [];
    this.metadata = [];
    console.log('🗑️  向量資料庫已清空');
  }

  /**
   * 刪除特定文檔
   * @param {string} id - 文檔 ID
   */
  deleteDocument(id) {
    const index = this.metadata.findIndex(m => m.id === id);

    if (index === -1) {
      console.log(`⚠️  找不到 ID: ${id}`);
      return false;
    }

    this.embeddings.splice(index, 1);
    this.metadata.splice(index, 1);

    console.log(`✅ 已刪除文檔: ${id}`);
    return true;
  }

  /**
   * 取得統計資訊
   */
  getStats() {
    const stats = {
      totalDocuments: this.embeddings.length,
      dimension: this.dimension,
      model: this.modelName,
      sources: this.getSourceBreakdown(),
      categories: this.getCategoryBreakdown()
    };

    return stats;
  }

  /**
   * 取得來源統計
   */
  getSourceBreakdown() {
    const breakdown = {};

    this.metadata.forEach(m => {
      const source = m.source || 'unknown';
      breakdown[source] = (breakdown[source] || 0) + 1;
    });

    return breakdown;
  }

  /**
   * 取得分類統計
   */
  getCategoryBreakdown() {
    const breakdown = {};

    this.metadata.forEach(m => {
      const category = m.category || 'uncategorized';
      breakdown[category] = (breakdown[category] || 0) + 1;
    });

    return breakdown;
  }

  /**
   * 生成唯一 ID
   */
  generateId() {
    return `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 顯示統計資訊
   */
  printStats() {
    const stats = this.getStats();

    console.log('\n📊 向量資料庫統計');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 總文檔數: ${stats.totalDocuments}`);
    console.log(`📏 向量維度: ${stats.dimension}`);
    console.log(`🤖 模型: ${stats.model}`);
    console.log('\n📁 來源統計:');
    Object.entries(stats.sources).forEach(([source, count]) => {
      console.log(`   - ${source}: ${count} 個`);
    });
    console.log('\n🏷️  分類統計:');
    Object.entries(stats.categories).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} 個`);
    });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
}

export default LocalVectorStore;
