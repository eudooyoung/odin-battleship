import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended", prettier],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-empty": "off",
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      "no-undef": "warn",
    },
  },
]);
