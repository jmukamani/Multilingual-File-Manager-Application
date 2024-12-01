module.exports = {
    testEnvironment: 'node', // Sets the testing environment to Node.js
    testMatch: ['**/__tests__/**/*.test.js'], // Matches test files in the __tests__ folder
    verbose: true, // Enables verbose output for test results
    collectCoverage: true, // Collects test coverage information
    coverageDirectory: 'coverage', // Output directory for coverage reports
    coverageProvider: 'v8', // Uses the V8 engine for collecting coverage
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80, // Ensures tests meet a minimum coverage of 80%
      },
    },
    moduleDirectories: ['node_modules', 'src'], // Simplifies module imports by allowing absolute paths
  };
  