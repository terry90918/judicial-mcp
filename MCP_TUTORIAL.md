# 司法院 MCP 伺服器教學

## 概述

司法院 MCP 伺服器讓 AI 助手透過 Model Context Protocol 存取台灣司法院的開放資料和裁判書。

## 快速開始

### 安裝
```bash
npm install judicial-mcp
```

### 環境設定
```bash
cp .env.example .env
# 編輯 .env 設定司法院帳號密碼
JUDICIAL_USER=your_username
JUDICIAL_PASSWORD=your_password
```

## MCP 客戶端配置

### Claude Desktop
```json
{
  "mcpServers": {
    "judicial-mcp": {
      "command": "npx",
      "args": ["-y", "judicial-mcp@latest"],
      "env": {
        "JUDICIAL_USER": "your_username",
        "JUDICIAL_PASSWORD": "your_password"
      }
    }
  }
}
```

## 可用工具

### 裁判書開放
- `auth_token` - 驗證權限（服務時間：00:00~06:00）
- `list_judgments` - 取得裁判書異動清單
- `get_judgment` - 取得裁判書內容

### 開放平台
- `list_categories` - 取得主題分類清單
- `list_resources` - 取得資料源清單
- `download_file` - 下載資料檔案（支援分頁）
- `member_token` - 取得會員授權 Token

## 使用流程

### 裁判書開放查詢
1. `auth_token` → 驗證權限
2. `list_judgments` → 取得異動清單
3. `get_judgment` → 取得裁判書內容

### 開放平台查詢
1. `member_token` → 取得會員授權 Token
2. `list_categories` → 取得主題分類
3. `list_resources` → 取得資料源
4. `download_file` → 下載資料檔案

## 常見問題

**Q: 授權失敗**
A: 確認司法院帳號密碼正確，檢查環境變數設定

**Q: 服務時間限制** 
A: `auth_token` 僅在 00:00~06:00 提供服務

**Q: 大檔案處理**
A: `download_file` 工具會將檔案轉為 base64 格式回傳

## 開發命令

```bash
npm start      # 啟動伺服器
npm test       # 執行測試
npm run lint   # 程式碼檢查
```