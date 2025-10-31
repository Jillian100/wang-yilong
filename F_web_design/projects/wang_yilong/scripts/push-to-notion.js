#!/usr/bin/env node

/**
 * 自動推送 Changelog 到 Notion
 *
 * 使用方法：
 * npm run push-to-notion
 *
 * 或者：
 * node scripts/push-to-notion.js CHANGELOG_2025-10-23.md
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// ========================================
// 配置
// ========================================

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('❌ 錯誤：請在 .env 文件中設置 NOTION_TOKEN 和 NOTION_DATABASE_ID');
  process.exit(1);
}

// 初始化 Notion 客戶端
const notion = new Client({ auth: NOTION_TOKEN });

// ========================================
// Markdown 轉 Notion Blocks
// ========================================

function markdownToNotionBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let currentCodeBlock = null;
  let currentCodeLanguage = 'javascript';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 處理代碼塊
    if (line.startsWith('```')) {
      if (currentCodeBlock === null) {
        // 開始代碼塊
        let language = line.slice(3).trim() || 'plain text';

        // Notion 支持的語言列表（部分）
        const supportedLanguages = [
          'bash', 'shell', 'javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#',
          'css', 'html', 'json', 'xml', 'yaml', 'markdown', 'sql', 'go', 'rust',
          'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'lua',
          'plain text'
        ];

        // 如果語言不被支持，使用 plain text
        if (!supportedLanguages.includes(language.toLowerCase())) {
          language = 'plain text';
        }

        currentCodeLanguage = language;
        currentCodeBlock = [];
      } else {
        // 結束代碼塊
        blocks.push({
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{
              type: 'text',
              text: { content: currentCodeBlock.join('\n') }
            }],
            language: currentCodeLanguage
          }
        });
        currentCodeBlock = null;
      }
      continue;
    }

    // 在代碼塊內
    if (currentCodeBlock !== null) {
      currentCodeBlock.push(line);
      continue;
    }

    // 處理標題
    if (line.startsWith('# ')) {
      blocks.push({
        object: 'block',
        type: 'heading_1',
        heading_1: {
          rich_text: [{ type: 'text', text: { content: line.slice(2) } }]
        }
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: line.slice(3) } }]
        }
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: line.slice(4) } }]
        }
      });
    }
    // 處理分隔線
    else if (line.trim() === '---') {
      blocks.push({
        object: 'block',
        type: 'divider',
        divider: {}
      });
    }
    // 處理列表項
    else if (line.match(/^[-*]\s/)) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{ type: 'text', text: { content: line.slice(2) } }]
        }
      });
    }
    else if (line.match(/^\d+\.\s/)) {
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\.\s/, '') } }]
        }
      });
    }
    // 處理普通段落
    else if (line.trim().length > 0) {
      // 處理粗體和代碼
      const richText = parseRichText(line);
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: richText
        }
      });
    }
  }

  return blocks;
}

// 解析富文本（支持粗體、代碼等）
function parseRichText(text) {
  const richText = [];

  // 簡單實現：將整行作為普通文本
  // 可以擴展以支持更多格式
  richText.push({
    type: 'text',
    text: { content: text }
  });

  return richText;
}

// ========================================
// 推送到 Notion
// ========================================

async function pushToNotion(changelogPath) {
  try {
    console.log('📖 讀取 Changelog 文件...');
    const markdown = fs.readFileSync(changelogPath, 'utf-8');

    console.log('🔄 轉換 Markdown 為 Notion Blocks...');
    const blocks = markdownToNotionBlocks(markdown);

    console.log(`✅ 成功轉換 ${blocks.length} 個 blocks`);

    // 提取標題作為頁面標題
    const firstLine = markdown.split('\n')[0];
    const pageTitle = firstLine.startsWith('# ') ? firstLine.slice(2) : '開發日誌';

    console.log('🚀 推送到 Notion...');

    // 創建新頁面（作為 Database 記錄）
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Name: {  // 標題
          title: [
            {
              text: {
                content: pageTitle
              }
            }
          ]
        },
        Type: {  // 自動分類為 Claude Code
          select: {
            name: "Claude Code"
          }
        }
      },
      children: blocks.slice(0, 100) // Notion 限制一次最多 100 個 blocks
    });

    console.log('✅ 成功推送到 Notion！');
    console.log(`🔗 頁面鏈接: https://notion.so/${response.id.replace(/-/g, '')}`);

    // 如果有超過 100 個 blocks，繼續添加
    if (blocks.length > 100) {
      console.log(`📝 繼續添加剩餘的 ${blocks.length - 100} 個 blocks...`);
      for (let i = 100; i < blocks.length; i += 100) {
        const chunk = blocks.slice(i, i + 100);
        await notion.blocks.children.append({
          block_id: response.id,
          children: chunk
        });
      }
      console.log('✅ 所有內容已添加完成！');
    }

    return response;
  } catch (error) {
    console.error('❌ 推送失敗:', error.message);
    if (error.code === 'object_not_found') {
      console.error('\n💡 提示：請確保：');
      console.error('1. Notion Integration 已經被授權訪問該 Database');
      console.error('2. Database ID 正確');
      console.error('3. 在 Notion 中點擊 Database，然後點擊右上角的 "..." -> "Add connections" -> 選擇你的 Integration');
    }
    throw error;
  }
}

// ========================================
// 主函數
// ========================================

async function main() {
  const args = process.argv.slice(2);
  let changelogPath;

  if (args.length > 0) {
    changelogPath = path.resolve(args[0]);
  } else {
    // 默認使用最新的 CHANGELOG 文件
    changelogPath = path.resolve(__dirname, '..', 'CHANGELOG_2025-10-23.md');
  }

  if (!fs.existsSync(changelogPath)) {
    console.error(`❌ 錯誤：找不到文件 ${changelogPath}`);
    process.exit(1);
  }

  console.log(`📂 文件路徑: ${changelogPath}`);

  await pushToNotion(changelogPath);

  // ========================================
  // 🔄 自動同步到長期記憶（如果是工作日誌）
  // ========================================
  if (path.basename(changelogPath).startsWith('WORK_LOG_')) {
    console.log('\n🔄 檢測到工作日誌，開始同步到長期記憶...');
    try {
      const { syncWorkLogToMemory } = require(path.join(__dirname, '../../../agent/sync-memory.js'));
      await syncWorkLogToMemory(changelogPath);
      console.log('✅ 記憶同步完成！');
    } catch (error) {
      console.error('⚠️  記憶同步失敗:', error.message);
      console.error('   工作日誌已推送到 Notion，但未同步到本地記憶');
    }
  }
}

// 執行
if (require.main === module) {
  main().catch(error => {
    console.error('💥 執行失敗:', error);
    process.exit(1);
  });
}

module.exports = { pushToNotion, markdownToNotionBlocks };
