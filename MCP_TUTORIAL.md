# 司法院 MCP 伺服器詳細教學

## 概述

司法院 MCP 伺服器是一個遵循 Model Context Protocol (MCP) 規範的工具，讓 AI 助手和其他客戶端可以透過標準化協定存取台灣司法院的開放資料和裁判書。

## MCP 規範遵循

### 1. 協定實作
- **MCP 版本**: 相容於 MCP SDK v0.5.0
- **傳輸協定**: stdio (標準輸入/輸出)
- **訊息格式**: JSON-RPC 2.0
- **工具數量**: 6 個司法資料存取工具

### 2. 安全性考量
- 環境變數安全存放認證資訊
- 輸入參數驗證
- 結構化錯誤處理
- 詳細的操作記錄

## 安裝和設定

### 1. 環境準備
```bash
# 複製專案
git clone https://github.com/terry90918/judicial-mcp.git
cd judicial-mcp

# 安裝相依套件
npm install
```

### 2. 環境變數設定
```bash
# 複製環境變數範例檔案
cp .env.example .env

# 編輯 .env 檔案，設定司法院帳號密碼
JUDICIAL_USER=your_username
JUDICIAL_PASSWORD=your_password
```

### 3. 驗證安裝
```bash
# 執行測試
npm test

# 檢查程式碼品質
npm run lint
```

## MCP 客戶端配置

### 1. Claude Desktop 配置
在 Claude Desktop 的設定檔中加入：

```json
{
  "mcpServers": {
    "judicial-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/judicial-mcp/src/index.js"],
      "env": {
        "JUDICIAL_USER": "your_username",
        "JUDICIAL_PASSWORD": "your_password"
      }
    }
  }
}
```

### 2. 其他 MCP 客戶端
任何支援 MCP 協定的客戶端都可以透過 stdio 傳輸協定連接：

```bash
# 直接執行 MCP 伺服器
node src/index.js

# 或使用 npm script
npm start
```

## 可用工具說明

### 1. auth_token - 授權驗證
**用途**: 取得司法院裁判書查詢系統的授權 Token

**參數**:
- `user` (可選): 使用者帳號
- `password` (可選): 使用者密碼

**範例**:
```json
{
  "name": "auth_token",
  "arguments": {
    "user": "your_username",
    "password": "your_password"
  }
}
```

**說明**: 如果不提供帳號密碼，會自動使用環境變數中的預設值。

### 2. list_judgments - 裁判書清單
**用途**: 取得裁判書異動清單

**參數**:
- `token` (必要): 從 auth_token 取得的授權 Token

**範例**:
```json
{
  "name": "list_judgments",
  "arguments": {
    "token": "your_auth_token"
  }
}
```

### 3. get_judgment - 裁判書內容
**用途**: 取得特定裁判書的完整內容

**參數**:
- `token` (必要): 授權 Token
- `jid` (必要): 裁判書 ID

**範例**:
```json
{
  "name": "get_judgment",
  "arguments": {
    "token": "your_auth_token",
    "jid": "judgment_id"
  }
}
```

### 4. list_categories - 分類清單
**用途**: 取得司法院開放資料的主題分類清單

**參數**: 無

**範例**:
```json
{
  "name": "list_categories",
  "arguments": {}
}
```

### 5. list_resources - 資料源清單
**用途**: 取得指定分類下的資料源清單

**參數**:
- `categoryNo` (必要): 分類編號

**範例**:
```json
{
  "name": "list_resources",
  "arguments": {
    "categoryNo": "001"
  }
}
```

### 6. download_file - 檔案下載
**用途**: 下載指定檔案集的資料檔案

**參數**:
- `fileSetId` (必要): 檔案集 ID
- `top` (可選): 限制回傳筆數
- `skip` (可選): 跳過筆數（用於分頁）

**範例**:
```json
{
  "name": "download_file",
  "arguments": {
    "fileSetId": "file_set_id",
    "top": "100",
    "skip": "0"
  }
}
```

## 使用工作流程

### 典型的裁判書查詢流程：
1. 使用 `auth_token` 取得授權
2. 使用 `list_judgments` 取得裁判書清單
3. 使用 `get_judgment` 取得特定裁判書內容

### 典型的開放資料查詢流程：
1. 使用 `list_categories` 查看可用分類
2. 使用 `list_resources` 取得特定分類的資料源
3. 使用 `download_file` 下載資料檔案

## 錯誤處理

所有工具都實作了標準化的錯誤處理：

```json
{
  "content": [
    {
      "type": "text",
      "text": "錯誤: 執行工具時發生錯誤\n詳細資訊: {...}"
    }
  ]
}
```

常見錯誤類型：
- 認證失敗：檢查帳號密碼是否正確
- 參數缺失：確認必要參數是否提供
- 網路錯誤：檢查網路連線和 API 服務狀態

## 開發和除錯

### 1. 啟動開發模式
```bash
npm run dev
```

### 2. 執行測試
```bash
# 執行所有測試
npm test

# 監看模式執行測試
npm run test:watch
```

### 3. 程式碼檢查
```bash
# 執行 linter
npm run lint

# 自動修正程式碼格式
npm run lint:fix
```

### 4. 記錄和除錯
伺服器會將錯誤資訊輸出到 stderr，可以透過重導向來記錄：

```bash
node src/index.js 2> error.log
```

## 架構和原理

### 1. MCP 協定層
- 實作 JSON-RPC 2.0 協定
- 處理 `initialize`、`list_tools`、`call_tool` 等標準訊息
- 提供工具發現和執行機制

### 2. 工具抽象層
- 統一的工具定義格式
- 輸入參數 JSON Schema 驗證
- 標準化的回應格式

### 3. API 整合層
- 司法院裁判書 API 整合
- 司法院開放資料 API 整合
- 統一的錯誤處理和記錄

## 安全性最佳實務

1. **認證資訊保護**：使用環境變數存放敏感資訊
2. **輸入驗證**：所有工具參數都經過 JSON Schema 驗證
3. **錯誤處理**：避免洩露敏感系統資訊
4. **記錄政策**：詳細記錄操作但不記錄敏感資料

## 疑難排解

### 常見問題

**Q: 無法連接到 MCP 伺服器**
A: 檢查路徑設定和權限，確認 Node.js 版本相容性

**Q: 授權失敗**
A: 確認司法院帳號密碼正確，檢查環境變數設定

**Q: 工具執行錯誤**
A: 查看錯誤記錄，確認參數格式和網路連線

**Q: 找不到工具**
A: 確認 MCP 客戶端正確載入伺服器，檢查工具名稱拼寫

## 貢獻指南

歡迎提交問題報告和功能請求：
- GitHub Issues: https://github.com/terry90918/judicial-mcp/issues
- 遵循現有的程式碼風格和測試慣例
- 更新相關文件和測試

## 授權條款

MIT License - 詳見 LICENSE 檔案