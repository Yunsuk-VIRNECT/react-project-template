module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended",
  ],
  plugins: ["stylelint-scss", "stylelint-order", "stylelint-config-rational-order/plugin"],
  rules: {
    "order/properties-order": [[], { severity: 'warning' }],
    "plugin/rational-order": [true, {}],
    "max-nesting-depth": 2,
    "no-descending-specificity": null,
    "no-empty-first-line": null
  },
  overrides: [
    {
      "files": ["**/*.tsx"],
      "customSyntax": "@stylelint/postcss-css-in-js"
    }
  ]
};