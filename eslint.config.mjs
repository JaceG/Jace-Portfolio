import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
	{
		ignores: ['.next/**', 'out/**', 'build/**', 'public/**'],
	},
	...nextCoreWebVitals,
];

export default eslintConfig;
