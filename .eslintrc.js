module.exports = {
    env: {
        node: true,
        es6: true,
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    plugins: ['typescript-enum'],
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
        'no-debugger': process.env.NODE_ENV === 'production'
            ? 'error'
            : 'off',

        // Best Practices
        eqeqeq: 'error',
        'no-invalid-this': 'error',
        'no-return-assign': 'error',
        'no-unused-expressions': ['error', {allowTernary: true}],
        'no-useless-concat': 'error',
        'no-useless-return': 'error',

        // Variable
        // 'init-declarations': 'error',
        'no-use-before-define': 'error',

        'no-unused-vars': ['error', {varsIgnorePattern: '^[A-Z]'}],

        // Stylistic Issues
        'array-bracket-newline': ['error', {multiline: true, minItems: null}],
        'array-bracket-spacing': 'error',
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],
        'block-spacing': 'error',
        'comma-dangle': [
            'error', {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        'comma-spacing': ['error', {before: false, after: true}],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': 'error',
        'func-call-spacing': 'error',
        'implicit-arrow-linebreak': ['error', 'beside'],
        // indent: ['error', 4],
        'keyword-spacing': 'error',
        'multiline-ternary': ['error', 'always'],
        // 'no-lonely-if': 'error',
        'no-mixed-operators': 'error',
        'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1, maxBOF: 0}],
        'no-tabs': 'error',
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        'nonblock-statement-body-position': 'error',
        'object-property-newline': ['error', {allowAllPropertiesOnSameLine: true}],
        'quote-props': ['error', 'as-needed'],
        // quotes: ['error', 'prefer-single'],
        semi: ['error', 'always'],
        'semi-spacing': 'error',
        'space-before-blocks': 'error',
        // 'space-before-function-paren': 'error',
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',

        // ES6
        'arrow-spacing': 'error',
        'no-confusing-arrow': 'error',
        'no-duplicate-imports': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
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
    },

    // rules: {
    //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //   semi: ['error', 'never'],
    //   'max-len': 'off',
    //   camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }]
    // }
};
