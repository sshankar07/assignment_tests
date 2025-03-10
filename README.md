**Playwright Test Automation for Web Application**

**Overview**

This project automates the UI testing of a simple Login and Home Page web application using Playwright. The automation script interacts with an HTML file (app/assignment.html), validates various test scenarios, and ensures functionality correctness.

📜 Test Cases Document
All test cases are documented in testCases/testcases.docx.
Includes Login Page, Home Page, Negative Scenarios, Edge Cases, and Accessibility Checks.

**Project Structure**

📦 Assignment_Playwright
│── 📂 app
│   ├── assignment.html      # Web application under test
│
│── 📂 tests
│   ├── loginPage.spec.js    # Login Page test cases
│   ├── homePage.spec.js     # Home Page test cases
│
│── 📂 testCases
│   ├── testcases.docx       # Documented test cases
│
│── 📂 util
│   ├── helper.js            # Utility functions (e.g., login method)
│
│── .env                     # Stores username and password
│── README.md                 # Project documentation
│── package.json              # Dependencies and Playwright setup
│── playwright.config.js       # Playwright configuration


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

4. **Run the Tests**
To run the tests, execute the following command:

npx playwright test
This will run the tests in parallel across all configured browsers (Chromium, Firefox, and Webkit).

5. **Viewing Test Results**
Test results will be saved in the playwright-report/ directory as an HTML file. You can open this file in your browser to view detailed test reports.

View Detailed Test Report
After execution, generate and open a report:

npx playwright show-report

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

**Conclusion**
This project ensures reliable automated testing for the Login and Home Page using Playwright. It follows best practices by avoiding duplication, using environment variables, and maintaining structured test cases.