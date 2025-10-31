# Notion 自動化推送設置指南

本文檔將指導您完成 Notion API 的設置，實現自動推送開發日誌到 Notion。

---

## 📋 前置準備

- Notion 帳號
- Node.js 環境（已完成 ✅）
- 項目依賴已安裝（已完成 ✅）

---

## 🔧 步驟 1：創建 Notion Integration

1. **訪問 Notion Integrations 頁面**
   - 打開：https://www.notion.so/my-integrations

2. **創建新的 Integration**
   - 點擊 `+ New integration`
   - 名稱：`Wang Yilong Website`
   - 關聯的 Workspace：選擇您的工作區
   - 類型：選擇 `Internal`

3. **設置權限**
   - Content Capabilities:
     - ✅ Read content
     - ✅ Update content
     - ✅ Insert content
   - Comment Capabilities:
     - 可選（不必要）

4. **保存並複製 Token**
   - 點擊 `Submit`
   - 複製顯示的 `Internal Integration Token`
   - 格式類似：`secret_xxxxxxxxxxxxx` 或 `ntn_xxxxxxxxxxxxx`

---

## 🔧 步驟 2：準備 Notion 頁面/資料庫

### 方案 A：使用現有頁面（推薦）

1. **打開您的 Notion 工作區**
   - 創建一個新頁面，標題如：`王一隆官網 - 開發日誌`

2. **獲取 Page ID**
   - 點擊頁面右上角的 `Share`
   - 點擊 `Copy link`
   - URL 格式：`https://www.notion.so/Page-Title-1234567890abcdef1234567890abcdef`
   - **Page ID** 就是最後的 32 位字符：`1234567890abcdef1234567890abcdef`

3. **授權 Integration 訪問該頁面**
   - 在頁面右上角點擊 `...`（更多選項）
   - 選擇 `Add connections`
   - 搜索並選擇 `Wang Yilong Website`
   - 點擊 `Confirm`

### 方案 B：使用資料庫

1. **創建新的 Database**
   - 在 Notion 中創建一個 Table Database
   - 標題：`開發日誌資料庫`

2. **添加屬性**
   - Title（默認存在）
   - Date（可選）：日期屬性
   - Status（可選）：選擇屬性（如：Draft, Completed）

3. **獲取 Database ID**
   - 打開 Database 頁面
   - 複製 URL 中的 ID（32位字符）
   - 格式：`https://www.notion.so/1234567890abcdef1234567890abcdef?v=...`

4. **授權 Integration**
   - 同上，點擊 `...` -> `Add connections` -> 選擇您的 Integration

---

## 🔧 步驟 3：配置環境變量

1. **打開項目根目錄的 `.env` 文件**
   ```bash
   # 路徑：F_web_design/projects/wang_yilong/.env
   ```

2. **更新配置**
   ```env
   # Notion Integration Token（從步驟 1 複製）
   NOTION_TOKEN=secret_你的實際Token

   # Page ID 或 Database ID（從步驟 2 複製）
   NOTION_DATABASE_ID=你的32位PageID
   ```

3. **保存文件**

---

## 🔧 步驟 4：修改推送腳本（如果使用 Database）

如果您選擇使用資料庫（方案 B），需要修改腳本：

1. **打開 `scripts/push-to-notion.js`**

2. **找到第 181 行附近**

3. **根據您的 Database 屬性修改**
   ```javascript
   // 如果是 Database，使用 database_id
   const response = await notion.pages.create({
     parent: { database_id: NOTION_DATABASE_ID },
     properties: {
       // 根據您的 Database 屬性調整
       Name: {  // 或 Title，取決於您的設置
         title: [
           { text: { content: pageTitle } }
         ]
       }
     },
     children: blocks.slice(0, 100)
   });
   ```

**如果使用普通頁面（方案 A），保持當前腳本不變。**

---

## 🚀 步驟 5：測試推送

1. **運行推送命令**
   ```bash
   npm run push-to-notion
   ```

2. **預期輸出**
   ```
   📂 文件路徑: /Users/jillian/AURORA/.../CHANGELOG_2025-10-23.md
   📖 讀取 Changelog 文件...
   🔄 轉換 Markdown 為 Notion Blocks...
   ✅ 成功轉換 197 個 blocks
   🚀 推送到 Notion...
   ✅ 成功推送到 Notion！
   🔗 頁面鏈接: https://notion.so/xxxxxxxxxxxxx
   ```

3. **檢查 Notion**
   - 打開 Notion 工作區
   - 在您指定的頁面/資料庫中查看新創建的子頁面

---

## ❌ 常見錯誤排查

### 錯誤 1: `object_not_found`
```
Could not find page with ID: xxx. Make sure the relevant pages
and databases are shared with your integration.
```

**解決方案**:
- ✅ 確認 Page ID 正確（32 位字符）
- ✅ 確認已在 Notion 中授權 Integration（`Add connections`）
- ✅ 確認 Integration Token 正確

### 錯誤 2: `validation_error`
```
Date is not a property that exists.
```

**解決方案**:
- 您使用的是 Database，但屬性名稱不匹配
- 修改腳本中的 `properties` 部分，或使用方案 A（普通頁面）

### 錯誤 3: `unauthorized`
```
API token is invalid.
```

**解決方案**:
- Token 格式錯誤或已過期
- 重新複製 Token 並更新 `.env` 文件

---

## 🎯 下一步

設置完成後，您可以：

1. **自動推送任意 Markdown 文件**
   ```bash
   npm run push-to-notion path/to/your/file.md
   ```

2. **集成到 Git 工作流**
   - 在 `package.json` 中添加 post-commit hook
   - 每次提交後自動推送到 Notion

3. **設置定時任務**
   - 使用 cron 定期同步文檔

---

## 📞 需要幫助？

如果遇到問題，請檢查：
1. `.env` 文件配置是否正確
2. Notion Integration 授權狀態
3. Page/Database ID 是否正確

---

**最後更新**: 2025-10-23
