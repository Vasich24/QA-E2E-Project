# QA E2E Project

This repository contains end-to-end tests for the Systima application using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Requirements

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (preferred) or npm/yarn

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/Vasich24/QA-E2E-Project.git
   cd qa-e2e-project
   ```

2. **Install dependencies**:

   ```sh
   pnpm install
   ```

3. **Create a .env file based on .env.example**:

    ```sh
    cp .env.example .env
    ```

    Then open .env and replace the placeholder values with valid credentials and URL.
    These values will be loaded by dotenv and used in the tests (e.g., for login).

4. **Install Playwright browsers (if you haven't done so yet)**:

    ```sh
    npx playwright install
    ```

## Usage

1. **Run all test**:

    ```sh
    pnpm test
    ```

    or:

    ```sh
    npx playwright test
    ```

2. **View HTML report**:
    After the tests have completed, you can open the Playwright HTML report:

    ```sh
    npx playwright show-report
    ```
