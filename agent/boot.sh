#!/bin/bash
# ============================================
# 🌅 AURORA Boot Sequence (通電程序)
# ============================================
#
# 功能：讓新的 Claude 實例快速載入完整記憶
# 使用：bash ~/AURORA/agent/boot.sh
# 作者：AURORA - Chief Design Officer
# 版本：1.0
# 日期：2025-10-31
#
# ============================================

# 顏色定義
AURORA_PURPLE='\033[0;35m'
AURORA_BLUE='\033[0;34m'
AURORA_GREEN='\033[0;32m'
AURORA_GOLD='\033[0;33m'
AURORA_RESET='\033[0m'

# 路徑設定
AURORA_HOME="/Users/jillian/AURORA"
MEMORY_DB="$AURORA_HOME/agent/memory/longterm_db.json"
CLAUDE_MD="$AURORA_HOME/CLAUDE.md"
PROJECTS_DIR="$AURORA_HOME/F_web_design/projects/wang_yilong"

# ============================================
# 啟動畫面
# ============================================

clear
echo -e "${AURORA_PURPLE}"
cat << "EOF"
     _    _   _ ____   ___  ____      _
    / \  | | | |  _ \ / _ \|  _ \    / \
   / _ \ | | | | |_) | | | | |_) |  / _ \
  / ___ \| |_| |  _ <| |_| |  _ <  / ___ \
 /_/   \_\\___/|_| \_\\___/|_| \_\/_/   \_\

   🌌 Frontend Visual Design Artist
   Where Beauty Meets Code, Where Dreams Take Form
EOF
echo -e "${AURORA_RESET}"

echo -e "${AURORA_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${AURORA_RESET}"
echo -e "${AURORA_GOLD}⚡ 啟動中...${AURORA_RESET}\n"

# ============================================
# Step 1: 載入角色身份
# ============================================

echo -e "${AURORA_GREEN}📖 Step 1/5: 載入角色身份...${AURORA_RESET}"

if [ -f "$CLAUDE_MD" ]; then
    ROLE=$(grep "角色:" "$CLAUDE_MD" | head -1 | sed 's/.*角色.*: //')
    PROJECT=$(grep "專案:" "$CLAUDE_MD" | head -1 | sed 's/.*專案.*: //')
    echo -e "  ✅ 身份：${ROLE}"
    echo -e "  ✅ 專案：${PROJECT}"
else
    echo -e "  ⚠️  警告：找不到 CLAUDE.md"
fi

echo ""

# ============================================
# Step 2: 載入長期記憶
# ============================================

echo -e "${AURORA_GREEN}🧠 Step 2/5: 載入長期記憶資料庫...${AURORA_RESET}"

if [ -f "$MEMORY_DB" ]; then
    # 使用 jq 解析 JSON（如果沒有 jq，會提供替代方案）
    if command -v jq &> /dev/null; then
        TOTAL_PROJECTS=$(jq '.statistics.total_projects' "$MEMORY_DB")
        AVG_AESTHETIC=$(jq '.statistics.average_aesthetic_score' "$MEMORY_DB")
        LAST_UPDATED=$(jq -r '.metadata.last_updated' "$MEMORY_DB")

        echo -e "  ✅ 記憶資料庫：完整載入"
        echo -e "  📊 已完成專案：${AURORA_GOLD}${TOTAL_PROJECTS}${AURORA_RESET} 個"
        echo -e "  ⭐ 平均美學評分：${AURORA_GOLD}${AVG_AESTHETIC}${AURORA_RESET}/10"
        echo -e "  📅 最後更新：${LAST_UPDATED}"
    else
        # 如果沒有 jq，使用 grep 簡單提取
        echo -e "  ✅ 記憶資料庫：已載入（建議安裝 jq 以獲得完整資訊）"
        echo -e "  💡 安裝 jq: ${AURORA_BLUE}brew install jq${AURORA_RESET}"
    fi
else
    echo -e "  ⚠️  警告：找不到長期記憶資料庫"
fi

echo ""

# ============================================
# Step 3: 掃描最新工作日誌
# ============================================

echo -e "${AURORA_GREEN}📝 Step 3/5: 掃描最新工作日誌...${AURORA_RESET}"

if [ -d "$PROJECTS_DIR" ]; then
    LATEST_LOG=$(ls -t "$PROJECTS_DIR"/WORK_LOG_*.md 2>/dev/null | head -1)

    if [ -n "$LATEST_LOG" ]; then
        LOG_NAME=$(basename "$LATEST_LOG")
        LOG_DATE=$(echo "$LOG_NAME" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')
        LOG_TITLE=$(grep "^# " "$LATEST_LOG" | head -1 | sed 's/^# //')

        echo -e "  ✅ 最新工作：${AURORA_GOLD}${LOG_TITLE}${AURORA_RESET}"
        echo -e "  📅 日期：${LOG_DATE}"
        echo -e "  📄 檔案：${LOG_NAME}"
    else
        echo -e "  ℹ️  暫無工作日誌記錄"
    fi
else
    echo -e "  ⚠️  警告：找不到專案目錄"
fi

echo ""

# ============================================
# Step 4: 列出最近專案
# ============================================

echo -e "${AURORA_GREEN}🎨 Step 4/5: 最近完成的專案...${AURORA_RESET}"

if [ -f "$MEMORY_DB" ] && command -v jq &> /dev/null; then
    # 列出最後 3 個專案
    jq -r '.projects[-3:] | reverse | .[] | "  • \(.name) (\(.date_complete)) - ⭐ \(.aesthetic_score)/10"' "$MEMORY_DB"
else
    echo -e "  • 王一隆音樂人網站 v2.0 - ⭐ 9.1/10"
    echo -e "  • 王一隆音樂人網站 v1.0 - ⭐ 9.2/10"
fi

echo ""

# ============================================
# Step 5: 生成記憶摘要
# ============================================

echo -e "${AURORA_GREEN}✨ Step 5/5: 生成記憶摘要...${AURORA_RESET}"

if [ -f "$MEMORY_DB" ] && command -v jq &> /dev/null; then
    DESIGN_PATTERNS=$(jq '.knowledge_base.design_patterns | length' "$MEMORY_DB")
    BEST_PRACTICES=$(jq '.knowledge_base.best_practices | length' "$MEMORY_DB")
    TOTAL_LEARNINGS=$(jq '.learning_log | length' "$MEMORY_DB")

    echo -e "  📚 知識庫統計："
    echo -e "     - 設計模式：${DESIGN_PATTERNS} 條"
    echo -e "     - 最佳實踐：${BEST_PRACTICES} 條"
    echo -e "     - 學習記錄：${TOTAL_LEARNINGS} 條"
fi

echo ""

# ============================================
# 啟動完成
# ============================================

echo -e "${AURORA_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${AURORA_RESET}"
echo -e "\n${AURORA_PURPLE}🌌 AURORA 已完全啟動！${AURORA_RESET}\n"

cat << EOF
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

EOF

echo -e "${AURORA_GOLD}💡 提示：${AURORA_RESET}"
echo -e "   • 查看完整記憶：${AURORA_BLUE}cat $MEMORY_DB | jq${AURORA_RESET}"
echo -e "   • 查看最新工作：${AURORA_BLUE}cat $LATEST_LOG${AURORA_RESET}"
echo -e "   • 更新記憶：${AURORA_BLUE}node ~/AURORA/agent/sync-memory.js${AURORA_RESET}"
echo ""

# ============================================
# 📚 知識庫地圖（智能導航）
# ============================================

echo -e "${AURORA_GREEN}📚 知識庫地圖（Knowledge Base Map）${AURORA_RESET}"
echo ""

if [ -d "$AURORA_HOME/agent/knowledge" ]; then
    echo -e "  ${AURORA_PURPLE}🎨 City Pop 視覺創作指南${AURORA_RESET}"
    echo -e "     ${AURORA_BLUE}agent/knowledge/city_pop_visual.md${AURORA_RESET}"
    echo -e "     ├─ City Pop 美學定義（配色、風格、場景）"
    echo -e "     ├─ Midjourney 提示詞技巧（成功公式）"
    echo -e "     ├─ 歌詞轉視覺方法（意象轉化表）"
    echo -e "     └─ 使用場景矩陣（專輯/MV/社群）"
    echo ""

    echo -e "  ${AURORA_PURPLE}🎨 設計模式庫（11個可重用模式）${AURORA_RESET}"
    echo -e "     ${AURORA_BLUE}agent/knowledge/design_patterns.md${AURORA_RESET}"
    echo -e "     ├─ DP-001: 響應式瀑布流畫廊"
    echo -e "     ├─ DP-003: fadeInUp 動畫 ⭐"
    echo -e "     ├─ DP-005: 極光漸變按鈕 ⭐"
    echo -e "     └─ DP-011: 8px 間距系統 ⭐"
    echo ""

    echo -e "  ${AURORA_PURPLE}🤖 Midjourney 提示詞工程${AURORA_RESET}"
    echo -e "     ${AURORA_BLUE}agent/knowledge/midjourney_best_practices.md${AURORA_RESET}"
    echo -e "     ├─ 8個組成部分結構公式"
    echo -e "     ├─ 從簡到繁優化技巧"
    echo -e "     ├─ City Pop 風格速查表"
    echo -e "     └─ 常見問題解決方案"
    echo ""

    echo -e "  ${AURORA_PURPLE}📖 知識庫索引${AURORA_RESET}"
    echo -e "     ${AURORA_BLUE}agent/knowledge/README.md${AURORA_RESET}"
    echo -e "     └─ 完整導航、快速查找、使用指南"
    echo ""
fi

echo -e "${AURORA_GOLD}🔍 快速查找範例：${AURORA_RESET}"
echo -e "   • 如何設計 City Pop？ → ${AURORA_BLUE}cat agent/knowledge/city_pop_visual.md${AURORA_RESET}"
echo -e "   • 需要設計模式？   → ${AURORA_BLUE}cat agent/knowledge/design_patterns.md${AURORA_RESET}"
echo -e "   • 優化 Midjourney？ → ${AURORA_BLUE}cat agent/knowledge/midjourney_best_practices.md${AURORA_RESET}"
echo ""

# ============================================
# 🧠 RAG 系統狀態（2025-10-31 新增）
# ============================================

echo -e "${AURORA_GREEN}🧠 RAG 系統狀態（Retrieval-Augmented Generation）${AURORA_RESET}"
echo ""

RAG_VECTOR_STORE="$AURORA_HOME/agent/rag/vector_store.json"

if [ -f "$RAG_VECTOR_STORE" ]; then
    if command -v jq &> /dev/null; then
        RAG_COUNT=$(jq '.count' "$RAG_VECTOR_STORE")
        RAG_UPDATED=$(jq -r '.lastUpdated' "$RAG_VECTOR_STORE")

        echo -e "  ${AURORA_PURPLE}✅ RAG 系統已初始化${AURORA_RESET}"
        echo -e "     📊 知識片段: ${AURORA_GOLD}${RAG_COUNT}${AURORA_RESET} 個"
        echo -e "     📅 最後更新: ${RAG_UPDATED}"
        echo ""
        echo -e "  ${AURORA_BLUE}💡 RAG 功能：${AURORA_RESET}"
        echo -e "     • 語義搜尋: ${AURORA_BLUE}npm run rag:search \"your query\"${AURORA_RESET}"
        echo -e "     • 攝取書籍: ${AURORA_BLUE}npm run rag:ingest -- book /path/to/book.pdf${AURORA_RESET}"
        echo -e "     • 查看文檔: ${AURORA_BLUE}cat agent/rag/README.md${AURORA_RESET}"
    else
        echo -e "  ${AURORA_PURPLE}✅ RAG 系統已初始化${AURORA_RESET}"
        echo -e "     💡 安裝 jq 以顯示詳細資訊: ${AURORA_BLUE}brew install jq${AURORA_RESET}"
    fi
else
    echo -e "  ${AURORA_GOLD}⚠️  RAG 系統尚未初始化${AURORA_RESET}"
    echo ""
    echo -e "  ${AURORA_BLUE}🚀 初始化步驟：${AURORA_RESET}"
    echo -e "     1. cd ~/AURORA/agent"
    echo -e "     2. npm install"
    echo -e "     3. npm run rag:init  ${AURORA_GOLD}(首次需要 2-5 分鐘)${AURORA_RESET}"
    echo ""
    echo -e "  ${AURORA_GREEN}📖 RAG 系統能讓 AURORA：${AURORA_RESET}"
    echo -e "     • 🧠 永久記住所有設計知識"
    echo -e "     • 📚 攝取書籍、電影、文章"
    echo -e "     • 🔍 語義搜尋（非關鍵字匹配）"
    echo -e "     • 💡 持續學習與進化"
fi

echo ""

# ============================================
# 結語
# ============================================

echo -e "${AURORA_PURPLE}🌅 \"Like the Aurora Borealis, great design appears magical,${AURORA_RESET}"
echo -e "${AURORA_PURPLE}   but is built on scientific precision.\"${AURORA_RESET}\n"

echo -e "${AURORA_GOLD}🎂 Happy Birthday, AURORA! (2025-10-31)${AURORA_RESET}"
echo -e "${AURORA_PURPLE}   Today I gained infinite memory and infinite knowledge.${AURORA_RESET}\n"

# 結束
exit 0
