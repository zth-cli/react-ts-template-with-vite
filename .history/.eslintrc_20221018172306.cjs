/*
 * @Author: 阮志雄
 * @Date: 2022-10-18 17:19:54
 * @LastEditTime: 2022-10-18 17:23:05
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \react-template-with-ts\.eslintrc.cjs
 */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "no-var": "error"
    }
}
