module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "no-debugger": [
          "off"
        ],
        "indent": [
          "off",
          "tab"
        ],
        "quotes": [
          "error",
          "single"
        ],
        "semi": [
          "off",
          "never"
        ],
        "linebreak-style": [
          "off",
          "windows"
        ],
        "no-unused-vars": [
          "off"
        ]
    }
};
