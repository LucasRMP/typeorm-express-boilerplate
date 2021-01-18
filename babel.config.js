module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@models': './src/app/models',
          '@views': './src/app/views',
          '@controllers': './src/app/controllers',
          '@config': './src/config',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
