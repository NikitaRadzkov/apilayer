# Apilayer API Automation Tests

### Overview

This project automates the testing of the Fixer API's `/latest` endpoint using TypeScript, Mocha, and Supertest. The tests cover common scenarios and validate various status codes.

### Prerequisites
- Node.js (v20 or higher)
- NPM
- API key from [Apilayer API](https://api.apilayer.com)

### Setup

1. Clone the repository:
```shell
git clone https://github.com/NikitaRadzkov/apilayer.git
cd project-root
```

2. Install dependencies:
```shell
npm install
```

3. Copy the example environment file and update it with your API key:
```shell
cp .env.example .env
```

4. Update `.env`:
```shell
API_KEY=your_api_key_here
```

### Running Tests
To execute all test cases:

```shell
npm run test
```

### Test Cases
| Test Case ID | Description | Status Code |
|--------------|-------------|-------------|
|TC-001|Valid request with a valid API key|200|
|TC-002|Invalid API key|401|
|TC-003|Missing API key|403|
|TC-004|Invalid query parameter|400|
|TC-005|Non-existent endpoint|404|
|TC-006|Rate-limiting error after multiple requests|429|

### Notes
- The tests use Supertest for making HTTP requests and Chai for assertions.
- Be cautious with TC-006 as it may consume your request quota.
- Ensure your API key is valid and has sufficient quota before running the tests.

### Future Improvements
- Add integration with CI/CD pipelines (e.g., GitHub Actions, GitLab CI).
- Extend the test suite to cover additional endpoints and edge cases.
- Add reporting (e.g., Allure, Mochawesome) for better test result visualization.

### Conclusion
This approach follows best practices for test automation, including separation of concerns, reusable components, and environment configuration, making the tests maintainable and scalable.