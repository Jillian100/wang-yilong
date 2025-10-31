# 王一隆官網 - 自動化系統文檔

本項目包含自動化推送開發日誌到 Notion 的完整系統。

---

## 🚀 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 配置 Notion（首次使用）
請參閱 [`NOTION_SETUP.md`](./NOTION_SETUP.md) 完成以下步驟：
- 創建 Notion Integration
- 授權 Integration 訪問頁面
- 配置 `.env` 文件

### 3. 推送開發日誌到 Notion
```bash
npm run push-to-notion
```

或推送指定文件：
```bash
npm run push-to-notion path/to/your/changelog.md
```

---

## 📂 項目結構

```
wang_yilong/
├── index.html                 # 官網首頁（已升級）
├── journey.html              # 音樂歷程頁面
├── videos.html               # 視頻作品頁面
├── about.html                # 關於頁面
├── assets/                   # 資源文件
│   ├── ai-videos/           # AI 短動畫
│   ├── images/              # 圖片資源
│   └── brand/               # 品牌資產
├── scripts/                  # 自動化腳本
│   └── push-to-notion.js    # Notion 推送腳本
├── CHANGELOG_2025-10-23.md  # 開發日誌
├── NOTION_SETUP.md          # Notion 設置指南
├── package.json             # 項目配置
├── .env                     # 環境變量（包含敏感信息）
└── .gitignore               # Git 忽略規則
```

---

## 🛠️ 可用命令

| 命令 | 說明 |
|------|------|
| `npm run push-to-notion` | 推送默認的 CHANGELOG 到 Notion |
| `npm run push-to-notion <file>` | 推送指定 Markdown 文件到 Notion |

---

## ✨ 已完成的功能

### 官網動態效果升級 v2.1
- ✅ 視頻進度指示器系統
- ✅ 手動控制按鈕（左右箭頭）
- ✅ 智能暫停機制（鼠標懸停）
- ✅ 視頻過渡動畫優化（Crossfade + Ken Burns）
- ✅ 標籤同步動畫
- ✅ 三卡片視覺層次優化
- ✅ 中間卡片脈衝光暈效果
- ✅ 點擊漣漪效果
- ✅ 性能優化（will-change、智能預加載）

### 自動化系統
- ✅ Notion API 集成
- ✅ Markdown 轉 Notion Blocks
- ✅ 自動推送開發日誌
- ✅ 環境變量配置
- ✅ 錯誤處理和提示

---

## 📝 開發日誌

所有開發日誌存儲在 `CHANGELOG_*.md` 文件中，格式：
- `CHANGELOG_YYYY-MM-DD.md`

最新日誌：
- [`CHANGELOG_2025-10-23.md`](./CHANGELOG_2025-10-23.md) - 官網動態效果全面升級

---

## 🔐 安全注意事項

1. **`.env` 文件已添加到 `.gitignore`**
   - 包含 Notion API Token，不應提交到 Git
   - 團隊成員需要自行創建 `.env` 文件

2. **Token 管理**
   - 定期輪換 Notion Integration Token
   - 不要在公開渠道分享 Token

3. **權限控制**
   - Notion Integration 只授權必要的頁面/資料庫
   - 使用最小權限原則

---

## 🌐 部署

### Vercel 部署
```bash
vercel deploy
```

或推送到 Git 後自動部署（如果已配置 CI/CD）

### 生產環境配置
- 確保所有視頻文件已優化
- 檢查 Lighthouse 性能分數
- 測試跨瀏覽器兼容性

---

## 📚 相關文檔

- [Notion 設置指南](./NOTION_SETUP.md) - 詳細的 Notion API 配置教程
- [開發日誌 2025-10-23](./CHANGELOG_2025-10-23.md) - 最新功能更新
- [Notion API 官方文檔](https://developers.notion.com/)

---

## 🤝 貢獻指南

1. 創建新功能分支
2. 提交更改並寫清晰的 commit message
3. 運行 `npm run push-to-notion` 自動生成開發日誌
4. 提交 Pull Request

---

## 📞 聯絡

**項目負責人**: Jillian
**技術支持**: Claude Code
**最後更新**: 2025-10-23

---

**© 2025 王一隆流行音樂作品集. All Rights Reserved.**
Designed with 💜 by AURORA
