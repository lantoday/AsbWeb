module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules"],
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  testRegex: "\\.(spec|test)\\.(ts|tsx)",
  moduleFileExtensions: ["tsx", "ts", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
};
