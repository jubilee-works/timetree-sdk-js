module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "functional"],
  env: { node: true, es6: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "functional/immutable-data": "error",
    "functional/no-method-signature": "error",
    "functional/prefer-readonly-type": "error",
    "functional/prefer-type-literal": "error"
  },
};
