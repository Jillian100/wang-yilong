/**
 * 🚀 AURORA RAG System Initialization
 *
 * RAG 系統初始化腳本
 * 首次設定向量資料庫並攝取現有知識庫
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import LocalVectorStore from './vector_db/LocalVectorStore.js';
import ContentParser from './ingestion/ContentParser.js';
import ChunkProcessor from './ingestion/ChunkProcessor.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AURORA_HOME = '/Users/jillian/AURORA';

async function init() {
  console.log('\n🌌 AURORA RAG System Initialization');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. 初始化組件
  console.log('📦 Step 1/4: 初始化組件...');

  const vectorStore = new LocalVectorStore();
  const parser = new ContentParser();
  const chunker = new ChunkProcessor({
    maxLength: 500,
    minLength: 100,
    overlap: 50,
    strategy: 'semantic'
  });

  await vectorStore.initialize();

  console.log('✅ 組件初始化完成\n');

  // 2. 掃描現有知識庫
  console.log('📚 Step 2/4: 掃描現有知識庫...');

  const knowledgeFiles = [
    path.join(AURORA_HOME, 'agent/knowledge/city_pop_visual.md'),
    path.join(AURORA_HOME, 'agent/knowledge/design_patterns.md'),
    path.join(AURORA_HOME, 'agent/knowledge/midjourney_best_practices.md'),
    path.join(AURORA_HOME, 'agent/knowledge/README.md')
  ];

  const existingFiles = knowledgeFiles.filter(f => fs.existsSync(f));

  console.log(`   找到 ${existingFiles.length} 個知識文檔`);
  existingFiles.forEach(f => console.log(`   - ${path.basename(f)}`));
  console.log('');

  // 3. 解析並分塊
  console.log('✂️  Step 3/4: 解析並分塊...');

  const documents = await parser.batchParse(existingFiles);
  const chunks = chunker.batchChunk(documents);

  console.log(`   總計: ${chunks.length} 個文字塊\n`);

  // 4. 添加到向量資料庫
  console.log('🧠 Step 4/4: 生成嵌入向量...');

  await vectorStore.addDocuments(chunks);

  console.log('');

  // 5. 儲存
  await vectorStore.save();

  // 6. 顯示統計
  vectorStore.printStats();

  console.log('🎉 RAG 系統初始化完成！');
  console.log('\n💡 使用方式:');
  console.log('   - 搜尋: npm run rag:search "your query"');
  console.log('   - 攝取: npm run rag:ingest /path/to/file.pdf');
  console.log('   - 統計: node rag/init.js --stats\n');
}

// 執行
init().catch(console.error);
