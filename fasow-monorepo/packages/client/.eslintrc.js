module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/recommended",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:import/errors",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: "./",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-cycle":0,

  },
};
