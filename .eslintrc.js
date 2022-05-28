module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/vue3-essential', '@vue/standard'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		semi: ['error', 'always'],
		indent: [0, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'comma-dangle': 0,

		'space-before-function-paren': [
			'error',
			{
				anonymous: 'ignore',
				named: 'never',
				asyncArrow: 'always',
			},
		],

		'no-useless-escape': 0,
	},
};
