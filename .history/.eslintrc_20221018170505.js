/*
 * @Author: 阮志雄
 * @Date: 2022-10-18 16:56:33
 * @LastEditTime: 2022-10-18 17:05:05
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \react-template-with-ts\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    no-var: "error"
}
}