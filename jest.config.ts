import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: ["ts", "js", "json"],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/src/**/*.test.ts"],
};

export default config;
