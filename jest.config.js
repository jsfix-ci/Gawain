module.exports = {
  preset: "ts-jest",
  // setupFiles: ["./tests/setup.ts"],
  testEnvironment: "jsdom",
  // testEnvironment: "node",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  collectCoverage: true,
};
