import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'types/cache-life.d.ts',
      'types/routes.d.ts',
      'types/validator.ts',
    ],
  },
  ...nextVitals,
  ...nextTypescript,
]

export default eslintConfig
