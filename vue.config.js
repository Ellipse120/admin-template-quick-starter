'use strict'
const path = require('path')
const defaultSettings = require('./src/project-config.js')
// const zlib = require('zlib')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title

const port = process.env.port || process.env.npm_config_port || 8000
const version = require('./package.json').version
const copyright = require('./package.json').copyright
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.VUE_APP_CI_PROJECT_NAME,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: isDev,
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    plugins: isProd ? [
      new webpack.BannerPlugin(`${copyright} | version ${version}`)
    ] : []
  },
  chainWebpack (config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugin('copy')
      .tap(args => {
        args[0].push({
          from: path.resolve(__dirname, './CHANGELOG.md'),
          to: path.resolve(__dirname, 'dist/'),
          toType: 'dir'
        })
        return args
      })

    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI',
                  priority: 20,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'),
                  minChunks: 3,
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })

          config.optimization.runtimeChunk('single')
        }
      )
  },
  pluginOptions: {
    // compression: {
    //   brotli: {
    //     filename: '[file].br[query]',
    //     algorithm: 'brotliCompress',
    //     include: /\.(js|css|html|svg|json)(\?.*)?$/i,
    //     compressionOptions: {
    //       params: {
    //         [zlib.constants.BROTLI_PARAM_QUALITY]: 11
    //       }
    //     },
    //     minRatio: 0.8
    //   },
    //   gzip: {
    //     filename: '[file].gz[query]',
    //     algorithm: 'gzip',
    //     include: /\.(js|css|html|svg|json)(\?.*)?$/i,
    //     minRatio: 0.8
    //   }
    // }
  }
}
