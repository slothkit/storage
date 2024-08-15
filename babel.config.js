export default {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        corejs: '3',
      }
    ],
  ],
  ignore: ['node_modules']
}
