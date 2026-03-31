# Playwright Demos VSCode

Playwright testing framework demonstrations using TypeScript with VS Code integration.

## Overview

Complete Playwright testing setup with TypeScript, including configuration, test data, and CI/CD support.

## Project Structure

- **tests/** - Automated test cases
- **testdata/** - Test data files and fixtures
- **playwright.config.ts** - Playwright configuration
- **tsconfig.json** - TypeScript configuration
- **package.json** - NPM dependencies
- **playwright_notes.txt** - Framework documentation and notes
- **.github/** - GitHub Actions workflows

## Technology Stack

- Playwright (browser automation)
- TypeScript
- Node.js
- VS Code

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npx playwright test
   ```

3. View test report:
   ```bash
   npx playwright show-report
   ```

## Configuration

- **Browsers**: Chrome, Firefox, WebKit
- **Base URL**: Configured in playwright.config.ts
- **Test Framework**: Playwright Test

## CI/CD

GitHub Actions workflows are configured for automated test execution.

---
*Last updated: March 31, 2026*