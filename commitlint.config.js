module.exports= { 
    extends: [
        // '@commitlint/config-conventional', // 提交格式为 type: message
        'gitmoji' // 提交格式为 :gitmoji: type: message
    ],
    // rules: {
    // 要求commit信息中包含scope括号，like： feat(scope): add new feature
    //     "scope-empty": [2, "never"],
    // }
 };