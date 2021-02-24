/* eslint-disable functional/immutable-data */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "functional"],
  env: { node: true, es6: true },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "functional/immutable-data": "error",
    "functional/no-method-signature": "error",
    "functional/prefer-readonly-type": "error",
    "functional/prefer-type-literal": "error",
  },
};
