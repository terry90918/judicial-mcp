# judicial-mcp

[![npm version](https://badge.fury.io/js/judicial-mcp.svg)](https://badge.fury.io/js/judicial-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js->=14.0.0-green.svg)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/terry90918/judicial-mcp)](https://github.com/terry90918/judicial-mcp/issues)

一個用於存取台灣司法院開放資料和裁判書的 MCP (Model Context Protocol) 伺服器。

## 關於專案

**judicial-mcp** 是一個專為法律研究人員、律師和司法資料分析師設計的工具，提供簡單易用的 RESTful API 介面來存取台灣司法院的官方資料。透過統一的 API 端點，使用者可以輕鬆取得裁判書內容、開放資料和各種司法統計資訊。

## 功能特色

- 🏛️ **司法院裁判書 API** - 取得裁判書授權、清單和內容
- 📊 **開放資料 API** - 存取司法院開放資料平台
- 🔍 **分類資料** - 瀏覽主題分類和資料源
- 📥 **檔案下載** - 下載司法資料檔案
- 🧪 **完整測試** - Jest 測試覆蓋
- 🔒 **安全認證** - 支援 Token 基礎認證
- 📖 **完整文檔** - 詳細的 API 文檔和使用範例
- ⚡ **高效能** - 基於 Express.js 框架，支援非同步處理

## 技術架構

- **框架**: Express.js 4.18+
- **HTTP 客戶端**: Axios 1.6+
- **測試框架**: Jest 29.7+
- **Node.js**: 14.0+ 版本支援
- **授權**: MIT License

## 安裝

```bash
npm install judicial-mcp
```

## 使用方式

### 啟動伺服器

```bash
npm start
```

伺服器將在 `http://localhost:3000` 啟動

### API 端點

#### 1. 裁判書授權取得 Token
```
POST /mcp/auth_token
Content-Type: application/json

{
  "user": "your_username",
  "password": "your_password"
}
```

#### 2. 取得裁判書異動清單
```
POST /mcp/list_judgments
Content-Type: application/json

{
  "token": "your_auth_token"
}
```

#### 3. 取得裁判書內容
```
POST /mcp/get_judgment
Content-Type: application/json

{
  "token": "your_auth_token",
  "jid": "judgment_id"
}
```

#### 4. 取得主題分類清單
```
GET /mcp/list_categories
```

#### 5. 取得分類資料源
```
GET /mcp/list_resources/:categoryNo
```

#### 6. 下載資料檔案
```
GET /mcp/download_file/:fileSetId?top=100&skip=0
```

## 開發

### 執行測試

```bash
npm test
```

### 專案結構

```
judicial-mcp/
├── bin/
│   └── judicial-mcp.js    # CLI 入口點
├── __tests__/
│   └── server.test.js     # 測試檔案
├── server.js              # 主要 Express 伺服器
├── start.js               # 伺服器啟動腳本
├── package.json           # 專案配置
├── .env.example           # 環境變數範例
├── .gitignore            # Git 忽略檔案
└── README.md             # 專案文檔
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
