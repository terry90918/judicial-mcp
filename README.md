# judicial-mcp

[![npm version](https://badge.fury.io/js/judicial-mcp.svg)](https://badge.fury.io/js/judicial-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js->=14.0.0-green.svg)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/terry90918/judicial-mcp)](https://github.com/terry90918/judicial-mcp/issues)

一個用於存取台灣司法院開放資料和裁判書的 MCP (Model Context Protocol) 伺服器。

## 關於專案

**judicial-mcp** 是一個專為法律研究人員、律師和司法資料分析師設計的 MCP 伺服器，遵循 Model Context Protocol 規範，讓 AI 助手和其他客戶端能夠透過標準化協議存取台灣司法院的官方資料。透過 6 個專用的 MCP 工具，使用者可以輕鬆取得裁判書內容、開放資料和各種司法統計資訊。

## 功能特色

- 🏛️ **司法院裁判書工具** - 取得裁判書授權、清單和內容
- 📊 **開放資料工具** - 存取司法院開放資料平台
- 🔍 **分類資料工具** - 瀏覽主題分類和資料源
- 📥 **檔案下載工具** - 下載司法資料檔案，支援分頁
- 🧪 **完整測試** - Jest 測試覆蓋
- 🔒 **安全認證** - 支援環境變數和 Token 基礎認證
- 📖 **完整文檔** - 詳細的 MCP 工具文檔和使用範例
- ⚡ **MCP 協議** - 遵循 Model Context Protocol 規範，支援 stdio 傳輸

## 技術架構

- **MCP SDK**: @modelcontextprotocol/sdk ^0.5.0
- **HTTP 客戶端**: Axios 1.6+
- **測試框架**: Jest 29.7+
- **Node.js**: 14.0+ 版本支援
- **傳輸協議**: stdio (標準輸入/輸出)
- **授權**: MIT License

## 安裝

```bash
npm install judicial-mcp
```

## 使用方式

### 環境設定

1. 複製環境變數範例檔案：
```bash
cp .env.example .env
```

2. 編輯 `.env` 檔案，設定司法院 API 憑證：
```
PORT=your_port_number
JUDICIAL_USER=your_username
JUDICIAL_PASSWORD=your_password
```

### MCP 客戶端配置

將以下配置加入您的 MCP 客戶端設定檔（例如 Claude Desktop）：

#### 方式 1：使用 npx（推薦）
```json
{
  "mcpServers": {
    "judicial-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "judicial-mcp@latest"
      ],
      "env": {
        "JUDICIAL_USER": "your_username",
        "JUDICIAL_PASSWORD": "your_password"
      }
    }
  }
}
```

#### 方式 2：使用本地路徑
```json
{
  "mcpServers": {
    "judicial-mcp": {
      "command": "node",
      "args": ["path/to/judicial-mcp/src/index.js"],
      "env": {
        "JUDICIAL_USER": "your_username",
        "JUDICIAL_PASSWORD": "your_password"
      }
    }
  }
}
```

### 直接執行 MCP 伺服器

```bash
npm start
```

### 可用的 MCP 工具

#### 1. `auth_token` - 取得授權 Token
- 支援使用環境變數中的預設帳密
- 可選參數：`user`, `password`

#### 2. `list_judgments` - 取得裁判書異動清單
- 必要參數：`token`（從 auth_token 取得）

#### 3. `get_judgment` - 取得裁判書內容
- 必要參數：`token`, `jid`

#### 4. `list_categories` - 取得主題分類清單
- 無需參數

#### 5. `list_resources` - 取得分類資料源
- 必要參數：`categoryNo`

#### 6. `download_file` - 下載資料檔案
- 必要參數：`fileSetId`
- 可選參數：`top`, `skip`（分頁支援）

## 開發

### 執行測試

```bash
npm test
```

### 執行測試覆蓋率

```bash
npm run test:coverage
```

### 專案結構

```
judicial-mcp/
├── bin/
│   └── judicial-mcp.js    # CLI 入口點
├── src/
│   ├── index.js           # 主要 MCP 伺服器
│   └── tools.js           # MCP 工具定義和處理器
├── types/
│   └── index.d.ts         # TypeScript 類型定義
├── __tests__/
│   ├── mcp.test.js        # MCP 功能測試
│   └── server.test.js     # 舊版相容性測試
├── package.json           # 專案配置
├── .env.example           # 環境變數範例
├── CHANGELOG.md           # 版本變更記錄
├── CODE_OF_CONDUCT.md     # 行為準則
├── LICENSE                # 授權條款
├── MCP_TUTORIAL.md        # MCP 使用教學
├── oxlintrc.json          # oxlint 配置
└── README.md              # 專案文檔
```

## 資料來源

本專案整合以下台灣司法院 API：

- [司法院裁判書查詢 API](https://data.judicial.gov.tw/jdg/)
- [司法院開放資料平台](https://opendata.judicial.gov.tw/)

## 貢獻指南

我們歡迎社群的貢獻！在參與此專案前，請先閱讀我們的 [行為準則](CODE_OF_CONDUCT.md)。

### 如何貢獻

1. Fork 此專案
2. 創建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 授權條款

MIT License

## 作者

Terry Chen

## 回報問題

如有問題或建議，請至 [GitHub Issues](https://github.com/terry90918/judicial-mcp/issues) 回報。

在回報問題或參與討論時，請遵守我們的 [行為準則](CODE_OF_CONDUCT.md)。
