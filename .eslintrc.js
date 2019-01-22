module.exports = {
    "env": {
      "es6": false,
      "browser": true,
    },
    "parserOptions": {
      "ecmaVersion": 5,
    },
    "extends": "eslint:recommended",
    "rules": {
      "indent": [
        "error",
        "tab",
        {
          "SwitchCase" : 1
        }
      ],
      "linebreak-style": [
        "error",
        "windows"
      ],
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "always"
      ],
      "no-console": 0
    }
  };
  