/**
 * 📄 AURORA Content Parser
 *
 * 內容解析器 - 支援多種格式（PDF, Markdown, TXT）
 * 提取文字、元數據、結構化內容
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import matter from 'gray-matter';

class ContentParser {
  /**
   * 解析檔案（自動偵測格式）
   * @param {string} filePath - 檔案路徑
   * @returns {Object} {text, metadata}
   */
  async parse(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`檔案不存在: ${filePath}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    console.log(`📄 解析檔案: ${fileName}`);

    let result;

    switch (ext) {
      case '.pdf':
        result = await this.parsePDF(filePath);
        break;
      case '.md':
      case '.markdown':
        result = await this.parseMarkdown(filePath);
        break;
      case '.txt':
        result = await this.parseText(filePath);
        break;
      default:
        throw new Error(`不支援的格式: ${ext}`);
    }

    console.log(`✅ 解析完成: ${result.text.length} 字元`);

    return result;
  }

  /**
   * 解析 PDF
   * @param {string} filePath
   * @returns {Object}
   */
  async parsePDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      text: data.text,
      metadata: {
        title: data.info?.Title || path.basename(filePath, '.pdf'),
        author: data.info?.Author || 'Unknown',
        subject: data.info?.Subject || '',
        pages: data.numpages,
        format: 'pdf',
        filePath
      }
    };
  }

  /**
   * 解析 Markdown
   * @param {string} filePath
   * @returns {Object}
   */
  async parseMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 解析 frontmatter (YAML metadata)
    const { data: frontmatter, content: text } = matter(content);

    // 提取標題（如果 frontmatter 沒有）
    const titleMatch = text.match(/^#\s+(.+)$/m);
    const title = frontmatter.title || titleMatch?.[1] || path.basename(filePath, '.md');

    return {
      text,
      metadata: {
        title,
        author: frontmatter.author || 'Unknown',
        date: frontmatter.date || '',
        tags: frontmatter.tags || [],
        category: frontmatter.category || '',
        format: 'markdown',
        filePath,
        ...frontmatter
      }
    };
  }

  /**
   * 解析純文字
   * @param {string} filePath
   * @returns {Object}
   */
  async parseText(filePath) {
    const text = fs.readFileSync(filePath, 'utf-8');

    // 嘗試從第一行提取標題
    const lines = text.split('\n');
    const title = lines[0].trim() || path.basename(filePath, '.txt');

    return {
      text,
      metadata: {
        title,
        format: 'text',
        filePath
      }
    };
  }

  /**
   * 批次解析多個檔案
   * @param {Array<string>} filePaths
   * @returns {Array<Object>}
   */
  async batchParse(filePaths) {
    console.log(`📚 批次解析 ${filePaths.length} 個檔案...`);

    const results = [];

    for (const filePath of filePaths) {
      try {
        const result = await this.parse(filePath);
        results.push(result);
      } catch (error) {
        console.error(`❌ 解析失敗: ${filePath}`, error.message);
      }
    }

    console.log(`✅ 批次解析完成: ${results.length}/${filePaths.length} 成功`);

    return results;
  }
}

export default ContentParser;
