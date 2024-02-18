/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  trailingComma: "all",
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};
