#!/bin/bash

# 王一隆官網一鍵部署腳本
# Wang Yilong Official Website Deployment Script

set -e  # 遇到錯誤立即退出

echo "🚀 開始部署王一隆官網..."
echo "========================================"

# 顏色定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 項目目錄
PROJECT_DIR="/Users/jillian/AURORA/F_web_design/projects/wang_yilong"

# 切換到項目目錄
cd "$PROJECT_DIR"

# 步驟 1: 檢查 Vercel CLI
echo -e "${BLUE}[1/5]${NC} 檢查 Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI 未安裝${NC}"
    echo "正在安裝 Vercel CLI..."
    npm install -g vercel
    echo -e "${GREEN}✅ Vercel CLI 安裝完成${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI 已安裝${NC}"
fi

# 步驟 2: 檢查登入狀態
echo -e "${BLUE}[2/5]${NC} 檢查 Vercel 登入狀態..."
if vercel whoami &> /dev/null; then
    VERCEL_USER=$(vercel whoami)
    echo -e "${GREEN}✅ 已登入 Vercel (用戶: $VERCEL_USER)${NC}"
else
    echo -e "${YELLOW}⚠️  尚未登入 Vercel${NC}"
    echo "正在打開瀏覽器進行登入..."
    vercel login
    echo -e "${GREEN}✅ 登入完成${NC}"
fi

# 步驟 3: Git 提交
echo -e "${BLUE}[3/5]${NC} 提交最新更改到 Git..."
cd /Users/jillian/AURORA

if [[ -n $(git status -s) ]]; then
    echo "發現未提交的更改，正在提交..."
    git add .
    git commit -m "chore: 部署前最終更新 - $(date '+%Y-%m-%d %H:%M')"
    echo -e "${GREEN}✅ Git 提交完成${NC}"
else
    echo -e "${GREEN}✅ 沒有需要提交的更改${NC}"
fi

# 步驟 4: 選擇部署類型
echo -e "${BLUE}[4/5]${NC} 選擇部署類型..."
echo "1) 預覽部署 (Preview)"
echo "2) 生產部署 (Production)"
echo -n "請選擇 [1/2]: "
read -r DEPLOY_TYPE

cd "$PROJECT_DIR"

if [[ "$DEPLOY_TYPE" == "2" ]]; then
    echo -e "${YELLOW}⚡ 開始生產部署...${NC}"
    vercel --prod
    echo -e "${GREEN}✅ 生產部署完成！${NC}"
else
    echo -e "${YELLOW}⚡ 開始預覽部署...${NC}"
    vercel
    echo -e "${GREEN}✅ 預覽部署完成！${NC}"
fi

# 步驟 5: 顯示結果
echo ""
echo "========================================"
echo -e "${GREEN}🎉 部署成功！${NC}"
echo "========================================"
echo ""
echo "📊 部署信息："
echo "  - 項目名稱: wang-yilong-official"
echo "  - 部署類型: $([ "$DEPLOY_TYPE" == "2" ] && echo "生產環境" || echo "預覽環境")"
echo "  - 部署時間: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "🔗 訪問網站："
echo "  - 執行 'vercel ls' 查看所有部署"
echo "  - 訪問 Vercel Dashboard: https://vercel.com/dashboard"
echo ""
echo "💡 後續步驟："
echo "  1. 訪問部署的網站確認一切正常"
echo "  2. 如需自定義域名，執行: vercel domains add <your-domain>"
echo "  3. 如需查看日誌，執行: vercel logs"
echo ""
echo -e "${GREEN}✨ 王一隆官網已上線！${NC}"
echo ""
