#!/usr/bin/env node
/**
 * 📥 AURORA RAG Ingestion CLI
 *
 * 命令行攝取工具
 * 支援書籍、電影、文章
 *
 * @author AURORA - Chief Design Officer
 * @version 1.0.0
 * @date 2025-10-31
 */

import { ingestBook } from '../workflows/ingestBook.js';
import { ingestMovie } from '../workflows/ingestMovie.js';
import fs from 'fs';
import path from 'path';

function printUsage() {
  console.log('');
  console.log('📥 AURORA RAG Ingestion CLI');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('用法:');
  console.log('  npm run rag:ingest -- <type> <file> [options]');
  console.log('');
  console.log('攝取類型:');
  console.log('  book   - 攝取書籍 (PDF, Markdown, TXT)');
  console.log('  movie  - 攝取電影分析 (JSON 格式)');
  console.log('');
  console.log('範例:');
  console.log('  # 攝取書籍');
  console.log('  npm run rag:ingest -- book /path/to/book.pdf');
  console.log('');
  console.log('  # 攝取電影分析');
  console.log('  npm run rag:ingest -- movie /path/to/movie_analysis.json');
  console.log('');
  console.log('選項:');
  console.log('  --title <title>       - 指定標題');
  console.log('  --author <author>     - 指定作者');
  console.log('  --category <category> - 指定分類');
  console.log('  --year <year>         - 指定年份');
  console.log('');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }

  const type = args[0];
  const filePath = args[1];

  if (!filePath) {
    console.error('❌ 錯誤: 請提供檔案路徑\n');
    printUsage();
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ 錯誤: 檔案不存在: ${filePath}\n`);
    process.exit(1);
  }

  // 解析選項
  const options = parseOptions(args.slice(2));

  try {
    switch (type) {
      case 'book':
        await ingestBookCommand(filePath, options);
        break;

      case 'movie':
        await ingestMovieCommand(filePath);
        break;

      default:
        console.error(`❌ 錯誤: 未知的攝取類型: ${type}\n`);
        printUsage();
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ 攝取失敗: ${error.message}\n`);
    process.exit(1);
  }
}

async function ingestBookCommand(filePath, options) {
  const metadata = {
    title: options.title,
    author: options.author,
    category: options.category,
    year: options.year ? parseInt(options.year) : undefined
  };

  // 移除 undefined 值
  Object.keys(metadata).forEach(key => {
    if (metadata[key] === undefined) delete metadata[key];
  });

  await ingestBook(filePath, metadata);
}

async function ingestMovieCommand(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.title || !data.director || !data.year) {
    throw new Error('電影數據必須包含 title, director, year 欄位');
  }

  await ingestMovie(data);
}

function parseOptions(args) {
  const options = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];

      if (value && !value.startsWith('--')) {
        options[key] = value;
        i++;
      }
    }
  }

  return options;
}

main().catch(console.error);
