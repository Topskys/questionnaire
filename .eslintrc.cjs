module.exports = {
    root: true, // 防止ESLint在父目录中查找.eslintrc.js配置文件
    // env: {
    //     browser: true,
    //     es2021: true,
    //     node: true,
    // },
    // 该配置项告诉eslint我们拓展了哪些指定的配置集，其中
    // eslint:recommended :该配置集是 ESLint 内置的“推荐”，它打开一组小的、合理的规则，用于检查众所周知的最佳实践
    // @typescript-eslint/recommended:该配置集是typescript-eslint的推荐，它与eslint:recommended相似，但它启用了特定于ts的规则
    // @typescript-eslint/eslint-recommended :该配置集禁用 eslint:recommended 配置集中已经由typescript 处理的规则，防止eslint和typescript之间的冲突，
    // extends: [
    //     'eslint:recommended',
    //     'plugin:react/recommended',
    //     'plugin:@typescript-eslint/recommended',
    //     'plugin:@typescript-eslint/eslint-recommended',
    //     'plugin:prettier/recommended',
    // ],
    // parser: '@typescript-eslint/parser', // 指定解析器，ESLint默认使用Espree解析器，它与@typescript-eslint/parser版本兼容
    // parserOptions: {
    //     ecmaFeatures: {
    //         jsx: true,
    //     },
    //     ecmaVersion: 'latest',
    //     sourceType: 'module',
    // },
    plugins: ['react', '@typescript-eslint'],
    // rules: {
    //     "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型
    //     "@typescript-eslint/no-require-imports": "off", // 禁止require导入
    //     "no-unused-vars": "off", // 禁止未使用的变量
    //     '@typescript-eslint/no-var-requires': 0, // 禁止使用require导入
    // },
    ignorePatterns: ['node_modules', 'dist', 'public'], // 忽略文件
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    }
}
