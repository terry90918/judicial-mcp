# Changelog

## [1.2.1] - 2025-07-23
### 改進
- 達成 100% 測試覆蓋率 (46 tests, 278 lines covered)
- 移除未使用的 Express 伺服器相關檔案和依賴
- 修正所有 oxlint 警告，提升程式碼品質
- 增強 MCP 配置測試，包含所有 7 個工具的完整驗證
- 新增工具架構安全性驗證 (`additionalProperties: false`)

### 移除
- 刪除 `server.js`, `start.js` 及相關測試檔案
- 清理 62 個未使用的 npm 套件依賴
- 移除 Express.js 和 HTTP API 相關程式碼

---

## [1.2.0] - 2025-07-22
### 新增
- TypeScript 類型定義檔案 (`types/index.d.ts`)
- 輸入驗證功能
- 測試覆蓋率腳本 (`test:coverage`)
- 環境變數範例檔案 (`.env.example`)

### 改進
- 強化錯誤處理和日誌記錄
- 新增 API 參數驗證機制

---

## [1.1.1] - 2025-07-10
### 修復
- 修正版本號不一致的問題
- 同步所有文件中的版本資訊

### 改進
- 優化專案版本管理流程

---

## [1.1.0] - 2025-07-02
### 新增
- 增加對 `list_resources` 工具的完整支持，允許用戶根據分類編號檢索資料源。
- 完善 `download_file` 工具，支持分頁參數 `top` 和 `skip`。

### 改進
- 優化 `auth_token` 工具的錯誤處理，提供更詳細的錯誤信息。
- 更新測試覆蓋率，新增對 `list_resources` 和 `download_file` 工具的測試用例。
- 改善 `README.md` 文檔，新增對新功能的使用說明。

### 修復
- 修正 `get_judgment` 工具在處理無效裁判書 ID 時的錯誤回應。
- 修復環境變數未正確加載時的潛在問題。

---

## [1.0.0] - 2025-06-30
### ✨ 主要功能

- 🏛️ **司法院裁判書 API** - 取得裁判書授權、清單和內容
- 📊 **開放資料 API** - 存取司法院開放資料平台
- 🔍 **分類資料** - 瀏覽主題分類和資料源
- 📥 **檔案下載** - 下載司法資料檔案
- 🧪 **完整測試** - Jest 測試覆蓋
- 🔒 **安全認證** - 支援 Token 基礎認證
- 📖 **完整文檔** - 詳細的 API 文檔和使用範例
- ⚡ **高效能** - 基於 Express.js 框架，支援非同步處理
