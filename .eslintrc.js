module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'typescript-enum',
    // 'indent-class-properties',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ?
      'error' :
      'off',

    // Best Practices
    eqeqeq: 'error', //require the use of `===` and `!==`
    'no-invalid-this': 'error', //disallow `this` keywords outside of classes or class-like objects
    'no-return-assign': 'error', //disallow assignment operators in `return` statements
    'no-unused-expressions': ['error', {allowTernary: true}], //disallow unused expressions
    'no-useless-concat': 'error', //disallow unnecessary concatenation of literals or template literals
    'no-useless-return': 'error', //disallow redundant return statements

    // Variable
    // 'init-declarations': 'error',
    'no-use-before-define': 'error', //disallow the use of variables before they are defined

    'no-unused-vars': ['error', {varsIgnorePattern: '^[A-Z]'}],

    // Stylistic Issues
    'array-bracket-newline': ['error', 'consistent'], //enforce linebreaks after opening and before closing array brackets
    'array-bracket-spacing': 'error', //enforce consistent spacing inside array brackets
    'brace-style': ['error', '1tbs', {allowSingleLine: true}], //enforce consistent brace style for blocks
    'block-spacing': 'error', //disallow or enforce spaces inside of blocks after opening block and before closing block
    'comma-dangle': [
      'error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ], //require or disallow trailing commas
    'comma-spacing': ['error', {before: false, after: true}], //enforce consistent spacing before and after commas
    'comma-style': ['error', 'last'], //enforce consistent comma style
    'computed-property-spacing': 'error', //enforce consistent spacing inside computed property brackets
    'func-call-spacing': 'error', //require or disallow spacing between function identifiers and their invocations
    'implicit-arrow-linebreak': ['error', 'beside'], //enforce the location of arrow function bodies
    // 'indent-class-properties/indent': ['error', 2], //enforce consistent indentation for class members
    indent: ['error', 2], //enforce consistent indentation
    'keyword-spacing': 'error', //enforce consistent spacing before and after keywords
    'multiline-ternary': ['error', 'always-multiline'],  //enforce newlines between operands of ternary expressions
    // 'no-lonely-if': 'error',
    'no-mixed-operators': 'error', //disallow mixed binary operators
    'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1, maxBOF: 0}], //disallow multiple empty lines
    'no-tabs': 'error', //disallow all tabs
    'no-unneeded-ternary': 'error', //disallow ternary operators when simpler alternatives exist
    'no-whitespace-before-property': 'error', //disallow whitespace before properties
    'nonblock-statement-body-position': 'error', //enforce the location of single-line statements
    'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}], //enforce placing object properties on separate lines
    'quote-props': ['error', 'as-needed'], //require quotes around object literal property names
    quotes: ['error', 'single'], //enforce the consistent use of either backticks, double, or single quotes
    semi: ['error', 'always'], //require or disallow semicolons instead of ASI
    'semi-spacing': 'error', //enforce consistent spacing before and after semicolons
    'space-before-blocks': 'error', //enforce consistent spacing before blocks
    'space-before-function-paren': ['error', {
      anonymous: 'never', //anonymous function expressions (e.g. function () {})
      named: 'never', //named function expressions (e.g. function foo () {})
      asyncArrow: 'never', //async arrow function expressions (e.g. async () => {})
    }], //enforce consistent spacing before `function` definition opening parenthesis
    'space-in-parens': 'error', //enforce consistent spacing inside parentheses
    'space-infix-ops': 'error', //require spacing around infix operators
    'space-unary-ops': 'error', //enforce consistent spacing before or after unary operators
    'operator-linebreak': ['error', 'after'], //enforce consistent linebreak style for operators

    // ES6
    'arrow-spacing': 'error', //enforce consistent spacing before and after the arrow in arrow functions
    'no-confusing-arrow': 'error', //disallow arrow functions where they could be confused with comparisons
    'no-duplicate-imports': 'error', //disallow duplicate module imports
    'no-var': 'error', //require `let` or `const` instead of `var`
    'object-shorthand': 'error', //require or disallow method and property shorthand syntax for object literals
    'prefer-const': 'error', //require `const` declarations for variables that are never reassigned after declared
    'prefer-template': 'error', //require template literals instead of string concatenation
    'max-len': [
      'error', {
        tabWidth: 2,
        code: 90,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],

    camelcase: ['error', {
      properties: 'never',
      ignoreDestructuring: true,
      ignoreImports: true,
    }],
  },

  // rules: {
  //   camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }]
  // }
};
