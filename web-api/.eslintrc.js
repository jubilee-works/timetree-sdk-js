/* eslint-disable functional/immutable-data */
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
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "functional/immutable-data": "error",
    "functional/no-method-signature": "error",
    "functional/prefer-readonly-type": "error",
    "functional/prefer-type-literal": "error",
  },
};
