# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## React18 + TypeScript4 + Ant Design5 + Next.js13

### CRA创建项目

```sh
# 创建项目
npx create-react-app my-app --template typescript
# 进入项目目录
cd my-app
# 启动项目
npm start
```

### 撤销Git操作

1. 撤销Git add .

撤销git add .将文件从暂存区删除，但不删除原文件

```sh
git rm -rf --cached .
```

2. 撤销Git commit

撤销最新的commit但保留更改，撤销git commit将文件从暂存区删除，但不删除原文件和暂存区代码，不会有commit记录

```sh
git reset --soft HEAD~1
```

3. 撤销Git push

撤销git push将文件从暂存区删除，但不删除原文件

```sh
git reset --hard HEAD~1
```

## 代码规范

[nodejs项目工程化 eslint prettier husky lint-staged commitlint commitizen](https://www.bilibili.com/video/BV1a8411i77L/?spm_id_from=333.337.search-card.all.click&vd_source=f72f2ba9c041e7d811515312b7d7456a)

### Prettier和Eslint

[Eslint](https://eslint.org/docs/latest/use/command-line-interface)和Prettier都是代码格式化工具，但它们有不同的作用和配置方式。


1. 安装依赖

```sh
# eslint
npm i -D eslint eslint-plugin-react @typescript-eslint/parser @typescript-eslint/eslint-plugin
# prettier
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

2. 新建.eslintrc.js文件，并添加以下内容：

```js
module.exports={
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
       
    }
}
```

3. 安装prettier和eslint插件


4. 新建.prettierrc.js文件，并添加以下内容：

```js
module.exports = {
    // 箭头函数参数只有一个参数时可以忽略括号
    arrowParens: 'avoid',
    // 括号内部不要出现空格
    bracketSpacing: true,
    // 行结束符使用 Unix格式
    endOfLine: 'lf',
    // 
    jsxBracketSameLine: false,
    // 行宽
    printWidth: 100,
    // 换行方式
    proseWrap: 'preserve',
    // 分号
    semi: false,
    // 使用单引号
    singleQuote: true,
    // tab缩进
    tabWidth: 2,
    // 使用tab缩进
    useTabs: false,
    // 尾随逗号
    trailingComma: 'es5',
    parser: 'typescript'
}
```

5. 在package.json中添加以下内容：

```json
"scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "prettier": "prettier --write .",
    "lint": "eslint 'src/**/*.+{js|ts|jsx|tsx}'",
    "format": "prettier --write 'src/**/*.{js,ts,jsx,tsx}'"
  },
```
6. 新建.vscode/settings.json文件，并添加以下内容：

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}
```
7. 测试prettier

测试prettier时遇到怪异问题，可重启vscode试试

```sh
# 测试prettier
npm run format
```

### husky

Husky是一个git钩子工具，可以让我们在git操作时自动执行一些命令，比如lint、test等。

1. 安装依赖

```sh
npm i -D husky
```

2. 在package.json中添加以下内容：

```json
// "script":{"prepare": "husky"}
npm pkg set scripts.prepare="husky"
```
```
```sh
# 初始化husky
npx husky init
```


3. 测试husky

```sh
# 测试husky
git add .
git commit -m "test husky"
```

### commitlint

[commitlint](https://commitlint.js.org/guides/getting-started.html)是一个git钩子工具，可以让我们在git操作时自动执行一些命令，比如lint、test等。但是它只会对暂存区的文件进行操作，不会对未暂存的文件进行操作。

1. 安装依赖

```sh
npm i -D @commitlint/cli @commitlint/config-conventional
```

2. 在package.json中添加以下内容：

```json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
```


### Lint-staged增量检测提交代码
[Lint-staged]( https://www.npmjs.com/package/lint-staged)是一个git钩子工具，可以让我们在git操作时自动执行一些命令，比如lint、test等。但是它只会对暂存区的文件进行操作，不会对未暂存的文件进行操作。

1. 安装依赖

```sh
npm i -D lint-staged
```

2. 在package.json中添加以下内容：

```json
// ...
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss}": [
      "stylelint --fix --allow-empty-input-file",
      "prettier --write"
    ],
    "*.{json,cjs}": [
      "prettier --write"
    ]
    // ...
  },
```

3. 测试lint-staged


### npm install -g commitizen

[commitizen](https://github.com/commitizen/cz-cli)是一个git钩子工具，可以让我们在git操作时自动执行一些命令，比如lint、test等。但是它只会对暂存区的文件进行操作，不会对未暂存的文件进行操作。

1. 安装依赖

```sh
npm i -D commitizen
```



    "lint": "eslint ./ --ext .js,.ts,.jsx,.tsx,.json --max-warnings=0",
    "format": "prettier --write 'src/**/*.{js,ts,jsx,tsx}'"
    "lint": "eslint",
    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx}'"

## 初始化Git仓库

```sh
git init
git add .
git commit -m "init"
```

ESLint具有代码检查和代码格式化功能，为避免ESLint规则冲突Perttier的代码格式化，需要eslint插件来解决冲突，让eslint正确地打印出错误
```json
{
  // 关闭eslint所有可能干扰Perttier规则的eslint规则，确保将其放到最后，能够覆盖其他配置集
  "eslint-config-prettier": "^9.1.0", 
  // 将Perttier规则转化为eslint的规则
  "eslint-plugin-prettier": "^5.2.1",
  // 检查React代码
  "eslint-plugin-react": "^7.35.0", 
}
```

## eslint类型检查报错

1. any

## React拖拽库

1. react-dnd
2. react-beautiful-dnd 暂无维护!maintenance，不支持React18严格模式
3. sortable.js 暂无维护
4. react-sortable-hoc 暂无维护
5. dnd-kit 

