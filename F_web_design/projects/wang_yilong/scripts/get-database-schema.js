#!/usr/bin/env node

/**
 * 查看 Database 的結構和屬性
 * 用於了解可以設置哪些屬性
 */

const { Client } = require('@notionhq/client');
require('dotenv').config();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('❌ 錯誤：請在 .env 文件中設置 NOTION_TOKEN 和 NOTION_DATABASE_ID');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function getDatabaseSchema() {
  console.log('🔍 查詢 Database 結構...\n');

  try {
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID
    });

    console.log('✅ Database 信息：');
    console.log(`📝 標題: ${database.title?.[0]?.plain_text || '(無標題)'}`);
    console.log(`🆔 ID: ${database.id}`);
    console.log(`🔗 URL: https://notion.so/${database.id.replace(/-/g, '')}\n`);

    console.log('📋 屬性列表：\n');

    Object.entries(database.properties).forEach(([name, prop]) => {
      console.log(`• ${name}`);
      console.log(`  類型: ${prop.type}`);

      if (prop.type === 'select' && prop.select?.options) {
        console.log(`  選項: ${prop.select.options.map(o => o.name).join(', ')}`);
      }

      if (prop.type === 'multi_select' && prop.multi_select?.options) {
        console.log(`  選項: ${prop.multi_select.options.map(o => o.name).join(', ')}`);
      }

      console.log('');
    });

    console.log('\n💡 使用提示：');
    console.log('根據上面的屬性，您可以在 push-to-notion.js 的 properties 中添加對應的值\n');

    // 生成示例代碼
    console.log('📝 示例代碼：');
    console.log('```javascript');
    console.log('properties: {');

    Object.entries(database.properties).forEach(([name, prop]) => {
      if (prop.type === 'title') {
        console.log(`  "${name}": {`);
        console.log(`    title: [{ text: { content: pageTitle } }]`);
        console.log(`  },`);
      } else if (prop.type === 'date') {
        console.log(`  "${name}": {`);
        console.log(`    date: { start: new Date().toISOString().split('T')[0] }`);
        console.log(`  },`);
      } else if (prop.type === 'select') {
        const firstOption = prop.select?.options?.[0]?.name || 'Option1';
        console.log(`  "${name}": {`);
        console.log(`    select: { name: "${firstOption}" }`);
        console.log(`  },`);
      } else if (prop.type === 'multi_select') {
        const firstOption = prop.multi_select?.options?.[0]?.name || 'Tag1';
        console.log(`  "${name}": {`);
        console.log(`    multi_select: [{ name: "${firstOption}" }]`);
        console.log(`  },`);
      } else if (prop.type === 'checkbox') {
        console.log(`  "${name}": {`);
        console.log(`    checkbox: true`);
        console.log(`  },`);
      } else if (prop.type === 'url') {
        console.log(`  "${name}": {`);
        console.log(`    url: "https://example.com"`);
        console.log(`  },`);
      } else if (prop.type === 'rich_text') {
        console.log(`  "${name}": {`);
        console.log(`    rich_text: [{ text: { content: "文字內容" } }]`);
        console.log(`  },`);
      }
    });

    console.log('}');
    console.log('```');

  } catch (error) {
    console.error('❌ 查詢失敗:', error.message);
    throw error;
  }
}

getDatabaseSchema().catch(error => {
  console.error('\n💥 執行失敗');
  process.exit(1);
});
