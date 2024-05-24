module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",

    "no-multiple-empty-lines": ["error", { max: 3 }],
    /**
     * Array has several methods for filtering, mapping, and folding.
     * If we forget to write return statement in a callback of those,
     * it’s probably a mistake. If you don’t want to use a return or
     * don’t need the returned results, consider using `.forEach` instead.
     */
    "array-callback-return": "warn",
    /**
     * Using a single import statement per module will make the code clearer
     * because you can see everything being imported from that module on one line.
     */
    "no-duplicate-imports": "warn",
    /**
     * Comparing a variable against itself is usually an error, either a typo or
     * refactoring error. It is confusing to the reader and may potentially introduce
     * a runtime error. The only time you would compare a variable against itself is
     * when you are testing for NaN. However, it is far more appropriate to use
     * `typeof x === 'number' && isNaN(x)` or the `Number.isNaN ES2015` function
     * for that use case rather than leaving the reader of the code to determine the intent of self comparison.
     */
    "no-self-compare": "warn",
    /**
     * ECMAScript 6 allows programmers to create strings containing variable or
     * expressions using template literals, instead of string concatenation,
     * by writing expressions like ${variable} between two backtick quotes (`).
     * It can be easy to use the wrong quotes when wanting to use template literals,
     * by writing "${variable}", and end up with the literal value "${variable}" instead
     * of a string containing the value of the injected expressions.
     */
    "no-template-curly-in-string": "error",

    /**
     * Private class members that are declared and not used anywhere in the code
     * are most likely an error due to incomplete refactoring. Such class members
     * take up space in the code and can lead to confusion by readers.
     */
    "no-unused-private-class-members": "warn",

    /**
     * JavaScript allows the omission of curly braces when a block contains
     * only one statement. However, it is considered by many to be best practice
     * to never omit curly braces around blocks, even when they are optional,
     * because it can lead to bugs and reduces code clarity.
     */
    curly: ["warn", "all"],

    /**
     * Disallow unnecessary computed property keys in objects and classes
     */
    "no-useless-computed-key": "warn",

    /**
     * When Object.assign is called using an object literal as the first argument,
     * this rule requires using the object spread syntax instead. This rule also
     * warns on cases where an Object.assign call is made using a single argument
     * that is an object literal, in this case, the Object.assign call is not needed.
     */
    "prefer-object-spread": "warn",

    /**
     * Anyone not yet in an ES6 environment would not want to apply this rule.
     * Others may find the terseness of the shorthand syntax harder to read
     * and may not want to encourage it with this rule.
     */
    "object-shorthand": ["error", "never"],
  },
};
