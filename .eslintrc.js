module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  extends: [
    "alloy",
    "alloy/react",
    "alloy/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // "react-hooks/exhaustive-deps": "warn",
    "no-console": "error",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "no-unused-expressions": [0, { allowShortCircuit: true }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
