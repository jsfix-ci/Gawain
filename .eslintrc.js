module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
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
  globals: {
    // 这里填入你的项目需要的全局变量
  },
  rules: {
    "no-console": "error",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "no-unused-expressions": [0, { allowShortCircuit: true }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
