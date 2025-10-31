/**
 * ✂️ AURORA Chunk Processor
 *
 * 文字分塊處理器 - 智能分割長文檔
 * 支援多種分塊策略（語義、固定長度、結構化）
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

class ChunkProcessor {
  constructor(options = {}) {
    this.maxLength = options.maxLength || 500;    // 最大字數
    this.minLength = options.minLength || 100;    // 最小字數
    this.overlap = options.overlap || 50;         // 重疊字數
    this.strategy = options.strategy || 'semantic'; // 分塊策略
  }

  /**
   * 分塊處理（主入口）
   * @param {string} text - 要分塊的文字
   * @param {Object} options - 選項
   * @returns {Array<string>} 分塊結果
   */
  chunk(text, options = {}) {
    const strategy = options.strategy || this.strategy;

    switch (strategy) {
      case 'semantic':
        return this.chunkBySemantic(text);
      case 'fixed':
        return this.chunkByFixedLength(text);
      case 'paragraph':
        return this.chunkByParagraph(text);
      case 'markdown':
        return this.chunkByMarkdown(text);
      default:
        return this.chunkBySemantic(text);
    }
  }

  /**
   * 語義分塊（推薦）
   * 按段落分割，保持語義完整性
   * @param {string} text
   * @returns {Array<string>}
   */
  chunkBySemantic(text) {
    // 按段落分割（兩個以上換行符）
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim());

    const chunks = [];
    let currentChunk = '';

    for (const para of paragraphs) {
      const paraText = para.trim();

      // 如果當前塊 + 新段落 < 最大長度，合併
      if ((currentChunk + '\n\n' + paraText).length <= this.maxLength) {
        currentChunk = currentChunk
          ? currentChunk + '\n\n' + paraText
          : paraText;
      } else {
        // 當前塊已滿，儲存並開始新塊
        if (currentChunk && currentChunk.length >= this.minLength) {
          chunks.push(currentChunk);
        }

        // 如果單個段落太長，強制分割
        if (paraText.length > this.maxLength) {
          const subChunks = this.splitLongParagraph(paraText);
          chunks.push(...subChunks);
          currentChunk = '';
        } else {
          currentChunk = paraText;
        }
      }
    }

    // 添加最後一塊
    if (currentChunk && currentChunk.length >= this.minLength) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  /**
   * 固定長度分塊
   * @param {string} text
   * @returns {Array<string>}
   */
  chunkByFixedLength(text) {
    const chunks = [];
    const step = this.maxLength - this.overlap;

    for (let i = 0; i < text.length; i += step) {
      const chunk = text.slice(i, i + this.maxLength);

      if (chunk.length >= this.minLength) {
        chunks.push(chunk);
      }
    }

    return chunks;
  }

  /**
   * 按段落分塊
   * @param {string} text
   * @returns {Array<string>}
   */
  chunkByParagraph(text) {
    const paragraphs = text.split(/\n+/).filter(p => p.trim());

    return paragraphs.filter(p => p.length >= this.minLength);
  }

  /**
   * Markdown 結構化分塊
   * 按標題層級分割
   * @param {string} text
   * @returns {Array<string>}
   */
  chunkByMarkdown(text) {
    const chunks = [];

    // 按 H1/H2 標題分割
    const sections = text.split(/^#+\s+/m).filter(Boolean);

    for (const section of sections) {
      if (section.length >= this.minLength) {
        if (section.length <= this.maxLength) {
          chunks.push(section.trim());
        } else {
          // 太長的 section 再細分
          const subChunks = this.chunkBySemantic(section);
          chunks.push(...subChunks);
        }
      }
    }

    return chunks;
  }

  /**
   * 分割過長的段落
   * @param {string} paragraph
   * @returns {Array<string>}
   */
  splitLongParagraph(paragraph) {
    const chunks = [];

    // 嘗試按句子分割
    const sentences = this.splitBySentence(paragraph);

    let currentChunk = '';

    for (const sentence of sentences) {
      if ((currentChunk + ' ' + sentence).length <= this.maxLength) {
        currentChunk = currentChunk
          ? currentChunk + ' ' + sentence
          : sentence;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = sentence;
      }
    }

    if (currentChunk) chunks.push(currentChunk);

    return chunks;
  }

  /**
   * 按句子分割
   * @param {string} text
   * @returns {Array<string>}
   */
  splitBySentence(text) {
    // 支援中英文句子結尾
    return text.split(/([。！？.!?]+)/).reduce((acc, part, i, arr) => {
      if (i % 2 === 0) {
        const sentence = part + (arr[i + 1] || '');
        if (sentence.trim()) acc.push(sentence.trim());
      }
      return acc;
    }, []);
  }

  /**
   * 批次分塊
   * @param {Array<{text: string, metadata: Object}>} documents
   * @returns {Array<{text: string, metadata: Object}>}
   */
  batchChunk(documents) {
    console.log(`✂️  批次分塊 ${documents.length} 個文檔...`);

    const allChunks = [];

    for (const doc of documents) {
      const chunks = this.chunk(doc.text);

      for (let i = 0; i < chunks.length; i++) {
        allChunks.push({
          text: chunks[i],
          metadata: {
            ...doc.metadata,
            chunkIndex: i,
            totalChunks: chunks.length
          }
        });
      }
    }

    console.log(`✅ 分塊完成: ${documents.length} 個文檔 → ${allChunks.length} 個塊`);

    return allChunks;
  }

  /**
   * 取得統計資訊
   * @param {Array<string>} chunks
   * @returns {Object}
   */
  getStats(chunks) {
    const lengths = chunks.map(c => c.length);

    return {
      totalChunks: chunks.length,
      totalCharacters: lengths.reduce((sum, len) => sum + len, 0),
      avgLength: Math.round(lengths.reduce((sum, len) => sum + len, 0) / chunks.length),
      minLength: Math.min(...lengths),
      maxLength: Math.max(...lengths)
    };
  }
}

export default ChunkProcessor;
