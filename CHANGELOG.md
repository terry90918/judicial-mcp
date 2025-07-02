# Changelog

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

## [1.0.0] - 初始版本
- 提供基本的 MCP 工具支持，包括 `auth_token`, `list_judgments`, `get_judgment`, `list_categories` 等。
