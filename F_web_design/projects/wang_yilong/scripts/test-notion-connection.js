#!/usr/bin/env node

/**
 * 測試 Notion API 連接
 * 檢查 Integration 可以訪問哪些資源
 */

const { Client } = require('@notionhq/client');
require('dotenv').config();

const NOTION_TOKEN = process.env.NOTION_TOKEN;

if (!NOTION_TOKEN) {
  console.error('❌ 錯誤：請在 .env 文件中設置 NOTION_TOKEN');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

async function testConnection() {
  console.log('🔍 測試 Notion API 連接...\n');

  try {
    // 1. 測試 Token 是否有效
    console.log('1️⃣ 測試 Token 有效性...');
    const response = await notion.search({
      query: '',
      page_size: 10
    });

    console.log('✅ Token 有效！');
    console.log(`📊 找到 ${response.results.length} 個可訪問的資源\n`);

    // 2. 列出所有可訪問的資源
    if (response.results.length === 0) {
      console.log('⚠️  警告：沒有找到任何可訪問的頁面或資料庫');
      console.log('\n💡 請在 Notion 中授權 Integration：');
      console.log('   1. 打開您想要推送的 Notion 頁面');
      console.log('   2. 點擊右上角的 "..." (更多選項)');
      console.log('   3. 選擇 "Add connections"');
      console.log('   4. 搜索並選擇您的 Integration');
      console.log('   5. 點擊 "Confirm"\n');
    } else {
      console.log('📄 可訪問的資源列表：\n');

      response.results.forEach((item, index) => {
        console.log(`${index + 1}. ${item.object.toUpperCase()}`);

        if (item.object === 'page') {
          const title = item.properties?.title?.title?.[0]?.plain_text ||
                       item.properties?.Name?.title?.[0]?.plain_text ||
                       '(無標題)';
          console.log(`   標題: ${title}`);
          console.log(`   ID: ${item.id}`);
          console.log(`   URL: https://notion.so/${item.id.replace(/-/g, '')}`);
        } else if (item.object === 'database') {
          const title = item.title?.[0]?.plain_text || '(無標題)';
          console.log(`   標題: ${title}`);
          console.log(`   ID: ${item.id}`);
          console.log(`   URL: https://notion.so/${item.id.replace(/-/g, '')}`);
        }
        console.log('');
      });

      console.log('\n💡 提示：複製上面的 ID 並更新 .env 文件中的 NOTION_DATABASE_ID');
    }

  } catch (error) {
    console.error('❌ 連接失敗:', error.message);

    if (error.code === 'unauthorized') {
      console.error('\n💡 Token 無效或已過期');
      console.error('   請重新生成 Token：https://www.notion.so/my-integrations');
    }

    throw error;
  }
}

testConnection().catch(error => {
  console.error('\n💥 測試失敗');
  process.exit(1);
});
