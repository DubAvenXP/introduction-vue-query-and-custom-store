/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                trailingComma: "'es5'",
                singleQuote: true,
                bracketSpacing: true,
                jsxBracketSameLine: true,
                printWidth: 80,
                tabWidth: 4,
                useTabs: false,
                semi: true,
                omitTrailingSemicolon: true,
            },
        ],
    },
};
