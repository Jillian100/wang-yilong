#!/usr/bin/env node
/**
 * 🔍 AURORA RAG Search CLI
 *
 * 命令行搜尋工具
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import LocalVectorStore from '../vector_db/LocalVectorStore.js';
import SemanticSearch from '../search/SemanticSearch.js';

async function search(query, options = {}) {
  const {
    topK = 5,
    minSimilarity = 0.5,
    format = 'detailed'
  } = options;

  console.log('\n🔍 AURORA Semantic Search');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 載入向量資料庫
  const vectorStore = new LocalVectorStore();
  await vectorStore.initialize();
  await vectorStore.load();

  // 搜尋
  const searchEngine = new SemanticSearch(vectorStore);
  const results = await searchEngine.search(query, {
    topK,
    minSimilarity,
    verbose: true
  });

  if (results.length === 0) {
    console.log('⚠️  未找到相關結果');
    console.log('💡 建議:');
    console.log('   - 降低相似度閾值 (--min-similarity)');
    console.log('   - 使用不同的查詢詞');
    console.log('   - 確認向量資料庫已初始化\n');
    return;
  }

  // 格式化輸出
  if (format === 'context') {
    console.log('\n📄 上下文格式（供 LLM 使用）:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(searchEngine.formatContext(results));
  }

  console.log('\n✅ 搜尋完成\n');
}

// 解析命令行參數
const query = process.argv[2];

if (!query) {
  console.log('用法: npm run rag:search "your query"');
  console.log('');
  console.log('範例:');
  console.log('  npm run rag:search "City Pop 配色"');
  console.log('  npm run rag:search "深色主題設計"');
  console.log('  npm run rag:search "Midjourney 提示詞"');
  console.log('');
  process.exit(1);
}

search(query, {
  topK: 5,
  minSimilarity: 0.5
}).catch(console.error);
