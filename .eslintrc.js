/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ["node_modules/", ".next/", "dist/"],

  // Global settings (fix the React version warning)
  settings: {
    react: { version: "detect" },
    next: { rootDir: ["./"] }
  },

  // Apply rules only to the right file types
  overrides: [
    // ---- TS/JS (app code) ----
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "react-hooks", "react"],
      extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier"
      ]
    },

    // ---- JSON (configs like package.json) ----
    {
      files: ["**/*.json"],
      parser: "jsonc-eslint-parser",
      extends: ["plugin:@eslint/json/recommended"],
      rules: {
        // no React/TS rules here
      }
    }
  ]
}
