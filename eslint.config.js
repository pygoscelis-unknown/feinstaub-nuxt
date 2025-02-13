// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'vue/prop-name-casing': ['error', 'camelCase', {
      ignores: [
        'sensor_id',
        'sensor_type',
        'P0',
        'P1',
        'P2'
      ]
    }]
  }
})
