/**
 * 📚 AURORA Book Ingestion Workflow
 *
 * 書籍攝取工作流程
 * 支援 PDF, TXT, Markdown 格式
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import LocalVectorStore from '../vector_db/LocalVectorStore.js';
import ContentParser from '../ingestion/ContentParser.js';
import ChunkProcessor from '../ingestion/ChunkProcessor.js';
import path from 'path';

/**
 * 攝取單本書籍
 * @param {string} bookPath - 書籍檔案路徑
 * @param {Object} metadata - 書籍元數據
 */
async function ingestBook(bookPath, metadata = {}) {
  console.log('\n📚 AURORA Book Ingestion');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const bookName = path.basename(bookPath);
  console.log(`📖 書籍: ${bookName}`);
  console.log('');

  // 1. 初始化組件
  console.log('🔧 Step 1/5: 初始化組件...');

  const vectorStore = new LocalVectorStore();
  const parser = new ContentParser();
  const chunker = new ChunkProcessor({
    maxLength: 500,
    minLength: 100,
    overlap: 50,
    strategy: 'semantic'
  });

  await vectorStore.initialize();
  await vectorStore.load();

  console.log('✅ 組件就緒\n');

  // 2. 解析書籍
  console.log('📄 Step 2/5: 解析書籍內容...');

  const { text, metadata: parsedMeta } = await parser.parse(bookPath);

  console.log(`   字數: ${text.length} 字元`);
  console.log('✅ 解析完成\n');

  // 3. 分塊
  console.log('✂️  Step 3/5: 智能分塊...');

  const chunks = chunker.chunk(text);
  const stats = chunker.getStats(chunks);

  console.log(`   總塊數: ${stats.totalChunks}`);
  console.log(`   平均長度: ${stats.avgLength} 字元`);
  console.log(`   範圍: ${stats.minLength} - ${stats.maxLength} 字元`);
  console.log('✅ 分塊完成\n');

  // 4. 生成嵌入
  console.log('🧠 Step 4/5: 生成嵌入向量...');
  console.log('   (這可能需要幾分鐘...)\n');

  const documents = chunks.map((chunk, i) => ({
    text: chunk,
    metadata: {
      source: 'book',
      title: metadata.title || parsedMeta.title,
      author: metadata.author || parsedMeta.author,
      category: metadata.category || 'general',
      year: metadata.year,
      pages: parsedMeta.pages,
      chunkIndex: i,
      totalChunks: chunks.length,
      filePath: bookPath
    }
  }));

  await vectorStore.addDocuments(documents);

  console.log('✅ 嵌入完成\n');

  // 5. 儲存
  console.log('💾 Step 5/5: 儲存到向量資料庫...');

  await vectorStore.save();

  console.log('');

  // 顯示統計
  vectorStore.printStats();

  console.log('🎉 書籍攝取完成！\n');

  return {
    success: true,
    title: metadata.title || parsedMeta.title,
    chunks: chunks.length,
    totalDocuments: vectorStore.embeddings.length
  };
}

/**
 * 批次攝取多本書籍
 * @param {Array<{path: string, metadata: Object}>} books
 */
async function batchIngestBooks(books) {
  console.log(`\n📚 批次攝取 ${books.length} 本書籍`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    console.log(`[${i + 1}/${books.length}] ${book.metadata.title || path.basename(book.path)}`);
    console.log('');

    try {
      const result = await ingestBook(book.path, book.metadata);
      results.push({ ...result, path: book.path });
    } catch (error) {
      console.error(`❌ 攝取失敗: ${error.message}\n`);
      results.push({
        success: false,
        path: book.path,
        error: error.message
      });
    }
  }

  // 總結
  console.log('\n📊 批次攝取總結');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ 成功: ${successful.length}/${books.length}`);
  console.log(`❌ 失敗: ${failed.length}/${books.length}`);

  if (successful.length > 0) {
    console.log('\n成功的書籍:');
    successful.forEach(r => {
      console.log(`   - ${r.title} (${r.chunks} 個塊)`);
    });
  }

  if (failed.length > 0) {
    console.log('\n失敗的書籍:');
    failed.forEach(r => {
      console.log(`   - ${path.basename(r.path)}: ${r.error}`);
    });
  }

  console.log('');

  return results;
}

export { ingestBook, batchIngestBooks };
export default ingestBook;
