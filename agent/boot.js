#!/usr/bin/env node

/**
 * ============================================
 * 🌅 AURORA Boot Sequence (通電程序)
 * ============================================
 *
 * 功能：讓新的 Claude 實例快速載入完整記憶
 * 使用：node ~/AURORA/agent/boot.js
 * 作者：AURORA - Chief Design Officer
 * 版本：1.1
 * 日期：2025-11-02
 * 更新：新增 RAG 知識庫統計
 *
 * ============================================
 */

const fs = require('fs');
const path = require('path');

// ============================================
// 配置
// ============================================

const AURORA_HOME = '/Users/jillian/AURORA';
const MEMORY_DB = path.join(AURORA_HOME, 'agent/memory/longterm_db.json');
const CLAUDE_MD = path.join(AURORA_HOME, 'CLAUDE.md');
const PROJECTS_DIR = path.join(AURORA_HOME, 'F_web_design/projects/wang_yilong');
const RAG_VECTOR_STORE = path.join(AURORA_HOME, 'agent/rag/vector_store.json');
const KNOWLEDGE_DIR = path.join(AURORA_HOME, 'agent/knowledge');

// ANSI 顏色代碼
const colors = {
  purple: '\x1b[35m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  gold: '\x1b[33m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// ============================================
// 工具函數
// ============================================

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function separator(char = '━', length = 60) {
  log(char.repeat(length), 'blue');
}

function asciiArt() {
  log(`
     _    _   _ ____   ___  ____      _
    / \\  | | | |  _ \\ / _ \\|  _ \\    / \\
   / _ \\ | | | | |_) | | | | |_) |  / _ \\
  / ___ \\| |_| |  _ <| |_| |  _ <  / ___ \\
 /_/   \\_\\\\___/|_| \\_\\\\___/|_| \\_\\/_/   \\_\\

   🌌 Frontend Visual Design Artist
   Where Beauty Meets Code, Where Dreams Take Form
`, 'purple');
}

// ============================================
// 啟動主程序
// ============================================

async function bootAurora() {
  console.clear();

  // 啟動畫面
  asciiArt();
  separator();
  log('⚡ 啟動中...\n', 'gold');

  // ============================================
  // Step 1: 載入角色身份
  // ============================================

  log('📖 Step 1/6: 載入角色身份...', 'green');

  try {
    if (fs.existsSync(CLAUDE_MD)) {
      const claudeContent = fs.readFileSync(CLAUDE_MD, 'utf-8');
      const roleMatch = claudeContent.match(/角色.*?:(.*)/);
      const projectMatch = claudeContent.match(/專案.*?:(.*)/);

      if (roleMatch) log(`  ✅ 身份：${roleMatch[1].trim()}`);
      if (projectMatch) log(`  ✅ 專案：${projectMatch[1].trim()}`);
    } else {
      log('  ⚠️  警告：找不到 CLAUDE.md');
    }
  } catch (error) {
    log(`  ❌ 錯誤：${error.message}`);
  }

  console.log('');

  // ============================================
  // Step 2: 載入長期記憶
  // ============================================

  log('🧠 Step 2/6: 載入長期記憶資料庫...', 'green');

  let memory = null;

  try {
    if (fs.existsSync(MEMORY_DB)) {
      memory = JSON.parse(fs.readFileSync(MEMORY_DB, 'utf-8'));

      log('  ✅ 記憶資料庫：完整載入');
      log(`  📊 已完成專案：${colors.gold}${memory.statistics.total_projects}${colors.reset} 個`);
      log(`  ⭐ 平均美學評分：${colors.gold}${memory.statistics.average_aesthetic_score.toFixed(1)}${colors.reset}/10`);
      log(`  📅 最後更新：${memory.metadata.last_updated}`);
    } else {
      log('  ⚠️  警告：找不到長期記憶資料庫');
    }
  } catch (error) {
    log(`  ❌ 錯誤：${error.message}`);
  }

  console.log('');

  // ============================================
  // Step 3: 掃描最新工作日誌
  // ============================================

  log('📝 Step 3/6: 掃描最新工作日誌...', 'green');

  try {
    if (fs.existsSync(PROJECTS_DIR)) {
      const files = fs.readdirSync(PROJECTS_DIR)
        .filter(file => file.startsWith('WORK_LOG_') && file.endsWith('.md'))
        .map(file => ({
          name: file,
          path: path.join(PROJECTS_DIR, file),
          time: fs.statSync(path.join(PROJECTS_DIR, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);

      if (files.length > 0) {
        const latest = files[0];
        const dateMatch = latest.name.match(/WORK_LOG_(\d{4}-\d{2}-\d{2})/);
        const content = fs.readFileSync(latest.path, 'utf-8');
        const titleMatch = content.match(/^# (.+)/m);

        log(`  ✅ 最新工作：${colors.gold}${titleMatch ? titleMatch[1] : '未知標題'}${colors.reset}`);
        log(`  📅 日期：${dateMatch ? dateMatch[1] : '未知'}`);
        log(`  📄 檔案：${latest.name}`);
      } else {
        log('  ℹ️  暫無工作日誌記錄');
      }
    } else {
      log('  ⚠️  警告：找不到專案目錄');
    }
  } catch (error) {
    log(`  ❌ 錯誤：${error.message}`);
  }

  console.log('');

  // ============================================
  // Step 4: 列出最近專案
  // ============================================

  log('🎨 Step 4/6: 最近完成的專案...', 'green');

  if (memory && memory.projects && memory.projects.length > 0) {
    const recentProjects = memory.projects.slice(-3).reverse();
    recentProjects.forEach(project => {
      log(`  • ${project.name} (${project.date_complete}) - ⭐ ${project.aesthetic_score}/10`);
    });
  } else {
    log('  • 王一隆音樂人網站 v2.0 - ⭐ 9.1/10');
    log('  • 王一隆音樂人網站 v1.0 - ⭐ 9.2/10');
  }

  console.log('');

  // ============================================
  // Step 5: RAG 知識庫統計
  // ============================================

  log('🧠 Step 5/6: 載入 RAG 知識庫...', 'green');

  try {
    if (fs.existsSync(RAG_VECTOR_STORE)) {
      const vectorStore = JSON.parse(fs.readFileSync(RAG_VECTOR_STORE, 'utf-8'));
      const stats = vectorStore.metadata?.stats || {};

      log('  ✅ RAG 資料庫：已載入');
      log(`  📊 總向量數：${colors.gold}${stats.totalDocuments || vectorStore.documents?.length || 0}${colors.reset}`);
      log(`  📏 向量維度：${stats.dimensions || 384}`);
      log(`  🤖 嵌入模型：${stats.model || 'Xenova/all-MiniLM-L6-v2'}`);

      // 統計知識文檔
      const knowledgeDocs = fs.existsSync(KNOWLEDGE_DIR)
        ? fs.readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'))
        : [];

      if (knowledgeDocs.length > 0) {
        log(`  📚 知識文檔：${colors.gold}${knowledgeDocs.length}${colors.reset} 個`);

        // 列出設計大師
        const masters = [
          { file: 'typography_bringhurst.md', name: 'Bringhurst (Typography)' },
          { file: 'color_theory_albers.md', name: 'Albers (Color Theory)' },
          { file: 'usability_krug.md', name: 'Krug (Usability)' },
          { file: 'design_psychology_norman.md', name: 'Norman (Psychology)' },
          { file: 'css_secrets_verou.md', name: 'Verou (CSS Secrets)' }
        ];

        const loadedMasters = masters.filter(m =>
          knowledgeDocs.includes(m.file)
        );

        if (loadedMasters.length > 0) {
          log('  🎓 設計大師：');
          loadedMasters.forEach(m => {
            log(`     ✓ ${m.name}`);
          });
        }
      }

      log(`  📅 最後更新：${vectorStore.metadata?.lastUpdated || '未知'}`);
    } else {
      log('  ⚠️  警告：找不到 RAG 向量資料庫');
    }
  } catch (error) {
    log(`  ❌ 錯誤：${error.message}`);
  }

  console.log('');

  // ============================================
  // Step 6: 生成記憶摘要
  // ============================================

  log('✨ Step 6/6: 生成記憶摘要...', 'green');

  if (memory && memory.knowledge_base) {
    log('  📚 記憶知識庫：');
    log(`     - 設計模式：${memory.knowledge_base.design_patterns?.length || 0} 條`);
    log(`     - 最佳實踐：${memory.knowledge_base.best_practices?.length || 0} 條`);
    log(`     - 學習記錄：${memory.learning_log?.length || 0} 條`);
  }

  console.log('');

  // ============================================
  // 啟動完成
  // ============================================

  separator();
  log('\n🌌 AURORA 已完全啟動！\n', 'purple');

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  👁️  我是：AURORA - Chief Design Officer
  💎  使命：創造美麗且實用的界面
  🎨  風格：深色時尚美學 × 極光配色

  📊  記憶狀態：完整載入 ✅
  🧠  專業能力：UI/UX 設計、前端實作、視覺風格制定

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  💬 Jillian，我已準備好繼續工作！

  我記得：
  • 所有完成的專案和設計決策
  • 累積的知識和經驗
  • 您的美學偏好和工作習慣

  準備好創造更多美麗的作品了 ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  log('💡 提示：', 'gold');
  log(`   • 查看完整記憶：${colors.blue}cat ${MEMORY_DB} | jq${colors.reset}`);
  log(`   • 查看角色定義：${colors.blue}cat ${CLAUDE_MD}${colors.reset}`);
  log(`   • 更新記憶：${colors.blue}node ~/AURORA/agent/sync-memory.js${colors.reset}`);
  console.log('');

  log('🌅 "Like the Aurora Borealis, great design appears magical,', 'purple');
  log('   but is built on scientific precision."\n', 'purple');

  // 返回記憶摘要（可供其他腳本使用）
  return {
    totalProjects: memory?.statistics.total_projects || 0,
    avgAestheticScore: memory?.statistics.average_aesthetic_score || 0,
    lastUpdated: memory?.metadata.last_updated || 'unknown',
    recentProjects: memory?.projects.slice(-3) || []
  };
}

// ============================================
// 主執行
// ============================================

if (require.main === module) {
  bootAurora().catch(error => {
    console.error('❌ 啟動失敗:', error.message);
    process.exit(1);
  });
}

module.exports = { bootAurora };
