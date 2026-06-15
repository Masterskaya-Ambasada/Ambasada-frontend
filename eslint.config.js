import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import customRules from "./scripts/checkCSSname.js";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier,
      boundaries,
      import: importPlugin,
      custom: customRules,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.app.json",
        },
        node: true,
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/ignore": ["**/*.test.*", "**/*.spec.*", "**/*.stories.*"],
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "pages", pattern: "src/pages/*", capture: ["slice"] },
        { type: "widgets", pattern: "src/widgets/*", capture: ["slice"] },
        { type: "features", pattern: "src/features/*", capture: ["slice"] },
        { type: "entities", pattern: "src/entities/*", capture: ["slice"] },
        { type: "shared", pattern: "src/shared/**" },
        { type: "shared", pattern: "src/mocks/**" },
        { type: "shared", pattern: "src/locales/**" },
      ],
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "prettier/prettier": "error",

      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          message:
            "Импорт из ${dependency.type} в ${file.type} нарушает FSD-правила.",
          rules: [
            {
              from: { type: "app" },
              allow: [
                { to: { type: "pages" } },
                { to: { type: "widgets" } },
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "pages" },
              allow: [
                { to: { type: "widgets" } },
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "widgets", captured: { slice: "*" } },
              allow: [
                {
                  to: {
                    type: "widgets",
                    captured: { slice: "{{from.slice}}" },
                  },
                },
                { to: { type: "features" } },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "features", captured: { slice: "*" } },
              allow: [
                {
                  to: {
                    type: "features",
                    captured: { slice: "{{from.slice}}" },
                  },
                },
                { to: { type: "entities" } },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "entities", captured: { slice: "*" } },
              allow: [
                {
                  to: {
                    type: "entities",
                    captured: { slice: "{{from.slice}}" },
                  },
                },
                { to: { type: "shared" } },
              ],
            },
            {
              from: { type: "shared" },
              allow: [{ to: { type: "shared" } }],
            },
          ],
        },
      ],

      "boundaries/no-unknown": "error",
      "boundaries/no-unknown-files": "error",
      "custom/css-modules-camelcase": "error",
    },
  },
  {
    files: ["**/*.{js,ts}", "eslint.config.js", "vite.config.ts"],
    ignores: ["src/**/*", "dist/**/*"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prettier/prettier": "error",
    },
  },
]);
