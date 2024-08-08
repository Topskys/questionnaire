import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    // 忽略eslint检查的文件
    ignores: ['node_modules/**/*', 'dist/**/*', 'public/*'], 
    // 消除react版本警告
    settings: {
      react: {
          pragma: 'React',
          version: 'detect'
      }        
  }
  },
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];