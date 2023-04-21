const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // Customize the config before returning it.

  if (config.mode === 'development') {
    config.devServer.proxy = {
      '/**': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 3000,
        },
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    }
  }

  return config
}
