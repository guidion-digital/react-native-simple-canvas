import stylistic from '@stylistic/eslint-plugin';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({});

export default [
    {
        plugins: {
            '@stylistic': stylistic
          },
        files: [
            '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts',
            'eslint.config.js',
        ],
        linterOptions: {
            reportUnusedDisableDirectives: true
        },
        rules: {
            ...js.configs.recommended.rules,

            '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
            '@stylistic/quote-props': [1, 'as-needed'],
            '@stylistic/eol-last': ['error', 'always'],
            'no-useless-escape': 0,
            '@stylistic/object-curly-spacing': ['error', 'always'],
            'no-restricted-imports': [
                'error',
                'lodash',
                'date-fns', {
                    name: 'aws-sdk',
                    message: 'Please use @aws-**** V3 instead.',
                },
            ],
            '@stylistic/key-spacing': ['error'],
            '@stylistic/no-multi-spaces': ['error', { ignoreEOLComments: true }],
            '@stylistic/keyword-spacing': ['error'],
            'sort-imports': ['error', {
                'ignoreCase': true,
                'ignoreDeclarationSort': true,
                'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
                'ignoreMemberSort': false
            }],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: ['const', 'let', 'block-like'], next: ['return', 'block-like']
                },
                {
                    blankLine: 'always',
                    prev: 'block-like', next: 'block-like'
                },
            ],
            '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
            '@stylistic/object-curly-newline': ['error', {
                'ObjectExpression': { 'multiline': true, 'consistent': true },
                'ObjectPattern': { 'multiline': true, 'consistent': true },
                'ImportDeclaration': { 'multiline': true, 'consistent': true },
                'ExportDeclaration': { 'multiline': true, 'consistent': true }
            }],
            'no-return-assign': 'error',
            '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
            '@stylistic/block-spacing': 'error',
            '@stylistic/brace-style': 'error',
            '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
            '@stylistic/max-len': ['error', {
                code: 130,
                ignoreRegExpLiterals: true,
                tabWidth: 2,
                ignoreUrls: true,
                ignorePattern: '<Path .*|<Polyline .*|<Polygon .*|<G .*|<path .*|<polyline .*|<polygon .*|<g .*'
            }],
            '@stylistic/no-multiple-empty-lines': ['error', {
                'max': 2,
                'maxBOF': 0,
                'maxEOF': 1
            }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/member-delimiter-style': [
                'error',
                {
                multiline: {
                    delimiter: 'semi',    // 'none' | 'semi' | 'comma'
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',    // 'none' | 'semi' | 'comma'
                    requireLast: false
                }
                }
            ],
        }
    },

    ...compat.extends(
        'plugin:@typescript-eslint/recommended',
    ),
];
