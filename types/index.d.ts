/**
 * @file types/index.d.ts
 * @description TypeScript 類型定義檔案
 * @author Terry Chen
 * @version 1.1.1
 */

declare module 'judicial-mcp' {
  /**
   * 司法院授權回應
   */
  export interface AuthTokenResponse {
    success: boolean;
    message: string;
    data: {
      token: string;
      expiry?: string;
    };
  }

  /**
   * 裁判書清單項目
   */
  export interface JudgmentListItem {
    jid: string;
    jname: string;
    jdate: string;
    action: string;
  }

  /**
   * 裁判書清單回應
   */
  export interface JudgmentListResponse {
    success: boolean;
    message: string;
    data: JudgmentListItem[];
  }

  /**
   * 裁判書內容回應
   */
  export interface JudgmentContentResponse {
    success: boolean;
    message: string;
    data: {
      jid: string;
      content: string;
      metadata?: Record<string, any>;
    };
  }

  /**
   * 主題分類項目
   */
  export interface CategoryItem {
    categoryNo: string;
    categoryName: string;
    description?: string;
  }

  /**
   * 資料源項目
   */
  export interface ResourceItem {
    fileSetId: string;
    title: string;
    description?: string;
    format?: string;
    updateTime?: string;
  }

  /**
   * 檔案下載回應
   */
  export interface FileDownloadResponse {
    success: boolean;
    message: string;
    data: {
      size: number;
      contentType: string;
      base64: string;
    };
  }

  /**
   * MCP 工具參數類型
   */
  export interface ToolArguments {
    auth_token?: {
      user?: string;
      password?: string;
    };
    list_judgments: {
      token: string;
    };
    get_judgment: {
      token: string;
      jid: string;
    };
    list_categories?: {};
    list_resources: {
      categoryNo: string;
    };
    download_file: {
      fileSetId: string;
      top?: string;
      skip?: string;
    };
    member_token?: {
      user?: string;
      password?: string;
    };
  }
}
