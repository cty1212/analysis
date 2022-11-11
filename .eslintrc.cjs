/* eslint-env node */
require(`@rushstack/eslint-patch/modern-module-resolution`)

module.exports = {
  root: true,
  extends: [
    `plugin:vue/vue3-essential`,
    `eslint:recommended`,
    `@vue/eslint-config-prettier`
  ],
  parserOptions: {
    ecmaVersion: `latest`
  },
  globals: {
    process: true // 解决no-undef问题
  },
  rules: {
    'no-unexpected-multiline': 2,
    quotes: [
      `error`,
      `backtick`,
      { avoidEscape: true, allowTemplateLiterals: false }
    ],
    'vue/html-self-closing': [
      `error`,
      {
        html: {
          void: `any`
        }
      }
    ],
    'vue/multi-word-component-names': 0
  }
}
