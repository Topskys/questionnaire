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
    }
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // 忽略eslint检查的文件
    ignores: ['node_modules', 'dist', 'public','*.md'],
  }, 
  // {
    // rules: {
      //  "@typescript-eslint/no-require-imports": "error", // 禁止require导入
      //  "no-unused-vars":"off", // 禁止未使用的变量
  //     "prettier/prettier": "error", // 打开prettier插件提供的规则，该插件从ESLint内运行Prettier
  //     // 关闭这两个ESLint核心规则，因为它们与prettier会有冲突
  //     "arrow-body-style": "off", // 箭头函数体样式
  //     "prefer-arrow-callback": "off", // 优先使用箭头函数
    // }
  // }
];