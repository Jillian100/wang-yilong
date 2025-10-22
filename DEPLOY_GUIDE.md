# 🚀 王一隆官網部署指南

## Deployment Guide for Wang Yilong Official Website

---

## 選項 A: 本地預覽（立即可用）

### 方法 1: Python HTTP Server（推薦）

```bash
# 進入項目目錄
cd /Users/jillian/AURORA/F_web_design/projects/wang_yilong

# 啟動服務器
python3 -m http.server 8000

# 訪問網站
# 瀏覽器打開: http://localhost:8000
```

### 方法 2: PHP 內建服務器

```bash
cd /Users/jillian/AURORA/F_web_design/projects/wang_yilong
php -S localhost:8000
```

---

## 選項 B: Vercel 部署（推薦用於生產）

### 步驟 1: 登入 Vercel

```bash
vercel login
```

會打開瀏覽器讓您登入 Vercel 帳號（使用 GitHub/GitLab/Email）

### 步驟 2: 部署

```bash
cd /Users/jillian/AURORA/F_web_design/projects/wang_yilong

# 首次部署（預覽）
vercel

# 生產部署
vercel --prod
```

### 步驟 3: 設定自定義域名（可選）

```bash
# 在 Vercel Dashboard 中設定
# https://vercel.com/dashboard
# Settings -> Domains -> Add Domain
```

**預期結果**:
- 自動獲得 `https://wang-yilong-official.vercel.app` 或類似網址
- 自動 HTTPS
- 全球 CDN 加速
- 自動部署每次 Git 推送

---

## 選項 C: Netlify 部署

### 步驟 1: 安裝 Netlify CLI

```bash
npm install -g netlify-cli
```

### 步驟 2: 登入並部署

```bash
cd /Users/jillian/AURORA/F_web_design/projects/wang_yilong

# 登入
netlify login

# 部署
netlify deploy

# 生產部署
netlify deploy --prod
```

---

## 選項 D: GitHub Pages 部署

### 步驟 1: 創建 GitHub Repository

```bash
cd /Users/jillian/AURORA
git remote add origin https://github.com/YOUR_USERNAME/wang-yilong-official.git
git push -u origin main
```

### 步驟 2: 啟用 GitHub Pages

1. 訪問 Repository Settings
2. 找到 "Pages" 設定
3. Source 選擇 "main branch"
4. 指定目錄為 `/F_web_design/projects/wang_yilong`

**預期結果**:
- 網址: `https://YOUR_USERNAME.github.io/wang-yilong-official/`

---

## 選項 E: 自定義服務器部署

### 使用 Nginx

```nginx
server {
    listen 80;
    server_name wangyilong.com www.wangyilong.com;

    root /var/www/wang-yilong-official;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 資產緩存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 壓縮
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

### 使用 Apache

```apache
<VirtualHost *:80>
    ServerName wangyilong.com
    ServerAlias www.wangyilong.com
    DocumentRoot /var/www/wang-yilong-official

    <Directory /var/www/wang-yilong-official>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # 資產緩存
    <FilesMatch "\.(jpg|jpeg|png|gif|svg|css|js|woff|woff2)$">
        Header set Cache-Control "max-age=31536000, public"
    </FilesMatch>
</VirtualHost>
```

---

## 🎯 推薦方案

### 開發階段
**Python HTTP Server** - 簡單快速，本地預覽

### 測試階段
**Vercel** - 免費，自動 HTTPS，全球 CDN

### 生產階段
**Vercel + 自定義域名** - 專業，穩定，快速

---

## 📊 部署檢查清單

部署前確認：
- [x] 所有頁面已創建（index, journey, videos, about）
- [x] 資產路徑為相對路徑
- [x] 圖片文件命名為英文
- [x] vercel.json 配置完成
- [ ] 測試所有連結可用
- [ ] 檢查響應式設計
- [ ] 驗證 Meta 標籤（SEO）
- [ ] 測試加載速度

部署後驗證：
- [ ] 首頁正常顯示
- [ ] 所有頁面導航正常
- [ ] 圖片和視頻正常加載
- [ ] 動畫效果流暢
- [ ] 移動端顯示正常
- [ ] PDF 下載功能正常

---

## 🌐 域名建議

### 可考慮的域名
1. `wangyilong.com` - 簡潔專業
2. `wangyilong.music` - 音樂專屬
3. `wang-yilong.com` - 清晰易讀
4. `yilongwang.com` - 英文順序

### 域名註冊商推薦
- Namecheap
- GoDaddy
- Cloudflare Registrar（推薦，價格透明）
- Google Domains

---

## 🔒 安全建議

### HTTPS
- 使用 Vercel/Netlify 自動提供 HTTPS
- 自定義服務器使用 Let's Encrypt 免費證書

### Headers
已在 vercel.json 配置：
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### 備份
```bash
# 定期備份網站文件
tar -czf wang-yilong-backup-$(date +%Y%m%d).tar.gz \
  /Users/jillian/AURORA/F_web_design/projects/wang_yilong
```

---

## 📈 性能優化

### 圖片優化
```bash
# 使用 ImageOptim 或線上工具壓縮
# 目標：< 500KB 每張圖片
```

### CDN 加速
- Vercel 自帶全球 CDN
- 或使用 Cloudflare CDN（免費）

### 監控
- Google Analytics（追蹤訪問）
- Vercel Analytics（性能監控）
- Lighthouse CI（持續性能測試）

---

## 🆘 疑難排解

### 問題：頁面 404
**解決**：確認檔案名大小寫正確，路徑為相對路徑

### 問題：圖片無法顯示
**解決**：檢查圖片路徑，確保使用 `assets/images/...`

### 問題：字體無法載入
**解決**：Google Fonts CDN 可能被阻擋，考慮自托管字體

### 問題：部署失敗
**解決**：檢查 vercel.json 語法，確認所有文件已提交到 Git

---

## 📞 支援

### 技術支援
- Vercel 文檔: https://vercel.com/docs
- Netlify 文檔: https://docs.netlify.com

### AURORA 設計團隊
- 設計問題: 參考 `BRAND_IDENTITY.md`
- 技術問題: 參考 `README.md`
- 知識圖譜: 參考 `scripts/build_knowledge_graph.py`

---

**創建**: AURORA
**版本**: 1.0.0
**日期**: 2025-10-22

---

*Deploy with confidence, share with the world.* 🚀✨
