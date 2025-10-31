/**
 * 🎬 AURORA Movie Analysis Ingestion
 *
 * 電影分析攝取工作流程
 * 記錄電影的視覺風格、色彩、構圖、場景設計
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import LocalVectorStore from '../vector_db/LocalVectorStore.js';
import ChunkProcessor from '../ingestion/ChunkProcessor.js';

/**
 * 電影分析數據結構
 * @typedef {Object} MovieAnalysis
 * @property {string} title - 電影標題
 * @property {string} director - 導演
 * @property {number} year - 年份
 * @property {string} genre - 類型
 * @property {string} visualStyle - 視覺風格描述
 * @property {string} colorPalette - 色彩分析
 * @property {string} composition - 構圖技巧
 * @property {string} sceneDesign - 場景設計
 * @property {string} [lighting] - 燈光分析
 * @property {string} [cinematography] - 攝影技巧
 * @property {Array<string>} [keyScenes] - 關鍵場景描述
 */

/**
 * 攝取電影分析
 * @param {MovieAnalysis} movieData
 */
async function ingestMovie(movieData) {
  console.log('\n🎬 AURORA Movie Analysis Ingestion');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(`🎥 電影: ${movieData.title} (${movieData.year})`);
  console.log(`🎬 導演: ${movieData.director}`);
  console.log('');

  // 1. 初始化組件
  console.log('🔧 Step 1/4: 初始化組件...');

  const vectorStore = new LocalVectorStore();
  const chunker = new ChunkProcessor({
    maxLength: 500,
    minLength: 100,
    overlap: 50,
    strategy: 'semantic'
  });

  await vectorStore.initialize();
  await vectorStore.load();

  console.log('✅ 組件就緒\n');

  // 2. 構建分析內容
  console.log('📝 Step 2/4: 構建分析內容...');

  const content = buildMovieAnalysisContent(movieData);

  console.log(`   字數: ${content.length} 字元`);
  console.log('✅ 內容就緒\n');

  // 3. 分塊
  console.log('✂️  Step 3/4: 智能分塊...');

  const chunks = chunker.chunk(content, { strategy: 'markdown' });

  console.log(`   總塊數: ${chunks.length}`);
  console.log('✅ 分塊完成\n');

  // 4. 添加到向量資料庫
  console.log('🧠 Step 4/4: 生成嵌入向量...');

  const documents = chunks.map((chunk, i) => ({
    text: chunk,
    metadata: {
      source: 'movie',
      title: movieData.title,
      director: movieData.director,
      year: movieData.year,
      genre: movieData.genre,
      category: 'visual-analysis',
      chunkIndex: i,
      totalChunks: chunks.length
    }
  }));

  await vectorStore.addDocuments(documents);

  console.log('✅ 嵌入完成\n');

  // 5. 儲存
  await vectorStore.save();

  vectorStore.printStats();

  console.log('🎉 電影分析攝取完成！\n');

  return {
    success: true,
    title: movieData.title,
    chunks: chunks.length
  };
}

/**
 * 構建電影分析內容
 * @param {MovieAnalysis} movieData
 * @returns {string}
 */
function buildMovieAnalysisContent(movieData) {
  const sections = [];

  // 基本資訊
  sections.push(`# ${movieData.title} (${movieData.year})`);
  sections.push(`**導演**: ${movieData.director}`);
  sections.push(`**類型**: ${movieData.genre}`);
  sections.push('');

  // 視覺風格
  if (movieData.visualStyle) {
    sections.push('## 視覺風格 (Visual Style)');
    sections.push(movieData.visualStyle);
    sections.push('');
  }

  // 色彩分析
  if (movieData.colorPalette) {
    sections.push('## 色彩分析 (Color Palette)');
    sections.push(movieData.colorPalette);
    sections.push('');
  }

  // 構圖技巧
  if (movieData.composition) {
    sections.push('## 構圖技巧 (Composition)');
    sections.push(movieData.composition);
    sections.push('');
  }

  // 場景設計
  if (movieData.sceneDesign) {
    sections.push('## 場景設計 (Scene Design)');
    sections.push(movieData.sceneDesign);
    sections.push('');
  }

  // 燈光分析
  if (movieData.lighting) {
    sections.push('## 燈光分析 (Lighting)');
    sections.push(movieData.lighting);
    sections.push('');
  }

  // 攝影技巧
  if (movieData.cinematography) {
    sections.push('## 攝影技巧 (Cinematography)');
    sections.push(movieData.cinematography);
    sections.push('');
  }

  // 關鍵場景
  if (movieData.keyScenes && movieData.keyScenes.length > 0) {
    sections.push('## 關鍵場景 (Key Scenes)');
    movieData.keyScenes.forEach((scene, i) => {
      sections.push(`### 場景 ${i + 1}`);
      sections.push(scene);
      sections.push('');
    });
  }

  return sections.join('\n');
}

/**
 * 批次攝取多部電影
 * @param {Array<MovieAnalysis>} movies
 */
async function batchIngestMovies(movies) {
  console.log(`\n🎬 批次攝取 ${movies.length} 部電影分析`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const results = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];

    console.log(`[${i + 1}/${movies.length}] ${movie.title}`);
    console.log('');

    try {
      const result = await ingestMovie(movie);
      results.push(result);
    } catch (error) {
      console.error(`❌ 攝取失敗: ${error.message}\n`);
      results.push({
        success: false,
        title: movie.title,
        error: error.message
      });
    }
  }

  // 總結
  console.log('\n📊 批次攝取總結');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ 成功: ${successful.length}/${movies.length}`);
  console.log(`❌ 失敗: ${failed.length}/${movies.length}\n`);

  return results;
}

export { ingestMovie, batchIngestMovies };
export default ingestMovie;
