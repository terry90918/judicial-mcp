/**
 * @file start.js
 * @description 司法院 MCP 伺服器的啟動腳本
 * 此檔案負責啟動 Express 伺服器並開始監聽指定的連接埠
 * @author Terry Chen
 * @version 1.0.0
 * @license MIT
 * @since 1.0.0
 */

/**
 * 引入主要的 Express 應用程式實例
 * @type {express.Application}
 */
const app = require('./server');

/**
 * 設定伺服器連接埠
 * 優先使用環境變數 PORT，若未設定則預設使用 3000 連接埠
 * 這樣的設計讓應用程式可以在不同環境（開發、測試、正式）中靈活配置
 * 
 * @type {number}
 * @default 3000
 */
const PORT = process.env.PORT || 3000;

/**
 * 啟動 MCP 伺服器
 * 開始監聽指定的連接埠並輸出啟動訊息到控制台
 * 伺服器啟動後即可透過 HTTP 請求存取司法院 API 服務
 * 
 * @param {number} PORT - 監聽的連接埠號碼
 * @param {Function} callback - 伺服器啟動成功後的回呼函數
 */
app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
