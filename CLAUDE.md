# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a judicial-mcp (司法院 MCP) server - a Node.js/Express application that provides RESTful API endpoints for accessing Taiwan Judicial Yuan's open data and court judgments. The server acts as a bridge between clients and the official judicial APIs, handling authentication, data retrieval, and file downloads.

## Commands

### Development
- `npm start` or `npm run dev` - Start the server (runs start.js, server listens on port 3000 by default)
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run oxlint linter
- `npm run lint:fix` - Run oxlint with auto-fix

### Installation & Setup
- Copy `.env.example` to `.env` and configure JUDICIAL_USER and JUDICIAL_PASSWORD
- Credentials are for Taiwan Judicial Yuan API access at https://data.judicial.gov.tw/jdg/

## Architecture

### Core Structure
- **server.js** - Main Express application with all API routes and middleware
- **start.js** - Server startup script that imports and runs the Express app
- **bin/judicial-mcp.js** - CLI entry point for global npm installations

### API Endpoints Architecture
The server exposes 6 main endpoints under `/mcp/` prefix:

1. **Authentication**: `POST /mcp/auth_token` - Gets JWT token from Judicial Yuan
2. **Judgment Listing**: `POST /mcp/list_judgments` - Retrieves judgment change lists
3. **Judgment Content**: `POST /mcp/get_judgment` - Gets specific judgment content
4. **Categories**: `GET /mcp/list_categories` - Lists all data categories
5. **Resources**: `GET /mcp/list_resources/:categoryNo` - Gets resources by category
6. **File Download**: `GET /mcp/download_file/:fileSetId` - Downloads data files with pagination

### External API Integration
The server proxies requests to two main external APIs:
- `https://data.judicial.gov.tw/jdg/api/` - Judgment database API (requires auth)
- `https://opendata.judicial.gov.tw/` - Open data platform API (public access)

### Error Handling
Centralized error handling via `handleError()` function in server.js:217 that standardizes error responses and logs API errors with detailed information.

### Environment Configuration
- Uses dotenv for environment variables
- Supports default credentials from env vars in auth endpoint
- PORT configuration with fallback to 3000

## Testing

- Jest with Supertest for HTTP endpoint testing
- Test environment configured in package.json
- Current test coverage focuses on the public `/mcp/list_categories` endpoint
- Tests verify HTTP status codes, response formats, and data structures

## Linting

- Uses oxlint with configuration in oxlintrc.json
- Key rules: no-unused-vars, prefer-const, no-var, eqeqeq, no-undef
- Node.js, ES2022, and Jest environments enabled
- Ignores node_modules, coverage, dist, and minified files