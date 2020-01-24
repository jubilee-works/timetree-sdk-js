module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testEnvironment: "node",
  testMatch: ["**/*.(spec|test).(js|ts)"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true
};
