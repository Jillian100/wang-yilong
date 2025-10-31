#!/usr/bin/env node

/**
 * ============================================
 * 🔄 AURORA Memory Sync (記憶同步工具)
 * ============================================
 *
 * 功能：從工作日誌自動提取資訊並同步到長期記憶
 * 使用：node ~/AURORA/agent/sync-memory.js <WORK_LOG_FILE>
 * 作者：AURORA - Chief Design Officer
 * 版本：1.0
 * 日期：2025-10-31
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

// ANSI 顏色
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gold: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// ============================================
// 工作日誌解析函數
// ============================================

/**
 * 從工作日誌標題提取日期
 */
function extractDate(markdown) {
  const match = markdown.match(/WORK_LOG_(\d{4}-\d{2}-\d{2})|日期.*?(\d{4}-\d{2}-\d{2})/);
  return match ? (match[1] || match[2]) : new Date().toISOString().split('T')[0];
}

/**
 * 提取工作標題
 */
function extractTitle(markdown) {
  const match = markdown.match(/^# (.+)/m);
  if (match) {
    return match[1].replace(/^🎨 工作日誌 - /, '').trim();
  }
  return '未命名工作';
}

/**
 * 提取任務概述
 */
function extractSummary(markdown) {
  const match = markdown.match(/## 📋 任務概述\n\n### 🎯 目標\n(.+?)(?=\n\n###|\n\n##|$)/s);
  return match ? match[1].trim() : '';
}

/**
 * 提取已完成項目
 */
function extractAchievements(markdown) {
  const match = markdown.match(/### ✅ 已完成\n([\s\S]+?)(?=\n\n###|\n\n##|$)/);
  if (!match) return [];

  return match[1]
    .split('\n')
    .filter(line => line.trim().startsWith('- [x]'))
    .map(line => line.replace(/^- \[x\]\s*/, '').trim());
}

/**
 * 提取交付物
 */
function extractDeliverables(markdown) {
  const match = markdown.match(/### 📦 交付物清單\n([\s\S]+?)(?=\n\n###|\n\n##|$)/);
  if (!match) return [];

  return match[1]
    .split('\n')
    .filter(line => line.trim().match(/^\d+\./))
    .map(line => line.replace(/^\d+\.\s*\*\*/, '').replace(/\*\*.*/, '').trim());
}

/**
 * 提取學習經驗
 */
function extractLearnings(markdown) {
  const learnings = [];

  // 提取「核心發現」
  const coreMatch = markdown.match(/### 🌟 \*\*核心發現\*\*\n\n([\s\S]+?)(?=\n\n###|\n\n##|$)/);
  if (coreMatch) {
    const items = coreMatch[1].split('\n').filter(line => line.trim().startsWith('-'));
    items.forEach(item => {
      learnings.push(item.replace(/^-\s*/, '').trim());
    });
  }

  // 提取「設計洞察」
  const insightMatch = markdown.match(/## 💡 設計洞察與經驗傳承\n\n([\s\S]+?)(?=\n\n---|\n\n##|$)/);
  if (insightMatch) {
    const sections = insightMatch[1].split('####');
    sections.forEach(section => {
      const titleMatch = section.match(/\d+\.\s*(.+)/);
      if (titleMatch) {
        learnings.push(titleMatch[1].trim());
      }
    });
  }

  return learnings;
}

/**
 * 提取技術標籤
 */
function extractTechnologies(markdown) {
  const technologies = new Set();

  // 從技術棧部分提取
  const techMatch = markdown.match(/技術.*?[:：]\s*(.+)/gi);
  if (techMatch) {
    techMatch.forEach(match => {
      const techs = match.split(/[,，、]/);
      techs.forEach(tech => {
        const cleaned = tech.replace(/技術.*?[:：]/, '').trim();
        if (cleaned && cleaned.length < 30) {
          technologies.add(cleaned);
        }
      });
    });
  }

  // 從常見技術關鍵字提取
  const keywords = ['Midjourney', 'City Pop', 'Notion', 'CSS', 'JavaScript', 'HTML', 'Tailwind', 'React', 'Vue'];
  keywords.forEach(keyword => {
    if (markdown.includes(keyword)) {
      technologies.add(keyword);
    }
  });

  return Array.from(technologies);
}

// ============================================
// 記憶同步主函數
// ============================================

async function syncWorkLogToMemory(workLogPath) {
  try {
    log('\n🔄 開始同步工作日誌到長期記憶...\n', 'blue');

    // 1. 讀取工作日誌
    log('📖 Step 1/5: 讀取工作日誌...', 'green');
    if (!fs.existsSync(workLogPath)) {
      throw new Error(`找不到工作日誌：${workLogPath}`);
    }

    const markdown = fs.readFileSync(workLogPath, 'utf-8');
    log(`  ✅ 已讀取：${path.basename(workLogPath)}`, 'green');

    // 2. 解析工作日誌
    log('\n🔍 Step 2/5: 解析工作日誌內容...', 'green');

    const workEntry = {
      date: extractDate(markdown),
      title: extractTitle(markdown),
      summary: extractSummary(markdown),
      achievements: extractAchievements(markdown),
      deliverables: extractDeliverables(markdown),
      learnings: extractLearnings(markdown),
      technologies: extractTechnologies(markdown),
      source_file: path.basename(workLogPath)
    };

    log(`  📅 日期：${workEntry.date}`, 'green');
    log(`  📝 標題：${workEntry.title}`, 'green');
    log(`  ✅ 成就：${workEntry.achievements.length} 項`, 'green');
    log(`  📦 交付物：${workEntry.deliverables.length} 項`, 'green');
    log(`  💡 學習：${workEntry.learnings.length} 條`, 'green');
    log(`  🔧 技術：${workEntry.technologies.join(', ')}`, 'green');

    // 3. 載入長期記憶
    log('\n🧠 Step 3/5: 載入長期記憶資料庫...', 'green');

    if (!fs.existsSync(MEMORY_DB)) {
      throw new Error(`找不到長期記憶資料庫：${MEMORY_DB}`);
    }

    const memory = JSON.parse(fs.readFileSync(MEMORY_DB, 'utf-8'));
    log('  ✅ 記憶資料庫已載入', 'green');

    // 4. 更新記憶
    log('\n✨ Step 4/5: 更新記憶資料庫...', 'green');

    // 4.1 添加到學習日誌
    const learningEntry = {
      date: workEntry.date,
      topic: workEntry.title,
      lesson: workEntry.summary || `完成${workEntry.achievements.length}項任務`,
      importance: 'high',
      applied_to: ['wang_yilong'],
      achievements: workEntry.achievements,
      deliverables: workEntry.deliverables,
      source_file: workEntry.source_file
    };

    memory.learning_log.push(learningEntry);
    log('  ✅ 已添加學習記錄', 'green');

    // 4.2 更新知識庫（如果有新的學習經驗）
    if (workEntry.learnings.length > 0) {
      workEntry.learnings.forEach((learning, index) => {
        const knowledgeEntry = {
          id: `kb_${workEntry.date}_${index + 1}`,
          category: 'experience',
          title: learning.substring(0, 50),
          description: learning,
          tags: workEntry.technologies,
          source_project: workEntry.title,
          created_date: workEntry.date,
          usefulness_score: 8
        };

        if (!memory.knowledge_base.code_snippets) {
          memory.knowledge_base.code_snippets = [];
        }
        memory.knowledge_base.code_snippets.push(knowledgeEntry);
      });

      log(`  ✅ 已添加 ${workEntry.learnings.length} 條知識`, 'green');
    }

    // 4.3 更新統計數據
    const oldStats = { ...memory.statistics };

    // 更新技術使用統計
    workEntry.technologies.forEach(tech => {
      if (!memory.statistics.technologies_used) {
        memory.statistics.technologies_used = {};
      }
      memory.statistics.technologies_used[tech] =
        (memory.statistics.technologies_used[tech] || 0) + 1;
    });

    // 更新元數據
    memory.metadata.last_updated = new Date().toISOString().split('T')[0];

    log('  ✅ 已更新統計數據', 'green');

    // 5. 保存記憶
    log('\n💾 Step 5/5: 保存到長期記憶資料庫...', 'green');

    // 備份舊記憶
    const backupPath = MEMORY_DB.replace('.json', `.backup_${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(memory, null, 2));
    log(`  💾 已備份舊記憶：${path.basename(backupPath)}`, 'green');

    // 保存新記憶
    fs.writeFileSync(MEMORY_DB, JSON.stringify(memory, null, 2));
    log('  ✅ 新記憶已保存', 'green');

    // 完成
    log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
    log('✅ 記憶同步完成！\n', 'gold');

    // 顯示摘要
    console.log(`
📊 同步摘要
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📅 日期：${workEntry.date}
  📝 標題：${workEntry.title}
  ✅ 成就：${workEntry.achievements.length} 項
  📦 交付物：${workEntry.deliverables.length} 項
  💡 新增學習：${workEntry.learnings.length} 條
  🔧 技術標籤：${workEntry.technologies.join(', ')}

📚 長期記憶統計
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📖 學習記錄：${memory.learning_log.length} 條
  💎 知識庫條目：${Object.values(memory.knowledge_base).reduce((sum, arr) => sum + arr.length, 0)} 條
  📅 最後更新：${memory.metadata.last_updated}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);

    return {
      success: true,
      workEntry,
      memoryStats: {
        totalLearnings: memory.learning_log.length,
        totalKnowledge: Object.values(memory.knowledge_base).reduce((sum, arr) => sum + arr.length, 0)
      }
    };

  } catch (error) {
    log(`\n❌ 同步失敗：${error.message}\n`, 'red');
    throw error;
  }
}

// ============================================
// 主執行
// ============================================

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔄 AURORA 記憶同步工具

使用方法：
  node sync-memory.js <WORK_LOG_FILE>

範例：
  node sync-memory.js WORK_LOG_2025-10-31_CityPop_Visual_Creation.md
  node sync-memory.js ~/AURORA/F_web_design/projects/wang_yilong/WORK_LOG_*.md

說明：
  從工作日誌自動提取資訊並同步到長期記憶資料庫
    `);
    process.exit(1);
  }

  let workLogPath = args[0];

  // 如果不是絕對路徑，嘗試在專案目錄中尋找
  if (!path.isAbsolute(workLogPath)) {
    const projectDir = path.join(AURORA_HOME, 'F_web_design/projects/wang_yilong');
    workLogPath = path.join(projectDir, workLogPath);
  }

  await syncWorkLogToMemory(workLogPath);
}

if (require.main === module) {
  main().catch(error => {
    console.error('💥 執行失敗:', error.message);
    process.exit(1);
  });
}

module.exports = { syncWorkLogToMemory };
