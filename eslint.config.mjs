import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    // 消除react版本警告
    settings: {
      react: {
        pragma: 'React',
        version: 'detect'
      }
    },
  }, 
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      //  "@typescript-eslint/no-require-imports": "error", // 禁止require导入
      //  "no-unused-vars":"off", // 禁止未使用的变量
      //     "prettier/prettier": "error", // 打开prettier插件提供的规则，该插件从ESLint内运行Prettier
      //     // 关闭这两个ESLint核心规则，因为它们与prettier会有冲突
      //     "arrow-body-style": "off", // 箭头函数体样式
      //     "prefer-arrow-callback": "off", // 优先使用箭头函数

      // 关闭ESLint 必须导入 import React from 'react'规则
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-filename-extension": [1, {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }],
      // 关掉未使用报错
      // "@typescript-eslint/no-unused-vars": "off",
      // 关闭any类型报错
      // "@typescript-eslint/no-explicit-any": "off",
      // 设置代码复杂度阈值（默认20）vsCode插件：CodeMetrics
      // "complexity": ["error", 2]
    }
  },
  {
    // 忽略eslint检查的文件
    ignores: ['node_modules', 'dist', 'public', '*.md', 'questionnaire-client'],
  }
];