module.exports = {
  "env": {
      "webextensions": true,
      "browser": true,
      "jquery": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "sourceType": "module"
  },
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "never"
      ],
      "no-console": 0
  }
};