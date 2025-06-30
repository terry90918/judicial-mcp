/**
 * @file server.test.js
 * @description 司法院 MCP 伺服器的單元測試檔案
 * 使用 Jest 和 Supertest 進行 API 端點測試，確保伺服器功能正常運作
 * @author Terry Chen
 * @version 1.0.0
 * @license MIT
 * @since 1.0.0
 */

/**
 * 引入 HTTP 測試工具
 * Supertest 用於對 Express 應用程式進行 HTTP 請求測試
 */
const request = require('supertest');

/**
 * 引入主要的 Express 應用程式實例
 * @type {express.Application}
 */
const app = require('../server');

/**
 * 測試 MCP API 端點 /mcp/list_categories
 * 驗證取得主題分類清單的功能是否正常運作
 * 
 * 測試範圍：
 * - HTTP 狀態碼驗證
 * - 回應格式驗證
 * - 資料結構驗證
 */
describe('MCP API 測試 - /mcp/list_categories', () => {
  /**
   * 測試端點是否回傳正確的 HTTP 狀態碼和 JSON 格式
   * 此測試驗證基本的 API 回應是否符合預期
   * 
   * 預期結果：
   * - HTTP 狀態碼為 200 (成功)
   * - Content-Type 為 JSON 格式
   * - 回傳資料為陣列格式 (符合分類清單的資料結構)
   * 
   * @test {GET} /mcp/list_categories - 取得主題分類清單
   */
  it('應回傳 200 且為 JSON 格式', async () => {
    const res = await request(app).get('/mcp/list_categories');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
