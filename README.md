**Playwright Test Automation for Web Application**

**Overview**

This repository contains an automated test suite for a web application built using Playwright. 
The tests are designed to verify the functionality of a task management application. 
The automation framework uses a data-driven approach, where test data is provided via a JSON file, allowing tests to be run with different configurations.

**Features**

**Data-Driven Tests:** Tests are run dynamically for different sets of input data, making it reusable for various scenarios.

**Environment Variables:** Sensitive data like credentials are managed securely using a .env file.

**Cross-Browser Testing:** Tests are executed across Chromium, Firefox, and Webkit browsers.

**Modular Test Design:** Utility functions and shared configurations are used to reduce code duplication.

**Parallel Test Execution:** Tests are run in parallel for faster execution.

**Robust Locators:** Advanced Playwright locators ensure reliable element identification.


**Prerequisites**
Before running the tests, ensure you have the following installed:

Node.js (version 14.x or higher)
npm or yarn
Playwright
dotenv (for environment variable management)

**Setup Instructions**
1. **Clone the Repository**
git clone https://github.com/sshankar07/playwright-assessment.git

cd playwright-assessment

3. **Install Dependencies**
Run the following command to install all the required dependencies:

npm install

5. **Configure Environment Variables**
   
Create a .env file in the root directory and add your environment variables for authentication:

USERNAME=your-username

PASSWORD=your-password

BASE_URL=https://animated-gingersnap-8cf7f2.netlify.app

4. **Run the Tests**
To run the tests, execute the following command:

npx playwright test
This will run the tests in parallel across all configured browsers (Chromium, Firefox, and Webkit).

5. **Viewing Test Results**
Test results will be saved in the playwright-report/ directory as an HTML file. You can open this file in your browser to view detailed test reports.


**Test Configuration**
The test suite is configured using Playwright's defineConfig method in playwright.config.ts. 
Key configurations include:

**Test Parallelization**: The tests are run in parallel to optimize execution time.
**Retries**: Tests are retried twice if they fail in the CI environment.
**Trace Collection**: Playwright traces are collected when a test fails, aiding in debugging.
**Supported Browsers**
Chromium
Firefox
Webkit (Safari)
